//responsive navigation menu
function responsiveNav() {
  const topnav = document.getElementById("nav");
  topnav.className === "topnav" ? topnav.className += " responsive" : topnav.className = "topnav";
}

//filter function for shop ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_portfolio_gallery_filter
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("panel");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

//shop generator
const gallerySection = document.getElementById("products");

function createShop() {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        //creates image with link on the main page
        const panel = document.createElement("div");
        panel.className = `panel ${product.type}`;
        panel.style.backgroundImage = `url(${product.image})`;
        panel.innerHTML = `
          <a href='${product.url}' class="title">${product.name}</a>
            `;
        gallerySection.append(panel);
      });
    })
    .then(() => {
      filterSelection("all");
    })
    .catch((error) => {
      console.log("error with getting data on products");
      console.log(error);
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
  createShop();
});
