const amountInput = document.querySelector("#amount");
const descriptionInput = document.querySelector("#description");
const catagoryInput = document.querySelector("#catagory");
const saveBtn = document.querySelector("#save-btn");
const updateBtn = document.querySelector("#update-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const tableBody = document.querySelector("#table-body");
const message = document.querySelector("#msg");
let updateId = null;

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const catagory = catagoryInput.value;

  try {
    if (amount && description && catagory) {
      await axios.post("http://localhost:3000/user/expense", {
        amount,
        description,
        catagory,
      });

      amountInput.value = "";
      descriptionInput.value = "";
      catagoryInput.value = "";

      await getAllExpenses();
    }
  } catch (err) {
    console.error("Error While Adding Expense Details: ", err);
    message.innerText = "Error While Adding Expense Details!!!!";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
  }
});

async function editExpense(id) {
  try {
    let editId = id;
    updateId = id;
    const res = await axios.get(
      `http://localhost:3000/user/expense/get-expense/${editId}`
    );

    const expenseToEdit = res.data;

    if (!expenseToEdit) {
      console.error("Error: Expense Details Not Found");
      message.innerText = "Error: Expense Details Not Found!!!!";
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 4000);
      return;
    }

    amountInput.value = expenseToEdit.amount;
    descriptionInput.value = expenseToEdit.description;
    catagoryInput.value = expenseToEdit.catagory;

    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
  } catch (err) {
    console.log(err);
  }
}

updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amountToUpdate = amountInput.value;
  const descriptionToUpdate = descriptionInput.value;
  const catagoryToUpdate = catagoryInput.value;

  try {
    const res = await axios.get(
      `http://localhost:3000/user/expense/get-expense/${updateId}`
    );

    if (res.data) {
      await axios.put(
        `http://localhost:3000/user/expense/edit-expense/${updateId}`,
        {
          amount: amountToUpdate,
          description: descriptionToUpdate,
          catagory: catagoryToUpdate,
        }
      );

      amountInput.value = "";
      descriptionInput.value = "";
      catagoryInput.value = "";

      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      saveBtn.style.display = "inline-block";

      updateId = null;

      await getAllExpenses();
    } else {
      console.error("Error: Expense Details Not Found");
      message.innerText = "Error: Expense Details Not Found!!!!";
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 4000);

      amountInput.value = "";
      descriptionInput.value = "";
      catagoryInput.value = "";

      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    }
  } catch (err) {
    console.error("Error While Updating Expense Details: ", err);
    message.innerText = "Error While Updating Expense Details!!!!";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
  }
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  amountInput.value = "";
  descriptionInput.value = "";
  catagoryInput.value = "";

  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  saveBtn.style.display = "inline-block";

  updateId = null;
});

function showExpenses(response) {
  tableBody.innerHTML = "";
  let html = "";
  response.forEach((expense) => {
    const deleteBtnId = `delete-btn-${expense.id}`;
    const editBtnId = `edit-btn-${expense.id}`;
    html =
      html +
      `<tr>
        <td>${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.catagory}</td>
        <td><button id="${deleteBtnId}" class="delete-btn btn btn-danger" onclick="deleteExpense('${expense.id}')">Delete Expense</button>
        <button id="${editBtnId}" class="edit-btn btn btn-primary" onclick="editExpense('${expense.id}')">Edit Expense</button></td>
      </tr>`;
  });
  tableBody.innerHTML = html;
}

async function deleteExpense(id) {
  try {
    await axios.delete(`http://localhost:3000/user/expense/delete/${id}`);
    await getAllExpenses();
  } catch (err) {
    console.log(err);
    message.innerText = "Error While Deleting Expense Details!!!!";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
  }
}

async function getAllExpenses() {
  try {
    const res = await axios.get(
      "http://localhost:3000/user/expense/get-all-expenses"
    );

    const response = res.data;
    showExpenses(response);
  } catch (err) {
    console.log("Error While Fetching Expense Details!!!! ", err);
    message.innerText = "Error While Fetching Expense Details!!!!";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 4000);
  }
}

window.addEventListener("DOMContentLoaded", getAllExpenses);
