(function () {
  // eslint-disable-next-line no-unused-vars
  let article = (function () {
    'use strict' // 开启严格模式
    console.log(123);

    // 获取 tinymce 插件管理对象
    // eslint-disable-next-line no-undef
    let global = tinymce.util.Tools.resolve('tinymce.PluginManager')
    // eslint-disable-next-line no-undef,no-unused-vars
    let global$1 = tinymce.util.Tools.resolve('tinymce.dom')

    // var insertArticle = function (editor) {
    //   // // 插入一个段落，首先需要设置光标的位置
    //   // // 这里将光标定位到编辑器的末尾
    //   // editor.selection.setCursorLocation(editor.getBody(), editor.getBody().childElementCount)
    //   // var article = '<article><section><div></div></section></article>'
    //   //
    //   // // 插入内容
    //   // editor.insertContent(article)
    // }
    let openDialog = function (editor) {
      editor.selection.setCursorLocation(editor.getBody(), editor.getBody().childElementCount)
      var article = '<p>123</p>'

      // 插入内容
      editor.insertContent(article)
    }

    // eslint-disable-next-line camelcase
    let $_ijkl = {
      openDialog: openDialog
    }

    // 定义插件功能
    var register = function (editor) {
      editor.addCommand('imageupload', function () {
        $_ijkl.openDialog(editor)
      })
    }
    // eslint-disable-next-line camelcase
    var $_abcd = { register: register }

    // 添加插件的 button 和 菜单栏
    var register$1 = function (editor) {
      // 注册一个工具栏按钮名称
      editor.ui.registry.addButton('imageupload', {
        tooltip: '图片上传',
        icon: 'image',
        onAction: openDialog
      })

      // 注册一个菜单项名称 menu/menubar
      editor.ui.registry.addMenuItem('imageupload', {
        text: 'imageupload',
        icon: 'image',
        onAction: openDialog
      })
    }
    // eslint-disable-next-line camelcase
    var $_efgh = { register: register$1 }

    // 注册插件到 tinymce 对象
    global.add('article', function (editor) {
      $_abcd.register(editor)
      $_efgh.register(editor)
    })

    // 这个地方不知道干啥的, 删除掉也不会报错。目前先保留
    function Plugin () {}
    return Plugin
  }())
})()
