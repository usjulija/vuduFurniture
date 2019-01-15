//responsive navigation menu
function responsiveNav() {
  const topnav = document.getElementById("nav");
  topnav.className === "topnav" ? topnav.className += " responsive" : topnav.className = "topnav";
}

//product card generator
const pageId = window.location.search;
const pageNumber = pageId.replace(/\D/g,'');

const productCard = document.getElementById("productCard");

function createCard() {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
     let cardData = data.filter(function(product) {
        return product.id == pageNumber;
      });

    const card = document.createElement("div");
    card.className = "cardContainer";
    card.innerHTML = `
      <h2>${cardData["0"].name}</h2>
      <img id="myImg" src='${cardData["0"].image}' alt='${cardData["0"].name}' class="product-image-small">
      <img src='${cardData["0"].scheme}' alt='${cardData["0"].name} scheme' class="product-scheme">
      <div class="card-data">
        <p>${cardData["0"].description}</p>
        <p class="country">Kilmės šalis: ${cardData["0"].country}.</p>
        <p class="price">${cardData["0"].price}</p>
      </div>
      <a href="mailto:airuska@yahoo.com?Subject=Contact%20form"
      target="_top"
      class="card-email"
      rel="noopener noreferrer">Siųsti el.laišką</a>
      <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="img01" src='${cardData["0"].imageBig}' alt='${cardData["0"].name}'>
      </div>
        `;
    productCard.append(card);
    })
    .then(() => {
      //the modal
      const modal = document.getElementById('myModal');
      const img = document.getElementById('myImg');
      const modalImg = document.getElementById("img01");
      const span = document.getElementsByClassName("close")[0];

      img.onclick = function(){
        modal.style.display = "block";
      }

      span.onclick = function() {
        modal.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("error with getting data on product");
      console.log(error);
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
  createCard();
});
