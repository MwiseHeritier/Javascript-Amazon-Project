export let cart = JSON.parse(localStorage.getItem('cart')); // we need to get the cart from local storage.


if(!cart) { // if the there is no cart in local storage we will use this default cart. 
  cart = 
  [ 
    /*
      The reason why we use productId to search for product 
      inside product array and then we can get all properties of product. 
    */
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    },

    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    },
  ];
}




function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, button) {

  const container = button.closest('.product-container'); // gives you the specific product block that contains the button and the dropdown — so you can grab the correct quantity selected.
  const quantitySelector = container.querySelector('.js-quantity-selector');
  let quantity = Number(quantitySelector.value);
  console.log("Selected quantity:", quantity);
  
  let matchingItem; // we use this variable to save the product which is already  in the cart.

  cart.forEach((cartItem) => { // item will contain the name and quantity of product.
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }

  else{
    cart.push({
    //productId: productId,
    //quantity: quantity
    productId,
    quantity
  });
  }

  saveToStorage();
  
}



export function removeFromCart (productId) {
  /*
    steps to remove product from the cart
    -------------------------------------
    1. create new array
    2. loop through the cart
    3. add each product to the new array, except for this productId
  */

  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}