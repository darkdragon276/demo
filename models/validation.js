var Validate = function () {

    this.isRegex = function (regex, selector, ...string) {
        let element_e = document.querySelector(selector);
        let closest_e = element_e.closest("div").querySelector(".check");
        console.log(element_e);
        console.log(closest_e);
        if (!regex.test(element_e.value)) {
            for (let i = 0; i < string.length; i++) {
                closest_e.innerHTML += string[i];
            }
            return null;
        }
        closest_e.innerHTML = "";
        return element_e.value;
    }

    this.isEmpty = function (selector, placeHolder) {
        // let emptyRegex = /^[\s]*$/;
        // let emptyRegex = " ";
        return this.isEmpty(emptyRegex, selector, placeHolder, "is empty");
    }

    this.isEmail = function (selector, placeHolder) {   
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return this.isRegex(emailRegex, selector, placeHolder, "is not email");
    }
    
    this.isNumber = function (selector, placeHolder) {
        let numberRegex = /^\d+$/g;
        return this.isRegex(numberRegex, selector, placeHolder, "is not number");
    }

    this.inRange = function(selector, min, max, ...string) {
        let element_e = document.querySelector(selector);
        let elementValue_f = parseFloat(element_e.value);
        let closest_e = element_e.closest("div").querySelector(".check");
        console.log(element_e);
        console.log(closest_e);
        if (!(elementValue_f >= min || elementValue_f <= max)) {
            for (let i = 0; i < string.length; i++) {
                closest_e.innerHTML += string[i];
            }
            return null;
        }
        closest_e.innerHTML = "";
        return elementValue_f;
    }
}