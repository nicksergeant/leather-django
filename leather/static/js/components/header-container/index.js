import React, { Component, PropTypes } from 'react';
import md5 from 'md5';
import styles from './styles.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  userAvatar() {
    if (!this.props.user.email) return;
    const hash = md5(this.props.user.email);
    return `https://www.gravatar.com/avatar/${hash}?s=200`;
  };

  render() {
    return (
      <header className="slds-global-header_container">
        <div className="slds-global-header slds-grid slds-grid--align-spread">
          <div className="slds-global-header__item">
            <div className="slds-global-header__logo">
              <Link className={styles.logo} to="/">
                <img alt="Leather" className={styles.logoImg} src="/static/img/logo.png" />
              </Link>
            </div>
          </div>
          <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">
            <li className="slds-dropdown-trigger slds-dropdown-trigger--click">
              <button aria-haspopup="true" className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon" title="Setup">
                <svg aria-hidden="true" className="slds-button__icon slds-global-header__icon">
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#setup" />
                </svg>
                <span className="slds-assistive-text">Setup</span>
              </button>
            </li>
            <li className="slds-dropdown-trigger slds-dropdown-trigger--click">
              <button aria-haspopup="true" className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon" title="Notifications">
                <svg aria-hidden="true" className="slds-button__icon slds-global-header__icon">
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#notification" />
                </svg>
                <span className="slds-assistive-text">Notifications</span>
              </button>
            </li>
            <li className="slds-dropdown-trigger slds-dropdown-trigger--click slds-m-left--x-small">
              <button aria-haspopup="true" className="slds-button" title="person name">
                <span className="slds-avatar slds-avatar--circle slds-avatar--medium">
                  <img alt="person name" src={this.userAvatar()} />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

HeaderContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    globals: state.globals,
    user: state.user,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
