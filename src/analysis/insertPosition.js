const jsonfile = require('jsonfile');
const _ = require('lodash');

const path = '../data/';
const file = path + 'webtoon-result.json';
//const destFile = path + 'food.json';


const webtoonList = jsonfile.readFileSync(file)['result'];
let res = {};

_.forEach(webtoonList , (webtoon,i)=>{


    console.log(i);


});


//console.log(webtoonList);
//jsonfile.writeFileSync(destFile,res);

