# TvRage.js

[![Build Status](http://secure.travis-ci.org/johnkernke/tvragejs.png)](http://travis-ci.org/johnkernke/tvragejs)

A library to query against the [TvRage](http://tvrage.com/) API.

## Install

`$ npm install --save tvragejs`

## Usage

The following example shows how to get the first result for a search and
displays its name and show id to the console.
[The XML response from TvRage](http://services.tvrage.com/feeds/search.php?show=Game+of+Thrones)

```javascript
var tvragejs = new (require('tvragejs'))();

tvragejs.search('Game of Thrones', function (err, response) {
    if (err) {
        throw err;
    }

    console.log(response.show[0].name + ': ' + response.show[0].showid);
});
```
## API

Currently implements all feeds as listed on the [TvRage Services Page](http://services.tvrage.com/info.php?page=main)

 - search(show, callback)
 - fullSearch(show, callback)
 - showInfo(show_id, callback)
 - episodeList(show_id, callback)
 - fullShowInfo(show_id, callback)
 - episodeInfo(show_id, season, episode, callback)

`callback` always has the parameters of `err` and `response`. `response` is a
javascript object of the XML that TvRage returns. All tags in the `response`
object have been converted to lower case and the root has been removed (eg,
Results or Show)

## Tests

```
$ npm install
$ npm test
```

[![Build Status](http://secure.travis-ci.org/johnkernke/tvragejs.png)](http://travis-ci.org/johnkernke/tvragejs)

## Contributors

 - [John Kernke](http://github.com/johnkernke)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 John Kernke
