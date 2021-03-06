'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MDS = new function () {

    var that = this;

    var axisData = void 0;

    var root = d3.select('#mds');
    var $root = $('#mds');
    var width = $root.width() - 20,
        height = $root.height() - 20;

    var ratio = {
        x: 1,
        y: 1
    };
    var axises = {};

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
        var webtoonList;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //const webtoonList = (await Firebase.getInfo('/result')).val();
                        webtoonList = Util.loadJsonSync('data/webtoon.json')['result2'];


                        _.forEach(webtoonList, function (webtoon, k) {
                            var xs = [],
                                ys = [];
                            var color = d3.rgb(Math.random() * 150 + 50, Math.random() * 150 + 50, Math.random() * 150 + 50);

                            _.forEach(webtoon, function (episode) {
                                var tfidfEpisode = 0;
                                _.forEach(_.drop(episode, 1), function (color) {
                                    tfidfEpisode += color['tf-idf'] * 1;
                                });
                                var x = width / 2;
                                var y = height / 2;

                                _.forEach(_.drop(episode, 1), function (color) {
                                    var axis = axises[color.image];

                                    x += (axis.x - width / 2) * (color['tf-idf'] / tfidfEpisode);
                                    y += (axis.y - height / 2) * color['tf-idf'] / tfidfEpisode;
                                });

                                // 제곱
                                // 플로킹 floking


                                root.append('circle').attr('cx', x).attr('cy', y).attr('fill', color).attr('stroke', 'none').attr('r', 2).attr('opacity', 0.2);
                                xs.push(x);
                                ys.push(y);
                            });

                            root.append('circle').attr('cx', _.mean(xs)).attr('cy', _.mean(ys)).attr('fill', color).attr('stroke', 'none').attr('r', 5);
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

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

                        that.drawNode();

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}();

MDS.init();