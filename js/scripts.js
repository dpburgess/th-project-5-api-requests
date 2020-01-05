window.onload = function() {
  base_url = "https://randomuser.me/api/?results=12&nat=US";
  let gallery = document.getElementById("gallery");
  let cards;
  //const cards = document.querySelectorAll(".card");
  let modalOpen = false;
  let employees;

  fetch(base_url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => createCard(data))
    .then(() => {
      cards = document.querySelectorAll(".card");
      console.log("cards " + cards);
      cards.forEach(card => {
        card.addEventListener("click", e => modalUse(e));
      });
    });

  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  // -----------------
  // HELPER FUNCTIONS
  // -----------------
  function createCard(persons) {
    //console.log(persons);
    employees = persons.results;
    console.log(employees);
    persons.results.map(person => {
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}</p>
          </div>
      `;
      gallery.append(div);
    });
  }

  function modalUse(e) {
    console.log(e.target);
    let bodyElem = document.getElementsByTagName("body")[0];
    // I have all the employees available in an array
    // do I use the filter array method and search on the email address? I need to use something unique that is also on the card
    // but then I need to drill down to the specific employee that was clicked on and find them in the array
    // then grab that employee and use their position in the array to get their data
    // this modal html div element is a child of the body element
    let modal = document.createElement("div");
    modal.classList.add("modal-container");
    modal.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div> 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
      `;
    bodyElem.appendChild(modal);
    modal.style.display = "block";
  }

  // ----------------
  // EVENT LISTENERS
  // ----------------
  cards = document.querySelectorAll(".card");
  console.log(cards);
  /*cards.forEach(card => {
    console.log(card);
    //card.addEventListener("click", modalUse)
  });*/

  // end of file
};
