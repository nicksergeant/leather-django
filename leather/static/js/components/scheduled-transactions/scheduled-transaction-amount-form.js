import * as filters from '../../filters/accounts';
import React, { PropTypes, Component } from 'react';
import request from 'superagent';

class ScheduledTransactionAmountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: props.scheduledTransaction.amount
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      amount: nextProps.scheduledTransaction.amount
    });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit(event);
    }
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.amount !== this.props.scheduledTransaction.amount) {
      request
        .patch(this.props.scheduledTransaction.url)
        .send({ amount: this.state.amount })
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
    const className = scheduledTransaction.typ === 'W' ? 'debit' : 'credit';

    let justSaved;
    if (this.state.justSaved) {
      justSaved = <span className="just-saved">Saved.</span>;
    }

    return (
      <form
        className={'amount ' + className}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <input
          min="0"
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleAmountChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder="0.00"
          step="any"
          type="number"
          value={this.state.amount}
        />
        {justSaved}
      </form>
    );
  }
}

ScheduledTransactionAmountForm.propTypes = {
  onUpdateScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransaction: PropTypes.object.isRequired
};

export default ScheduledTransactionAmountForm;
