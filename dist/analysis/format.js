'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Format = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return Util.loadJson('/data/webtoon-result.json');

                case 2:
                    result = _context.sent['result'];


                    _.forEach(result, function (webtoon, key) {

                        _.forEach(webtoon, function (episode, i) {
                            var epKey = episode[0];

                            var val = {};
                            val[epKey] = _.drop(episode, 1);

                            if (val[epKey].length < 3) {
                                console.log('invalid ', key, i, epKey, val[epKey]);

                                $('<div><a href="http://webtoon.daum.net/webtoon/viewer/' + epKey + '">\n                    ' + key + ' , ' + i + ' </a></div>').appendTo('.url');
                            }

                            webtoon[i] = val;
                        });
                    });

                    console.log(result);

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})))();