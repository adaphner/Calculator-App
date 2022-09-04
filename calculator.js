// Creating Calculator App - Using JS modular design pattern.
function Calculator(output) {

    // private members or properties
    let outputValues = output;
    let currentValue = '';
    let temp = '';
    let operation = null;

    // public methods
    return {
        appendNumber(input) {
            if (currentValue.length === 26) return;
            if (input === '±') return;
            if (input === '.' && currentValue.includes('.')) return;
            currentValue += input;
        },
        updateDisplay() {
            if (currentValue === undefined || isNaN(currentValue) || temp === undefined) return;
            outputValues.innerText = currentValue;
            if (operation) {
                outputValues.innerText = `${temp} ${operation} ${currentValue}`
            }
            if (!currentValue && !temp) outputValues.innerText = 0;
        },
        chooseOperation(input) {
            if (!currentValue) return;
            if (temp) this.compute();
            operation = input;
            temp = currentValue;
            currentValue = '';
        },
        compute() {
            if (!currentValue || !temp) return;
            let floatOne = parseFloat(temp);
            let floatTwo = parseFloat(currentValue);
            let result;

            switch (operation) {
                case '+':
                    result = floatOne + floatTwo;
                    break;
                case '-':
                    result = floatOne - floatTwo;
                    break;
                case '×':
                    result = floatOne * floatTwo;
                    break;
                case '÷':
                    result = floatOne / floatTwo;
                    break;
                case '%':
                    result = floatOne % floatTwo;
                    break;
            }
            currentValue = result.toString();
            temp = '';
            operation = null
        },
        clear() {
            currentValue = '';
            temp = '';
            operation = null;
        },
        delete() {
            currentValue = currentValue.slice(0, -1);
        }
    }
}

function calculatorDriver() {

    // instantiating a calculator object to gain access to the Calculator function's private methods
    const calculator = Calculator(document.getElementById('calculator-total'));

    document.querySelectorAll('.buttons').forEach((button) => button.addEventListener('click', e => {
        const val = e.target.innerText;
        calculator.appendNumber(val);
        calculator.updateDisplay();
    }));

    document.querySelectorAll('.btn-operation').forEach((btn) => btn.addEventListener('click', e => {
        const val = e.target.innerText;
        calculator.chooseOperation(val);
        calculator.updateDisplay();
    }));

    document.getElementById('clear-btn').addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });
    document.getElementById('delete-btn').addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });
    document.getElementById('equal-btn').addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });
}
calculatorDriver();

// Thank you for visiting my github page.