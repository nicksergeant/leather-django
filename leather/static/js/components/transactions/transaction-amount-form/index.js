import React, { PropTypes, Component } from 'react';
import request from 'superagent';
import styles from './styles.css';

class TransactionAmountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.transaction.amount || ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ customName: props.transaction.amount || '' });
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

    if (this.state.amount !== this.props.transaction.amount) {
      request
        .patch(this.props.transaction.url)
        .send({ amount: this.state.amount })
        .set('X-CSRFToken', window.LeatherGlobals.csrfToken)
        .set('Accept', 'application/json')
        .end((err, res) => {
          this.setState({ justSaved: true });
          setTimeout(() => {
            this.setState({ justSaved: false });
          }, 2000);
          this.props.onUpdateTransaction(res.body);
        });
    }
  }

  render() {
    const transaction = this.props.transaction;

    let justSaved;
    if (this.state.justSaved) {
      justSaved = <span className="just-saved" />;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          className={styles.input}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleAmountChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder="Add amount"
          value={this.state.amount}
        />
        {justSaved}
      </form>
    );
  }
}

TransactionAmountForm.propTypes = {
  onUpdateTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionAmountForm;
