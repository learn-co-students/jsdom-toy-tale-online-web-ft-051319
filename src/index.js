const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.getElementById("toy-collection")  
let addToy = false

document.addEventListener('DOMContentLoaded', function() {
  fetchToys();
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderToys(json) {
    for (const key in json) {
      let toyObject = (json[key]);
      let id = toyObject.id
      let name = toyObject.name
      let image = toyObject.image
      let likes = toyObject.likes
      toyCollection.innerHTML += `
      <div class="card" data-id=${id}>
      <h2>${name}</h2>
      <img src="${image}" class="toy-avatar"/>
      <p>${likes} likes </p>
      <button class="like-btn">Like <3</button>
      </div>
      `
    }
} 

addToyForm.addEventListener('submit', function(e){
  e.preventDefault();

  fetch( 'http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( {
        "name": `${event.target.name.value}`,
        "image": `${event.target.image.value}`,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(renderToys(json))
})


toyCollection.addEventListener("click", function(e){
  if(e.target.innerText == "Like <3") {
    let id = e.target.parentElement.dataset.id
    let likes = e.target.previousElementSibling
    let likesCount = parseInt(likes.innerText)
    likes.innerText = `${++likesCount} likes`
    
    fetch( `http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "likes": likesCount
      })

     })
      .then(response => response.json())
      .then(console.log)
  }
})