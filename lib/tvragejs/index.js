var request = require('request'),
    xml2js = require('xml2js').parseString;

module.exports = function () {
    var self = this;

    // helper functions

    self._get = function (command, params, callback) {
        self._request('http://services.tvrage.com/feeds/' + command + '.php', params, callback);
    }

    self._request = function (uri, qs, callback) {
        request({
            uri: uri,
            qs: qs
        }, function (err, response, body) {
            if (err) {
                return callback('API Error');
            }

            self._parser(body, callback);
        });
    };

    self._parser = function (body, callback) {
        xml2js(body, {explicitArray: false, explicitRoot: false, normalizeTags: true}, function (err, result) {
            if (err) {
                return callback('Error parsing response');
            }

            return callback(null, result);
        });
    };

    // api functions

    self.search = function (show, callback) {
        self._get('search', {
            show: show
        }, callback);
    };

    self.fullSearch = function (show, callback) {
        self._get('full_search', {
            show: show
        }, callback);
    };

    self.showInfo = function (sid, callback) {
        self._get('showinfo', {
            sid: sid
        }, callback);
    };

    self.episodeList = function (sid, callback) {
        self._get('episode_list', {
            sid: sid
        }, callback);
    };

    self.fullShowInfo = function (sid, callback) {
        self._get('full_show_info', {
            sid: sid
        }, callback);
    };

    self.episodeInfo = function (sid, season, episode, callback) {
        self._get('episode_info', {
            sid: sid,
            epi: season + 'x' + episode
        }, callback);
    };
};
