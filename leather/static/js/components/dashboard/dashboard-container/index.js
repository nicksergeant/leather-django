import AsideContainer from '../../aside/aside-container';
import AccountList from '../../accounts/account-list';
import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
  render() {
    return (
      <section className={styles.root}>
        <AsideContainer />
        <section className="main">
          <AccountList accounts={this.props.accounts} />
        </section>
      </section>
    );
  }
}

DashboardContainer.propTypes = {
  accounts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
