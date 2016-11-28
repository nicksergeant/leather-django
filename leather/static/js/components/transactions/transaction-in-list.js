import * as filters from '../../filters/accounts';
import React, { PropTypes, Component } from 'react';
import TransactionNameForm from './transaction-name-form';
import TransactionMemoForm from './transaction-memo-form';

class TransactionInList extends Component {

  render() {
    const transaction = this.props.transaction;

    let isPending;
    if (transaction.pending) {
      isPending = <span className="pending">pending</span>;
    }

    let removalRequested;
    if (transaction.removal_requested) {
      removalRequested = (
        <div className="removal-requested">
          Removal requested by bank.
          <a href={`/transactions/${transaction.id}/delete/`}>Delete &raquo;</a>
        </div>
      );
    }

    let scheduledTransaction;
    if (transaction.scheduledtransaction) {
      scheduledTransaction = (
        <span className="matched">
          Matched: {transaction.scheduledtransaction.name}, {transaction.scheduledtransaction.amount}
          <a href={`/scheduled-transactions/${transaction.scheduledtransaction.id}/unmatch/`}>Unmatch</a>
        </span>
      );
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
        {removalRequested}
        {scheduledTransaction}
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
