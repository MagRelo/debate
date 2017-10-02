import React, { Component } from 'react'
import { Link } from 'react-router'


const dummyTransactions = [
  {key: 1, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Bill'}, item: {amount:'10.00', type: 'Stake', message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}},
  {key: 2, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Nick'}, item: {amount:'1.15', type: 'Withdraw', message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}},
  {key: 3, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Jim'},  item: {amount:'10.00', type: 'Stake', message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}}
]

const Transactions = dummyTransactions.map((transaction) =>
    <tr key={transaction.key}>
      <td>{transaction.item.type}</td>
      <td>{transaction.item.message}</td>
      <td>¢{transaction.item.amount}</td>
    </tr>
)


class TransactionsList extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Transactions</h1>

            <table className='pure-table pure-table-bordered pure-table-striped'>
              <thead>
                <tr>
                  <td>Type</td>
                  <td>Message</td>
                  <td>Amount</td>
                </tr>
              </thead>
              <tbody>
                {Transactions}
              </tbody>
            </table>

          </div>
        </div>
      </main>
    )
  }
}

export default TransactionsList
