'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var analysis = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result, imageList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    result = Format.format();
                    _context.next = 3;
                    return Util.loadCsvByD3('/data/image.csv');

                case 3:
                    imageList = _context.sent;


                    console.log('result', result);
                    console.log('imageList', imageList);

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})))();