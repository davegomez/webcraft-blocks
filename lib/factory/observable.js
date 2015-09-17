import { isFunction } from '../utils/type';

export default function(element = {}) {
  const callbacks = {};

  element.on = (events, callback) => {
    if (isFunction(callback)) {
      events.split(/ +/g)
        .forEach((event) => {
          (callbacks[event] = callbacks[event] || []).push(callback);
        });
    }

    return element;
  };

  return element;
}
