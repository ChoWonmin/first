const Format = new async function () {

    let result = (await Util.loadJson('/data/webtoon-result.json'))['result'];

    _.forEach(result, (webtoon, key) => {

        _.forEach(webtoon, (episode, i) => {
            const epKey = episode[0];

            const val = {};
            val[epKey] = _.drop(episode, 1);

            if (val[epKey].length < 3) {
                console.log('invalid ', key, i, epKey, val[epKey]);

                $(`<div><a href="http://webtoon.daum.net/webtoon/viewer/${epKey}">
                    ${key} , ${i} </a></div>`).appendTo('.url');
            }


            webtoon[i] = val;

        });

    });

    console.log(result);


}
