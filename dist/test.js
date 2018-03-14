'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MDS = new function () {

    var that = this;

    var axisData = void 0;

    var svg = d3.select('#mds');
    var underRoot = svg.append('g');
    var root = svg.append('g');

    var $root = $('#mds');
    var width = $root.width() - 20,
        height = $root.height() - 20;

    var ratio = {
        x: 1,
        y: 1
    };
    var axises = {};
    var ele = {};

    this.drawAxis = function () {
        _.forEach(axisData, function (axis) {
            var g = root.append('g');
            var x = axis.x * ratio.x;
            var y = axis.y * ratio.y;
            var circle = g.append('circle').attr('cx', x).attr('cy', y).attr('r', 5).attr('stroke', '#aaa').attr('fill', 'none');

            var text = g.append('text').attr('alignment-baseline', 'middle').attr('text-anchor', 'middle').attr('x', x).attr('stroke', '#aaa').attr('y', y - 12).attr('font-size', 10).text(axis.image);
            axises[axis.image] = {
                g: g,
                circle: circle,
                text: text,
                x: x,
                y: y
            };
        });
    };

    this.drawNode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var webtoonList, eleEpisodes, eleWebtoons;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Util.loadJsonSync('data/webtoon-result.json');

                    case 2:
                        webtoonList = _context.sent;
                        eleEpisodes = {};

                        console.log('webtoonList', webtoonList);

                        eleWebtoons = _.map(webtoonList, function (webtoon) {
                            var color = d3.rgb(Math.random() * 150 + 50, Math.random() * 150 + 50, Math.random() * 150 + 50);

                            eleEpisodes[webtoon['webtoon_title_en']] = _.map(webtoon['episodes'], function (episode) {

                                return root.append('circle').attr('cx', episode['x'] * ratio.x).attr('cy', episode['y'] * ratio.y).attr('fill', color).attr('stroke', 'none').attr('r', 2).attr('opacity', 0.3).attr('webtoon_id', webtoon['webtoon_title_en']).attr('weight', episode['weight']);
                            });

                            return root.append('circle').attr('cx', webtoon['x'] * ratio.x).attr('cy', webtoon['y'] * ratio.y).attr('fill', color).attr('stroke', 'none').attr('r', 5).attr('webtoon_id', webtoon['webtoon_title_en']);
                        });


                        ele = { 'webtoon': eleWebtoons, 'episode': eleEpisodes };

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    this.addShowEpisodeAction = function (source, dest) {

        _.forEach(ele['webtoon'], function (webtoon) {
            var line = {};

            webtoon.on("mouseover", function () {

                var webtoonX = webtoon.attr('cx');
                var webtoonY = webtoon.attr('cy');

                console.log("in");

                var webtoon_id = webtoon.attr('webtoon_id');
                var epList = ele['episode'][webtoon_id];

                _.forEach(ele['webtoon'], function (r) {
                    r.attr('opacity', 0.2);
                });
                _.forEach(ele['episode'], function (webtoon) {
                    _.forEach(webtoon, function (r) {
                        r.attr('opacity', 0.2);
                    });
                });

                webtoon.attr("opacity", 1);

                _.forEach(epList, function (episode) {
                    episode.attr('r', 5);
                    episode.attr('opacity', 1);

                    var epX = episode.attr('cx');
                    var epY = episode.attr('cy');

                    var weight = episode.attr('weight');

                    line = underRoot.append('line').attr('x1', webtoonX).attr('y1', webtoonY).attr('x2', epX).attr('y2', epY).attr('stroke-width', weight * 0.3).attr("stroke", '#fbc');
                });
            });

            webtoon.on("mouseout", function () {
                console.log("out", webtoon);

                _.forEach(ele['webtoon'], function (r) {
                    r.attr('opacity', 1);
                });
                _.forEach(ele['episode'], function (webtoon) {
                    _.forEach(webtoon, function (r) {
                        r.attr('opacity', 0.3);
                    });
                });

                var webtoon_id = webtoon.attr('webtoon_id');
                var epList = ele['episode'][webtoon_id];

                _.forEach(epList, function (episode) {
                    episode.attr('r', 2);
                    episode.attr('opacity', 0.3);
                });

                d3.selectAll('line').remove();
            });
        });
    };

    this.init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var maxX, maxY;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return Util.loadCsvByD3('/data/image.csv');

                    case 2:
                        axisData = _context2.sent;
                        maxX = _.maxBy(axisData, function (d) {
                            return d.x * 1;
                        }).x * 1;
                        maxY = _.maxBy(axisData, function (d) {
                            return d.y * 1;
                        }).y * 1;


                        ratio.x = width / maxX;
                        ratio.y = height / maxY;

                        that.drawAxis();

                        _context2.next = 10;
                        return that.drawNode();

                    case 10:

                        that.addShowEpisodeAction(ele['webtoon'], ele['episode']);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}();

MDS.init();