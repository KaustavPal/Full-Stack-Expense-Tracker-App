const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/epense");

router.get("/expense", expenseController.getMainPage);

router.post("/expense", expenseController.addExpenses);

router.get("/expense/get-all-expenses", expenseController.getAllExpenses);

router.get("/expense/get-expense/:id", expenseController.getExpense);

router.delete("/expense/delete/:id", expenseController.deleteExpense);

router.put("/expense/edit-expense/:id", expenseController.editExpense);

module.exports = router;
