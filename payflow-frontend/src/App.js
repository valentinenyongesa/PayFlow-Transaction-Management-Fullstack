import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ description: '', amount: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/transactions/')
      .then(response => {
        const transactionsWithNumbers = response.data.map(transaction => ({
          ...transaction,
          amount: parseFloat(transaction.amount)
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
      amount: parseFloat(formData.amount)
    };
    axios.post('http://127.0.0.1:8000/transactions/create/', newTransaction)
      .then(response => {
        setTransactions([...transactions, { ...response.data, amount: parseFloat(response.data.amount) }]);
        setFormData({ description: '', amount: '' });
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  // New function to handle deleting a transaction
  const handleDelete = (transactionId) => {
    axios.delete(`http://127.0.0.1:8000/transactions/delete/${transactionId}/`)
      .then(() => {
        // Remove the deleted transaction from the list
        setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
      })
      .catch(error => {
        console.error('There was an error deleting the transaction!', error);
      });
  };

  return (
    <div className="App">
      <h1>PayFlow</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="list-container">
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.description} - ${!isNaN(transaction.amount) ? transaction.amount.toFixed(2) : 'N/A'}
              {/* Delete button for each transaction */}
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;