'use strict';

var test = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var ret, $variety;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Util.loadCsvByD3('/data/iris.csv');

                    case 2:
                        ret = _context.sent;

                        Vis.draw(ret);

                        $variety = _.chain(ret).map(function (r) {
                            return r.variety;
                        }).uniq().map(function (d) {
                            return $('<div>' + d + '</div>').appendTo('.left').click(function () {
                                var dset = _.filter(ret, function (r) {
                                    return r.variety === d;
                                });
                                Vis.draw(dset);
                            });
                        }).value();

                        // console.log(variety);

                        // [1,2,3 ] => 각각 1,2,3 에대해 어떠한 작업을 수행하고
                        // 다시 배열로 묶어주는거

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function test() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Vis = new function () {
    this.data = []; // public
    var data = []; // private


    var root = d3.select('#renderer');

    this.draw = function (dataSet) {
        root.selectAll('*').remove();

        for (var i = 0; i < 4; i++) {
            root.append('line').attr('x1', i * 100).attr('y1', 0).attr('x2', i * 100).attr('y2', 500).attr('stroke', '#aaa');
        }

        var Axis = Object.keys(dataSet[0]);
        console.log(Axis);
        console.log(dataSet[0]);
        var height = 50;
        _.forEach(dataSet, function (d) {
            for (var i = 0; i < 3; i++) {
                root.append('line').attr('x1', i * 100).attr('y1', d[Axis[i]] * height).attr('x2', i * 100 + 100).attr('y2', d[Axis[i + 1]] * height).attr('stroke', '#f00');
            }
        });
    };
}();

test();