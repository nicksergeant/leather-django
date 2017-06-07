import * as AccountActions from '../../../actions/accounts';
import * as TransactionActions from '../../../actions/transactions';
import * as filters from '../../../filters/accounts';
import React, { Component, PropTypes } from 'react';
import TransactionsContainer from '../../transactions/transactions-container';
import styles from './styles.css';
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

export default connect(mapStateToProps, mapDispatchToProps)(
  AllTransactionsContainer
);
