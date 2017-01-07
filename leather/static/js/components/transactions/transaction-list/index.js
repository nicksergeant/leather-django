import React, { PropTypes, Component } from 'react';
import TransactionInList from '../transaction-in-list';
import styles from './styles.css';

class TransactionList extends Component {
  render() {
    return (
      <div>
        <ul className="transactions">
          <h4>Transactions:</h4>
          {this.props.transactions.map((transaction) => {
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
