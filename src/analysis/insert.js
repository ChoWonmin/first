const jsonfile = require('jsonfile');
const _ = require('lodash');

const path = '../data/';
const file = path + 'webtoon-ori.json';
const destFile = path + 'new-webtoon.json';


const webtoonList = jsonfile.readFileSync(file)['new_webtoon'];

jsonfile.writeFileSync(destFile, webtoonList);

