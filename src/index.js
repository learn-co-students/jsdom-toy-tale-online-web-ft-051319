const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const submitButton = document.querySelector(".submit")
let toys = document.getElementById("toy-collection")
let inputs = document.querySelectorAll(".input-text")
let likeButtons = toys.getElementsByTagName("button")


// GIVEN IN LAB
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// MY CODE

function addToyToDOM(toyCollection) {
  toyCollection.forEach(toyObj => {
    toys.innerHTML += `
      <div class="card">
        <h2>${toyObj.name}</h2>
        <img src=${toyObj.image} class="toy-avatar">
        <p>${toyObj.likes} likes</p>
        <button data-id=${toyObj.id} class="like-btn">Like <3</button>
      </div>
    `
  })
}


// Add a New Toy
submitButton.addEventListener("click", event => {
  event.preventDefault();

  let newToyObj = {
    name: inputs[0].value,
    image: inputs[1].value,
    likes: 0
  }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToyObj)
    })
      .then(response => {
        return response.json();
      })
      .then(toyObj => {
        addToyToDOM([toyObj])
      })
})


// Fetch Andy's Toys
fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(addToyToDOM);


// Like a Toy
for(let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", event => {
    let buttonId = event.target.dataset.id;
    let likedToy = toys.children[`${buttonId}` - 1];

    numberOfLikes = parseInt(likedToy.getElementsByTagName("p")[0].textContent.split(" likes")[0], 10);
    
    fetch(`http://localhost:3000/toys/${buttonId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": numberOfLikes + 1
      })
    })
      .then(response => { 
        return response.json();
      })
      .then(toyObj => {
        likedToy.getElementsByTagName("p")[0].textContent = `${toyObj.likes} likes`;
      })
  })
}