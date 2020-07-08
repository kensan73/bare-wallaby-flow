// @flow

import React from 'react';
import { connect } from 'react-redux';
import { navigationPush, setNextUrl } from 'actionTypes/navigationActions';

type Props = {
  isLoggedIn: Boolean,
  navigationPush: (string) => null,
  setNextUrl: (string) => null,
  location: {
    pathname: string,
    search: string,
  },
  component: mixed,
  errorStatus: number,
  errorMessage: string, // eslint-disable-line
  errorTitle: string, // eslint-disable-line
};

export class AuthenticationContainer extends React.PureComponent<Props> {
  static defaultProps = {
    location: {
      pathname: '',
      search: '',
    },
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.isUserAuthenticated();
    }
  }

  componentWillUpdate(nextProps: Props) {
    if (!nextProps.isLoggedIn) {
      this.isUserAuthenticated();
    }
  }

  props: Props;

  isUserAuthenticated() {
    const nextUrl = `${this.props.location.pathname}${this.props.location.search}`;

    this.props.setNextUrl(nextUrl);
    this.props.navigationPush('/login');
  }

  render() {
    const ComposedComponent = this.props.component;

    return this.props.isLoggedIn && !this.props.errorStatus
      ?
        // $FlowIgnoreLine
        <ComposedComponent {...this.props} />
      :
        <h4>whatever</h4>;
  }
}

const mapStateToProps = (store: Object) => ({
  errorMessage: store.errorReducer.get('errorMessage'),
  errorStatus: store.errorReducer.get('errorStatus'),
  errorTitle: store.errorReducer.get('errorTitle'),
  isLoggedIn: store.userReducer.get('isLoggedIn'),
});

export default connect(mapStateToProps, {
  navigationPush,
  setNextUrl,
})(AuthenticationContainer);
