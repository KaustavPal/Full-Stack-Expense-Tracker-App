const path = require("path");
const Expense = require("../models/expense");

exports.getMainPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addExpenses = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const catagory = req.body.catagory;

    await Expense.create({
      amount: amount,
      description: description,
      catagory: catagory,
    });
    console.log("New Expense Added");
    res.status(201).json({ message: "New Expense Added Successfully" });
  } catch (err) {
    console.log("Error While Adding New Expense!!!! ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllExpenses = async (req, res, net) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    console.log("Error While Fetching Expenses!!!! ", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.getExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    const expenseDetails = await Expense.findByPk(id);
    res.json(expenseDetails);
  } catch (err) {
    console.log(
      `Error While Fetching Expense Details By ID - ${id} !!!! ${err}`
    );
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.editExpense = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const catagory = req.body.catagory;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Expense Details Not Found!!!!" });
    }

    expense.amount = amount;
    expense.description = description;
    expense.catagory = catagory;

    await expense.save();
    console.log("Expense Details Updated");
    res.status(200).json({ message: "Expense Details Updated Successfully" });
  } catch (err) {
    console.log("Error While Updating Expense Details!!!! ", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    await Expense.destroy({
      where: {
        id: expenseId,
      },
    });
    console.log("Expense Details Deleted");
    res.sendStatus(204);
  } catch (err) {
    console.log(
      `Error While Deleting Expense Details by Id - ${expenseId} !!!! ${err}`
    );
    res.status(500).json({ err: "Internal server error" });
  }
};
