$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initCate()
    //初始化富文本编辑器
    initEditor()
    //定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    //初始化裁剪区域
    var $image = $('#image')
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options)
    //为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })
    //监听coverFile的change事件
    $('#coverFile').on('change', function (e) {
        //获取到文件的列表数组
        var files = e.target.files;
       
        if (files.length == 0) {
            return
        }
        //根据文件创建对应的URL地址
        var newImgURL = URL.createObjectURL(files[0])
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })
    //定义文章的发布状态
    var art_state = '已发布'
    //为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    //为表单绑定submit提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        console.log("11");
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        //将封面裁剪过后的图片，输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height:280
        }).toBlob(function (blob) {
            //将Canvas画布上的内容，转化为文件对象
            fd.append('cover_img', blob)
            publishArticle(fd)
            console.log("11");
        })
       
    })
    //定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //如果向服务器提交的是FormData格式的数据
            //必须添加一下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                location.href="art_list.html"
            }
        })
    }
})