import {cart, removeFromCart, updateDeliveryOption} from "../data/cart.js";
import{products} from "../data/products.js" // to search inside the product array we need to import products into checkout.js

import {formatCurrency} from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import {deliveryOptions} from "../data/deliveryOptions.js"; 

hello();
const today = dayjs();

const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D'))

function renderOrderSummary() { // the word render means to display on the page(see on the bottom the reason we created this function)



  let cartSummaryHTML = '';

  cart.forEach((cartItem) => { // cartItem is the product we search for
    const productId = cartItem.productId;


    let matchingProduct;  //this is used to save the result of product we are looping through.

    products.forEach((product) => { // this is each product inside product array
      if(product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption ; // used to store the result, we uses id inorder to get full delivery option.

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D'); 

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name} 
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary 
              js-delete-link" data-product-id= "${matchingProduct.id}" >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsMTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;

    
  });

  function deliveryOptionsMTML (matchingProduct, cartItem){
    /* 
      Steps
      -----
      1. loop through delivery options
      2. for each option, generate some HTML
      4. combine the HTML together.
    */


  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
    ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`
    

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 

    html +=`
      <div class="delivery-option js-delivery-option"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id ="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;

  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link') // we selected all delete link on the page.
    .forEach((link) => {
      link.addEventListener('click', () => {
        /* 
          when we click delete 
          -------------------
          1. Remove the product from the cart.
          2, update the HTML
        */
        const productId = link.dataset.productId; // we can use productId to select special class.

        removeFromCart(productId);
      
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantity ();
      });
    });

    function updateCartQuantity() {
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
    }
    
    updateCartQuantity();
    


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) =>{
      element.addEventListener('click', () =>{
        const{productId, deliveryOptionId} = element.dataset;
        //const productId = element.dataset.productId;
        //const deliveryOptionId = element.dataset.deliveryOptionId
        updateDeliveryOption(productId, deliveryOptionId);
        /*instead of using this DOM above called 'container' to  update directly 
         like  what we did above we are gonna rerun all this code and regenerate all the HTML*/ 
        renderOrderSummary(); // a function can call it self or re-run it self this is called 'recursion'
        //
     }); 
    });
}

renderOrderSummary();

/*
  External libraries
  -----------------
  -> are codes that are out of our project(or on enternet)
  -> we load it first and then we can use our own libraries later.
  -> Let us share code
  -> save time
  -> avoid duplicating work

  To get dates
  ------------
  -> get today's date
  -> do calculations with the dates(add 7 days,...)
  ->display the date in easy-to-read format.

  DayJS external library
  ----------------------
  -> it help us to work with dates.
  -> creates a function dayjs() (when we want to get it we call in javascript codes at the top and it give us to day's date)
  

  ESM Version
  -----------
  -> stands for Ecmascript Module.
  -> some libraries doesn't use ESM verson.
  -> it works with JS modules
  -> it supports all common date operations such as:
    . Getting and setting date parts (year, month, day, hour, etc.)
    e.g:
    ---
    now.year();   // 2025
    now.month();  // 5 (June, zero-based index)
    now.date();   // 24
    now.day(); // 2 (Tuesday, 0 = Sunday) 
      
  
    . Formatting dates into readable strings
    e.g:
    ---
    dayjs().format('YYYY-MM-DD');            // "2025-06-24"
    dayjs().format('dddd, MMMM D, YYYY');    // "Tuesday, June 24, 2025"
    dayjs().format('h:mm A');                // "9:12 AM"
    dayjs().format('HH:mm:ss');              // "09:12:00"

    . Parsing dates from strings(Parsing in Day.js means converting a string into a valid Day.js date object so you can manipulate or format it.)
    e.g:
    ---
    const date = dayjs('2025-06-24');
    console.log(date.format()); // "2025-06-24T00:00:00+00:00"


    . Comparing dates (before, after, same)
    . Adding and subtracting time

  Default Export
  --------------
  -> another way of exporting
  -> we can use it when we  only want export 1 thing
  -> we don't need curry brackets
  
  N.B: For this function renderOrderSummary

  prob: we need to update the page one-by-one section(left and then right) and later there might be lots of places on the page we need to update
        (for example: when we change the delivery option we also need to change the prices on order summary section)
        there are a lot of things we need to update one-by-one and it's easy to make a mistake or to forget something.
        
        Now we're going to learn a better way to update the the page. Another way to update the page is after we update
        our data we need  to rerun all codes and regenerate all HTML,
        this is bcz we created this function 'renderOrderSummary'
*/  