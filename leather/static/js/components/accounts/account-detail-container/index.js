import * as filters from '../../../filters/accounts';
import AsideContainer from '../../aside/aside-container';
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
      <section>
        <AsideContainer accountSlug={this.props.params.accountSlug} />
        <section className={styles.main}>
          <TransactionsContainer showAccount={false} transactions={transactions} />
        </section>
      </section>
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
