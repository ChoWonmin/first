const MDS = new function () {

    const that = this;

    let axisData;

    const root = d3.select('#mds');
    const $root = $('#mds');
    const width = $root.width() - 20,
        height = $root.height() - 20;

    let ratio = {
        x: 1,
        y: 1,
    };
    let axises = {};
    let ele = {};



    this.drawAxis = function () {
        _.forEach(axisData, axis => {
            const g = root.append('g');
            const x = axis.x * ratio.x;
            const y = axis.y * ratio.y;
            const circle = g.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 5)
                .attr('stroke', '#aaa')
                .attr('fill', 'none');

            const text = g.append('text')
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('stroke', '#aaa')
                .attr('y', y - 12)
                .attr('font-size', 10)
                .text(axis.image);
            axises[axis.image] = {
                g,
                circle,
                text,
                x,
                y,
            }
        });

    };

    this.drawNode = function () {
        const webtoonList = Util.loadJson('data/webtoon-result.json');

        let eleEpisodes = {};
        console.log(webtoonList);

        const eleWebtoons = _.map(webtoonList, webtoon => {
            const color = d3.rgb(Math.random() * 150 + 50,
                Math.random() * 150 + 50,
                Math.random() * 150 + 50);

            eleEpisodes[webtoon['webtoon_title_en']] = _.map(webtoon['episodes'], episode => {

                 return root.append('circle')
                    .attr('cx', episode['x'] * ratio.x)
                    .attr('cy', episode['y'] * ratio.y)
                    .attr('fill', color)
                    .attr('stroke', 'none')
                    .attr('r', 2)
                    .attr('opacity',0.2)
                    .attr('webtoon', webtoon['webtoon_title_en']);
                });

            return root.append('circle')
                .attr('cx', webtoon['x'] * ratio.x)
                .attr('cy', webtoon['y'] * ratio.y)
                .attr('fill', color)
                .attr('stroke', 'none')
                .attr('r', 5)
                .attr('webtoon', webtoon['webtoon_title_en']);
        });

        ele = {'webtoon' : eleWebtoons , 'episode' : eleEpisodes};

        console.log('ele' , ele);

    };

    this.addShowEpisodeAction = function (source , dest) {

        let tmp = $('tmp' , '#svg');
        console.log('tmp' , tmp);

        /*
        source.hover(function () {
            console.log('aaaa');
            dest.attr('opacity',1);
        },function () {
            dest.attr('opacity',0.2);
        });
        */
    };

    this.init = async function () {

        axisData = await Util.loadCsvByD3('/data/image.csv');

        const maxX = _.maxBy(axisData, d => d.x * 1).x * 1;
        const maxY = _.maxBy(axisData, d => d.y * 1).y * 1;


        ratio.x = width / maxX;
        ratio.y = height / maxY;


        that.drawAxis();

        that.drawNode();

        that.addShowEpisodeAction(ele['webtoon'] , ele['episode']);

    };
};


MDS.init();
