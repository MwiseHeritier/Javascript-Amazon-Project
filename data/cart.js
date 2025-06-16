export const cart = [
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
  
  
}