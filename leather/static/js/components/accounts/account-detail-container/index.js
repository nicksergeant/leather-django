import * as AccountActions from '../../../actions/accounts';
import * as filters from '../../../filters/accounts';
import AccountNameForm from '../account-name-form';
import React, { Component, PropTypes } from 'react';
import TransactionsContainer from '../../transactions/transactions-container';
import moment from 'moment';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AccountDetailContainer extends Component {
  render() {
    if (!this.props.accounts.length || !this.props.transactions.length) {
      return <div />;
    }

    const account = this.props.accounts.filter((ac) => {
      return ac.slug === this.props.params.accountSlug;
    })[0];

    if (!account) {
      return <div />;
    }

    const transactions = this.props.transactions.filter((t) => {
      return t.account_id === account.id;
    });

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
            onUpdateAccount={this.props.actions.updateAccount}
          />
          <small>Updated {moment(account.updated_at).fromNow()}</small>
        </div>
        <div className="balance-info">
          <div className="left">
            Available: {filters.availableBalance(account)}
          </div>
          <div className="right">
            Balance: {account.balance_current}
          </div>
        </div>
        <div className="cont">
          <TransactionsContainer showAccount={false} transactions={transactions} />
        </div>
      </div>
    );
  }
}

AccountDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
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
)(AccountDetailContainer);
