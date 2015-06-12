
# Canary

## What is Canary?

[![Build Status](https://travis-ci.org/jmnr/canary.png?branch=master)](https://travis-ci.org/jmnr/canary)
[![Code Climate](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/gpa.svg)](https://codeclimate.com/github/jmnr/canary)
[![Test Coverage](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/coverage.svg)](https://codeclimate.com/github/jmnr/canary/coverage)
[![Dependency Status](https://david-dm.org/jmnr/canary.svg)](https://david-dm.org/jmnr/canary)
[![devDependency Status](https://david-dm.org/jmnr/canary/dev-status.svg)](https://david-dm.org/jmnr/canary#info=devDependencies)

Canary is a code bragging community, built by four students at [Founders & Coders London](http://foundersandcoders.org/). Users are invited to brag to Canary about their coding triumphs and receive virtual applause for their breakthrough.

## Why are we building Canary?

We're building Canary as a learning exercise in using Node.js for large-scale projects, as well as to provide a lifeline for needy coders in search of validation.

## How is Canary built?

We followed these steps to build Canary:

- [x] Make Create, Read and Delete (CR-D) endpoints
- [x] Store tweets as JSON in memory (now obsolete, as we're using Redis)
- [x] Store Tweets in the file system
- [x] Use Cookies to restrict tweet deletion to the browser from which the tweet was originally created
- [x] Move Tweets to Redis
- [x] Deploy to Heroku
- [x] Add real-time updates of tweets with Socket.io
- [x] Hash tag functionality (for different programming languages)
- [x] Attach geolocation data to every clap
- [ ] Allow users to select their own location from a map
- [x] Display all claps on a map
- [x] Username functionality
- [ ] "Impressed" button

##How can you run Canary?

You will need to have node.js, nodemon and redis installed, plus a basic understanding of git and your terminal to get this working.

### 1. Clone the repo

```sh
git clone https://github.com/jmnr/canary.git
```

### 2. Install the node.js dependencies:

```sh
npm install
```

### 3. Run the Server with [Nodemon](https://github.com/remy/nodemon):

```sh
npm run nodemon
```
### 4. Go to localhost:8000 in your browser.
