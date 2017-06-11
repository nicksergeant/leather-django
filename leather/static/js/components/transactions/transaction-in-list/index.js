import * as filters from '../../../filters/accounts';
import React, { PropTypes, Component } from 'react';
import TransactionAmountForm from '../transaction-amount-form';
import TransactionMemoForm from '../transaction-memo-form';
import TransactionNameForm from '../transaction-name-form';
import styles from './styles.css';

class TransactionInList extends Component {
  render() {
    const transaction = this.props.transaction;

    const amount = filters.transactionAmount(transaction);
    const day = filters.transactionDay(transaction);
    const month = filters.transactionMonth(transaction);
    const name = transaction.custom_name || transaction.name;
    const date = month + ' ' + day;

    return (
      <tr>
        <td className={styles.td_no_padding} data-label="Date">
          <div className="slds-truncate" title={date}>
            {date}
          </div>
        </td>
        <td className={styles.td_no_padding} data-label="Transaction">
          <div className="slds-truncate" title={name}>
            <TransactionNameForm
              onUpdateTransaction={this.props.onUpdateTransaction}
              transaction={transaction}
            />
          </div>
        </td>
        <td className={styles.td_no_padding} data-label="Memo">
          <div className="slds-truncate" title={transaction.memo}>
            <TransactionMemoForm
              onUpdateTransaction={this.props.onUpdateTransaction}
              transaction={transaction}
            />
          </div>
        </td>
        <td className={styles.td_no_padding} data-label="Amount">
          <div className="slds-truncate" title={amount}>
            <TransactionAmountForm
              onUpdateTransaction={this.props.onUpdateTransaction}
              transaction={transaction}
            />
          </div>
        </td>
      </tr>
    );
  }
}

TransactionInList.propTypes = {
  onUpdateTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionInList;
