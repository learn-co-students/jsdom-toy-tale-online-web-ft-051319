const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const addToyForm = document.querySelector('.add-toy-form')
const inputFields = document.querySelectorAll('.input-text');
const likeBtns = document.querySelectorAll('.like-btn')



// console.log(submitBtn)
// console.log(inputFields[0])

// YOUR CODE HERE


addToyForm.addEventListener('submit', function(e){ 
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: inputFields[0].value,
      image: inputFields[1].value,
      likes: 0
    })
  })
  .then(function(response){
    return response.json()
  }) 
  .then(function(response){
    addToyCard([response])
  })
})


function addToyCard(json){
  json.forEach(toy => {
    toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-toyid=${toy.id} class="like-btn">Like <3</button>
  </div>`
  })
  };




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})




// OR HERE!

toyCollection.addEventListener('click', function(e) {
  e.preventDefault();
  if(e.target.className === 'like-btn') {
    console.log(e.target)
    let more = parseInt(e.target.previousElementSibling.innerText) + 1
    
    fetch(`http://localhost:3000/toys/${e.target.dataset.toyid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
  
      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
  }
  }
) 

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(function(response){
      return response.json();
  })
  .then(addToyCard)
};



fetchToys();

