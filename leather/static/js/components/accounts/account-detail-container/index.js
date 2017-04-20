import * as filters from '../../../filters/accounts';
import AppContainer from '../../app-container';
import React, { Component, PropTypes } from 'react';
import TransactionsContainer from '../../transactions/transactions-container';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AccountDetailContainer extends Component {
  render() {
    if (!this.props.accounts.length || !this.props.transactions.length) {
      return <div />;
    }

    let account = this.props.accounts.filter((ac) => {
      return ac.slug === this.props.params.accountSlug;
    });

    if (!account.length) {
      return <div />;
    } else {
      account = account[0];
    }

    const transactions = filters.accountTransactions(account, this.props.transactions);

    return (
      <AppContainer accountSlug={this.props.params.accountSlug}>
        <TransactionsContainer showAccount={false} transactions={transactions} />
      </AppContainer>
    );
  }
}

AccountDetailContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailContainer);
