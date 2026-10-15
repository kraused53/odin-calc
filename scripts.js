// Calculator variables
let curr = '';
let prev = '';
let op = '';

// Fetch all number buttons
const zeroButton = document.getElementById('zero-button');
const oneButton = document.getElementById('one-button');
const twoButton = document.getElementById('two-button');
const threeButton = document.getElementById('three-button');
const fourButton = document.getElementById('four-button');
const fiveButton = document.getElementById('five-button');
const sixButton = document.getElementById('six-button');
const sevenButton = document.getElementById('seven-button');
const eightButton = document.getElementById('eight-button');
const nineButton = document.getElementById('nine-button');

// Fetch Control buttons
const decimalButton = document.getElementById('decimal-button');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const addButton = document.getElementById('plus-button');
const subtractButton = document.getElementById('subtract-button');
const equalButton = document.getElementById('equals-button');
const divideButton = document.getElementById('divide-button');
const multiplyButton = document.getElementById('multiply-button');

// Link number buttons to functions
zeroButton.addEventListener('click', () => appendNumber('0') );
oneButton.addEventListener('click', () => appendNumber('1') );
twoButton.addEventListener('click', () => appendNumber('2') );
threeButton.addEventListener('click', () => appendNumber('3') );
fourButton.addEventListener('click', () => appendNumber('4') );
fiveButton.addEventListener('click', () => appendNumber('5') );
sixButton.addEventListener('click', () => appendNumber('6') );
sevenButton.addEventListener('click', () => appendNumber('7') );
eightButton.addEventListener('click', () => appendNumber('8') );
nineButton.addEventListener('click', () => appendNumber('9') );

// Link control butons to functions
decimalButton.addEventListener('click', () => processControl('decimal') );
clearButton.addEventListener('click', () => processControl('clear') );
deleteButton.addEventListener('click', () => processControl('delete') );
addButton.addEventListener('click', () => processControl('add') );
subtractButton.addEventListener('click', () => processControl('subtract') );
equalButton.addEventListener('click', () => processControl('equal') );
divideButton.addEventListener('click', () => processControl('divide') );
multiplyButton.addEventListener('click', () => processControl('multiply') );

// Fetch screen rows
const currRow = document.getElementById('curr-row');
const prevRow = document.getElementById('prev-row');

function appendNumber(number) {
    if(curr === 'ERROR') {
        curr = '';
        updateScreen();
    }

    if(curr === '0') {
        if(number === '0') {
            return;
        }
        curr = '';
    }
    curr += number;
    currRow.textContent = curr;
}

function processControl(control) {
    if(curr === 'ERROR') {
        curr = '';
    }

    switch(control) {
        case 'decimal': processDecimal(); break;
        case 'clear': processClear(); break;
        case 'delete': processDelete(); break;
        case 'add': processOperator('+'); break;
        case 'subtract': processOperator('-'); break;
        case 'equal': processEqual(); break;
        case 'divide': processOperator('/'); break;
        case 'multiply': processOperator('*'); break;
        default:
            throw new Error(`Unknown control: ${control}`);
    }
}

function processDecimal() {
    if (!curr.includes('.')) {
        if(curr === '') {
            curr = '0';
        }
        
        curr += '.';
        currRow.textContent = curr;
    }
}

function processClear() {
    curr = '';
    prev = '';
    op = '';

    updateScreen();
}

function processDelete() {
    if(curr === '') {
        return;
    }

    curr = curr.substring(0, curr.length - 1)
    currRow.textContent = curr;

}

// Arithmetic logic
function calculate(firstOperand, secondOperand, operation) {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    switch(operation) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '/':
            if(second === 0) {
                throw new Error('Cannot divide by zero');
            }
            return first / second;
        case '*':
            return first * second;
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}

// Button logic
function processOperator(operation) {
    if(curr === '') {
        // Allow changing the pending operator.
        if(prev !== '') {
            op = operation;
            updateScreen();
        }
        return;
    }

    if(prev !== '' && op !== '') {
        // Calculate the pending operation.
        try {
            prev = String(calculate(prev, curr, op));
        }catch(error) {
            makeError();
            return;
        }
    } else {
        // Store the first operand.
        prev = curr;
    }

    // Store the new pending operation.
    op = operation;
    curr = '';

    updateScreen();
}

function processEqual() {
    if(prev === '' || curr === '' || op === '') {
        return;
    }

    try {
        // Calculate the pending operation.
        curr = String(calculate(prev, curr, op));

        // Clear the pending operation.
        prev = '';
        op = '';
    }catch(error) {
        makeError();
    }

    updateScreen();
}

// Screen logic
function makeError() {
    prev = '';
    curr = 'ERROR';
    op = '';

    updateScreen();
}

function updateScreen() {
    if(prev !== '') {
        if(op !== '') {
            prevRow.textContent = prev + ' ' + op;
        }else {
            prevRow.textContent = prev;
        }
    }else {
        prevRow.textContent = prev;
    }
    
    currRow.textContent = curr;
}