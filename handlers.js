var handlers = {};

handlers['POST /create'] = function(req, res) {

  res.end();
}

// handlers['GET /read'] = function(req, res) {
//   // res.write('read');
//   res.end();
// }
//
// handlers['DELETE /delete'] = function(req, res) {
//   res.write('delete');
//   res.end();
// }

handlers.generic = function(req, res) {
  res.write('generic');
  //reading files - use dirname etc for index.html and js etc
  res.end();
}

module.exports = handlers;
