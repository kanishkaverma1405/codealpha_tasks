const display = document.getElementById('display');

function append(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

function calculate() {
    try {
        // Evaluate the mathematical expression
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((key >= 0 && key <= 9) || ['+', '-', '*', '/', '.'].includes(key)) {
        append(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});