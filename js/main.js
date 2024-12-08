// start slider

var products = [];

async function getProductSlider() {
  var response = await fetch("https://fakestoreapi.com/products?limit=5");
  var final = await response.json();
  products = final;
  //   console.log(products);
  displayProductSlider();
  //   console.log(final);
}

function displayProductSlider() {
  var cartiona = "";
  for (var i = 0; i < products.length; i++) {
    cartiona += `
                <div class="carousel-item ${i === 0 ? "active" : ""}">
         <div class="content ">
                     
                    <div class="image">
                        <img src="${products[i].image}"  alt="">
                    </div>
                     </div>
                 </div>
        `;
  }
  document.getElementById("product").innerHTML = cartiona;
}
getProductSlider();

// =======================================================================================
// ========================================================================================
var caption;

var category = document.querySelectorAll(".category");
var display = document.getElementById("card");

for (var i = 0; i < category.length; i++) {
  category[i].addEventListener("click", function (e) {
    caption = this.querySelector("h6").innerText;
    getProducts(caption);
  });
}

var categorys = [];
async function getProducts(productName) {
  var response = await fetch(
    `https://fakestoreapi.com/products/category/${productName}`
  );
  var final = await response.json();
  categorys = final;
  displayProducts();
}

function displayProducts() {
  var cartiona = "";
  for (var i = 0; i < categorys.length; i++) {
    var title = categorys[i].title;
    if (title.length > 30) {
      title = title.substring(0, 30) + "...";
    }

    var stars = "";

    for (var j = 0; j < categorys[i].rating.rate; j++) {
      stars += '<i class="fa-solid fa-star"></i>';
    }

    cartiona += `
            <div class="col-lg-3 col-md-4">
                <div class="cards">
                 <div class="image">
                        <img src="${categorys[i].image}" class="w-75" alt="">
 </div>
                    
                    <p>${title}</p>
                    <span>$${categorys[i].price} <del>$${
      categorys[i].price + 200
    }</del></span>
                    <div class="rating">
                        ${stars}
                        <span>(${categorys[i].rating.count})</span>
                    </div>
                </div>
            </div>
        `;
  }
  display.innerHTML = cartiona;
}

var ascButton = document.getElementById("asc");
var descButton = document.getElementById("desc");

ascButton.addEventListener("click", function () {
  if (caption) {
    sortProducts(caption, "asc");
  } else {
    alert("Please select a category first.");
  }
});

descButton.addEventListener("click", function () {
  if (caption) {
    sortProducts(caption, "desc");
  } else {
    alert("Please select a category first.");
  }
});

var sortTOP = [];
async function sortProducts(productName, order) {
  var response = await fetch(
    `https://fakestoreapi.com/products/category/${productName}?sort=${order}`
  );
  var final = await response.json();
  sortTOP = final;
  displayProductsSorted();
}
function displayProductsSorted() {
  var cartiona = "";
  for (var i = 0; i < sortTOP.length; i++) {
    var title = sortTOP[i].title;
    if (title.length > 30) {
      title = title.substring(0, 30) + "...";
    }

    var stars = "";

    for (var j = 0; j < sortTOP[i].rating.rate; j++) {
      stars += '<i class="fa-solid fa-star"></i>';
    }

    cartiona += `
            <div class="col-lg-3 col-md-4">
                <div class="cards">
                 <div class="image">
                        <img src="${sortTOP[i].image}" class="w-75" alt="">
 </div>
 
                    <p>${title}</p>
                    <span>$${sortTOP[i].price} <del>$${
      sortTOP[i].price + 200
    }</del></span>
                    <div class="rating">
                        ${stars}
                        <span>(${sortTOP[i].rating.count})</span>
                    </div>
                </div>
            </div>
        `;
  }
  display.innerHTML = cartiona;
}

getProducts("electronics");
