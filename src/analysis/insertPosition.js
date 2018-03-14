const jsonfile = require('jsonfile');
const _ = require('lodash');

const path = '../data/';
const file = path + 'webtoon.json';
const destFile = path + 'webtoon-result.json';


const webtoonList = jsonfile.readFileSync(file)['new_result'];
let res = jsonfile.readFileSync(file)['new_webtoon'];
let origin = {x:318, y:335};

_.forEach(webtoonList , (webtoon, webtoonId)=>{

    let xs = [];
    let ys = [];

    _.forEach(webtoon , (episode, episodeId)=>{

        let episodeValue = episode[Object.keys(episode)];
        let episodeTfidf = 0;

        _.forEach(episodeValue , coloring => {
            if(coloring['tf-idf'] < 30)
                episodeTfidf += coloring['tf-idf'];
        });

        let x = origin.x;
        let y = origin.y;

        _.forEach(episodeValue , coloring => {
            if(coloring['tf-idf'] < 30){
                const weight = (coloring['tf-idf']/episodeTfidf); //* (coloring['tf-idf']/episodeTfidf);
                x += (coloring['x'] - origin.x) * weight * 1.5;
                y += (coloring['y'] - origin.y) * weight * 1.5;
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


jsonfile.writeFileSync(destFile,res);

