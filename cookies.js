var http = require('http');
var assert = require('assert');

// function to read a cookie

function parseCookies (request) {
  var list = {},
  rc = request.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  console.log(list);
  return list;
}

// function to test if there is already a userId cookie

function checkIfCookieExists (request) {
  var cookiesObject = parseCookies(request);
  // console.log(Object.keys(cookiesObject).length);
  if (Object.keys(cookiesObject).length > 0) {
    return true;
  } else {
    return false;
  }
}

// function to create a random userId

var userIdNumbers = [];

function isInArray(value, array) {
  if (array.indexOf(value) > -1) {
      return false;
  } else {
      return true;
  }
}

function getRandomUserId(min, max) {
  var userId = (Math.random() * (max - min) + min).toFixed().toString();
  if (isInArray(userId, userIdNumbers) === false) {
      userIdNumbers.push(userId);
      return userId;
  } else {
      var differentUserId = (Math.random() * (max - min) + min).toFixed().toString();
      userIdNumbers.push(differentUserId);
      return differentUserId;
  }
}

// creating the server

http.createServer(function (request, response) {

  // writing a cookie

  if (checkIfCookieExists === false) {
    response.writeHead(200, {
      'Set-Cookie': 'userId=' + getRandomUserId(1000, 100000),
      'Content-Type': 'text/plain'
    });
  }

  // reading a cookie
  var cookies = parseCookies(request);
  console.log(cookies);

  checkIfCookieExists(request);

  console.log(userIdNumbers);

  response.end('hello cookies');

  // test to make sure there is a cookie

  // console.log("# visiting the website gives user a cookie");
  //   var cookiesObject = parseCookies(request);
  //   assert.equal(Object.keys(cookiesObject).length, 1);

}).listen(3000);
