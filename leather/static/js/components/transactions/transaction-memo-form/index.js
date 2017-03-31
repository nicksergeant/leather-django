import React, { PropTypes, Component } from 'react';
import request from 'superagent';
import styles from './styles.css';

class TransactionMemoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: props.transaction.memo || ''
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

    if (this.state.memo !== this.props.transaction.memo) {
      request
        .patch(this.props.transaction.url)
        .send({ memo: this.state.memo })
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

TransactionMemoForm.propTypes = {
  onUpdateTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionMemoForm;
