import React, { Component, PropTypes } from 'react';
import md5 from 'md5';
import styles from './styles.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  constructor() {
    super();
    this.state = {
      notificationsDropdownIsOpen: false,
      profileDropdownIsOpen: false
    };
  }

  toggleNotificationsDropdown() {
    this.setState({
      notificationsDropdownIsOpen: !this.state.notificationsDropdownIsOpen
    });
  }

  toggleProfileDropdown() {
    this.setState({
      profileDropdownIsOpen: !this.state.profileDropdownIsOpen
    });
  }

  userAvatar() {
    if (!this.props.user.email) return;
    const hash = md5(this.props.user.email);
    return `https://www.gravatar.com/avatar/${hash}?s=200`;
  }

  render() {
    const notificationsDropdownClass = this.state.notificationsDropdownIsOpen
      ? styles.notifications_dropdown_is_open
      : '';
    const profileDropdownClass = this.state.profileDropdownIsOpen
      ? 'slds-is-open'
      : '';

    return (
      <header className="slds-global-header_container">
        <div className="slds-global-header slds-grid slds-grid--align-spread">
          <div className="slds-global-header__item">
            <div className="slds-global-header__logo">
              <Link className={styles.logo} to="/">
                <img
                  alt="Leather"
                  className={styles.logoImg}
                  src="/static/img/logo.png"
                />
              </Link>
            </div>
          </div>
          <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">
            <li className="slds-dropdown-trigger slds-dropdown-trigger--click">
              <button
                aria-haspopup="true"
                className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon"
                onClick={this.toggleNotificationsDropdown.bind(this)}
                title="Notifications"
              >
                <svg
                  aria-hidden="true"
                  className="slds-button__icon slds-global-header__icon"
                >
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#notification" />
                </svg>
                <span className="slds-assistive-text">Notifications</span>
              </button>
              <div
                className={
                  styles.notifications_dropdown +
                  ' ' +
                  notificationsDropdownClass +
                  ' slds-popover slds-popover--large slds-nubbin--top-right'
                }
                role="dialog"
              >
                <div className="slds-popover__body slds-p-around--none">
                  <ul>
                    <li className="slds-global-header__notification slds-p-around--xx-small">
                      <div className="slds-media slds-has-flexi-truncate slds-p-around--x-small">
                        <div className="slds-media__figure">
                          <span
                            className="slds-icon_container slds-icon_container--circle slds-icon-action-description"
                            title="description of icon when needed"
                          >
                            <svg
                              aria-hidden="true"
                              className="slds-icon slds-icon--small"
                            >
                              <use xlinkHref="/static/slds/assets/icons/action-sprite/svg/symbols.svg#update" />
                            </svg>
                            <span className="slds-assistive-text">
                              Description of icon
                            </span>
                          </span>
                        </div>
                        <div className="slds-media__body">
                          <div className="slds-grid slds-grid--align-spread">
                            <Link
                              className="slds-text-link--reset slds-has-flexi-truncate"
                              to="/accounts/blue-cash-preferredsm-2"
                            >
                              <h3 className="slds-truncate">
                                <strong>1 new transaction</strong>
                              </h3>
                              <p className="slds-truncate">Capital One</p>
                              <p className="slds-m-top--x-small slds-text-color--weak">
                                23m ago
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="slds-global-header__notification slds-p-around--xx-small">
                      <div className="slds-media slds-has-flexi-truncate slds-p-around--x-small">
                        <div className="slds-media__figure">
                          <span
                            className="slds-icon_container slds-icon_container--circle slds-icon-action-description"
                            title="description of icon when needed"
                          >
                            <svg
                              aria-hidden="true"
                              className="slds-icon slds-icon--small"
                            >
                              <use xlinkHref="/static/slds/assets/icons/action-sprite/svg/symbols.svg#update" />
                            </svg>
                            <span className="slds-assistive-text">
                              Description of icon
                            </span>
                          </span>
                        </div>
                        <div className="slds-media__body">
                          <div className="slds-grid slds-grid--align-spread">
                            <Link
                              className="slds-text-link--reset slds-has-flexi-truncate"
                              to="/accounts/blue-cash-preferredsm-2"
                            >
                              <h3 className="slds-truncate">
                                <strong>3 new transactions</strong>
                              </h3>
                              <p className="slds-truncate">Amex Blue Cash</p>
                              <p className="slds-m-top--x-small slds-text-color--weak">
                                6h ago
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li
              className={
                profileDropdownClass +
                ' slds-dropdown-trigger slds-dropdown-trigger--click slds-m-left--x-small'
              }
            >
              <button
                aria-haspopup="true"
                className="slds-button"
                onClick={this.toggleProfileDropdown.bind(this)}
                title="Account"
              >
                <span className="slds-avatar slds-avatar--circle slds-avatar--medium">
                  <img alt="person name" src={this.userAvatar()} />
                </span>
              </button>
              <div
                className={
                  styles.profile_dropdown +
                  ' slds-dropdown slds-dropdown--right slds-nubbin--top-right'
                }
              >
                <ul className="slds-dropdown__list" role="menu">
                  <li className="slds-dropdown__item" role="presentation">
                    <a href="/password/change/" role="menuitem" tabIndex="0">
                      <span className="slds-truncate">
                        <svg
                          aria-hidden="true"
                          className="slds-button__icon slds-button__icon--left"
                        >
                          <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#reset_password" />
                        </svg>
                        Change password
                      </span>
                    </a>
                  </li>
                  <li className="slds-dropdown__item" role="presentation">
                    <a href="/logout/" role="menuitem" tabIndex="1">
                      <span className="slds-truncate">
                        <svg
                          aria-hidden="true"
                          className="slds-button__icon slds-button__icon--left"
                        >
                          <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#logout" />
                        </svg>
                        Log out
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
