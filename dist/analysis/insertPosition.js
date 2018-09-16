'use strict';

var jsonfile = require('jsonfile');
var _ = require('lodash');

var path = '../data/';
var file = path + 'webtoon.json';
var destFile = path + 'webtoon-result.json';

var webtoonList = jsonfile.readFileSync(file)['new_result'];
var res = jsonfile.readFileSync(file)['new_webtoon'];
var origin = { x: 318, y: 335 };

_.forEach(webtoonList, function (webtoon, webtoonId) {

    var xs = [];
    var ys = [];

    _.forEach(webtoon, function (episode, episodeId) {

        var episodeValue = episode[Object.keys(episode)];
        var episodeTfidf = 0;

        _.forEach(episodeValue, function (coloring) {
            if (coloring['tf-idf'] < 50) episodeTfidf += coloring['tf-idf'];
        });

        var x = origin.x;
        var y = origin.y;

        _.forEach(episodeValue, function (coloring) {
            if (coloring['tf-idf'] < 50) {
                var weight = coloring['tf-idf'] / episodeTfidf; //* (coloring['tf-idf']/episodeTfidf);
                x += (coloring['x'] - origin.x) * weight * 1.3;
                y += (coloring['y'] - origin.y) * weight * 1.3;
            }
        });

        res[webtoonId]['episodes'][episodeId]['weight'] = episodeTfidf;
        res[webtoonId]['episodes'][episodeId]['colors'] = episodeValue;
        res[webtoonId]['episodes'][episodeId]['x'] = x;
        res[webtoonId]['episodes'][episodeId]['y'] = y;

        xs.push(x);
        ys.push(y);
    });

    res[webtoonId]['x'] = _.mean(xs);
    res[webtoonId]['y'] = _.mean(ys);
});

jsonfile.writeFileSync(destFile, res);