import { isFunction } from '../utils/type';

export default function(element = {}) {
  const callbacks = {};

  element.on = (events, callback) => {
    if (isFunction(callback)) {

    }

    return element;
  };

  return element;
}
