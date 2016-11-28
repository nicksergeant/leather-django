import React, { PropTypes, Component } from 'react';
import ScheduledTransactionInList from './scheduled-transaction-in-list.js';

class ScheduledTransactionList extends Component {
  render() {
    return (
      <div>
        <ul className="transactions -scheduled">
          <h4>Scheduled Transactions:</h4>
          {this.props.scheduledTransactions.map((scheduledTransaction) => {
            return (
              <ScheduledTransactionInList
                key={`scheduled-transaction-${scheduledTransaction.id}`}
                onDeleteScheduledTransaction={this.props.onDeleteScheduledTransaction}
                onUpdateScheduledTransaction={this.props.onUpdateScheduledTransaction}
                scheduledTransaction={scheduledTransaction}
                showAccount={this.props.showAccount}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

ScheduledTransactionList.propTypes = {
  onDeleteScheduledTransaction: PropTypes.func.isRequired,
  onUpdateScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransactions: PropTypes.array.isRequired
};

export default ScheduledTransactionList;
