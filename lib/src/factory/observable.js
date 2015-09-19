export default function(element = {}) {
  let eventHandlers = {};

  /**
   *
   * @param events
   * @param handlers
   * @returns {{}}
   */
  element.on = (events, ...handlers) => {
    events.split(/ +/)
      .forEach((event) => {
        eventHandlers[event] || (eventHandlers[event] = new Set());
        handlers.forEach((handler) => eventHandlers[event].add(handler));
      });

    return element;
  };

  /**
   *
   * @param events
   * @param handlers
   * @returns {{}}
   */
  element.off = (events, ...handlers) => {
    if (events === '*') {
      eventHandlers = {};
    } else {
      events.split(/ +/)
        .forEach((event) => {
          if (handlers.length > 0) {
            handlers
              .forEach((handler) => eventHandlers[event].delete(handler));
          } else {
            eventHandlers[event].clear();
          }
        });
    }

    return element;
  };

  /**
   *
   * @param event
   * @param args
   * @returns {{}}
   */
  element.emit = (event, ...args) => {
    for (const handler of eventHandlers[event]) {
      handler(...args);
    }

    return element;
  };

  return element;
}
