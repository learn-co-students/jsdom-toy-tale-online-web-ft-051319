const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let toyCollection = document.querySelector('#toy-collection');
const submitToy = document.querySelector('input[type="submit"]');
const nameInput = document.querySelector('input[name="name"]');
const imageInput = document.querySelector('input[name="image"]');

let addToy = false;

addBtn.addEventListener('click', () => {

  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

submitToy.addEventListener('click', function(e){
  //console.log("submit button works!");
  e.preventDefault();

  let newToy = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  }
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
    body: JSON.stringify(newToy)
  })
  .then(function(res){ 
  console.log(res);
    return res.json();
  })
  //.then(res => res.json())   
  .then(function(newToyFromDB){
    renderAllToys([newToyFromDB])  //pessimistic way of rendering
    window.scrollTo(0,document.body.scrollHeight);
  })

  // .then((newToyFromDB) => {
  //   // console.log(res);
  //   renderAllToys([newToyFromDB])
  //   window.scrollTo(0,document.body.scrollHeight);
  // })

  //Optimistic way of rendering:
  //renderAllToys([newToyObj])

})

toyCollection.addEventListener('click', function(e){
  console.log(parseInt(e.target.previousElementSibling.innerText) + 1)
 // debugger
  if(e.target.tagName === 'BUTTON'){

    fetch(`http://localhost:3000/toys/${e.target.dataset.toyid}`,
      {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body:
      JSON.stringify({
        "likes": parseInt(e.target.previousElementSibling.innerText) + 1
      })
     })
  
    //optimistic rendering 
    e.target.previousElementSibling.innerText = parseInt(e.target.previousElementSibling.innerText) + 1
  }
})

// function increaseLikes(){

// }

function renderAllToys(json){
  
  json.forEach(function(toy){
    console.log(toy);
    toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    <button data-toyid=${toy.id} class="like-btn">Like <3</button>
  </div>`
  })
}

function fetchtoys(){
  fetch("http://localhost:3000/toys")
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
    renderAllToys(data)
  })
}

  fetchtoys();


