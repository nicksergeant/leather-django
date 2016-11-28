import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import request from 'superagent';

class ScheduledTransactionNameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customName: props.scheduledTransaction.name
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

    if (!this.state.customName) {
      return false;
    }

    if (this.state.customName !== this.props.scheduledTransaction.name) {
      request
        .patch(this.props.scheduledTransaction.url)
        .send({ name: this.state.customName })
        .set('X-CSRFToken', window.csrf_token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          this.setState({ justSaved: true });
          setTimeout(() => {
            this.setState({ justSaved: false });
          }, 2000);
          this.props.onUpdateScheduledTransaction(JSON.parse(res.text));
        });
    }
  }

  render() {
    const scheduledTransaction = this.props.scheduledTransaction;

    let justSaved;
    if (this.state.justSaved) {
      justSaved = <span className="just-saved">Saved.</span>;
    }

    const name = this.state.customName || this.props.scheduledTransaction.name;

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

ScheduledTransactionNameForm.propTypes = {
  onUpdateScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransaction: PropTypes.object.isRequired
};

export default ScheduledTransactionNameForm;
