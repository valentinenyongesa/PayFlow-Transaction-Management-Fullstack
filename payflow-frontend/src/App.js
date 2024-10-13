import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/transactions/')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Transaction Management System</h1>
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
