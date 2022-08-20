class EventBus {
  constructor() {
    this.eventBus = [];
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }

    handlers.push({
      eventCallback,
      thisArg,
    });
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    const newHandlers = [...handlers];
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i];
      if (handler.eventCallback === eventCallback) {
        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);
      }
    }
  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload);
    });
  }
}

module.exports = EventBus;
export default EventBus;
