import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
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
      product: 'connect',
      webhook: webhook,
      onLoad: function() {
        console.log('on load');
        // The Link module finished loading.
      },
      onSuccess: function(public_token, metadata) {
        console.log('on success');
        // Send the public_token to your app server here.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if selectAccount is enabled.
        //
        // /plaid-accounts/link/
      },
      onExit: function(err, metadata) {
        // The user exited the Link flow.
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
      }
    });

    this.refs.linkAccount.onclick = function() {
      linkAccountHandler.open();
    };
  }

  render() {
    return (
      <aside className={ styles.root }>
        <a className={ styles.logo } href="/">
          <img alt="Leather" src="/static/img/logo-avatar.png" />
          Leather
        </a>
        <div className={ styles.inner }>
          <button ref="linkAccount">Link your bank account &raquo;</button>
          <div className={ styles.profileLinks }>
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
