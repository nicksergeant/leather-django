import React, { PropTypes, Component } from 'react';
import TransactionInList from '../transaction-in-list';
import styles from './styles.css';

class TransactionList extends Component {
  render() {
    const transactions = this.props.transactions.splice(0, 20);
    return (
      <div>
        <ul className="transactions">
          <h4>Transactions:</h4>
          {transactions.map((transaction) => {
            return (
              <TransactionInList
                key={`transaction-${transaction.id}`}
                onUpdateTransaction={this.props.onUpdateTransaction}
                showAccount={this.props.showAccount}
                transaction={transaction}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;
