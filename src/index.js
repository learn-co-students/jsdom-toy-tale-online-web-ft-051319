const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyDivs = document.getElementsByClassName('card');
const mainDiv = document.getElementById('toy-collection');

// YOUR CODE HERE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//fetch request for all toys and making divs from those toy objects

function makeToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => makeDiv(json))
}

function makeDiv(json){
  json.forEach(toy =>{
    mainDiv.innerHTML+= `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button id=${toy.id} class="like-btn">Like <3</button>
      </div>`
  })
  liking()
}

//Adding functionality to new-toy-button
let createToy = document.getElementsByName('submit')[0]

createToy.addEventListener('click',function(event){
  let newToyName = document.getElementsByName('name')[0].value
  let newToyImage = document.getElementsByName('image')[0].value
  let newObj = {name: newToyName, image: newToyImage, likes: 0}
  addNewToy(newObj)
  event.preventDefault()
})

function addNewToy(newObj){
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newObj)
  })
  .then(res => res.json())
  .then(newObj => makeDiv([newObj]))
  //revision: now need to think of way to add div for new toy
  // can do this by creating a function with the logic within makeDiv() to do this

  //this saves the new information in newObj to db.json
  //after hitting the "Create New Toy" button, the page refreshes and runs
  //makeToys() again, this would cause the new toy to show up on the page
  //as all the toys displayed come from db.json
}

//Adding like functionality
function liking(){
  for (let div of toyDivs){
    let btn = div.querySelector('button')
    btn.addEventListener('click',function(){
      let likeTally = div.getElementsByTagName('p')[0]
      let count = parseInt(likeTally.innerText,10)+1
      likeTally.innerText = `${count} Likes`
      fetch(`http://localhost:3000/toys/${btn.id}`,{
        method: 'PATCH',
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: count})
      })
    })
  }
}

makeToys()
