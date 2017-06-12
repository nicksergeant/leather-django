import React, { PropTypes, Component } from 'react';
import styles from './styles.css';

class DeleteTransaction extends Component {
  handleClick() {
    console.log(this.props.transaction);
  }

  render() {
    return (
      <a className={styles.root} onClick={this.handleClick.bind(this)}>
        x
      </a>
    );
  }
}

DeleteTransaction.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default DeleteTransaction;
