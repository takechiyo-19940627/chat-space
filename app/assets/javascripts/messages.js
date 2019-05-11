$(function () {
   function buildHTML(message) {
       var html =
       return html;
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
            $('.form__new-message__input-box__text').val("")
               $().animate({scrollTop: 0}, 500, 'swing')
           })
           .fail(function () {
               alert("メッセージが投稿されませんでした。");
           });
   })
});