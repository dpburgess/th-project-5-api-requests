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
      console.log(cards);
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
    persons.results.map((person, index) => {
      let div = document.createElement("div");
      div.classList.add("card");
      div.setAttribute("id", index);
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
    let bodyElem = document.getElementsByTagName("body")[0];

    console.log(e.currentTarget.innerText);
    if ([...e.currentTarget.classList].includes("card")) {
      console.log(e.currentTarget.id);
      let modalEmp = employees[e.currentTarget.id];
      //const bday;
      // if the item that has been evented on is a employee card with card class
      // get all the card elements and put them in an array  -- this is the employee array I have already
      // what info from the card am I supposed to use for index of?
      // maybe I can use innerText which will match the cards more easily than matching the api json
      // use indexOf on the array to find the employee info that matches the card that was clicked
      // then use that employee index from the array and fill out the modal

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
                  <img class="modal-img" src="${
                    modalEmp.picture.large
                  }" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${modalEmp.name.first} ${
        modalEmp.name.last
      }</h3>
                  <p class="modal-text">${modalEmp.email}</p>
                  <p class="modal-text cap">${modalEmp.location.city}</p>
                  <hr>
                  <p class="modal-text">${modalEmp.cell}</p>
                  <p class="modal-text">${modalEmp.location.street.number} ${
        modalEmp.location.street.name
      }, ${modalEmp.location.city}, ${modalEmp.location.state} ${
        modalEmp.location.postcode
      }</p>
                  <p class="modal-text">Birthday: ${parseBirthday(
                    modalEmp.dob.date
                  )}</p>
              </div>
            <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
          </div> 
        `;
      bodyElem.appendChild(modal);
      modal.style.display = "block";

      let closeModal = document.getElementById("modal-close-btn");
      closeModal.addEventListener("click", () => {
        bodyElem.removeChild(modal);
      });
    }
  }

  function parseBirthday(dateString) {
    //  "1945-04-03T14:59:43.913Z"
    ///let date = new Date(dateString);
    //return `${date.getMonth()}\\${date.getDate()}\\${date.getFullYear()}`;
    console.log(dateString.substring(0, 10));
    let shortDate = dateString.substring(0, 10);
    return dateString
      .substring(0, 10)
      .replace(/(\d{4})-(\d{2})-(\d{2})/, "$2 / $3 / $1");
  }

  // ----------------
  // EVENT LISTENERS
  // ----------------
  //cards = document.querySelectorAll(".card");
  //console.log(cards);
  /*cards.forEach(card => {
    console.log(card);
    //card.addEventListener("click", modalUse)
  });*/

  // click to close the modal

  // end of file
};
