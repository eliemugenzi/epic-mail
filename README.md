### Epic Mail

[![Build Status](https://travis-ci.org/eliemugenzi/epic-mail.svg?branch=develop)](https://travis-ci.org/eliemugenzi/epic-mail)

[![Coverage Status](https://coveralls.io/repos/github/eliemugenzi/epic-mail/badge.svg?branch=develop&kill_cache=1)](https://coveralls.io/github/eliemugenzi/epic-mail?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/368eba3147aeed2aaff9/maintainability)](https://codeclimate.com/github/eliemugenzi/epic-mail/maintainability)

## API ENDPOINTS

| Ressource URL                    | Methods | Description                 |
| -------------------------------- | ------- | --------------------------- |
| /                                | GET     | The index (welcome message) |
/ api/v1/auth/signup               | POST    | Create an account           |
| /api/v1/auth/login               | POST    | Login                       |
| /api/v1/messages                 | GET     | Fetch all messages          |
| /api/v1/messages/unread/messages | GET     | Fetch all unread messages   |
| /api/v1/messages                 | POST    | Create a new message        |
| /api/v1/messages/:id             | DELETE  | Delete a specific message   |
| /api/v1/messages/read/messages   | GET     | GET all read messages       |
| /api/v1/messages/draft/messages  | GET     | GET all draft messages      |
| /api/v1/users                    | GET     | Get all contacts            |
| /api/v1/users/:id                | GET     | Get a specific contact      |
| /api/v1/messages/:id             | GET     | Get a single message        |
| /api/v1/messages/public/:id      | GET     | Get a single message for everyone

## Tools Used

- Language: Javascript
- Server environment: Node.js (A javascript server side environment which can help you build web applications,microservices and APIs)
- Back-end framework: Express (A server side web framework which can help you build back-end applications and APIs fast.)
- Testing library: Mocha.js (A javascript library used for unit testing)
- Assertion library: Chai (A Javascript library to create assertions used in testing)
- Continuous integration: Travis CI
- Test coverage: nyc (A javascript library used to generate coverage reports)
- Test coverage badge: Coveralls (It shows test coverage statistics)
- Front-end deployment: Github Pages
- Back-end deployment: Heroku

### Github Pages link

[EPIC Mail UI](https://eliemugenzi.github.io/epic-mail/UI/)

### Heroku link Example

[EPIC Mail Endpoints](https://elie-epic-mail.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing

The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server

```
> npm start
```

## Run the test

```
> npm test
```

**Version 1.0.0**

## Contributor

- Elie Mugenzi <eliemugenzi@gmail.com>

---

## License & copyright

Copyright (c) Elie Mugenzi
