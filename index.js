document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionTypeSelect = document.getElementById('transaction-type');
    const transactionList = document.getElementById('transaction-list');
    const totalBalance = document.getElementById('total-balance');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function renderTransactions() {
        transactionList.innerHTML = '';
        let balance = 0;
        transactions.forEach((transaction, index) => {
            const li = document.createElement('li');
            const className = transaction.type === 'add' ? 'add-transaction' : 'subtract-transaction';
            li.classList.add(className);
            li.innerHTML = `
                <span>${transaction.description}</span>
                <span>LKR ${transaction.amount.toFixed(2)}</span>
                <button class="remove" onclick="removeTransaction(${index})">Remove</button>
            `;
            transactionList.appendChild(li);
            if (transaction.type === 'add') {
                balance += parseFloat(transaction.amount);
            } else if (transaction.type === 'subtract') {
                balance -= parseFloat(transaction.amount);
            }
        });
        totalBalance.textContent = `LKR ${balance.toFixed(2)}`;
    }

    function addTransaction(description, amount, type) {
        transactions.push({ description, amount, type });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    window.removeTransaction = function(index) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
        const type = transactionTypeSelect.value;

        if (description && !isNaN(amount)) {
            addTransaction(description, amount, type);
            descriptionInput.value = '';
            amountInput.value = '';
        }
    });

    renderTransactions();
});


