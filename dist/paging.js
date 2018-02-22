'use strict';

var Paging = new function () {

    var contentsPerPage = 25;
    var pagePerPageList = 5;

    this.init = function (contentsPerPage, pagePerPageList) {
        this.contentsPerPage = contentsPerPage;
        this.pagePerPageList = pagePerPageList;
    };

    this.printPage = function (content, nowPage, nowPageList) {
        $('.episodeList').children('*').remove();
        $('.pageList').children('*').remove();

        var finishIndex = nowPage * contentsPerPage;
        var lastPage = Math.ceil(content.length / contentsPerPage);

        if (nowPage == lastPage) finishIndex = content.length;

        for (var i = (nowPage - 1) * contentsPerPage; i < finishIndex; i++) {
            var r = content[i];
            var date = moment(r.episode_date, "YYYYMMDD").format("YYYY.MM.DD");

            $('<div class="episode-item inline-block">\n                <div class="episode-thumbnail"><img class="episode-thumbnail" src="' + r.episode_thumbnail + '"></div>\n                <a href="' + r.episode_url + '"><div class="webtoon-name">' + r.episode_title_ko + '</div></a>\n                <div class="webtoon-text">' + date + '</div>\n                </div>').appendTo('.episodeList');
        }

        var lastPageListNum = Math.ceil(lastPage / pagePerPageList);
        var tmp = pagePerPageList;

        if (nowPageList == lastPageListNum) tmp = lastPage % pagePerPageList;
        if (tmp == 0) tmp = pagePerPageList;

        $('<div class="pageList-forward btn inline-block" valid="true"> \n           <i class="material-icons">keyboard_arrow_left</i>\n           </div>').appendTo('.pageList');
        if (nowPageList == 1) $('.pageList-forward').attr('valid', 'false');

        for (var i = 0; i < tmp; i++) {
            var pageNum = $('<div class="pageNum btn inline-block">' + (i + 1 + (nowPageList - 1) * pagePerPageList) + '</div>').appendTo('.pageList');
            if (pageNum.text() == nowPage) pageNum.attr('valid', 'true');
        }

        $('<div class="pageList-back btn inline-block" valid="true">\n           <i class="material-icons">keyboard_arrow_right</i>\n           </div>').appendTo('.pageList');
        if (nowPageList == lastPageListNum) $('.pageList-back').attr('valid', 'false');

        $('.pageList-forward[valid=\'true\']').click(function () {
            nowPageList -= 1;
            nowPage = nowPageList * pagePerPageList;
            Paging.printPage(content, nowPage, nowPageList);
        });

        $('.pageList-back[valid=\'true\']').click(function () {
            nowPage = nowPageList * pagePerPageList + 1;
            nowPageList += 1;
            Paging.printPage(content, nowPage, nowPageList);
        });

        $('.pageNum').click(function () {
            nowPage = $(this).text();
            Paging.printPage(content, nowPage, nowPageList);
        });
    };
}();