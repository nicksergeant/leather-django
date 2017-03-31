import React, { PropTypes, Component } from 'react';
import styles from './styles.css';
import { Link } from 'react-router';

class AccountList extends Component {
  render() {
    return (
      <div>
        <ul>
          <h4>Accounts:</h4>
          {this.props.accounts.map((account) => {
            return (
              <div key={account.id}>
                <Link to={'/accounts/' + account.slug}>
                  {account.name}
                </Link>
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
