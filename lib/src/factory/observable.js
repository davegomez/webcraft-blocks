export default function(element = {}) {
  const eventHandlers = {};

  /**
   * When you want to register new events and their correspondent handlers you
   * can use this function to add several events and several handlers attached
   * to those events
   *
   * @param {string} events - Event name(s) separated by spaces
   * @param {Function} handlers - Callback or list of callbacks to be call when
   * any of their correspondent events are triggered
   *
   * @returns {object} The current object
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
   * Every registered event could or should be turned off at any time, with the
   * off function you can pass a string of events to turned off all the handlers
   * attached to them of pass the specific handlers to be remove for those
   * passed events
   *
   * @param {string} events - Event name(s) separated by spaces
   * @param {Function} handlers - Callback or list of callbacks to be remove
   * the callback queue for those specific events
   *
   * @returns {object} The current object
   */
  element.off = (events, ...handlers) => {
    events.split(/ +/)
      .forEach((event) => {
        if (!eventHandlers[event]) {
          return;
        }

        if (handlers.length > 0) {
          handlers.forEach((handler) => eventHandlers[event].delete(handler));
        } else {
          eventHandlers[event].clear();
        }
      });

    return element;
  };

  /**
   * Every callback function must be called at any given time so you can use the
   * emit function to call all the callback registered for that specific event
   * or send optional already registered functions to be called for the given
   * event
   *
   * @param {string} event - Single event name to be call by the emitter
   * @param {*} args - Additional parameters to be send by the emitter to the
   * callback as rest parameters form
   *
   * @returns {object} The current object
   */
  element.emit = (event, ...args) => {
    for (const handler of eventHandlers[event]) {
      handler(...args);
    }

    return element;
  };

  return element;
}
