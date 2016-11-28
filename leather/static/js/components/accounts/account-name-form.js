import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import request from 'superagent';

class AccountNameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customName: props.account.custom_name || props.account.name
    };
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit(event);
    }
  }

  handleNameChange(event) {
    this.setState({ customName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.customName === undefined) {
      return false;
    }

    if (this.state.customName === this.props.account.name &&
        _.isEmpty(this.props.account.custom_name)) {
      return false;
    }

    if (this.state.customName !== this.props.account.custom_name) {
      request
        .patch(this.props.account.url)
        .send({ custom_name: this.state.customName })
        .set('X-CSRFToken', window.csrf_token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          this.setState({ justSaved: true });
          setTimeout(() => {
            this.setState({ justSaved: false });
          }, 2000);
          this.props.onUpdateAccount(JSON.parse(res.text));
        });
    }
  }

  render() {
    const account = this.props.account;

    let justSaved;
    if (this.state.justSaved) {
      justSaved = <span className="just-saved">Saved.</span>;
    }

    const name = this.state.customName ||
      this.props.account.custom_name ||
      this.props.account.name;

    return (
      <div id="account-name">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="name"
            onBlur={this.handleSubmit.bind(this)}
            onChange={this.handleNameChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            value={name}
          />
          {justSaved}
        </form>
      </div>
    );
  }
}

AccountNameForm.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountNameForm;
