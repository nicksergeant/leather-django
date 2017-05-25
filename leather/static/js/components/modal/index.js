import Keybinding from 'react-keybinding';
import React from 'react';
import styles from './styles.css';

const Modal = React.createClass({
  mixins: [Keybinding],
  close: function() {
    this.props.onClose();
  },
  keybindings: {
    'esc': function(e) {
      this.close();
      e.preventDefault();
    }
  },
  stopPropagation: function(event) {
    event.stopPropagation();
  },
  render: function() {
    const visibilityClass = this.props.visible ?
      styles.visible : styles.notVisible;
    return (
      <div className={styles.root + ' ' + visibilityClass}>
        <div className="slds-modal slds-fade-in-open" onClick={this.close} role="dialog" tabIndex="-1">
        <div className="slds-modal__container">
          <div className="slds-modal__header" onClick={this.stopPropagation}>
            <button
                className="slds-button slds-modal__close slds-button--icon-inverse"
                onClick={this.close}
                title="Close">
              <svg aria-hidden="true" className="slds-button__icon slds-button__icon--large">
                <use xlinkHref="/static/slds/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
              </svg>
              <span className="slds-assistive-text">Close</span>
            </button>
            <h2 className="slds-text-heading--medium">{this.props.heading}</h2>
          </div>
          {this.props.children}
        </div>
      </div>
      <div className="slds-backdrop slds-backdrop--open" />
    </div>);
  }
});

export default Modal;
