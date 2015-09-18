export default function(element = {}) {
  let eventHandlers = new Set();

  element.on = (events, ...handlers) => {
    events.split(/s+/)
      .forEach((event) => {
        eventHandlers[event] || (eventHandlers[event] = new Set());
        handlers.forEach(eventHandlers[event].add);
      });

    return element;
  };

  element.off = (events, ...handlers) => {
    if (events === '*') {
      eventHandlers = {};
    } else {
      events.split(/s+/)
        .forEach((event) => {
          handlers
            .forEach(eventHandlers[event].delete);
        });
    }

    return element;
  };

  element.trigger = (event) => {
    for (const handler of eventHandlers[event]) {
      handler();
    }

    return element;
  };

  return element;
}
