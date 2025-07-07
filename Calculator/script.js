const display = document.getElementById("display")

function appendToDisplay(input) {
    display.value += input;
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay(){
    display.value = "";
}

function remove() {
    display.value = display.value.slice(0,-1)
}

function calculate() {
   
    try {
        display.value = (eval(display.value)* 100) / 100;
        display.scrollLeft = display.scrollWidth;
    }
    catch(error) {
        display.value = "Error"
    }
}
