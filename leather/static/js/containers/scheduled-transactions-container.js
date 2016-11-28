import * as ScheduledTransactionActions from '../actions/scheduled-transactions';
import React, { Component, PropTypes } from 'react';
import ScheduledTransactionList from '../components/scheduled-transactions/scheduled-transaction-list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ScheduledTransactionsContainer extends Component {
  render() {
    const { actions, scheduledTransactions } = this.props;
    return (
      <ScheduledTransactionList
        onDeleteScheduledTransaction={actions.deleteScheduledTransaction}
        onUpdateScheduledTransaction={actions.updateScheduledTransaction}
        scheduledTransactions={scheduledTransactions}
      />
    );
  }
}

ScheduledTransactionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  scheduledTransactions: PropTypes.array.isRequired,
  showAccount: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    scheduledTransactions: state.scheduledTransactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ScheduledTransactionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledTransactionsContainer);
