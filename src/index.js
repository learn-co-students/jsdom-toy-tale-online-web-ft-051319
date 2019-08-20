const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const submitBtn = document.getElementById("submit-btn");

// YOUR CODE HERE
function fetchToys() {
  let url = "http://localhost:3000/toys";
  return fetch(url)
  .then(response => response.json())
  .then(json => buildToyCards(json));
};

function buildToyCards(json) {
  let div = document.querySelector("div#toy-collection");
  // clear the DOM before adding toy cards 
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  };
  
  json.forEach(toy => {
    // build the toy card
    let toyDiv = document.createElement("div")
    toyDiv.className = "card";
    // toyDiv.innerHTML = toy;

    // add neccessary elements to card 
    let name = document.createElement("h2");
    name.innerHTML = toy.name;

    let img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toy.image;

    let likes = document.createElement("p");
    likes.innerHTML = toy.likes;

    let button = document.createElement("button");
    button.className = "like-btn";
    button.addEventListener('click', () => {
      increaseLikes(toy.id, toy.likes);
    })

    // console.log(toyDiv);
    // console.log(name);
    // console.log(img);
    // console.log(likes);
    toyDiv.appendChild(name);
    toyDiv.appendChild(img);
    toyDiv.appendChild(likes);
    toyDiv.appendChild(button);

    // append back to the toy collectio div 
    div.appendChild(toyDiv);
  });
};

function addToyToPage(toyName, toyImage) {
  let url = "http://localhost:3000/toys";
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  };

  return fetch(url, configObject)
  .then(response => response.json())
  .then(json => buildToyCards(json));
};

function increaseLikes (toyID, toyLikes) {
  toyLikes += 1;
  let url = `http://localhost:3000/toys/${toyID}`;
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  };

  fetch(url, configObject);
  fetchToys();
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// buildToyCards(fetchToys());
fetchToys();

submitBtn.addEventListener('click', () => {
  const inputName = document.getElementById("name").value;
  const inputImg = document.getElementById("image").value;
  addToyToPage(inputName, inputImg);
})

// OR HERE!
