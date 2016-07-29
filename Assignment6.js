
/*----------------------------------------------
    Show Main Section
------------------------------------------------*/

startOrder_Btn.addEventListener('click', showMainSection, false);

function showMainSection() {
    main.style.display = 'block';

}

/*----------------------------------------------
   Show 'Other' option for Address Type
------------------------------------------------*/

addressType.addEventListener('change', showOtherAddressType, false);

function showOtherAddressType() {

    if (addressType.value === 'other'){
        otherBox.classList.remove('hidethis');
    }else{
        otherBox.classList.add('hidethis');
    }
}

/*----------------------------------------------
 Fill Billing Information the Same as Delivery Information
------------------------------------------------*/

function fillSameasDelivery() {

    if (sameAsDelivery_CB.checked === true) {
        document.form.bill_name.value = document.form.name.value;
        document.form.bill_street_address.value = document.form.delivery_street_address.value;
        document.form.bill_optional_apt.value = document.form.delivery_optional_apt.value;
        document.form.bill_city.value = document.form.delivery_city.value;
        document.form.bill_state.value = document.form.delivery_state.value;
        document.form.bill_zip.value = document.form.delivery_zip.value;
    }

    if (sameAsDelivery_CB.checked === false) {
        document.form.bill_name.value = "";
        document.form.bill_street_address.value = "";
        document.form.bill_optional_apt.value = "";
        document.form.bill_city.value = "";
        document.form.bill_state.value = "";
        document.form.bill_zip.value = "";
    }
}

sameAsDelivery_CB.addEventListener("change", fillSameasDelivery, false);

/*----------------------------------------------
    Select Dough Type and Available Pizza Sizes
------------------------------------------------*/

var handTossedPrices = {
    Small: 9.99,
    Medium: 12.99,
    Large: 14.99
};

var thinCrustPrices = {
    Medium: 11.99,
    Large: 13.99
};

var newYorkPrices = {
    Large: 9.99,
    XL: 19.99
};

var glutenFreePrices = {
    Small: 10.99
};


function showPizzaSizes() {

    var property,
        elemento,
        opt;
    pizzaSizes_Div.style.display = "block";

    function showCheeseSauceToppings() {
        cheese_Div.style.display = "block";
        sauce_Div.style.display = "block";
        toppings_Div.style.display = "block";
    }

    pizzaSizes_Select.addEventListener("click", showCheeseSauceToppings, false);

    if (pizzaSizes_Select.childElementCount === 1) {
        if (document.form.dough.value === "hand tossed") {

            Object.getOwnPropertyNames(handTossedPrices).forEach(function (val, obj) {
                elemento = document.createElement("option");
                elemento.textContent = val + " ($" + handTossedPrices[val] + ")";
                elemento.value = handTossedPrices[val];
                pizzaSizes_Select.appendChild(elemento);
            });

        } else if (document.form.dough.value === "thin crust") {
            Object.getOwnPropertyNames(thinCrustPrices).forEach(function (val, obj) {
                elemento = document.createElement("option");
                elemento.textContent = val + " ($" + thinCrustPrices[val] + ")";
                elemento.value = thinCrustPrices[val];
                pizzaSizes_Select.appendChild(elemento);
            });

        } else if (document.form.dough.value === "new york style") {
            Object.getOwnPropertyNames(newYorkPrices).forEach(function (val, obj) {
                elemento = document.createElement("option");
                elemento.textContent = val + " ($" + newYorkPrices[val] + ")";
                elemento.value = newYorkPrices[val];
                pizzaSizes_Select.appendChild(elemento);
            });

        } else if (document.form.dough.value === "gluten free") {
            Object.getOwnPropertyNames(glutenFreePrices).forEach(function (val, obj) {
                elemento = document.createElement("option");
                elemento.textContent = val + " ($" + glutenFreePrices[val] + ")";
                elemento.value = glutenFreePrices[val];
                pizzaSizes_Select.appendChild(elemento);
            });
        }
    } else {
        pizzaSizes_Select.removeChild(pizzaSizes_Select.childNodes[2]);
        showPizzaSizes();
    }

}

