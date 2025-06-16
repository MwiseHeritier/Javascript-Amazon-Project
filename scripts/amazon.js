
import {cart, addToCart} from "../data/cart.js";
import { products } from "../data/products.js";


let productsHTML = ''; // this will combines all codes together after we loop each product 
products.forEach((product) => {
  productsHTML +=`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id} ">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary 
      js-add-to-cart" data-product-id= "${product.id}">
        Add to Cart
      </button>
    </div>
  `
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  // ✅ Update cart quantity display.

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
    //const productId = button.dataset.productId;
    const {productId} = button.dataset;

    addToCart(productId, button);

    updateCartQuantity();

    /* 
      Steps to add product in a cart
      ------------------------------
      1. check if the product is already in the cart.
      2. if it is in the cart, increase the quantity.
      3. if it is not in the cart, add it to the cart.

    */
    
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');

      setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);


    });
  });




 /*
   
    Data attribute
    --------------
    -> is just another HTML attribute.
    -> allows us to attach/store any information to an element.
    -> have to start with "data-", then give it any name.
    -> Helps to know which product we want to add in container (like cart in this example)

    Dataset
    -------
    dataset is a property of an HTML element that gives you access
    to all the data-* attributes set on that element. These data-* attributes
    are used to store extra information directly on HTML elements without using classes or IDs.
    The attribute names are converted from kebab-case (data-user-id) to camelCase (dataset.userId
    

    Modules
    --------
    1. prevent naming conflict.
    2. in order the modules works, we need to use live server.
    3. We don't have to worry about order of files when we are using modules.
    3, is better way to organize files.
  */