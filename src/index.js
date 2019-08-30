const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCollection = document.querySelector('#toy-collection')
const submitButton = document.querySelector('.submit')
const formInputs = document.querySelectorAll('.input-text')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  let formData = {
    name: formInputs[0].value,
    image: formInputs[1].value,
    likes: 0
  }

  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  fetch('http://localhost:3000/toys', configObj)
    .then(res => res.json())
    .then((formData) => {
      renderToys([formData])
      window.scrollTo(0,document.body.scrollHeight);
    })
})

function renderToys(objArray) {
  objArray.forEach(obj => {
    toyCollection.innerHTML += `<div class="card">
    <h2>${obj.name}</h2>
    <img src=${obj.image} class="toy-avatar" />
    <p>${obj.likes} Likes</p>
    <button data-toyid=${obj.id} class="like-btn">Like <3</button>
  </div>
    `
  })
}

toyCollection.addEventListener("click", function(event) {
  event.preventDefault()
  if(event.target.className === "like-btn") {
    let likesTag = event.target.previousElementSibling
    let addLike = parseInt(likesTag.innerText.split(" ")[0]) + 1
    // likesTag.innerText = addLike + ' Likes'

    fetch('http://localhost:3000/toys/' + event.target.dataset.toyid, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'likes': addLike
      })
    })
    .then(res => res.json())
    .then((obj => {
      event.target.previousElementSibling.innerText = `${addLike} Likes`;
    }))
  }
})

fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  })
  .then(renderToys)