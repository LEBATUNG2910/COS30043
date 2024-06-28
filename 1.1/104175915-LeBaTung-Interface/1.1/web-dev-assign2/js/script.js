// check js/util.js for some custom functions

// get all constant elements
const navList = qq(".header__navbar__link");
const activeLink = q(".header__navbar__link--active");
const box = q(".header__navbar__box");
const rippleList = qq(".ripple__wrapper");
const menuToggler = q(".header__navbar__menu--left");
const foodMenuList = qq(".main__menu__item");
const cartCount = q(".header__navbar__link--order__cart");
const cartCost = q(".main--order__cart__cost");
const cartList = q(".main--order__cart__inner");

/**
 * Init state
 * rerun the function again when the web is resized
 */
const init = () => {
  // Set the position for the cover box at the position of the active link
  if (window.innerWidth > 481) boxLink(activeLink);
  box.style.display = "block";
};

init();
window.addEventListener("resize", init);

/**
 * Updating position of navbar's box
 */
for (let navLink of navList) {
  // update the position of the navbar's box based on the hoverd link
  navLink.addEventListener("mouseover", () => boxLink(navLink));
  // move the box back to the active link after not hovering anymore
  navLink.addEventListener("mouseout", () => boxLink(activeLink));
}

/**
 * Setting up the burger menu
 */
menuToggler.addEventListener("click", () => {
  menuToggler.classList.toggle("header__navbar__menu--left--open");
});

/**
 * Setting up the localstorage for the cart
 */
let cart = JSON.parse(localStorage.getItem("cart"));
let price = Number(localStorage.getItem("price"));
if (!cart) cart = { count: 0 };
if (!price) price = 0;
localStorage.setItem("cart", JSON.stringify(cart));
localStorage.setItem("price", price);
cartCount.innerHTML = cart.count;

/**
 * Setting up the ripple
 */
for (let rippleElm of rippleList) {
  rippleElm.addEventListener("mousedown", (e) => {
    // lazy adding ripple element
    // only add the ripple on the first time click the parent element
    if (!rippleElm.querySelector(".ripple__inner")) createRipple(rippleElm);
    const ripple = rippleElm.querySelector(".ripple__inner");
    // remove the class to restart the animation
    ripple.classList.remove("ripple__inner--active");
    // get the element area to calculate the mouse position relative to the element
    let elmArea = e.target.getBoundingClientRect();
    // expand the ripple from the clicked positio
    ripple.style.left = `${e.clientX - elmArea.left}px`;
    ripple.style.top = `${e.clientY - elmArea.top}px`;
    // run the animation
    ripple.classList.add("ripple__inner--active");
  });
}

/**
 * Setting up add to cart from clicking on menu's items
 */
for (let foodItem of foodMenuList) {
  foodItem.addEventListener("click", (e) => {
    let clickedItemChildren = e.path[0].children;
    // Combine the food name and its serving as the key for the table
    let itemName = `${clickedItemChildren[0].textContent} - ${clickedItemChildren[1].textContent}`;
    // Parse the money string to get the number
    let itemPrice = Number(clickedItemChildren[2].textContent.slice(1));
    price += itemPrice;
    // check if the item is add for the first time or not
    if (!cart[itemName]) cart[itemName] = { count: 1, price: itemPrice };
    else ++cart[itemName].count;
    ++cart.count; // add extra item to the cart
    // update the localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", price);
    // Update number of item in the cart in the navbar
    cartCount.innerHTML = cart.count;
    if (cartCost) cartCost.innerHTML = `<strong>Cost</strong>: $${price}`;
  });
}
