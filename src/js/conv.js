$(function() {
  var $file = $("#file");
  var canvas = $('#canvas')[0];
  var context = canvas.getContext('2d');
  var image = new Image();
  var $paste = $("#paste");
  var $resultHtml = $("#result-html");
  var $resultCss = $("#result-css");
  var $clear = $(".js-clear");
  canvas.width = 0;
  canvas.height = 0;     


  $paste.on("keyup change", function() {
    var dataUrl = "data:image/svg+xml," + escape($paste.val());
    image.src = dataUrl;
    canvas.width = image.width;
    canvas.height = image.height;     
    context.drawImage(image, 0, 0);
    $resultHtml.val('<img src="'+dataUrl+'" />');
    $resultCss.val('url("'+dataUrl+'")');
    $("body").css({
      "background-image":"url("+dataUrl+")",
    });          
  });


  $file.on("change", function(event) {
    var files = event.target.files;
    $.each(files, function(index, item) {
      var reader = new FileReader();
      reader.onload = function(file) {
        var dataUrl = file.target.result;
        image.src = dataUrl;
        image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;     
          context.drawImage(image, 0, 0);
          $resultHtml.val('<img src="'+dataUrl+'" />');
          $resultCss.val('url("'+dataUrl+'")');
          $("body").css({
            "background-image":"url("+dataUrl+")",
          });          
        }
      }
      reader.readAsDataURL(item);
    });
  });
  
  
  $clear.on("click", function() {
    context.clearRect(0, 0, image.width, image.height);
    canvas.width = 0;
    canvas.height = 0;     
    $paste.val('');
    $file.val('');
    $resultHtml.val('');
    $resultCss.val('');
    $("body").css({
      "background-image":"none",
    });
  });

});