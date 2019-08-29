const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const formInputs = document.querySelectorAll('.input-text')
const formSubmit = document.querySelector('.submit')
let addToy = false

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderToys(json))
}

function renderToys(json) {
  json.forEach(toy => {
    toyCollection.innerHTML += `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-toyid=${toy.id} class="like-btn">Like <3</button>
      </div>
    `
  })
}
// added id="likes-"+${toy.id} to identify the toy, 
// will help w/implementing 'like' feature

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function createNewToy() {
  let formData = {
    name: formInputs[0].value, 
    image: formInputs[1].value, 
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => renderToys([json]))
    // need to put JSON-ified formData resp in [] 
    // because renderToys() takes array as arg

    // above is the pessimistic way of rendering
    // Optimistic way of rendering:
    // renderToys([formData])
};

formSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  // prevent POST default action of page reloading 
  createNewToy()
})

// likeBtn.addEventListener('click', (e) => {
//   e.preventDefault()

//   fetch("http://localhost:3000/toys/:id", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: {likes: likes++ }
//   })
// })

function handleLike(event) {
  if (event.target.className == "like-btn") {
    let likesTag = event.target.previousElementSibling
    let likes = parseInt(likesTag.innerText.split(" ")[0]) + 1
    likesTag.innerText = likes + " Likes"
    // render optimistically to DOM
    // then send patch request using fetch
    
    // append toy id data included when rendering toy to DOM
    // to send patch request for specific toy
    fetch("http://localhost:3000/toys/" + event.target.dataset.toyid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ likes })
      // update toy's likes to qty in likes variable
    })
  }
}

toyCollection.addEventListener('click', handleLike)

fetchToys()

// don't need to call fetchToys() if fetch() is not placed in a method
// can do this instead at bottom of file
// fetch('http://localhost:3000/toys')
//     .then(resp => resp.json())
//     .then(json => renderToys(json))
//     // or .then(renderToys)