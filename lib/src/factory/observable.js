export default function(element = {}) {
  let eventHandlers = {};

  element.on = (events, ...handlers) => {
    events.split(/ +/)
      .forEach((event) => {
        eventHandlers[event] || (eventHandlers[event] = new Set());
        handlers.forEach((handler) => eventHandlers[event].add(handler));
      });

    return element;
  };

  element.off = (events, ...handlers) => {
    if (events === '*') {
      eventHandlers = {};
    } else {
      events.split(/ +/)
        .forEach((event) => {
          handlers
            .forEach((handler) => eventHandlers[event].delete(handler));
        });
    }

    return element;
  };

  element.emit = (event, ...args) => {
    for (const handler of eventHandlers[event]) {
      handler(...args);
    }

    return element;
  };

  return element;
}
