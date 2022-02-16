const errorTextField = document.getElementById('error-msg');

// function for get input value
function getInputValue(id) {
    const inputField = document.getElementById(id + '-input-field');
    if (inputField.value == "") {
        errorTextField.innerText = 'Field must not be empty';
    } else if (isNaN(inputField.value)) {
        errorTextField.innerText = 'Please, Enter numeric value';
    } else if (inputField.value < 0) {
        errorTextField.innerText = 'Please, Enter any positive numeric value';
    } else {
        const inputValue = inputField.value;
        return inputValue;
    }
}

// function for calculating balance and expenses
function calculate() {
    const incomeInputValue = parseFloat(getInputValue('income'));
    const foodInputValue = parseFloat(getInputValue('food'));
    const rentInputValue = parseFloat(getInputValue('rent'));
    const clothesInputValue = parseFloat(getInputValue('clothes'));
    const totalExpenses = foodInputValue + rentInputValue + clothesInputValue;
    if (!isNaN(totalExpenses)) {
        if (incomeInputValue >= totalExpenses) {
            const balance = incomeInputValue - totalExpenses;
            document.getElementById('total-expenses').innerText = totalExpenses;
            document.getElementById('balance').innerText = balance;
            errorTextField.innerText = '';
            return balance;
        } else {
            errorTextField.innerText = 'Your expenses must be less than your income';
        }
    }
}

// function for calculate saving money
document.getElementById('save-btn').addEventListener('click', function () {
    const saveMoneyPercentageValue = parseFloat(getInputValue('money-save'));
    if (!isNaN(saveMoneyPercentageValue)) {
        const incomeInputValue = parseFloat(getInputValue('income'));
        const savingAmount = (saveMoneyPercentageValue * incomeInputValue) / 100;
        const balance = parseFloat(calculate());
        if (savingAmount < balance) {
            document.getElementById('saving-amount').innerText = savingAmount.toFixed(2);
            const remainingBalance = balance - savingAmount;
            document.getElementById('remaining-balance').innerText = remainingBalance.toFixed(2);
        } else {
            errorTextField.innerText = "You don't have enough money to save " + saveMoneyPercentageValue + "% of your income.";
        }
    }
})