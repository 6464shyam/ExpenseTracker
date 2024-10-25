let expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    const expense = { description, amount, category };
    expenses.push(expense);
    updateExpenses();
    saveToLocal();
    this.reset();
});

function updateExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;
        const item = document.createElement('li');
        item.classList.add('expense-item');
        item.innerHTML = `
            ${expense.description} - ₹${expense.amount.toFixed(2)} <span>${expense.category}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(item);
    });

    document.getElementById('totalExpense').innerText = total.toFixed(2); // Update total at the end of the list
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenses();
    saveToLocal();
}

function saveToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadFromLocal() {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
        updateExpenses();
    }
}

window.onload = loadFromLocal;
