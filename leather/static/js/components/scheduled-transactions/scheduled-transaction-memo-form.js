import React, { PropTypes, Component } from 'react';
import request from 'superagent';

class ScheduledTransactionMemoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      memo: props.scheduledTransaction.memo
    };
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit(event);
    }
  }

  handleMemoChange(event) {
    this.setState({ memo: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.memo !== this.props.scheduledTransaction.memo) {
      request
        .patch(this.props.scheduledTransaction.url)
        .send({ memo: this.state.memo })
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

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          className="memo"
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleMemoChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder="Add memo"
          value={this.state.memo}
        />
        {justSaved}
      </form>
    );
  }
}

ScheduledTransactionMemoForm.propTypes = {
  onUpdateScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransaction: PropTypes.object.isRequired
};

export default ScheduledTransactionMemoForm;
