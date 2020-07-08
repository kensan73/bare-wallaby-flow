import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.Math.random = () => 0.123;

global.document = {
  cookie: {
    match: () => {},
  },
};

Date.now = jest.fn(() => new Date(Date.UTC(1984, 3, 12)).valueOf());
