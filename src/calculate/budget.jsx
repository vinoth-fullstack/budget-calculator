import React, { useState } from 'react';

const Budget = () => {
  const [budget, setBudget] = useState(2000);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', cost: '' });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  const remainingBudget = budget - totalSpent;

  const handleAddExpense = () => {
    const expenseCost = parseInt(newExpense.cost);
    if (newExpense.name === '' || newExpense.cost === '') {
      setErrorMessage('Please enter both name and cost.');
      return;
    }
    if (isNaN(expenseCost) || expenseCost < 0) {
      setErrorMessage('Cost must be a positive number.');
      return;
    }

    setExpenses([...expenses, { ...newExpense, cost: expenseCost }]);
    setNewExpense({ name: '', cost: '' });
    setErrorMessage('');
  };

  const handleRemoveExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const handleEditBudget = () => {
    setIsEditingBudget(!isEditingBudget);
  };

  const handleBudgetChange = (e) => {
    setBudget(parseInt(e.target.value));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1>My Budget Planner</h1>
      <div className="budget-info">
        <div className="budget-color">
          Budget: ${isEditingBudget ? (
            <input
              type="number"
              value={budget}
              onChange={handleBudgetChange}
            />
          ) : (
            <span>{budget}</span>
          )}
          <button className="btn" onClick={handleEditBudget}>{isEditingBudget ? 'Save' : 'Edit'}</button>
        </div>
        <div className={`remaining-budget ${remainingBudget <= 0 ? 'over-budget' : ''}`}>
          Remaining: ${remainingBudget}
        </div>
        <div className="spent">Spent so far: ${totalSpent}</div>
      </div>
      <div className="adds-expense">
        <div>
          <h1>Expenses</h1>
          <input type='text' placeholder='Type to search' value={searchQuery} onChange={handleSearchInputChange} />
        </div>
      </div>
      <div className="expenses">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense, index) => (
            <div className="around" key={index}>
              <div className="soul">{expense.name}</div>
              <div className="cost">${expense.cost}</div>
              <button className="close" onClick={() => handleRemoveExpense(index)}>x</button>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
      <div className='add'>
        <h1>Add Expense</h1>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="add-expense">
        <input
          type="text"
          placeholder="Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newExpense.cost}
          onChange={(e) => setNewExpense({ ...newExpense, cost: e.target.value })}
        />
        <button className="btn" onClick={handleAddExpense}>Save</button>
      </div>

      
    </div>
  );
};

export default Budget;