doughType.addEventListener("click", showPizzaSizes, false);

/*----------------------------------------------
    Delivery and Build Your Order Validation
------------------------------------------------*/

function formValidation() {

    var regName = /^[0-9]/g,
        regState = /^([a-zA-Z]){2}$/,
        regZip = /^[0-9]{5}(?:-[0-9 ]{4})?$/,
        regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
        regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        i,
        validDough = false,
        doughRadios = document.getElementsByName("dough");

    if (document.form.name.value.length === 0 || regName.test(document.form.name.value) === true) {
        window.console.log("Error in name!");
        document.form.name.focus();
        document.form.name.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.name.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.addtype.value === "other" && document.form.other.value.length === 0) {
        window.console.log("Error in Address Type!");
        document.form.addtype.focus();
        document.form.other.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.other.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.delivery_street_address.value.length === 0) {
        window.console.log("Error in Street Address!");
        document.form.delivery_street_address.focus();
        document.form.delivery_street_address.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.delivery_street_address.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.delivery_city.value.length === 0) {
        window.console.log("Error in City");
        document.form.delivery_city.focus();
        document.form.delivery_city.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.delivery_city.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.delivery_state.value.length === 0 || regState.test(document.form.delivery_state.value) === false) {
        window.console.log(document.form.delivery_state.value);
        window.console.log("Error in State");
        document.form.delivery_state.focus();
        document.form.delivery_state.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.delivery_state.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.delivery_zip.value.length === 0 || regZip.test(document.form.delivery_zip.value) === false) {
        window.console.log("Error in Zip");
        document.form.delivery_zip.focus();
        document.form.delivery_zip.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.delivery_zip.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.phone.value.length === 0 || regPhone.test(document.form.phone.value) === false) {
        window.console.log("Error in Phone");
        document.form.phone.focus();
        document.form.phone.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.phone.style.backgroundColor = "#FFFFFF";
    }

    if (document.form.email.value.length === 0 || regEmail.test(document.form.email.value) === false) {
        window.console.log("Error in Email");
        document.form.email.focus();
        document.form.email.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.email.style.backgroundColor = "#FFFFFF";
    }

    for (i = 0; i < doughRadios.length; i++) {
        if (doughRadios[i].checked === true && !validDough) {
            validDough = true;
        }
    }

    if (!validDough) {
        window.alert("Please pick a dough option");
        return false;
    }

    return true;
}

/*----------------------------------------------
    Billing Information Validation
------------------------------------------------*/

