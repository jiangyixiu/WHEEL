var $login = $('#login');
var $register = $('#register');
// 切换到注册面板
$login.find('.go-register').on('click', function () {
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
      // console.log(resp);
      $register.find('input').next().text('')
      if (resp.code == 1) {
        $register.find('[name="username"]').next().text(resp.message)
      }
      if (resp.code == 2) {
        $register.find('[name="password"]').next().text(resp.message)
      }
      if (resp.code == 3) {
        $register.find('[name="repasswerd"]').next().text(resp.message)
      }
      if (resp.code == 4) {
        $register.find('[name="username"]').next().text(resp.message)
      }

      if (!resp.code) {
        // 注册成功
        alert('恭喜你，注册成功！')
        setTimeout(function () {
          $register.hide();
          $login.show();
        }, 600)
      }
    }
  });
});
// 登录
$login.find('.btn-login').on('click', function () {
  // console.log($login.find('[name="username"]').val())
  $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data: {
      username: $login.find('[name="username"]').val(),
      password: $login.find('[name="password"]').val()
    },
    dataType: 'json',
    success: function (result) {
      // console.log(result)
      // code：0登陆成功、1用户名为空、2密码为空、3密码不一致、4用户名已被注册
      if (result.code === 0) {
        window.location.href = '/home';
      } else {
        alert(result.message);
      }
    }
  })
});


