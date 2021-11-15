import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2021-11-01 09:00:00'),
        },
        {
          id: 2,
          title: 'Conta de luz',
          type: 'withdraw',
          category: 'Lazer',
          amount: 550,
          createdAt: new Date('2021-11-11 12:00:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        this.schema.all('transaction')
      ]
    })

    this.post('/transactions', (shema, request) => {
      const data = JSON.parse(request.requestBody);

      return shema.create('transaction', data);

    })


  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);