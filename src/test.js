const MDS = new function () {

    const that = this;

    let axisData;

    const svg = d3.select('#mds');
    const underRoot = svg.append('g');
    const root = svg.append('g');

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

    this.drawNode = async function () {
        let webtoonList = await Util.loadJsonSync('data/webtoon-result.json');

        let eleEpisodes = {};
        console.log('webtoonList', webtoonList);

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
                    .attr('opacity', 0.3)
                    .attr('webtoon_id', webtoon['webtoon_title_en'])
                    .attr('weight',episode['weight']);
            });

            return root.append('circle')
                .attr('cx', webtoon['x'] * ratio.x)
                .attr('cy', webtoon['y'] * ratio.y)
                .attr('fill', color)
                .attr('stroke', 'none')
                .attr('r', 5)
                .attr('webtoon_id', webtoon['webtoon_title_en']);
        });

        ele = {'webtoon': eleWebtoons, 'episode': eleEpisodes};

    };

    this.addShowEpisodeAction = function (source, dest) {

        _.forEach(ele['webtoon'], webtoon => {
            let line = {};

            webtoon.on("mouseover", function () {

                const webtoonX = webtoon.attr('cx');
                const webtoonY = webtoon.attr('cy');

                console.log("in");

                const webtoon_id = webtoon.attr('webtoon_id');
                const epList = ele['episode'][webtoon_id];

                _.forEach(ele['webtoon'], r=>{
                   r.attr('opacity',0.2);
                });
                _.forEach(ele['episode'], webtoon=>{
                    _.forEach(webtoon,r=>{
                        r.attr('opacity',0.2);
                    });
                });

                webtoon.attr("opacity",1);

                _.forEach(epList, episode=>{
                    episode.attr('r',5);
                    episode.attr('opacity',1);

                    const epX = episode.attr('cx');
                    const epY = episode.attr('cy');

                    const weight = episode.attr('weight');

                    line = underRoot.append('line')
                        .attr('x1',webtoonX)
                        .attr('y1',webtoonY)
                        .attr('x2',epX)
                        .attr('y2',epY)
                        .attr('stroke-width',weight*0.3)
                        .attr("stroke", '#fbc');
                });

            });

            webtoon.on("mouseout", function(){
                console.log("out", webtoon);

                _.forEach(ele['webtoon'], r=>{
                    r.attr('opacity',1);
                });
                _.forEach(ele['episode'], webtoon=>{
                    _.forEach(webtoon,r=>{
                        r.attr('opacity',0.3);
                    });
                });

                const webtoon_id = webtoon.attr('webtoon_id');
                const epList = ele['episode'][webtoon_id];

                _.forEach(epList, episode=>{
                    episode.attr('r',2);
                    episode.attr('opacity',0.3);
                });

                d3.selectAll('line').remove();

            });
        });

    };

    this.init = async function () {

        axisData = await Util.loadCsvByD3('/data/image.csv');

        const maxX = _.maxBy(axisData, d => d.x * 1).x * 1;
        const maxY = _.maxBy(axisData, d => d.y * 1).y * 1;


        ratio.x = width / maxX;
        ratio.y = height / maxY;


        that.drawAxis();

        await that.drawNode();

        that.addShowEpisodeAction(ele['webtoon'], ele['episode']);

    };
};

MDS.init();
