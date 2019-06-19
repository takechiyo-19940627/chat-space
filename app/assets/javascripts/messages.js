$(function () {
   function buildHTML(message) {
       var content = message.content ? `${message.content}` : "";
       var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
       var html =
           `<div class="messages__message" data-message-id = ${ message.id }>
              <div class="messages__message__upper-info">
                <p class="messages__message__upper-info__user">
                   ${message.user_name}
                </p>
                <p class="messages__message__upper-info__data">
                   ${message.created_at}
                </p>
              </div>
              <p class="messages__message__text">
                ${content}
              </p>
              <p class="message__image">
                ${img}
              </p>   
            </div>`
       return html
   }

   function scrollBottom() {
       var target = $('.messages__message').last();
       var position = target.offset().top + $('.messages').scrollTop();
       $('.messages').animate({
           scrollTop: position
       }, 300, 'swing');
   }

   $('#new_message').on("submit", function (e) {
       e.preventDefault();
       var formData = new FormData(this);
       var url = $(this).attr('action');
       $.ajax({
           url: url,
           type: 'POST',
           data: formData,
           dataType: 'json',
           processData: false,
           contentType: false
       })
       .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        scrollBottom();
        $('#new_message')[0].reset();
       })
       .fail(function () {
           alert("メッセージが投稿されませんでした。");
       })
       .always(function () {
           $('.form__new-message__submit-btn').prop('disabled', false);
           $('#new_message')[0].reset();
       })
   });

   function reloadMessages () {
       var last_message_id = $('.messages__message').last().data('message-id');
       console.log(last_message_id);
       $.ajax({
           url: '/api/messages',
           type: 'GET',
           dataType: 'json',
           data: {id: last_message_id}
       })
       .done(function (messages) {
           messages.forEach(function (message) {
               var insertHTML = buildHTML(message);
               $('.messages').append(insertHTML);
               scrollBottom();
           });
       })
       .fail(function () {
           alert('メッセージの更新に失敗しました')
       })
   }
   setInterval(reloadMessages, 500);
});