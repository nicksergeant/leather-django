import React, { PropTypes, Component } from 'react';
import request from 'superagent';

class ScheduledTransactionDelete extends Component {

  handleClick(event) {
    if (confirm('Are you sure you want to remove this scheduled transaction?')) {
      const scheduledTransaction = this.props.scheduledTransaction;
      request
        .delete(scheduledTransaction.url)
        .set('X-CSRFToken', window.csrf_token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res.statusCode === 204) {
            this.props.onDeleteScheduledTransaction(scheduledTransaction);
          }
        });
    }
  }

  render() {
    return (
      <a
        className="delete"
        onClick={this.handleClick.bind(this)}
      >
        x
      </a>
    );
  }
}

ScheduledTransactionDelete.propTypes = {
  onDeleteScheduledTransaction: PropTypes.func.isRequired,
  scheduledTransaction: PropTypes.object.isRequired
};

export default ScheduledTransactionDelete;
