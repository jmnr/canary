

var hub = {
  listeners: {},
  listen: function(event, cb) {
    console.log("listen event", event);
    console.dir(this.listeners);

    if(this.listeners.hasOwnProperty(event)) {
        this.listeners[event].push(cb);
    }
    else {
      this.listeners[event] = [cb];
    }
  },
  emit: function(event, arg1, arg2, arg3) {
    console.log("emit event", event);
    console.dir(this.listeners);
    if(this.listeners.hasOwnProperty(event)) {
      this.listeners[event].forEach(function(fn) {
        fn(arg1, arg2, arg3);
      });
    }
  }
};
