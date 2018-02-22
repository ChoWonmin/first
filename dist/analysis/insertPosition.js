'use strict';

var jsonfile = require('jsonfile');
var _ = require('lodash');

var path = '../data/';
var file = path + 'webtoon-result.json';
//const destFile = path + 'food.json';


var webtoonList = jsonfile.readFileSync(file);
var res = {};

var i = 0;

_.forEach(webtoonList, function (webtoon, i) {
    i++;

    if (i > 5) return;
    console.log(webtoon);
});

//console.log(webtoonList);
//jsonfile.writeFileSync(destFile,res);