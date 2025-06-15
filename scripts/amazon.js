
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
        <select>
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

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary 
      js-add-to-cart" data-product-name= "${product.id}">
        Add to Cart
      </button>
    </div>
  `
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    /* 
      Steps to add product in a cart
      ------------------------------
      1. check if the product is already in the cart.
      2. if it is in the cart, increase the quantity.
      3. if it is not in the cart, add it to the cart.
    */
    
    let matchingItem; // we use this variable to save the product which is already  in the cart.

    cart.forEach((item) => { // item will contain the name and quantity of product.
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1;
    }

    else{
      cart.push({
      productId: productId,
      quantity: 1
    });
    }

   
    
    console.log(cart)
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

  */