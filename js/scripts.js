window.onload = function() {
  base_url = "https://randomuser.me/api/?results=12&nat=US";
  let bodyElem = document.getElementsByTagName("body")[0];
  let gallery = document.getElementById("gallery");
  let cards;
  let employees;
  let currentId;

  loadSearch();

  fetch(base_url)
    .then(checkStatus)
    .then(response => response.json())
    .then(createCard)
    .then(() => {
      // for each card add an event listener to create a modal when a card is clicked
      cards = document.querySelectorAll(".card");

      cards.forEach(card => {
        card.addEventListener("click", e => {
          modalUse(e);
        });
      });
    })
    .catch(e => {
      console.log("Something happened");
    });

  // -----------------
  // HELPER FUNCTIONS
  // -----------------
  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function createCard(persons) {
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
    //let bodyElem = document.getElementsByTagName("body")[0];
    currentId = parseInt(e.currentTarget.id);

    if ([...e.currentTarget.classList].includes("card")) {
      let modalEmp = employees[currentId];
      let modal = createModal(modalEmp);

      bodyElem.appendChild(modal);
      modal.style.display = "block";

      closeModal(modal);
    }
  }

  function closeModal(modal) {
    let closeModal = document.getElementById("modal-close-btn");
    closeModal.addEventListener("click", () => {
      bodyElem.removeChild(modal);
    });
  }

  function createModal(modalEmp) {
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
    return modal;
  }

  function parseBirthday(dateString) {
    return dateString
      .substring(0, 10)
      .replace(/(\d{4})-(\d{2})-(\d{2})/, "$2 / $3 / $1");
  }

  function loadSearch() {
    const search = document.querySelector(".search-container");
    search.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
   </form>
`;
  }

  function search(e) {
    e.preventDefault();
    let input = document.getElementById("search-input");
    let searchTerm = input.value.toLowerCase();

    const results = employees.filter(
      emp =>
        !emp.name.first.toLowerCase().includes(searchTerm) &&
        !emp.name.last.toLowerCase().includes(searchTerm)
    );

    // loops through each employee that did not match the search criteria and will hide them
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < results.length; j++) {
        if (cards[i].innerText.includes(results[j].email)) {
          cards[i].style.display = "none";
        }
      }
    }
  }

  // -----------------
  // EVENT LISTENERS
  // -----------------

  // adding the search functionality to the search element
  const submit = document.getElementById("search-submit");
  submit.addEventListener("click", e => search(e));

  // event handler for the prev and next buttons on the modal
  document.addEventListener("click", e => {
    let element = e.target;
    if (element.classList.contains("modal-prev")) {
      // remove the modal

      if (currentId > 0) {
        let oldModal = document.querySelector(".modal-container");
        bodyElem.removeChild(oldModal);
        let prevEmp = currentId - 1;
        let modalEmp = employees[prevEmp];
        let newModal = createModal(modalEmp);
        bodyElem.appendChild(newModal);
        newModal.style.display = "block";
        closeModal(newModal);
        currentId -= 1;
      } else {
        e.target.style.display = "none";
      }
    } else if (element.classList.contains("modal-next")) {
      if (currentId < 11) {
        let oldModal = document.querySelector(".modal-container");
        bodyElem.removeChild(oldModal);
        let nextEmp = currentId + 1;
        let nextModalEmp = employees[nextEmp];
        let nextModal = createModal(nextModalEmp);
        bodyElem.appendChild(nextModal);
        nextModal.style.display = "block";
        closeModal(nextModal);
        currentId += 1;
      } else {
        e.target.style.display = "none";
      }
    }
  });

  // end of file
};
