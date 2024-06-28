/**
 * Wrapper around document.querySelector and document.querySelectorAll
 *
 * @param {string} query - the query for document.querySelector or document.querySelectorAll
 * @return {HTMLElement || NodeList} the result
 */
const q = (query) => document.querySelector(query);
const qq = (query) => document.querySelectorAll(query);
/**
 * Get offset possition of the element
 *

/**
 * update navbar's box position
 *
 * @param {HTMLElement} elm - the hoverd or the active link in the navbar
 */
const boxLink = (elm) => {
  box.style.width = `${elm.clientWidth}px`;
  box.style.height = `${elm.clientHeight}px`;
  box.style.left = `${window.innerWidth > 481 ? elm.offsetLeft : -481}px`;
};

/**
 * update navbar's box position
 *
 * @param {htmlelement} parelm - the parent element for the ripple
 */
const createRipple = (parElm) => {
  const newRipple = document.createElement("span");
  newRipple.classList.add("ripple__inner");
  parElm.appendChild(newRipple);
};

/**
 * A template for list elements inside cart list
 *
 * @param {string} name - the name of the product
 * @param {Number} num - the amount of that product
 * @return {HTMLElement} the new element
 */
const cartListItemTemplate = (name, num) => {
	let tmpElm = document.createElement("li");
	tmpElm.classList.add("main--order__cart__item");
	tmpElm.innerHTML = `
  <p>${name}</p>
  <p>
    <span class="btn btn--text ripple__wrapper main--order__cart__count--dec">
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 12H6"
        />
      </svg>
    </span>
    <span>${num}</span>
    <span class="btn btn--text ripple__wrapper main--order__cart__count--inc">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </span>
  </p>`;
	return tmpElm;
}
