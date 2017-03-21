import React, { PropTypes, Component } from 'react';
import styles from './styles.css';

class AccountList extends Component {
  render() {
    return (
      <div>
        <ul className={styles.root}>
          <h4>Accounts:</h4>
          {this.props.accounts.map((account) => {
            return (
              <div key={account.id}>
                <a href={account.slug}>{account.name}</a>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default AccountList;
