### Epic Mail

[![Build Status](https://travis-ci.org/eliemugenzi/epic-mail.svg?branch=develop)](https://travis-ci.org/eliemugenzi/epic-mail)

## API ENDPOINTS

| Ressource URL                    | Methods | Description                 |
| -------------------------------- | ------- | --------------------------- |
| /                                | GET     | The index (welcome message) |
| /api/v1/messages                 | GET     | Fetch all messages          |
| /api/v1/messages/unread/messages | GET     | Fetch all unread messages   |
| /api/v1/messages                 | POST    | Create a new message        |
| /api/v1/messages/:id             | DELETE  | Delete a specific message   |
| /api/v1/messages/:id             | PUT     | Update a specific email     |
| /api/v1/messages/read/messages   | GET     | GET all read messages       |
| /api/v1/messages/draft/messages  | GET     | GET all draft messages      |
| /api/v1/users                    | GET     | Get all contacts            |
| /api/v1/users/:id                | GET     | Get a specific contact      |
| /api/v1/messages/:id             | GET     | Get a single message        |

## Tools Used

### Language

```
*Javascript*
```

### Server Environment

```
 *NodeJS* (run time Environment for running JS codes)
```

### Framework

```
 *Express* (used for building fast APIs)
```

### Testing Framework

```
 *Mocha* and *Chai*
```

### Style Guide

```
*Airbnb*
```

### Continuous Integration

```
Travis CI
```

### Test Coverage

```
nyc
```

### Git badge

```
coveralls
```

### Deployment

```
Heroku
```

### Heroku link Example

[EPIC Mail link](https://elie-epic-mail.herokuapp.com/)

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
