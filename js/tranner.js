document.getElementById('numPersons').addEventListener('input', function () {
    const personsContainer = document.getElementById('personsContainer');
    personsContainer.innerHTML = '';
    const numPersons = this.value;

    for (let i = 1; i <= numPersons; i++) {
        const personDiv = document.createElement('div');
        personDiv.innerHTML = `
            <label for="personName${i}">Person ${i} Name:</label>
            <input type="text" id="personName${i}">
            <div id="expensesContainer${i}">
                <label for="personExpense${i}_1">Person ${i} Expense 1:</label>
                <input type="number" id="personExpense${i}_1" class="personExpense" step="0.01" oninput="updateRemainingAmount()">
            </div>
            <button onclick="addExpense(${i})">Add Expense</button>
        `;
        personsContainer.appendChild(personDiv);
    }
    updateRemainingAmount();
});

function addExpense(personId) {
    const expensesContainer = document.getElementById(`expensesContainer${personId}`);
    const expenseCount = expensesContainer.getElementsByClassName('personExpense').length + 1;

    const expenseDiv = document.createElement('div');
    expenseDiv.innerHTML = `
        <label for="personExpense${personId}_${expenseCount}">Person ${personId} Expense ${expenseCount}:</label>
        <input type="number" id="personExpense${personId}_${expenseCount}" class="personExpense" step="0.01" oninput="updateRemainingAmount()">
    `;
    expensesContainer.appendChild(expenseDiv);
    updateRemainingAmount();
}

function updateRemainingAmount() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value) || 0;
    const gst = parseFloat(document.getElementById('gst').value) || 0;
    const totalWithGst = totalAmount + gst;
    let totalSpent = 0;

    document.querySelectorAll('.personExpense').forEach(input => {
        const expense = parseFloat(input.value) || 0;
        totalSpent += expense;
    });

    const remainingAmount = totalWithGst - totalSpent;
    document.getElementById('totalAmountSpent').textContent = `Total Spent: ${totalSpent.toFixed(2)}, Remaining: ${remainingAmount.toFixed(2)}`;
}

function calculateExpenses() {
    const numPersons = document.getElementById('numPersons').value;
    const gst = parseFloat(document.getElementById('gst').value) || 0;
    const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = '';

    let totalSpent = 0;

    for (let i = 1; i <= numPersons; i++) {
        const personName = document.getElementById(`personName${i}`).value || `Person ${i}`;
        let personTotalExpense = 0;

        document.querySelectorAll(`#expensesContainer${i} .personExpense`).forEach(input => {
            const expense = parseFloat(input.value) || 0;
            personTotalExpense += expense;
        });

        const gstShare = gst / numPersons;
        totalSpent += personTotalExpense + gstShare;

        const row = resultTable.insertRow();
        row.insertCell(0).textContent = personName;
        row.insertCell(1).textContent = (personTotalExpense + gstShare).toFixed(2);
    }

    updateRemainingAmount();
}

function copyCSV() {
    const resultTable = document.getElementById('resultTable');
    let csvContent = '';

    for (let i = 0, row; row = resultTable.rows[i]; i++) {
        const rowData = [];
        for (let j = 0, col; col = row.cells[j]; j++) {
            rowData.push(col.textContent);
        }
        csvContent += rowData.join(',') + '\n';
    }

    const tempInput = document.createElement('textarea');
    tempInput.value = csvContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Data copied to clipboard in CSV format!');
}
