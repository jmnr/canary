
# Canary

## What is Canary?

[![Build Status](https://travis-ci.org/jmnr/canary.png?branch=master)](https://travis-ci.org/jmnr/canary)
[![Code Climate](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/gpa.svg)](https://codeclimate.com/github/jmnr/canary)
[![Test Coverage](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/coverage.svg)](https://codeclimate.com/github/jmnr/canary/coverage)
[![Dependency Status](https://david-dm.org/jmnr/canary.svg)](https://david-dm.org/jmnr/canary)
[![devDependency Status](https://david-dm.org/jmnr/canary/dev-status.svg)](https://david-dm.org/jmnr/canary#info=devDependencies)

Canary is a social media networking sensation, built by four students at [Founders & Coders London](http://foundersandcoders.org/). Canary gives the aging Twitter format a make-over with Node.js and an attractive new colour scheme.

Canary does not handle tweets, dealing exclusively in "claps". Every visitor to the site has the opportunity to contribute claps. Each clap is limited to 141 characters.

## Why are we building Canary?

We're building Canary as a learning exercise in using Node.js for large-scale projects, and to provide a hipster twitter alternative for those looking for a social network out of the mainstream.

## How is Canary built?

We followed these steps to build Canary:

### Step 1

- [x] Make Create, Read and Delete (CR-D) endpoints

- [x] Store tweets as JSON in memory

### Step 2

- [x] Store Tweets in the file system

### Step 3

- [ ] Use Cookies to restrict tweet deletion to the browser from which the tweet was originally created (in progress)

Cookies are being handled server-side, written and read through the header of the HTTP request. We are using randomly-generated userIds to attach an identity to each clap. This then determines who can delete a clap.

### Step 4

- [ ] Move Tweets to Redis

### Step 5

- [ ] Deploy to Heroku

### Step 6

- [x] Add real-time updates of tweets

### Stretch goals

- [ ] Hash tag functionality

##How can you run Canary?

You will need to have nodejs and nodemon installed, plus a basic understanding of git and your terminal to get this working.

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
