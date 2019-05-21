$(function () {
   function buildHTML(message) {
       var content = message.content ? `${message.content}` : "";
       var img = message.image ? `<img src= ${ message.image }>` : "";
       var html =
           `<div class="messages__message">
              <div class="messages__message__upper-info">
                <p class="messages__message__upper-info__user">
                   ${message.user_name}
                </p>
                <p class="messages__message__upper-info__data">
                   ${message.date}
                </p>
              </div>
              <p class="messages__message__text">
                ${content}
              </p>
              <p class="message__image">
                ${img}
              </p>   
            </div>`
       if (img) {
           return html
       } else {
           return html()
       }

   }

   var buildMessageHTML = function (message) {
       console.log(message);
       if (message.content && message.image.url) {
           var html =
               `<div class="messages__message" data-message-id="${ message.id }" >
                   <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.created_at }
                      </div>
                   </div>
                   <div class="lower-message">
                     <p class="lower-message__content">
                        ${ message.content }
                     </p>
                     <img src=" ${ message.image.url } " class="lower-message__image" >
               </div>`

       } else if (message.content) {
           var html =
               `<div class="messages__message" data-message-id="${ message.id }">
                  <div class="upper-message">
                     <div class="upper-message__user-name">
                        ${ message.user_name }
                     </div>
                     <div class="upper-message__date">
                        ${ message.created_at }
                     </div>
                  </div>
                  <div class="lower-message">
                     <img src=" ${ message.image.url } " class="lower-message__image" >
                  </div>
               </div>`
       } else {
           var message_id = 0
       }
       return html
   };

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
           type: "POST",
           url: url,
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
       })
   });

   var reloadMessages = function () {
       var last_message_id = $('.messages__message').last().data("message-id");
       $.ajax({
           url: '/api/messages',
           type: 'GET',
           dataType: 'json',
           data: {id: last_message_id}
       })
       .done(function (messages) {
           messages.forEach(function (message) {
               var insertHTML = buildMessageHTML(message);
               $('.messages').append(insertHTML);
               $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
           });
       })
       .fail(function () {
           console.log('error');
           alert('メッセージの更新に失敗しました')
       })
   };
   setInterval(reloadMessages, 5000);
});