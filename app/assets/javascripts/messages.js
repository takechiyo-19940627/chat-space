$(function () {
   function buildHTML(message) {
       var content = message.content ? `${message.content}` : "";
       var img = message.image ? `<img src= ${ message.image }>` : "";
       var html = `<div class="messages__message">
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
                        ${img}
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
        $('.form__new-message__input-box__text').val("");
        $('.message__image').val("");
        scrollBottom();
       })
       .fail(function () {
           alert("メッセージが投稿されませんでした。");
       })
       .always(function () {
           $('.form__new-message__submit-btn').prop('disabled', false);
       })
   })
});