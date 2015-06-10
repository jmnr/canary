
var hub = {
  listeners: {},
  listen: function(event, cb) {
    if(this.listeners.hasOwnProperty(event)) {
        listeners[event].push(cb);
    }
    else {
      listeners[event] = [cb];
    }
  },
  emit: function(event, arg1 , arg2) {
    if(this.listeners.hasOwnProperty(event)) {
      this.listeners[event].forEach(function(fn) {
        fn(arg1, arg2);
      });
    }
  }
};



// coords receievd
// - 
// page load
//   listeners
//     - get coords from browser
//     - load map
//     - load all claps from database
//     - load markers for all claps with stored coords
//
// new claps
//   listeners
//     - add to database
//     - add marker
//     -
//
// delete clap emit event
//   listeners
//     - remove clap from database
//     - remove marker from map
