import { isFunction } from '../utils/type';
import { exist } from '../utils/helper';

export default function(element = {}) {
  let eventHandlers = {};

  element.on = (events, ...callbacks) => {
    events.split(/s+/)
      .forEach((event) => {
        eventHandlers[event] || (eventHandlers[event] = new WeakSet());
        callbacks.forEach(eventHandlers[event].add);
      });

    return element;
  };

  element.off = (events, ...callbacks) => {
    if (events === '*') {
      eventHandlers = {};
    } else {
      events.split(/s+/)
        .forEach((event) => {
          callbacks
            .forEach(eventHandlers[event].delete);
        });
    }
  };

  return element;
}
