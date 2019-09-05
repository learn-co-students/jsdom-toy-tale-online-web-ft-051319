const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false;
let toyCollection = document.getElementById("toy-collection");


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

  let jack=fetch(toyURL)
  .then(resp => resp.json())
  .then(json => {

    for (const jsElement of json) {
      let divCard=document.createElement('div')
      divCard.setAttribute('class', 'card')
      let h2 = document.createElement("h2");
      h2.innerText=jsElement["name"];
      let img = document.createElement('img');
      img.setAttribute('src',jsElement["image"])
      img.setAttribute('class', 'toy-avatar');

      let p = document.createElement('p')
      p.innerHTML=`${jsElement.likes} likes`

      let btn=document.createElement('button')
      btn.setAttribute('class','like-btn')
      btn.setAttribute('id', jsElement["id"])
      btn.innerText="Like <3";
      // debugger;
      btn.addEventListener("click",function(event)
      {
        event.preventDefault()
        let toyId=event.srcElement.id;

       // var likeString = event.srcElement.attributes["likes"].value;
       let likeCount = parseInt(event.target.previousElementSibling.innerText);
       // debugger;

        let toyIdURL=`http://localhost:3000/toys/${toyId}`

        let getObject = {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            }

        }
        /*
          var likeReturn = fetch(toyIdURL, getObject)
            .then(resp=> resp.json())
            .then(json=> JSON.stringify(json)["likes"]);

            debugger; */
            console.log(`original ${likeCount}`);
          likeCount += 1;
          let configObject = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({

                "likes": `${likeCount}`
              })
            }

        fetch(toyIdURL, configObject)
        .then (resp=>resp.json())
        .then (json=> {event.target.previousElementSibling.innerText= `${likeCount} likes`})

      })

      divCard.append(h2, img, p, btn)
      toyCollection.append(divCard)


    //  debugger;
    //   var likeButton=toyCollection.querySelector("button");
    //
    //   likeButton.addEventListener("click", function (event)
    //    {
    //     debugger;
    //     jsElement["likes"] += 1;
    // //    console.log(`${jsElement["likes"]}`);
    //     onLikeClick(event,jsElement["likes"]);
    //     })


      }



    //  toyCollection.innerHTML += ``
  //    toyCollection.innerHTML += '</div>'
      //debugger;


  })
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

// function fetchToyData(id) {
//
//   let toyIdURL=`http://localhost:3000/toys/${id}`;
//   return fetch(toyIdURL)
//       .then(resp => resp.json());
//
//
// }
/*
function onLikeClick(event) {
*/
/*
document.addEventListener("click", function (event)
 {
  event.preventDefault();
  let toyId=event.srcElement.id;
 // var likeString = event.srcElement.attributes["likes"].value;
 let likeCount = event.target.previousElementSibling;


  let toyIdURL=`http://localhost:3000/toys/${toyId}`

  let getObject = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }

  }
  /*
    var likeReturn = fetch(toyIdURL, getObject)
      .then(resp=> resp.json())
      .then(json=> JSON.stringify(json)["likes"]);

      debugger; */
      /*
      console.log(`original ${likeCount}`);
    likeCount += 1;
    let configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({

          "likes": `${likeCount}`
        })
      }

  fetch(toyIdURL, configObject)
  .then (resp=>resp.json())
  .then (json=>json.results);
  const toyCollectionNode = document.getElementById("toy-collection");
  var toyLikeNode=toyCollectionNode.querySelector("p");
  toyLikeNode.innerHTML=`<p>${likeCount} Likes</p>`
  var toyButtonNode=toyCollectionNode.querySelector("button");
  toyButtonNode.innerHTML=`<button class="like-btn" id=${toyId} likes=${likeCount}>Like <3</button>`

})
*/
