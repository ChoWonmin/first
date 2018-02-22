'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var episode = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var episodeList, x, y, calc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    calc = function calc(x1, y1, x2, y2) {

                        var resX = (x2 + x1) / 2;
                        var resY = (y2 + y1) / 2;

                        return resX + ' , ' + resY;
                    };

                    _context.next = 3;
                    return Firebase.getInfo('/result/1punchTeacher');

                case 3:
                    episodeList = _context.sent.val();


                    //console.log(episodeList);

                    x = [1, 5, 7];
                    y = [2, 3, 2];


                    console.log('1 2 :: ', calc(x[0], y[0], x[1], y[1]));
                    console.log('2 3 :: ', calc(x[1], y[1], x[2], y[2]));
                    console.log('3 2 :: ', calc(x[2], y[2], x[0], y[0]));

                    console.log('=============================');

                    console.log('3 , 2.5 :: ', calc(3, 2.5, x[2], y[2]));
                    console.log('6 , 2.5 :: ', calc(6, 2.5, x[0], y[0]));

                    _.forEach(episodeList, function (r) {
                        // console.log('r ' , r);
                        // console.log('==========================');
                        for (var i = 0; i < r.length; i++) {
                            for (var j = 1; j < r[i].length; j++) {
                                console.log('r[i] ', r[i][j].x, r[i][j].y);
                            } // , r[i]);

                        }
                    });

                case 13:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})))();