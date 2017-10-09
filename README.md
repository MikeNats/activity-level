[![Build Status](https://travis-ci.org/MikeNats/activity-level.svg)](https://travis-ci.org/MikeNats/activity-level) 

# Activity level

* React-Redux.
* Foundation sites.
* Unit tests: jasmine, jest, enzyme.
* e2e tests: cucumber, gherkins, webdriverIO, chai.

## Installation:

```bash
    $ git clone https://github.com/MikeNats/activity-level.git

    $ cd activity-level

    $ npm i

    $ brew install watchman for watching untitest
```

## How to use:

### Local development mode
Dev server & watch.
Listens at [http://localhost:8080](http://localhost:8080)

```bash
    $ npm run start
```

### To build for CI deployment.
Deploy folders: build, assets, index.html

```bash
    $ npm run build:dev
```

### To build for production deployment.
Deploy folders: build, assets, index.html
```bash
    $ npm run build
```

## Test:

To run unit tests

```bash
    $ npm test:unit
```
To watch unit tests

```bash
    $ npm test:unit
```
To run e2e tests

```bash
    $ npm test:e2e
```
