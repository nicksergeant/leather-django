import * as filters from '../../filters/accounts';
import React, { PropTypes, Component } from 'react';
import ScheduledTransactionAmountForm from './scheduled-transaction-amount-form';
import ScheduledTransactionDelete from './scheduled-transaction-delete';
import ScheduledTransactionNameForm from './scheduled-transaction-name-form';
import ScheduledTransactionMemoForm from './scheduled-transaction-memo-form';

class ScheduledTransactionInList extends Component {

  render() {
    const scheduledTransaction = this.props.scheduledTransaction;

    return (
      <li className="transaction group">
        <span className="date">
          {filters.transactionMonth(scheduledTransaction)}
          <span className="day">{filters.transactionDay(scheduledTransaction)}</span>
        </span>
        <ScheduledTransactionNameForm
          onUpdateScheduledTransaction={this.props.onUpdateScheduledTransaction}
          scheduledTransaction={scheduledTransaction}
        />
        <ScheduledTransactionMemoForm
          onUpdateScheduledTransaction={this.props.onUpdateScheduledTransaction}
          scheduledTransaction={scheduledTransaction}
        />
        <ScheduledTransactionAmountForm
          onUpdateScheduledTransaction={this.props.onUpdateScheduledTransaction}
          scheduledTransaction={scheduledTransaction}
        />
        <ScheduledTransactionDelete
          onDeleteScheduledTransaction={this.props.onDeleteScheduledTransaction}
          scheduledTransaction={scheduledTransaction}
        />
      </li>
    );
  }
}

ScheduledTransactionInList.propTypes = {
  onDeleteScheduledTransaction: PropTypes.func.isRequired,
  onUpdateScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransaction: PropTypes.object.isRequired
};

export default ScheduledTransactionInList;
