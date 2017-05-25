import * as filters from '../../filters/accounts';
import AccountAddForm from '../accounts/account-add-form';
import Modal from '../modal';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import styles from './styles.css';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let linkAccountHandler;

class AsideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAccountModalVisibility: false
    };
  }

  componentDidMount() {
    let env;
    let webhook;

    if (this.props.globals.debug) {
      env = 'tartan';
      webhook = `http://${this.props.globals.debugWebhookIP}:8000/plaid/webhook/`;
    } else {
      env = 'production';
      webhook = 'https://leatherapp.com/plaid/webhook/';
    }

    if (!window.LeatherGlobals.plaidInitialized) {
      linkAccountHandler = Plaid.create({
        clientName: 'Leather',
        env: env,
        key: 'db7f49f5182576046eb4620403f497',
        longtail: true,
        product: ['connect'],
        webhook: webhook,
        onSuccess: function(public_token, metadata) {
          request
            .post('/plaid-accounts/link/')
            .type('form')
            .send({ public_token: public_token })
            .set('X-CSRFToken', window.LeatherGlobals.csrfToken)
            .end((err, res) => {
              window.location = window.location.href
             });
        },
        onExit: function(err, metadata) {
          if (err) { throw err; };
        }
      });
      window.LeatherGlobals.plaidInitialized = true;
    }

    this.refs.linkAccount.onclick = function() {
      linkAccountHandler.open();
    };
  }

  isActive(slug, active) {
    if (slug === active) {
      return 'slds-is-active';
    }
    return '';
  };

  alphaSort(a, b) {
    const aName = a.custom_name || a.name;
    const bName = b.custom_name || b.name;
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };

  addAccountClose() {
    this.setState({
      addAccountModalVisibility: false
    });
  }

  addAccountOpen() {
    this.setState({
      addAccountModalVisibility: true
    });
  }

  render() {
    return (
      <aside className={styles.root}>
        <Modal
            heading="Add Account"
            onClose={this.addAccountClose.bind(this)}
            visible={this.state.addAccountModalVisibility}>
          <div className="slds-grid">
            <AccountAddForm />
            <div className="slds-size--1-of-2 slds-p-left--large">
              <h3 className="slds-section__title slds-p-bottom--medium">Create from a real account:</h3>
              <button
                  className="slds-button slds-button--neutral"
                  ref="linkAccount">
                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--left">
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#link" />
                </svg>
                Link your bank account
              </button>
            </div>
          </div>
        </Modal>
        <div className="slds-grid slds-grid--vertical slds-navigation-list--vertical">
          <h2 className="slds-text-title--caps slds-p-around--medium" id="entity-header">Accounts</h2>
          <ul>
            {this.props.accounts.sort(this.alphaSort).map((account) => {
              return (
                <li className={this.isActive(account.slug, this.props.accountSlug)} key={account.id}>
                  <Link
                    className={'slds-navigation-list--vertical__action slds-text-link--reset ' + styles.accountLink}
                    to={'/accounts/' + account.slug}>
                    <span className={styles.accountName}>{account.name}</span>
                    <span className={styles.balance}>
                      {filters.balance(account, this.props.transactions)}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="slds-align--absolute-center slds-m-top--small">
              <button
                  className={styles.addAccount + ' slds-button slds-button--neutral'}
                  onClick={this.addAccountOpen.bind(this)}
                  ref="addAccount">
                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--left">
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#new" />
                </svg>
                Add Account
              </button>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

AsideContainer.propTypes = {};

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
)(AsideContainer);
