$(function () {
    var search_list = $('#user-search-result');
    function appendUser(user) {
        var html = `<div class="chat-group-user clearfix">
                         <p class="chat-group-user__name">
                            ${ user.name }
                         </p> 
                         <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">
                            追加
                         </a>
                   </div>`
        search_list.append(html);
    }

    function appendErrMsgToHTML(msg) {
        var html = '<div class="chat-group-user clearfix">' +
            '<p>' +
            `${ msg }` +
            '</p>' +
            '</div>'
        search_list.append(html);
    }

    var group_user_list = $('#chat-group-users');
    function appendUserToGroup(group_user) {
        var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${ group_user.id }">
                         <input name="group[user_ids][]" type="hidden" value="${ group_user.id }">
                         <p class="chat-group-user__name">
                            ${ group_user.name }
                         </p>
                         <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
                            削除
                        </a>
                   </div>`
        console.log(html);
        group_user_list.append(html);
    }

    $('#user-search-field').on('keyup', function () {
        var input = $('#user-search-field').val();
        if (input.length) {
            $.ajax({
                type: 'GET',
                url: '/users/search',
                data: { group_users: input },
                dataType: 'json'
            })
                .done(function (users) {
                    $('#user-search-result').empty();
                    if (users.length !== 0) {
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
        } else {
            search_list.empty();
        }
    });

    $(document).on('click', '.user-search-add.chat-group-user__btn.chat-group-user__btn--add', function () {
        var group_user = {};
        group_user.id = $(this).attr("data-user-id");
        group_user.name = $(this).attr("data-user-name");
        $(this).parent().remove();
        appendUserToGroup(group_user);
    });

    $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function () {
        $(this).parent().remove()
    })

});