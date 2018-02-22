"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Firebase = new function () {
    var _this = this;

    var config = {
        apiKey: "AIzaSyD6fYU0iI1cmgQ3c1S16MBtXFar39hjLwQ",
        authDomain: "first-webtoon-visualization.firebaseapp.com",
        databaseURL: "https://first-webtoon-visualization.firebaseio.com/"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    // 가장 큰 장점 .
    // 데이터가 추가되거나 삭제될 때
    // 노티를 받을수 있다.
    // pub sub 이다.

    var refWebtoon = database.ref('/webtoon');
    //const refEp = database.ref('/webtoon/BeforeWarm/episodes');

    /**
     * @param struct
     * @returns {boolean}
     */
    this.sendMessage = function (struct) {
        var key = refWebtoon.push().key;
        var summitMessage = {};
        summitMessage[key] = struct;
        refWebtoon.update(summitMessage);
        return true;
    };
    // Create Read

    var childListener = null;
    var epListener = null;

    /**
     * @param event
     */

    /*
    this.setChildListener = event => childListener = event;
     this.setChildListener = function (event) {
        childListener = event;
    };
    */

    // refWebtoon.on('child_added', (snap)=>{
    //     if(childListener !== null) childListener(snap.val());
    // });
    //
    // this.setEpListener = event => epListener = event;
    // refEp.on('child_added', (snap)=>{
    //     if(epListener !== null) epListener(snap.val());
    // });

    this.getInfo = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
            var ref, ret;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            ref = database.ref(name);

                            // data 가져오고,

                            _context.next = 4;
                            return ref.once('value');

                        case 4:
                            ret = _context.sent;
                            return _context.abrupt("return", ret);

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](0);

                            console.log(_context.t0.message);
                            return _context.abrupt("return", _context.t0.message);

                        case 12:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 8]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
}();