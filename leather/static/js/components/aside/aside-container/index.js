import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
      return styles.accountLinkActive;
    }
    return '';
  };

  render() {
    let account;
    if (this.props.accounts.length) {
      account = this.props.accounts.filter((ac) => {
        return ac.slug === this.props.accountSlug;
      })[0];
    }

    return (
      <aside>
        <Link>
          <img alt="Leather" src="/static/img/logo-avatar.png" />
          Leather
        </Link>
        <div>
          <ul>
            {this.props.accounts.map((account) => {
              return (
                <div key={account.id}>
                  <Link
                    to={'/accounts/' + account.slug}>
                    {account.name}
                  </Link>
                </div>
              );
            })}
          </ul>
          <button ref="linkAccount">Link your bank account &raquo;</button>
          <div>
            Logged in as <strong>{this.props.user.username}</strong><br />
            <a href="/password/change">Change password</a><br />
            <a href="/logout">Logout</a>
          </div>
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
