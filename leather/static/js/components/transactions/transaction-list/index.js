import React, { PropTypes, Component } from 'react';
import TransactionInList from '../transaction-in-list';
import styles from './styles.css';

class TransactionList extends Component {
  render() {
    const transactions = this.props.transactions.splice(0, 20);
    return (
      <div>
        <table className="slds-table slds-table--bordered slds-table--cell-buffer slds-table--striped slds-no-row-hover">
          <thead>
            <tr className="slds-text-title--caps">
              <th scope="col">
                <div className="slds-truncate" title="Date">Date</div>
              </th>
              <th scope="col">
                <div
                  className={styles.paddedHeader + ' slds-truncate'}
                  title="Transaction"
                >
                  Transaction
                </div>
              </th>
              <th scope="col">
                <div
                  className={styles.paddedHeader + ' slds-truncate'}
                  title="Memo"
                >
                  Memo
                </div>
              </th>
              <th scope="col">
                <div
                  className={styles.paddedHeader + ' slds-truncate'}
                  title="Amount"
                >
                  Amount
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => {
              return (
                <TransactionInList
                  key={`transaction-${transaction.id}`}
                  onUpdateTransaction={this.props.onUpdateTransaction}
                  showAccount={this.props.showAccount}
                  transaction={transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;
