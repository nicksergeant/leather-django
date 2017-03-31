import AccountList from '../../accounts/account-list';
import AsideContainer from '../../aside/aside-container';
import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomeContainer extends Component {
  render() {
    return (
      <section>
        <AsideContainer accountSlug={this.props.params.accountSlug} />
        <section>
          <AccountList accounts={this.props.accounts} />
        </section>
      </section>
    );
  }
}

HomeContainer.propTypes = {
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
)(HomeContainer);
