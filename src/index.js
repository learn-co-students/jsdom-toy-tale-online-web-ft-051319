const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const submitButton = document.querySelector('.submit')
const formInputs = document.querySelectorAll('.input-text')

let addToy = false

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  }
  else {
    toyForm.style.display = 'none'
  }
})

submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  let newToyObj = {
    name: formInputs[0].value,
    image: formInputs[1].value,
    likes: 0
  }
  fetch("https://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(newToyFromDB) => {
    addToyToCard([newToyFromDB])
    window.scrollTo(0, document.body.scrollHeight)
  }
})


function addToyToCard(json) {
  json.forEach(toy => {
    toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`
  })
}

fetch("http://localhost3000/toys")
  .then(response => response.json)
  .then(addToyToCard)


