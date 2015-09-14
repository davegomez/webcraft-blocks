import { type } from './constant';
import { isFunction } from './utils';

export default function(elem = {}) {
  let callbacks = {},
      id = 0;

  elem.on = (events, fn) => {
    if (isFunction(fn)) {
      if (typeof fn.id === type.T_UNDEF) {
        fn.id = id += 1;
      }

      events.replace(/\S+/g, (name, pos) => {
        (callbacks[name] = callbacks[name] || []).push(fn);
        fn.typed = pos > 0;
      })
    }

    return elem;
  };

  elem.off = (events, fn) => {
    if (events === '*') {
      callbacks = {};
    } else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          let arr = callbacks[name];

          for (let i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb.id == fn.id) {
              arr.splice(i -= 1, 1);
            }
          }
        } else {
          callbacks[name] = [];
        }
      });
    }

    return elem;
  };

  // only single event supported
  elem.one = (name, fn) => {
    const on = () => {
      elem.off(name, on);
      fn.apply(elem, arguments);
    };

    return elem.on(name, on);
  };

  elem.trigger = (name) => {
    var args = [].slice.call(arguments, 1),
        fns = callbacks[name] || [];

    for (let i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1;
        fn.apply(elem, fn.typed ? [name].concat(args) : args);

        if (fns[i] !== fn) {
          i -= 1;
        }

        fn.busy = 0;
      }
    }

    if (callbacks.all && name !== 'all') {
      elem.trigger.apply(elem, ['all', name].concat(args))
    }

    return elem;
  };

  return elem;
}
