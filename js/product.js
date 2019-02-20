//responsive navigation menu
function responsiveNav() {
  const topnav = document.getElementById("nav");
  topnav.className === "topnav" ? topnav.className += " responsive" : topnav.className = "topnav";
}

// const formatPrice = new Intl.NumberFormat("FR", {
//   style: "currency",
//   currency: "EUR"
// });

// function formatPrice(cents) {
//   return (cents / 100).toLocaleString("FR", {
//     style: "currency",
//     currency: "EUR"
//   });
// }

function formatPrice(cents) {
  return (
    (cents / 100).toFixed(2) //allows two decimals
    .replace('.', ',') //replace decimal point character with ,
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' €'
  );
}

//product card generator
const pageId = window.location.search;
const pageNumber = pageId.replace(/\D/g,'');

const productCard = document.getElementById("productCard");

let bigImage;

function createCard() {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
     let cardData = data.filter(function(product) {
        return product.id == pageNumber;
     });

    bigImage = cardData["0"].imageBig;
    const price = formatPrice(cardData["0"].price);

    const card = document.createElement("div");
    card.className = "cardContainer";

    const additional = cardData["0"].additional ? cardData["0"].additional : "";

    card.innerHTML = `
      <h2>${cardData["0"].name}</h2>
      <img id="mainImg" src='${cardData["0"].image}' alt='${cardData["0"].name}' class="product-image-small" title="padidinti">
      <div class="product-scheme">
        <img src='${cardData["0"].scheme}' alt='${cardData["0"].name} schema' class="additImg" title="padidinti">
        <img src='${cardData["0"].color}' alt='${cardData["0"].name} spalvos' class="additImg" title="padidinti">
      </div>
      <div class="card-data">
        <p class="country">Gamintojas: ${cardData["0"].country}.</p>
        <p class="price">Kaina: ${price}</p>
        <p class="additional">${additional}</p>
      </div>
      <a href="mailto:sales@vudufurniture.com?Subject=Del%20producto%20Nr:${cardData["0"].productNo}"
        target="_top"
        class="card-email but"
        rel="noopener noreferrer">Siųsti el.laišką</a>
      <div id="myModal" class="modal">
        <button class="close">&times;</button>
        <img class="modal-content" id="img01" alt='${cardData["0"].name}'>
      </div>
        `;
    productCard.append(card);
    })
    .then(() => {
      //the modal
      const modal = document.getElementById('myModal');
      const mainImg = document.getElementById('mainImg');
      const modalImg = document.getElementById("img01");
      const span = document.getElementsByClassName("close")[0];
      const allButtons = document.querySelectorAll(".but");
      const additImg = document.querySelectorAll(".additImg");

      mainImg.onclick = function(){
        modalImg.src = bigImage;
        modal.style.display = "block";
        allButtons.forEach(but => {
          but.tabIndex = -1;
        });
      }

      additImg.forEach(img => {
        img.onclick = function(){
          modalImg.src = this.src;
          modal.style.display = "block";
          allButtons.forEach(but => {
            but.tabIndex = -1;
          });
        }
      });

      span.onclick = function() {
        modal.style.display = "none";
        allButtons.forEach(but => {
          but.tabIndex = 0;
        });
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
