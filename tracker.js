const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const textValue = text.value.trim();
  const amountValue = amount.value.trim();

  if (textValue === '' || amountValue === '') {
    alert('Please enter text and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textValue,
    amount: parseFloat(amountValue)
  };

  transactions.push(transaction);
  addTransactionToDOM(transaction);
  updateValues();

  text.value = '';
  amount.value = '';
});

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const className = transaction.amount < 0 ? 'minus' : 'plus';

  const item = document.createElement('li');
  item.classList.add(className);
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">❌</button>
  `;
  list.appendChild(item);
}

function deleteTransaction(id) {
  transactions = transactions.filter(function(t) {
    return t.id !== id;
  });

  list.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

function updateValues() {
  const amounts = transactions.map(function(t) {
    return t.amount;
  });

  const total = amounts.reduce(function(acc, val) {
    return acc + val;
  }, 0);

  const income = amounts.filter(function(val) {
    return val > 0;
  }).reduce(function(acc, val) {
    return acc + val;
  }, 0);

  const expense = amounts.filter(function(val) {
    return val < 0;
  }).reduce(function(acc, val) {
    return acc + val;
  }, 0) * -1;

  balance.innerText = '$' + total.toFixed(2);
  moneyPlus.innerText = '+$' + income.toFixed(2);
  moneyMinus.innerText = '-$' + expense.toFixed(2);
}
