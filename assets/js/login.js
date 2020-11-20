$(function () {
    //点击'去注册账号'的链接
    $("#link_reg").on("click", function () {
        $(".login").hide();
        $(".register").show();
    })
    //点击'去登录'的链接
    $("#link_login").on("click", function () {
        $(".login").show();
        $(".register").hide();
    })
    //从layui中获取form对象
    var form = layui.form;
    //提示信息对象
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) { //value是确认密码中的内容
            var pwd = $(".register [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
    //监听注册表单的提交事件
    $("#form-reg").on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
             if (res.status !== 0) {
                 return layer.msg(res.message);
             }
            layer.msg("注册成功");
            $("#link_login").click();
        })

    })
    //监听登录表单的提交事件
    $("#form-login").on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form-login [name=username]').val(),
            password: $('#form-login [name=password]').val()
        }
        $.post('/api/login', data, function (res) {
             if (res.status !== 0) {
                 return layer.msg(res.message);
             }
            layer.msg("登录成功");
            //将登录成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            location.href="index.html"
        })

    })
})