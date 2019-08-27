// JS file was required at bottom of HTML file so no need for DOMContentLoaded
// Store all variable that point to important DOMnodes
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const submitButton = document.querySelector('.submit')
const formInputs = document.querySelectorAll('.input-text')
const likeButton = document.querySelector('.like-btn')
let addToy = false

// event listener with arrow function

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// event listener with regular function

submitButton.addEventListener('click', function(event){
    // form submissions do refresh by default
    event.preventDefault();
    // console.log(formInputs[0].value, formInputs[1].value);
 // goal: submit values from form as a post request and then update dom
 // step 1: get values from the form, need to submit toyObj
    let newToyObj = {
        name: formInputs[0].value,
        image: formInputs[1].value,
        likes: 0
        }
    // console.log(newToyObj);
    // step 2: use fetch to send this obj to my database
    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newToyObj)
        // must send info back to server as string instead of JSON

    })
    .then(res => res.json())
    // pessimistic way of rendering:
    .then((newToyObj) => {
        putToysOnDom([newToyObj])
        window.scrollTo(0,document.body.scrollHeight);
    })
})
//
// PATCH http://localhost:3000/toys/:id
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
//
// body:
// {
//   "likes": <new number>
// }

toyCollection.addEventListener('click', () => {
    console.log(event.target.previousElementSibling);
    if(event.target.className == "like-btn"){
        let id = event.target.dataset.toyId
        let likes = parseInt(event.target.previousElementSibling.innerText.split(" ")[0]) + 1
        fetch(`http://localhost:3000/toys/${id}`, {
            method: "PATCH",
            headers:
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify ({

              "likes": likes
            })
        })
        event.target.previousElementSibling.innerText = (likes + " likes")
    }

})

function putToysOnDom(toyObjArray){
    toyObjArray.forEach(toyObj => {
        toyCollection.innerHTML += `<div class="card">
          <h2>${toyObj.name}</h2>
          <img src=${toyObj.image} class="toy-avatar" />
          <p>${toyObj.likes} Likes </p>
          <button data-toy-id=${toyObj.id} class="like-btn">Like <3</button>
        </div>`
    })
}


fetch("http://localhost:3000/toys")
// fetch usually takes 2 arguments, if request type not provided, it will be GET
// console.log(toys) to see promise in console
// .then waits for previous promise to resolve and the accepts callback function
// .then(console.log)
// same as .then((response) => console.log(response))
.then(res => res.json())
// when we receive info we have to conver to json
.then(putToysOnDom)
