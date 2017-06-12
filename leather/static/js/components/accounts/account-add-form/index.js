import * as AccountActions from '../../../actions/accounts';
import React, { PropTypes, Component } from 'react';
import request from 'superagent';
import styles from './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let linkAccountHandler;

class AccountAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let env;
    let webhook;

    if (this.props.globals.debug) {
      env = 'tartan';
      webhook = `http://${this.props.globals
        .debugWebhookIP}:8000/plaid/webhook/`;
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
              window.location = window.location.href;
            });
        },
        onExit: function(err, metadata) {
          if (err) {
            throw err;
          }
        }
      });
      window.LeatherGlobals.plaidInitialized = true;
    }

    this.refs.linkAccount.onclick = function() {
      linkAccountHandler.open();
    };
  }

  handleChange(event) {}

  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.accountName.value;
    const typ = this.refs.accountType.value;

    if (!name || !typ) {
      return;
    }

    const newAccountPayload = {
      name: name,
      typ: typ
    };

    request
      .post('/api/accounts/')
      .send(newAccountPayload)
      .set('X-CSRFToken', window.LeatherGlobals.csrfToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        this.props.actions.addAccount(res.body);
        this.props.onClose();
        this.refs.accountName.value = '';
      });
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div
          className="slds-modal__content slds-p-around--medium"
          onClick={this.stopPropagation}
        >
          <div className="slds-grid">
            <form
              className="slds-size--1-of-2"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h3 className="slds-section__title slds-p-bottom--medium">
                Create manually:
              </h3>
              <div className="slds-form-element slds-p-bottom--small">
                <label
                  className="slds-form-element__label"
                  htmlFor="text-input-01"
                >
                  Account name
                </label>
                <div className="slds-form-element__control">
                  <input
                    className="slds-input"
                    id="text-input-01"
                    placeholder="e.g., Amex"
                    ref="accountName"
                    type="text"
                  />
                </div>
              </div>
              <div className="slds-form-element slds-p-bottom--small">
                <label className="slds-form-element__label" htmlFor="select-01">
                  Account type
                </label>
                <div className="slds-form-element__control">
                  <div className="slds-select_container">
                    <select
                      className="slds-select"
                      id="select-01"
                      ref="accountType"
                    >
                      <option value="deposit">Checking or Savings</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <div className="slds-size--1-of-2 slds-p-left--large">
              <h3 className="slds-section__title slds-p-bottom--medium">
                Create from a real account:
              </h3>
              <button
                className="slds-button slds-button--neutral"
                ref="linkAccount"
              >
                <svg
                  aria-hidden="true"
                  className="slds-button__icon slds-button__icon--left"
                >
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#link" />
                </svg>
                Link your bank account
              </button>
            </div>
          </div>
        </div>
        <div className="slds-modal__footer" onClick={this.stopPropagation}>
          <button
            className="slds-button slds-button--neutral"
            onClick={this.props.onClose}
          >
            Cancel
          </button>
          <button
            className="slds-button slds-button--brand"
            onClick={this.handleSubmit.bind(this)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

AccountAddForm.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAddForm);
