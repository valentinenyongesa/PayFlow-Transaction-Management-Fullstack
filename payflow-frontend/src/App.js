import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ description: '', amount: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/transactions/')
      .then(response => {
        // Ensure that amounts are converted to numbers when fetching
        const transactionsWithNumbers = response.data.map(transaction => ({
          ...transaction,
          amount: parseFloat(transaction.amount) // Convert to number
        }));
        setTransactions(transactionsWithNumbers);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount) // Ensure amount is a number
    };
    axios.post('http://127.0.0.1:8000/transactions/create/', newTransaction)
      .then(response => {
        setTransactions([...transactions, { ...response.data, amount: parseFloat(response.data.amount) }]);
        setFormData({ description: '', amount: '' }); // Clear the form after submission
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  return (
    <div className="App">
      {/* Heading */}
      <h1>PayFlow</h1>

      {/* Form container */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description" // Added ID for the label
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount" // Added ID for the label
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      {/* Transaction list */}
      <div className="list-container">
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.description} - ${!isNaN(transaction.amount) ? transaction.amount.toFixed(2) : 'N/A'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;