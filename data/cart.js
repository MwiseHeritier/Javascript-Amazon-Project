export const cart = [];

export function addToCart(productId, button) {

  const container = button.closest('.product-container'); // gives you the specific product block that contains the button and the dropdown — so you can grab the correct quantity selected.
  const quantitySelector = container.querySelector('.js-quantity-selector');
  const quantity = Number(quantitySelector.value);
  
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