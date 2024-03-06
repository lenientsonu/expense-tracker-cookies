document.addEventListener('DOMContentLoaded', (e) => {
    // Function to retrieve and print expense details from cookies
    function loadExpenseDetailsFromCookies() {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [key, value] = cookie.trim().split('=');
            if (key.startsWith('expense_')) {
                const expenseDetail = JSON.parse(decodeURIComponent(value));
                printHistory(expenseDetail);
            }
        });
    }

    loadExpenseDetailsFromCookies();
});

function onbuttonclick(e){
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    let expenseDetails = {
        'amount' : amount,
        'desc' : desc,
        'category' : category
    };

    console.log(expenseDetails);

    // Serialize expenseDetails
    const expenseDetails_serealized = encodeURIComponent(JSON.stringify(expenseDetails));

    // Set cookie
    document.cookie = `expense_${expenseDetails.amount}=${expenseDetails_serealized}`;

    printHistory(expenseDetails);
}

function printHistory(obj){
    const ul = document.getElementById('expense-list');
    const li = document.createElement('li');

    li.appendChild(document.createTextNode(`${obj.amount} - ${obj.category} - ${obj.desc}`));
    li.id = obj.amount;
    li.className = 'list-group-item';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm float-right delete';
    delBtn.appendChild(document.createTextNode('Delete'));

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    
    editBtn.addEventListener('click', (e)=>{
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.desc;
        document.getElementById('category').value = obj.category;
        li.remove();
    });

    delBtn.addEventListener('click', (e)=>{
        // To delete a cookie, set its expiration to a past date
        document.cookie = `expense_${obj.amount}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        li.remove();
    });

    ul.appendChild(li);
}
