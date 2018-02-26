'use strict';

var jsonfile = require('jsonfile');
var _ = require('lodash');

var path = '../data/';
var file = path + 'webtoon.json';
var destFile = path + 'webtoon-result.json';

var webtoonList = jsonfile.readFileSync(file)['result2'];
var res = jsonfile.readFileSync(file)['webtoon'];
var origin = { x: 318, y: 335 };

_.forEach(webtoonList, function (webtoon, webtoonId) {

    var xs = [];
    var ys = [];

    _.forEach(webtoon, function (episode, episodeId) {

        var episodeValue = episode[Object.keys(episode)];
        var episodeTfidf = 0;

        _.forEach(episodeValue, function (coloring) {
            episodeTfidf += coloring['tf-idf'];
        });

        var x = origin.x;
        var y = origin.y;

        var tmp = 0;

        _.forEach(episodeValue, function (coloring) {
            x += (coloring['x'] - origin.x) * (coloring['tf-idf'] / episodeTfidf);
            y += (coloring['y'] - origin.y) * (coloring['tf-idf'] / episodeTfidf);
        });

        res[webtoonId]['episodes'][episodeId]['colors'] = episodeValue;
        res[webtoonId]['episodes'][episodeId]['x'] = x;
        res[webtoonId]['episodes'][episodeId]['y'] = y;

        xs.push(x);
        ys.push(y);
    });

    res[webtoonId]['x'] = _.mean(xs);
    res[webtoonId]['y'] = _.mean(ys);
});

//console.log(webtoonList['steelrain2'][0]);
//console.log(res['steelrain2']['episodes'][0]);
jsonfile.writeFileSync(destFile, res);