function billingValidation() {

    var regName = /^[0-9]/g,
        regState = /^([a-zA-Z]){2}$/,
        regZip = /^[0-9]{5}(?:-[0-9 ]{4})?$/,
        regCVC = /^[0-9]{3,4}$/,
        elemento,
        cCNum,
        currentDate,
        currentMonth,
        expirationMonth,
        currentYear,
        expirationYear;

    if (sameAsDelivery_CB.checked !== true) {
        if (document.form.bill_name.value.length === 0 || regName.test(document.form.bill_name.value) === true) {
            window.console.log("Error in billing name!");
            document.form.bill_name.style.backgroundColor = "#FF9999";
            return false;
        } else {
            document.form.bill_name.style.backgroundColor = "#FFFFFF";
        }

        if (document.form.bill_street_address.value.length === 0) {
            window.console.log("Error in billing street address!");
            document.form.bill_street_address.style.backgroundColor = "#FF9999";
            return false;
        } else {
            document.form.bill_street_address.style.backgroundColor = "#FFFFFF";
        }

        if (document.form.bill_city.value.length === 0) {
            window.console.log("Error in billing city");
            document.form.bill_city.style.backgroundColor = "#FF9999";
            return false;
        } else {
            document.form.bill_city.style.backgroundColor = "#FFFFFF";
        }

        if (document.form.bill_state.value.length === 0 || regState.test(document.form.bill_state.value) === false) {
            window.console.log("Error in billing state");
            document.form.bill_state.focus();
            document.form.bill_state.style.backgroundColor = "#FF9999";
            return false;
        } else {
            document.form.bill_state.style.backgroundColor = "#FFFFFF";
        }

        if (document.form.bill_zip.value.length === 0 || regZip.test(document.form.bill_zip.value) === false) {
            window.console.log("Error in billing zip");
            document.form.bill_zip.focus();
            document.form.bill_zip.style.backgroundColor = "#FF9999";
            return false;
        } else {
            document.form.bill_zip.style.backgroundColor = "#FFFFFF";
        }
    }

    /*Credit Card Number Validation - Empty Textbox*/

    if (document.form.cc_number.value.length === 0) {
        elemento = document.createElement("option");
        elemento.textContent = "Please enter a CC Number";
        elemento.value = "error";
        cc_number_Div.appendChild(elemento);
        document.form.cc_number.focus();
        document.form.cc_number.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.cc_number.style.backgroundColor = "#FFFFFF";
    }

    cCNum = document.form.cc_number.value;

    /*CVC validation*/

    if (document.form.cvc.value.length === 0 || regCVC.test(document.form.cvc.value) === false) {
        window.console.log("Error in CVC code");
        document.form.cvc.focus();
        document.form.cvc.style.backgroundColor = "#FF9999";
        return false;
    } else {
        document.form.cvc.style.backgroundColor = "#FFFFFF";
    }

    /*CC Expiration Date Validation*/

    currentDate = new Date();
    currentMonth = currentDate.getMonth() + 1;
    expirationMonth = parseInt(document.form.bill_month.value, 10);
    currentYear = currentDate.getFullYear();
    expirationYear = parseInt(document.form.bill_year.value, 10);

    if (expirationYear === currentYear || expirationYear <= currentYear) {
        if (expirationMonth <= currentMonth) {
            window.alert("Your card is expired. Please put in another card.");
            return false;
        } else if (expirationMonth > currentMonth) {
            window.console.log("Card expiration is valid");
        }
    } else if (expirationYear >= currentYear) {
        window.console.log("Card expiration is valid");
    }

    main.style.display = "none";

    endText_Div.style.display = "block";
    console.log("Order Placed!");
}

placeOrder_Btn.addEventListener("click", billingValidation, false);

/*----------------------------------------------
        Extra Credit Card Validation
------------------------------------------------*/


/*----------------------------------------------
        Build Your Order Confirmation
------------------------------------------------*/

function finishedBuildingPizza() {

    var result,
        conBox = window.confirm('Press "OK" if you\'re finished building your pizza');

    if (conBox === false) {
        formValidation();
    } else if (conBox === true) {
        result = formValidation();
        if (result === true) {
            billingInfo_Div.style.display = "block";
            placeOrder_Btn.style.display = "block";
            finPizzaBuild_Div.setAttribute("class", "mainhide");
        }
    }
}

finPizzaBuild_Btn.addEventListener("click", finishedBuildingPizza, false);

/*----------------------------------------------
        Calculate Total Cost
------------------------------------------------*/

function calcTotal() {

    var toppingChecks = document.getElementsByName("toppings"),
        i,
        doughType = document.form.pizzaSizes_Select.value,
        totalCalc = 0.00;

    totalCalc += parseFloat(doughType);

    if (document.form.cheese.value === "cheese-extra") {totalCalc += 2.99; }
    if (document.form.cheese.value === "cheese-double") {totalCalc += 3.99; }
    if (document.form.sauce.value === "sauce-hearty") {totalCalc += 0.99; }
    if (document.form.sauce.value === "sauce-bbq") {totalCalc += 1.99; }

    for (i = 0; i < toppingChecks.length; i++) {
        if (toppingChecks[i].checked === true) {
            totalCalc += 0.99;
        }
    }

    total.value = totalCalc.toFixed(2).toString();
}

buildYourOrder_Div.addEventListener("change", calcTotal, false);
