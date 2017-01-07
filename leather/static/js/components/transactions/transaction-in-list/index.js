import * as filters from '../../../filters/accounts';
import React, { PropTypes, Component } from 'react';
import TransactionMemoForm from '../transaction-memo-form';
import TransactionNameForm from '../transaction-name-form';
import styles from './styles.css';

class TransactionInList extends Component {
  render() {
    const transaction = this.props.transaction;

    let isPending;
    if (transaction.pending) {
      isPending = <span className="pending">pending</span>;
    }

    let account;
    if (this.props.showAccount) {
      const name = this.props.transaction.account.custom_name ||
        this.props.transaction.account.name;
      account = <a className="account" href={`/accounts/${this.props.transaction.account.id}/`}>{name}</a>;
    }

    return (
      <li className="transaction group">
        {account}
        <div className={`amount ${filters.transactionClass(transaction)}`}>
          ${filters.transactionAmount(transaction)}
        </div>
        <span className="date">
          {filters.transactionMonth(transaction)} <span className="day">{filters.transactionDay(transaction)}</span>
        </span>
        <TransactionNameForm
          onUpdateTransaction={this.props.onUpdateTransaction}
          transaction={transaction}
        />
        <TransactionMemoForm
          onUpdateTransaction={this.props.onUpdateTransaction}
          transaction={transaction}
        />
        <br />
        {isPending}
      </li>
    );
  }
}

TransactionInList.propTypes = {
  onUpdateTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionInList;
