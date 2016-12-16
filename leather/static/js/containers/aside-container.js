import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AsideContainer extends Component {
  render() {
    let csrfToken;
    let env;
    let username;
    let webhook;

    // Prod
    // data-webhook="https://leatherapp.com/plaid/webhook/"
    // data-env="production"

    return (
      <aside className="main">
        <a className="logo" href="/">
          <img src="/static/img/logo-avatar.png" alt="" />
          Leather
        </a>
        <div className="inner">
          <form id="account-link" method="POST" action="/plaid-accounts/link/">
            <input type="hidden" name="csrf_token" value="" />
          </form>
          <script
            src="https://cdn.plaid.com/link/stable/link-initialize.js"
            data-client-name="Leather"
            data-form-id="account-link"
            data-key="db7f49f5182576046eb4620403f497"
            data-product="connect"
            data-longtail="true"
            data-env="tartan"
            data-webhook="http://{{ debug_webhook_ip }}:8000/plaid/webhook/"
            >
          </script>
          <div className="profile-links">
            Logged in as <strong></strong><br />
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsideContainer);
