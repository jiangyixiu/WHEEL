var $login = $('#login');
var $register = $('#register');
// 切换到注册面板
$login.find('a').on('click', function () {
  $register.show();
  $login.hide();
});
// 切换到登陆面板
$register.find('a').on('click', function () {
  $.ajax({
    type: 'post',
    url: '/api/user/register',
    data: {
      username: $register.find('[name="username"]').val(),
      password: $register.find('[name="password"]').val(),
      repassword: $register.find('[name="repasswerd"]').val()
    },
    dataType: 'json',
    success: function (resp) {
      console.log(resp);
      app.list = resp.data.data;
    }
  });

  // $register.hide();
  // $login.show();

});


