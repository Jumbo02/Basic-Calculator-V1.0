class Calculator{
    constructor(peviousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement        
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    //clear the calculator input
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    //delete the current operand
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //select the current number
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
    }

    //choose operations (* / + -) 
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current    
                break
            default:
                return
        }        
        this.currentOperand = computation        
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        //give the number a comma after three digts 
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
    //update the ui
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
          }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//create a new calculator class
const calculator= new Calculator(previousOperandTextElement, currentOperandTextElement);

//loop over the button clicked and update the UI(for numbers)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
    })
});

//loop over the button clicked and update the UI(for operations)
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
         calculator.chooseOperation(button.innerText)
         calculator.updateDisplay()
    })
});

//equal button
equalButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
