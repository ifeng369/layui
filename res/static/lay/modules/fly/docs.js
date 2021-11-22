/*

  授权产品文档

*/

layui.define(function(exports){
  var $ = layui.jquery
  ,layer = layui.layer
  ,form = layui.form
  ,fly = layui.fly
  ,util = layui.util;


  $('.layui-fixbar').remove();

  //后续增加工单系统
  util.fixbar({
    
  });

  var editor = $('#FLY-docs-editor')
  ,preview = $('#FLY-docs-preview')
  ,docID = $('#FLY-docs-id').val()
  ,tableName = 'layui-auth-product-'+ docID;

  //发布与编辑
  ;!function(){
    if(!editor[0]) return;

    var md = window.markdownit({
      html: true
      ,typographer: true
      ,linkify: true
      ,breaks: true
    });

    //转义
    md.renderer.rules.table_open = function () {
      return '<table class="layui-table">\n';
    };


    var editorView = function(){
      var content = editor.val()
      ,getHtml = md.render(content);
      preview.html(getHtml);
    };


    docID || editor.val(layui.data(tableName).content);
    editorView();

    //编辑同步
    editor.on('keyup', function(){
      var content = editor.val();

      editorView();

      //同步本地记录
      layui.data(tableName, {
        key: 'content'
        ,value: content
      });
    }).on('scroll', function(){
      var othis = $(this)
      ,scrollHeight = othis.prop('scrollHeight')
      ,docsPreview = $('.fly-docs-preview')
      ,scrollTop = othis.scrollTop();

      var top = (scrollTop / scrollHeight * docsPreview.prop('scrollHeight'));

      docsPreview.scrollTop(top);
    });


    //监听文档提交
    form.on('submit(FLY-docs-send)', function(obj){
      fly.json(obj.form.action, obj.field, function(res){
        location.href = '/docs/'+ res.data.id + '/';
      });
      return false;
    });
  }();


  //详情页
  (function(){
    var spreadDir = $('#FLY-spread-dir');
    
    spreadDir.on('click', function(){
      $('body').addClass('fly-docs-spread');
      return false;
    });

    $('body').on('click', function(){
      $(this).removeClass('fly-docs-spread');
    });
  }());



  exports('docs', {});
})