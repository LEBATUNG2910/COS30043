cartCost.innerHTML = `<strong>Cost</strong>: $${price}`;

const checkoutMode = qq("input[name='Checkout Mode']")
let curCheckOutMode = "delivery";
const payMode = qq("input[name='Pay Mode']")
let curPayMode = "visa";
const copyDeliveryAddressToBillingAddress = q("#input__copy-delivery-to-billing");
const deliveryAddress = q("#input__delivery-address");
const billingAddress = q("#input__billing-address");
const contactNumber = q("#input__contact-number");
const email = q("#input__email");
const creditCard = q("#input__credit-card");
const form = q(".main--order__form__container");

// vietnamsese phone Regex
const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; 
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const visaRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegex = /^(?:5[1-5][0-9]{14})$/;
const amexpRegex = /^(?:3[47][0-9]{13})$/;

const checkDeliveryAddress = () => deliveryAddress.value.trim().length > 0;
const checkBillingAddress = () => billingAddress.value.trim().length > 0;
const checkContactNumber = () => contactNumber.value.trim().length > 0 && contactNumber.value.trim().match(phoneRegex);
const checkEmail = () => email.value.trim().length > 0 && email.value.trim().match(emailRegex);
const checkCreditCard = () => {
	let check = true;
	switch(curPayMode) {
		case "visa":
			check = creditCard.value.trim().match(visaRegex); 
			break;
		case "master":
			check = creditCard.value.trim().match(masterRegex); 
			break;
		case "American Express":
			check = creditCard.value.trim().match(amexpRegex); 
			break;
	}	
	return check;
}

// checking checkout mode
for (let mode of checkoutMode) {
	mode.addEventListener("input", () => {
		curCheckOutMode = mode.value;
		deliveryAddress.parentNode.style.display = mode.value === "delivery" ? "block" : "none";	
		billingAddress.parentNode.style.display = mode.value === "delivery" ? "block" : "none";	
	});
}

// checking pay mode
for (let mode of payMode) {
	mode.addEventListener("input", () => {
		curPayMode = mode.value;
		creditCard.parentNode.style.display = mode.value !== "pickup" ? "block" : "none";	
	});
}

// copying to billing 
deliveryAddress.addEventListener("input", () => {
	if (copyDeliveryAddressToBillingAddress.checked) billingAddress.value = deliveryAddress.value;
})

const validate = () => {
	let errMsg = "";
	if (curCheckOutMode === "delivery") {
		if (!checkDeliveryAddress()) {
			errMsg += "Please fill in the Delivery Address Fill\n";
			deliveryAddress.parentNode.classList.add("input__wrapper--error");
		}
		if (!checkBillingAddress()) {
			errMsg += "Please fill in the Billing Address Fill\n";
			billingAddress.parentNode.classList.add("input__wrapper--error");
		}
	}
	if (!checkContactNumber()) {
		errMsg += "Please recheck your Contact Number\n";
		contactNumber.parentNode.classList.add("input__wrapper--error");
	}
	if (!checkEmail()) {
		errMsg += "Please recheck your Email\n";
		email.parentNode.classList.add("input__wrapper--error");
	}
	if (curPayMode !== "pickup") {
		if (!checkCreditCard()) {
			errMsg += "Pleaes recheck your credit card option and its format";
			creditCard.parentNode.classList.add("input__wrapper--error");
		}
	}
	if (errMsg !== "") {
		alert(errMsg);
		return false;
	}
	return true;
}

// Init the cart list
for (let item in cart) {
  if (item !== "count") {
    const tmpElm = cartListItemTemplate(item, cart[item].count);
    // setting event click for inc, dec btns
    const tmpElmName = tmpElm.children[0].textContent;
    // del btn
    tmpElm.children[1].children[0].addEventListener("click", () => {
      if (cart[tmpElmName].count > 0) {
        --cart.count;
        tmpElm.children[1].children[1].innerHTML = --cart[tmpElmName].count;
        price -= cart[tmpElmName].price;
      }
      if (cart[tmpElmName].count === 0)
        tmpElm.children[1].children[0].classList.add("btn--disable");
      else tmpElm.children[1].children[0].classList.remove("btn--disable");
      cartCount.innerHTML = cart.count;
      if (cartCost) cartCost.innerHTML = `<strong>Cost</strong>: $${price}`;
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("price", price);
    });
    // inc btn
    tmpElm.children[1].children[2].addEventListener("click", () => {
      ++cart.count;
      tmpElm.children[1].children[1].innerHTML = ++cart[tmpElmName].count;
      price += cart[tmpElmName].price;
      if (cart[tmpElmName].count > 0)
        tmpElm.children[1].children[0].classList.remove("btn--disable");
      cartCount.innerHTML = cart.count;
      if (cartCost) cartCost.innerHTML = `<strong>Cost</strong>: $${price}`;
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("price", price);
    });
    cartList.appendChild(tmpElm);
  }
}

form.onsubmit = validate;
