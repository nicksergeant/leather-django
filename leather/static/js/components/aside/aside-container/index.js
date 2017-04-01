import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';
import request from 'superagent';
import styles from './styles.css';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AsideContainer extends Component {
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

    const linkAccountHandler = Plaid.create({
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
          .end();
      },
      onExit: function(err, metadata) {
        if (err) { throw err; };
      }
    });

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

  userAvatar() {
    if (!this.props.user.email) return;
    const hash = md5(this.props.user.email);
    return `https://www.gravatar.com/avatar/${hash}?s=200`;
  };

  render() {
    return (
      <aside className={styles.root}>
        <Link className={styles.logo} to="/">
          <img alt="Leather" className={styles.logoImg} src="/static/img/logo.png" />
        </Link>
        <div className="slds-grid slds-grid--vertical slds-navigation-list--vertical">
          <h2 className="slds-text-title--caps slds-p-around--medium" id="entity-header">Accounts</h2>
          <ul>
            {this.props.accounts.sort(this.alphaSort).map((account) => {
              return (
                <li className={this.isActive(account.slug, this.props.accountSlug)} key={account.id}>
                  <Link
                    className={'slds-navigation-list--vertical__action slds-text-link--reset ' + styles.accountLink}
                    to={'/accounts/' + account.slug}>
                    {account.name}
                  </Link>
                </li>
              );
            })}
            <li className="slds-align--absolute-center slds-m-top--small">
              <button className="slds-button slds-button--neutral" ref="linkAccount">
                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--left">
                  <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#download" />
                </svg>
                Link your bank account
              </button>
            </li>
          </ul>
        </div>
        <h2 className="slds-text-title--caps slds-p-around--medium" id="entity-header">Profile</h2>
        <div className="slds-m-around--medium">
          <div className="slds-tile slds-media">
            <div className="slds-media__figure">
              <span className="slds-avatar slds-avatar--circle slds-avatar--medium slds-m-bottom--small">
                <img src={this.userAvatar()} />
              </span>
            </div>
            <div className="slds-media__body">
              <h3 className="slds-truncate" title={this.props.user.username}>{this.props.user.username}</h3>
            </div>
          </div>
          <a href="/password/change/">Change password</a><br />
          <a href="/logout/">Logout</a>
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
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsideContainer);
