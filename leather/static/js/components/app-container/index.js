import AsideContainer from '../aside-container';
import HeaderContainer from '../header-container';
import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';

class AppContainer extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <AsideContainer accountSlug={this.props.accountSlug} />
        <section className={styles.main}>
          {this.props.children}
        </section>
      </div>
    );
  }
}

AppContainer.propTypes = {
  accountSlug: PropTypes.string
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
