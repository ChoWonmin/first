'use strict';

var Messenger = new function () {
    // 대화 내용이 추가 되면 리스트에 그려준다 .

    // 전송 버튼이 눌리면 내용을 FirebaseWrapper로 전송한다.
    $('.button').click(function () {
        Firebase.sendMessage({
            message: $('#message').val(),
            id: $('#id').val(),
            date: new Date()
        });
    });

    var $chatList = $('.chatList');
    Firebase.setChildListener(function (message) {
        $('<div class=\'chatItem\'>\n            <div class="user">' + message.id + '</div>\n            <div class="message">' + message.message + '</div>\n            <div class="date">' + message.date + '</div>\n            </div>').appendTo($chatList);
    });

    //
}();