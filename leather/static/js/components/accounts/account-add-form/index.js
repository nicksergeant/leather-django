import React, { PropTypes, Component } from 'react';
import request from 'superagent';
import styles from './styles.css';

class AccountAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange(event) {

  }

  handleSubmit(event) {
    event.preventDefault();

    // request
    //   .patch(this.props.account.url)
    //   .send({ custom_name: this.state.customName })
    //   .set('X-CSRFToken', window.LeatherGlobals.csrfToken)
    //   .set('Accept', 'application/json')
    //   .end((err, res) => {
    //     this.setState({ justSaved: true });
    //     setTimeout(() => {
    //       this.setState({ justSaved: false });
    //     }, 2000);
    //     this.props.onUpdateAccount(JSON.parse(res.text));
    //   });
  }

  render() {
    return (
      <form className="slds-size--1-of-2">
        <h3 className="slds-section__title slds-p-bottom--medium">Create manually:</h3>
        <div className="slds-form-element slds-p-bottom--small">
          <label className="slds-form-element__label" htmlFor="text-input-01">Account name</label>
          <div className="slds-form-element__control">
            <input className="slds-input" id="text-input-01" placeholder="e.g., Amex" type="text" />
          </div>
        </div>
        <div className="slds-form-element slds-p-bottom--small">
          <label className="slds-form-element__label" htmlFor="select-01">Account type</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select className="slds-select" id="select-01">
                <option>Checking</option>
                <option>Credit</option>
              </select>
            </div>
          </div>
        </div>
        <div className="slds-form-element">
          <label className="slds-form-element__label" htmlFor="text-input-01">Starting balance</label>
          <div className="slds-form-element__control">
            <input className="slds-input" id="text-input-01" placeholder="e.g., 0.00" type="text" />
          </div>
        </div>
      </form>
    );
  }
}

AccountAddForm.propTypes = {};

export default AccountAddForm;
