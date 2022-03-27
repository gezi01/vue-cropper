// eslint-disable-next-line no-undef
tinymce.PluginManager.add('imageupload', function (editor, url) {
  // eslint-disable-next-line camelcase
  var click_imgs_callback = editor.getParam('click_imgs_callback', undefined, 'function');
  var openDialog = function () {
    click_imgs_callback(editor);
  }
  editor.ui.registry.addButton('imageupload', {
    tooltip: '图片上传',
    icon: 'image',
    onAction: openDialog
  })

  editor.ui.registry.addMenuItem('imageupload', {
    text: 'imageupload',
    icon: 'image',
    onAction: openDialog
  })

  return {
    getMetadata: function () {
      return {
        name: 'Example plugin',
        url: 'http://exampleplugindocsurl.com'
      }
    }
  }
});
