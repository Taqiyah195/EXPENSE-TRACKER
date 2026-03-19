const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addBtn.addEventListener("click", addExpense);

function addExpense(){

let description = desc.value.trim();
let amt = parseFloat(amount.value);

if(description === "" || isNaN(amt) || amt <= 0){
alert("Please enter valid data");
return;
}

let expense = {
id: Date.now(),
description: description,
amount: amt
};

expenses.push(expense);

saveData();
renderExpenses();

desc.value="";
amount.value="";
}

function renderExpenses(){

list.innerHTML="";
let total = 0;

expenses.forEach(exp => {

total += exp.amount;

let li = document.createElement("li");

li.innerHTML = `
<span>${exp.description} - ₹${exp.amount}</span>
<button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
`;

list.appendChild(li);

});

totalDisplay.textContent = total;

}

function deleteExpense(id){

expenses = expenses.filter(exp => exp.id !== id);

saveData();
renderExpenses();

}
function saveData(){

localStorage.setItem("expenses", JSON.stringify(expenses));

}
renderExpenses();