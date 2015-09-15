import { UNDEF } from './constant';
import { isFunction } from './util';

export default function(element = {}) {
  let callbacks = {},
      id = 0;

  element.on = (events, callback) => {
    if (isFunction(callback)) {
      if (typeof callback.id === UNDEF) {
        callback.id = id += 1;
      }

      events.replace(/\S+/g, (name, position) => {
        (callbacks[name] = callbacks[name] || []).push(callback);
        callback.typed = position > 0;
      });
    }

    return element;
  };

  element.off = (events, callback) => {
    if (events === '*') {
      callbacks = {};
    } else {
      events.replace(/\S+/g, (name) => {
        if (callback) {
          const arr = callbacks[name];

          for (let i = 0, cb = []; cb = arr && arr[i]; ++i) {
            if (cb.id === callback.id) {
              arr.splice(i -= 1, 1);
            }
          }
        } else {
          callbacks[name] = [];
        }
      });
    }

    return element;
  };

  // only single event supported
  element.one = (name, callback) => {
    const on = () => {
      element.off(name, on);
      callback.apply(element, arguments);
    };

    return element.on(name, on);
  };

  element.trigger = (name) => {
    const args = [].slice.call(arguments, 1),
        fns = callbacks[name] || [];

    for (let i = 0, fn; fn = fns[i]; ++i) {
      if (!fn.busy) {
        fn.busy = 1;
        fn.apply(element, fn.typed ? [name].concat(args) : args);

        if (fns[i] !== fn) {
          i -= 1;
        }

        fn.busy = 0;
      }
    }

    if (callbacks.all && name !== 'all') {
      element.trigger.apply(element, ['all', name].concat(args));
    }

    return element;
  };

  return element;
}
