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
                .attr('r', 6)
                .attr('webtoon_id', webtoon['webtoon_title_en'])
                .attr('img_url', webtoon['webtoon_thumbnail']);
        });

        ele = {'webtoon': eleWebtoons, 'episode': eleEpisodes};

    };

    this.addHighlightAction = function () {

        _.forEach(ele['webtoon'], webtoon => {
            let line = {};

            webtoon.on("mouseover", function () {


                const webtoonX = webtoon.attr('cx');
                const webtoonY = webtoon.attr('cy');

                const webtoon_id = webtoon.attr('webtoon_id');
                const epList = ele['episode'][webtoon_id];

                console.log(webtoon_id);

                _.forEach(ele['webtoon'], r=>{
                   r.attr('opacity',0.2);
                });
                _.forEach(ele['episode'], webtoon=>{
                    _.forEach(webtoon,r=>{
                        r.attr('opacity',0.2);
                    });
                });

                webtoon.attr("opacity",1);

                const color = webtoon.attr("fill");

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
                        .attr('stroke-width',weight*0.06)
                        .attr("stroke", color)
                        .attr("opacity", 0.5);
                });

            });

            webtoon.on("mouseout", function(){
                that.removeHighlight(webtoon);
            });
        });

    };

    this.addShowEpisodeAction = function () {
        _.forEach(ele['webtoon'], webtoon => {

            webtoon.on("click", function () {
                const $webtoonItem = $('.webtoonItem');
                $webtoonItem.children('*').remove();

                const img = webtoon.attr("img_url");

                $(`<div class="main-thumbnail"><img class="main-thumbnail" src=${img}></div>
                   <div class="webtoon-name inline-block">wonmin</div>
                   <div class="webtoon-text inline-block">wonmin</div>
                   <div class="webtoon-text">wonmin</div>`).appendTo($webtoonItem);

                $webtoonItem.css('display','block');


                const px = $(webtoon).offset().left;
                const py = $(webtoon).offset().top;

                $webtoonItem.offset({left:px+10, top:py+10});

                $webtoonItem.mouseleave(function(){
                    $webtoonItem.css('display','none');
                });

            });

        });
    }

    this.removeHighlight = function (webtoon) {
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
    }

    this.addHoverAction = function () {
        _.forEach(ele['webtoon'], webtoon => {
            webtoon.on('mouseover', function() {
                console.log(this);
            });
        });
    }

    this.init = async function () {

        axisData = await Util.loadCsvByD3('/data/image.csv');

        const maxX = _.maxBy(axisData, d => d.x * 1).x * 1;
        const maxY = _.maxBy(axisData, d => d.y * 1).y * 1;


        ratio.x = width / maxX;
        ratio.y = height / maxY;


        that.drawAxis();

        await that.drawNode();

        that.addHighlightAction();
        that.addShowEpisodeAction();
    }
};

MDS.init();
