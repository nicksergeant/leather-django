import * as AccountActions from '../actions/account';
import * as TransactionActions from '../actions/transactions';
import * as filters from '../filters/accounts';
import AccountNameForm from '../components/accounts/account-name-form';
import React, { Component, PropTypes } from 'react';
import TransactionsContainer from '../containers/transactions-container';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AllTransactionsContainer extends Component {
  render() {
    const { account, actions, transactions } = this.props;
    return (
      <div>
        <header>
          <a href="/">
            <img alt="" src="/static/img/logo-avatar.png" />
          </a>
        </header>
        <div className="account-top">All Transactions</div>
        <div className="cont">
          <ul className="transactions -scheduled"></ul>
          <TransactionsContainer showAccount />
        </div>
      </div>
    );
  }
}

AllTransactionsContainer.propTypes = {
  account: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    account: state.account,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTransactionsContainer);
