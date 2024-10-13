import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ description: '', amount: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/transactions/')
      .then(response => {
        setTransactions(response.data);
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
    axios.post('http://127.0.0.1:8000/api/transactions/create/', formData)
      .then(response => {
        setTransactions([...transactions, response.data]);
        setFormData({ description: '', amount: '' }); // Clear the form after submission
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  return (
    <div className="App">
      <h1>Transaction Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <button type="submit">Add Transaction</button>
      </form>

      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
