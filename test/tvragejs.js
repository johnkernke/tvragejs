var tvragejs = new (require('../lib/tvragejs'))(),
    fs = require('fs'),
    assert = require('assert');

describe('tvragejs', function () {
    describe('.search()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/search.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.search('Game of Thrones', done);
        });

        it('should have 20 show blocks', function (done) {
            tvragejs.search('Game of Thrones', function (err, response) {
                assert.equal(response.show.length, 20);
                done();
            });
        });

        it('should have "Game of Thrones" data as show[0]', function (done) {
            tvragejs.search('Game of Thrones', function (err, response) {
                assert.equal(response.show[0].showid, 24493);
                assert.equal(response.show[0].name, 'Game of Thrones');
                assert.equal(typeof response.show[0].genres.genre, 'object');
                assert.equal(response.show[0].genres.genre.length, 3);
                assert.equal(response.show[0].genres.genre[0], 'Adventure');
                done();
            });
        });
    });

    describe('.fullSearch()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/full_search.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.fullSearch('Game of Thrones', done);
        });

        it('should have 20 show blocks', function (done) {
            tvragejs.fullSearch('Game of Thrones', function (err, response) {
                assert.equal(response.show.length, 20);
                done();
            });
        });

        it('should have "Game of Thrones" data as show[0]', function (done) {
            tvragejs.fullSearch('Game of Thrones', function (err, response) {
                assert.equal(response.show[0].showid, 24493);
                assert.equal(response.show[0].name, 'Game of Thrones');
                assert.equal(typeof response.show[0].genres.genre, 'object');
                assert.equal(response.show[0].genres.genre.length, 3);
                assert.equal(response.show[0].genres.genre[0], 'Adventure');
                assert.equal(response.show[0].network._, 'HBO');
                assert.equal(response.show[0].network.$.country, 'US');
                done();
            });
        });
    });

    describe('.showInfo()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/showinfo.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.showInfo('Game of Thrones', done);
        });

        it('should have "Game of Thrones" data as the response', function (done) {
            tvragejs.showInfo('Game of Thrones', function (err, response) {
                assert.equal(response.showid, 24493);
                assert.equal(response.showname, 'Game of Thrones');
                assert.equal(typeof response.genres.genre, 'object');
                assert.equal(response.genres.genre.length, 3);
                assert.equal(response.genres.genre[0], 'Adventure');
                assert.equal(response.network._, 'HBO');
                assert.equal(response.network.$.country, 'US');
                done();
            });
        });
    });

    describe('.episodeList()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/episode_list.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.episodeList('Game of Thrones', done);
        });

        it('should have 4 seasons', function (done) {
            tvragejs.episodeList('Game of Thrones', function (err, response) {
                assert.equal(response.totalseasons, 4);
                assert.equal(response.episodelist.season.length, 4);
                done();
            });
        });

        it('should have correct season information', function (done) {
            tvragejs.episodeList('Game of Thrones', function (err, response) {
                assert.equal(response.episodelist.season[0].$.no, 1);
                assert.equal(response.episodelist.season[0].episode.length, 10);
                assert.equal(response.episodelist.season[0].episode[0].epnum, 1);
                assert.equal(response.episodelist.season[0].episode[0].title, 'Winter is Coming');
                done();
            });
        });

        it('should have 5 special episodes', function (done) {
            tvragejs.episodeList('Game of Thrones', function (err, response) {
                assert.equal(response.episodelist.special.episode.length, 5);
                done();
            });
        });
    });

    describe('.fullShowInfo()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/full_show_info.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.fullShowInfo('Game of Thrones', done);
        });

        it('should have "Game of Thrones" data as the response', function (done) {
            tvragejs.fullShowInfo('Game of Thrones', function (err, response) {
                assert.equal(response.showid, 24493);
                assert.equal(response.name, 'Game of Thrones');
                assert.equal(typeof response.genres.genre, 'object');
                assert.equal(response.genres.genre.length, 3);
                assert.equal(response.genres.genre[0], 'Adventure');
                assert.equal(response.network._, 'HBO');
                assert.equal(response.network.$.country, 'US');
                done();
            });
        });

        it('should have 4 seasons', function (done) {
            tvragejs.fullShowInfo('Game of Thrones', function (err, response) {
                assert.equal(response.totalseasons, 4);
                assert.equal(response.episodelist.season.length, 4);
                done();
            });
        });

        it('should have correct season information', function (done) {
            tvragejs.fullShowInfo('Game of Thrones', function (err, response) {
                assert.equal(response.episodelist.season[0].$.no, 1);
                assert.equal(response.episodelist.season[0].episode.length, 10);
                assert.equal(response.episodelist.season[0].episode[0].epnum, 1);
                assert.equal(response.episodelist.season[0].episode[0].title, 'Winter is Coming');
                done();
            });
        });

        it('should have 5 special episodes', function (done) {
            tvragejs.fullShowInfo('Game of Thrones', function (err, response) {
                assert.equal(response.episodelist.special.episode.length, 5);
                done();
            });
        });
    });

    describe('.episodeInfo()', function () {
        before(function (done) {
            // mock the http request
            var data = fs.readFileSync(__dirname + '/tvragejs_data/episodeinfo.xml');
            tvragejs._request = function (uri, qs, callback) {
                tvragejs._parser(data, callback);
            };

            done();
        });

        it('should not error', function (done) {
            tvragejs.episodeInfo('Game of Thrones', 1, 1, done);
        });

        it('should have correct show information', function (done) {
            tvragejs.episodeInfo('Game of Thrones', 1, 1, function (err, response) {
                assert.equal(response.$.id, 24493);
                assert.equal(response.name, 'Game of Thrones');
                assert.equal(typeof response.genres.genre, 'object');
                assert.equal(response.genres.genre.length, 3);
                assert.equal(response.genres.genre[0], 'Adventure');
                done();
            });
        });

        it('should have correct episode information', function (done) {
            tvragejs.episodeInfo('Game of thrones', 1, 1, function (err, response) {
                assert.equal(response.episode.number, '01x01');
                assert.equal(response.episode.title, 'Winter is Coming');
                assert.equal(response.episode.airdate, '2011-04-17');
                done();
            });
        });

        it('should have correct latest episode information', function (done) {
            tvragejs.episodeInfo('Game of thrones', 1, 1, function (err, response) {
                assert.equal(response.latestepisode.number, '04x03');
                assert.equal(response.latestepisode.title, 'Breaker of Chains');
                assert.equal(response.latestepisode.airdate, '2014-04-20');
                done();
            });
        });

        it('should have correct next episode information', function (done) {
            tvragejs.episodeInfo('Game of thrones', 1, 1, function (err, response) {
                assert.equal(response.nextepisode.number, '04x04');
                assert.equal(response.nextepisode.title, 'Oathkeeper');
                assert.equal(response.nextepisode.airdate, '2014-04-27');
                assert.equal(response.nextepisode.airtime.length, 2);
                assert.equal(response.nextepisode.airtime[0].$.format, 'RFC3339');
                assert.equal(response.nextepisode.airtime[0]._, '2014-04-27T21:00:00-4:00');
                assert.equal(response.nextepisode.airtime[1].$.format, 'GMT+0 NODST');
                assert.equal(response.nextepisode.airtime[1]._, 1398639600);
                done();
            });
        });
    });
});
