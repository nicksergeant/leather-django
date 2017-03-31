import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import request from 'superagent';
import styles from './styles.css';

class TransactionNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customName: props.transaction.custom_name || props.transaction.name
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ customName: props.transaction.custom_name || props.transaction.name });
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

    if (this.state.customName === this.props.transaction.name &&
        _.isEmpty(this.props.transaction.custom_name)) {
      return false;
    }

    if (this.state.customName !== this.props.transaction.custom_name) {
      request
        .patch(this.props.transaction.url)
        .send({ custom_name: this.state.customName })
        .set('X-CSRFToken', window.LeatherGlobals.csrfToken)
        .set('Accept', 'application/json')
        .end((err, res) => {
          this.setState({ justSaved: true });
          setTimeout(() => {
            this.setState({ justSaved: false });
          }, 2000);
          this.props.onUpdateTransaction(JSON.parse(res.text));
        });
    }
  }

  render() {
    const transaction = this.props.transaction;

    let justSaved;
    if (this.state.justSaved) {
      justSaved = <span className="just-saved">Saved.</span>;
    }

    const name = this.state.customName || this.props.transaction.name;

    return (
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
    );
  }
}

TransactionNameForm.propTypes = {
  onUpdateTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionNameForm;
