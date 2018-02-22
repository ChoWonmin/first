'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Webtoon = new (_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var webtoonList, root, compareList, nowPage, nowPageList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return Firebase.getInfo('/webtoon');

                case 2:
                    webtoonList = _context.sent.val();
                    root = d3.select('.mds-map');
                    compareList = [];
                    nowPage = 1;
                    nowPageList = 1;


                    _.forEach(webtoonList, function (r, i) {
                        var maxWidth = 750;
                        root.append('circle').attr('cx', Math.random() * maxWidth).attr('cy', Math.random() * maxWidth).attr('r', 10).attr('webtoon_id', i).attr('fill', '#B39DDB');
                    });

                    $('.mds-map>circle').hover(function () {
                        var $webtoonItem = $('.webtoonItem');
                        $webtoonItem.children('*').remove();

                        var webtoon_id = $(this).attr('webtoon_id');
                        var val = webtoonList[webtoon_id];

                        $('<div class="main-thumbnail"><img class="main-thumbnail" src=' + val.webtoon_thumbnail + '></div>\n           <div class="webtoon-name inline-block">' + val.webtoon_title_ko + '</div>\n           <div class="webtoon-text inline-block">' + val.webtoon_writer_ko + '</div>\n           <div class="webtoon-text">' + val.webtoon_intro_ko + '</div>').appendTo($webtoonItem);

                        $webtoonItem.css('display', 'block');
                        $webtoonItem.attr('webtoon_id', $(this).attr('webtoon_id'));

                        var px = $(this).offset().left;
                        var py = $(this).offset().top;

                        $webtoonItem.offset({ left: px + 10, top: py + 10 });

                        $webtoonItem.mouseleave(function () {
                            $webtoonItem.css('display', 'none');
                        });
                    }, function () {});

                    $('.webtoonItem').click(function () {
                        $('.main-page').css('display', 'none');
                        $('.episode-page').css('display', 'block');

                        var webtoon_id = $(this).attr('webtoon_id');
                        var val = webtoonList[webtoon_id].episodes;

                        Paging.printPage(val, nowPage, nowPageList);
                    });

                    $('.mds-map circle').click(function () {
                        var webtoon_id = $(this).attr('webtoon_id');
                        var val = webtoonList[webtoon_id];
                        var isDuplicated = false;

                        for (var i = 0; i < compareList.length; i++) {
                            if (val.webtoon_id == compareList[i].webtoon_id) {
                                isDuplicated = true;
                                break;
                            }
                        }

                        if (!isDuplicated) {
                            compareList.push(val);

                            var $compareList = $('.compareList');

                            $('<div class="compareItem" webtoon_id="' + val.webtoon_id + '">\n                <div><img class="compare-thumbnail" src="' + val.webtoon_thumbnail + '"></div>\n                <div class="compare-info inline-block">\n                    <div class="webtoon-name">' + val.webtoon_title_ko + '</div>\n                    <div class="webtoon-text">' + val.webtoon_writer_ko + '</div>\n                </div>\n                <div class="compare-btn inline-block">\n                    <i class="material-icons compare-remove" webtoon_id="' + val.webtoon_id + '">close</i>\n                </div>\n               </div>').appendTo($compareList);

                            $('.compare-remove').click(function () {
                                var webtoon_id = $(this).attr('webtoon_id');
                                $('.compareItem[webtoon_id=' + webtoon_id + ']').remove();

                                var ind = compareList.findIndex(function (r) {
                                    return r.webtoon_id == webtoon_id;
                                });
                                //console.log('ind',ind);

                                console.log(compareList[ind].webtoon_id);
                                //console.log(compareList[ind].webtoon_id);
                                if (compareList[ind].webtoon_id == webtoon_id) console.log(compareList.splice(ind, 1));

                                //console.log(compareList);
                            });
                        }
                    });

                    $('.back-btn').click(function () {
                        $('.episode-page').css('display', 'none');
                        $('.main-page').css('display', 'block');

                        $('.episodeList').children('*').remove();
                        $('.pageList').children('*').remove();

                        nowPageList = 1;
                        nowPage = 1;
                    });

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})))();