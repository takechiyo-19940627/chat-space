$(function () {
    var search_list = $("#user-search-result");
    function appendUser(user) {
        var html = '<div class="chat-group-user clearfix">' +
                        '<p class="chat-group-user__name">ユーザ名</p>' +
                        '<div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザのid" data-user-name="ユーザ名">追加</div>' +
                   '</div>'
        search_list.append(htmll)
    }

    function appendErrMsgToHTML(msg) {
        var html = '<div class="chat-group-user clearfix">' +
                        '<p class="chat-group-user__name"> ${msg} </p>' +
                   '</div>'
        search_list.append(html);
    }

    $("#user-search-field").on("keyup", function () {
        var input = $("#user-search-field").val();

        $.ajax({
            type: 'GET',
            url: '/users/search',
            data: { name: input },
            dataType: 'json'
        })
        .done(function (users) {
          $("#user-search-result").empty();
          if(users.length !== 0) {
              users.forEach(function (user) {
                  appendUser(user);
              });
          }
          else {
              appendErrMsgToHTML("一致するユーザはいません");
          }
        })
        .fail(function () {
            alert('ユーザの検索に失敗しました')
        })
    });
});