/* eslint-disable */
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { AuthenticationContainer } from 'containers/authenticationContainer';

describe('<AuthenticationContainer />', () => {
  // test('renders with connected redux store', () => {
  //   const mapStateToProps = state => (state);
  //
  //   // GIVEN
  //   // const authenticationContainer = <Provider store={configureMockStore}><AuthenticationContainer /></Provider>;
  //
  //   const ConnectedComponent = connect(mapStateToProps)(AuthenticationContainer);
  //
  //   // WHEN
  //   const component = shallowWithState(<ConnectedComponent />, {});
  //
  //   // THEN
  //   expect(component).toHaveLength(1);
  // });

  describe('once rendered', () => {
    let component;
    const errorTitleStub = 'Error title';
    const errorMessageStub = 'Error message';
    const navigationPushMock = jest.fn();
    const setNextUrlMock = jest.fn();
    const locationStub = {
      pathname: '/pathname',
      search: '/search',
    };

    beforeEach(() => {
      // GIVEN
      component = mount(<AuthenticationContainer
        isLoggedIn={false}
        location={locationStub}
        navigationPush={navigationPushMock}
        setNextUrl={setNextUrlMock}
        errorTitle={errorTitleStub}
        errorMessage={errorMessageStub}
        errorStatus={301}
      />);
    });

    afterEach(() => {
      setNextUrlMock.mockClear();
    });

    test('it redirects the user to /login if not logged in', () => {
      // WHEN
      // THEN
      expect(navigationPushMock.mock.calls[0]).toEqual(['/login']);
    });

    test('it stores the current url before redirecting the user to log in', () => {
      // WHEN
      // THEN
      expect(setNextUrlMock.mock.calls[0]).toEqual(['/pathname/search']);
    });

    test('it renders the component property if user is logged in and no error code is set', () => {
      const textStub = 'Component Title';
      const simpleComponent = () => (
        <h2>{ textStub }</h2>
      );

      // GIVEN
      // WHEN
      component = mount(<AuthenticationContainer
        component={simpleComponent}
        isLoggedIn
        location={locationStub}
        navigationPush={navigationPushMock}
        setNextUrl={setNextUrlMock}
      />);

      navigationPushMock.mockClear();

      // THEN
      expect(component.find('h2').text()).toEqual(textStub);
      expect(navigationPushMock).not.toHaveBeenCalled();
    });
  });
});
