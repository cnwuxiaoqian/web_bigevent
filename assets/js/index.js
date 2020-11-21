$(function () {
    //获取用户的基本信息
    getUserInfo();
    var layer = layui.layer;
    //点击按钮，实现退出功能
    $("#btnLogout").on('click', function () {
        //提示用户是否推出
       layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空本地存储中的token
           localStorage.removeItem('token');
           //重新跳转到登录页面
           location.href='login.html'
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}