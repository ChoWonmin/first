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
        const webtoonList = (await Firebase.getInfo('/result')).val();
        //const webtoonList = Util.loadJson('data/webtoon.json')['result2'];

        _.forEach(webtoonList, (webtoon, k) => {
            let xs = [] , ys = []
            const color = d3.rgb(Math.random() * 150 + 50,
                Math.random() * 150 + 50,
                Math.random() * 150 + 50);

            _.forEach(webtoon, episode => {
                let tfidfEpisode = 0;
                _.forEach(_.drop(episode, 1), color => {
                    tfidfEpisode += color['tf-idf'] * 1;
                });
                let x = width / 2;
                let y = height / 2;

                _.forEach(_.drop(episode, 1), color =>{
                    const axis = axises[color.image];
                    x += (axis.x - width / 2) * color['tf-idf'] / tfidfEpisode;
                    y += (axis.y - height / 2) * color['tf-idf'] / tfidfEpisode;
                });

                root.append('circle')
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', color)
                    .attr('stroke', 'none')
                    .attr('r', 2)
                    .attr('opacity',0.2);
                xs.push(x);
                ys.push(y);
            });

            root.append('circle')
                .attr('cx', _.mean(xs))
                .attr('cy', _.mean(ys))
                .attr('fill', color)
                .attr('stroke', 'none')
                .attr('r', 5);

        });

    };

    this.init = async function () {

        axisData = await Util.loadCsvByD3('/data/image.csv');

        const maxX = _.maxBy(axisData, d => d.x * 1).x * 1;
        const maxY = _.maxBy(axisData, d => d.y * 1).y * 1;


        ratio.x = width / maxX;
        ratio.y = height / maxY;


        that.drawAxis();

        that.drawNode();
        
    };
};


MDS.init();