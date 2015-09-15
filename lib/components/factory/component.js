import observable from './observable';

const component = {};

observable(component);

export default () => Object.create(component);
