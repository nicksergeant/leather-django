import * as AccountActions from '../actions/accounts';
import * as TransactionActions from '../actions/transactions';
import * as filters from '../filters/accounts';
import AccountNameForm from '../components/accounts/account-name-form';
import React, { Component, PropTypes } from 'react';
import ScheduledTransactionsContainer from '../containers/scheduled-transactions-container';
import TransactionsContainer from '../containers/transactions-container';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AccountDetailContainer extends Component {
  render() {
    const { account, actions, scheduledTransactions } = this.props;
    return (
      <div>
        <header>
          <a href="/">
            <img alt="" src="/static/img/logo-avatar.png" />
          </a>
        </header>
        <div className="account-top">
          <AccountNameForm
            account={account}
            onUpdateAccount={actions.updateAccount}
          />
          <small>Updated {moment(account.updated_at).fromNow()}</small>
        </div>
        <div className="balance-info group">
          <div className="left">
            Available: {filters.availableBalance(account, scheduledTransactions)}
          </div>
          <div className="right">
            Balance: {account.balance_current}
          </div>
        </div>
        <div className="cont">
          <ScheduledTransactionsContainer showAccount={false} />
          <TransactionsContainer showAccount={false} />
        </div>
      </div>
    );
  }
}

AccountDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  scheduledTransactions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    scheduledTransactions: state.scheduledTransactions
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
)(AccountDetailContainer);
