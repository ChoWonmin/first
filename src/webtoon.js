const Webtoon  = new async function () {

    const webtoonList = (await Firebase.getInfo('/webtoon')).val();
    const root = d3.select('.mds-map');

    let compareList = [];

    let nowPage = 1;
    let nowPageList = 1;

    _.forEach(webtoonList, (r, i) => {
        const maxWidth = 750;
        root.append('circle')
            .attr('cx', Math.random() * maxWidth)
            .attr('cy', Math.random() * maxWidth)
            .attr('r', 10)
            .attr('webtoon_id',i)
            .attr('fill','#B39DDB');
    });


    $('.mds-map>circle').hover(function () {
        const $webtoonItem = $('.webtoonItem');
        $webtoonItem.children('*').remove();

        const webtoon_id = $(this).attr('webtoon_id');
        const val = webtoonList[webtoon_id];

        $(`<div class="main-thumbnail"><img class="main-thumbnail" src=${val.webtoon_thumbnail}></div>
           <div class="webtoon-name inline-block">${val.webtoon_title_ko}</div>
           <div class="webtoon-text inline-block">${val.webtoon_writer_ko}</div>
           <div class="webtoon-text">${val.webtoon_intro_ko}</div>`).appendTo($webtoonItem);

        $webtoonItem.css('display','block');
        $webtoonItem.attr('webtoon_id',$(this).attr('webtoon_id'))

        const px = $(this).offset().left;
        const py = $(this).offset().top;

        $webtoonItem.offset({left:px+10, top:py+10});

        $webtoonItem.mouseleave(function(){
            $webtoonItem.css('display','none');
        });
    },function(){});


    $('.webtoonItem').click(function () {
        $('.main-page').css('display','none');
        $('.episode-page').css('display','block');

        const webtoon_id = $(this).attr('webtoon_id');
        const val = webtoonList[webtoon_id].episodes;

        Paging.printPage(val , nowPage , nowPageList);
    });

    $('.mds-map circle').click(function () {
        const webtoon_id = $(this).attr('webtoon_id');
        const val = webtoonList[webtoon_id];
        let isDuplicated = false;

        for (var i = 0 ; i < compareList.length ; i++){
            if(val.webtoon_id == compareList[i].webtoon_id) {
                isDuplicated = true;
                break;
            }
        }

        if(!isDuplicated){
            compareList.push(val);

            const $compareList = $('.compareList');

            $(`<div class="compareItem" webtoon_id="${val.webtoon_id}">
                <div><img class="compare-thumbnail" src="${val.webtoon_thumbnail}"></div>
                <div class="compare-info inline-block">
                    <div class="webtoon-name">${val.webtoon_title_ko}</div>
                    <div class="webtoon-text">${val.webtoon_writer_ko}</div>
                </div>
                <div class="compare-btn inline-block">
                    <i class="material-icons compare-remove" webtoon_id="${val.webtoon_id}">close</i>
                </div>
               </div>`).appendTo($compareList);

            $('.compare-remove').click(function () {
                let webtoon_id = $(this).attr('webtoon_id');
                $(`.compareItem[webtoon_id=${webtoon_id}]`).remove();

                let ind = compareList.findIndex(r => r.webtoon_id == webtoon_id);

                console.log(compareList[ind].webtoon_id);

                if(compareList[ind].webtoon_id == webtoon_id)
                    console.log(compareList.splice(ind,1));

            });
        }



    });

    $('.back-btn').click(function () {
        $('.episode-page').css('display','none');
        $('.main-page').css('display','block');

        $('.episodeList').children('*').remove();
        $('.pageList').children('*').remove();

        nowPageList = 1;
        nowPage = 1;
    });




}