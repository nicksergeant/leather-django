import * as TransactionActions from '../actions/transactions';
import React, { Component, PropTypes } from 'react';
import TransactionList from '../components/transactions/transaction-list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TransactionsContainer extends Component {
  render() {
    const { transactions, actions, showAccount } = this.props;
    return (
      <TransactionList
        onUpdateTransaction={actions.updateTransaction}
        showAccount={showAccount}
        transactions={transactions}
      />
    );
  }
}

TransactionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  showAccount: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TransactionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
