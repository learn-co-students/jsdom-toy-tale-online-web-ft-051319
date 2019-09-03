const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

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

document.addEventListener("DOMContentLoaded", ()=> {
  var toyURL="http://localhost:3000/toys";
  const toyCollection = document.getElementById("toy-collection");
  fetch(toyURL)
  .then(resp => resp.json())
  .then(json => {
  //  debugger;
    for (const jsElement of json) {
      toyCollection.innerHTML += `<div class="card">\
      <h2>${jsElement["name"]}</h2> \
      <img src=${jsElement["image"]} class="toy-avatar" /> \
      <p>${jsElement["likes"]} Likes</p> \
      <button class="like-btn">Like <3</button> \
      </div>`

      }
    });
    //  toyCollection.innerHTML += ``
  //    toyCollection.innerHTML += '</div>'
      //debugger;


  })

toyForm.addEventListener("submit", function newToy(e)  {
//  debugger;
  e.preventDefault();

  let inputText = toyForm.getElementsByClassName("input-text");
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    body: JSON.stringify({
      "name": `${inputText.name.value}`,
      "image": `${inputText.image.value}`,
      "likes": 0
      })
    };

  return fetch("http://localhost:3000/toys", configObject)
    .then (resp => resp.json())
    .then (json => console.log(json));
  });


// OR HERE!
