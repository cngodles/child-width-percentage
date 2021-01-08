var PWP = {
  calc:function(history){
    var parent = parseInt($("#parent-width").val());
    var child = parseInt($("#child-width").val());
    var answer = (100*(child/ parent)).toFixed(2);
    
    $("#answer").html(answer+'%');
    if(history !== 'skip'){
      $("#history-list").append('<p><code>'+child+'px</code> inside of <code>'+parent+'px</code> is <code>'+answer+'%</code> </p>');
      localStorage.setItem('measure-history', $("#history-list").html());
    }
  },
  sendToClipboard:function(textToCopy){    
    $("body")
			.append($('<input type="text" name="fname" class="textToCopyInput"/>' )
			.val(textToCopy))
			.find(".textToCopyInput")
			.select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
		} catch (err) {
				window.prompt("To copy the text to clipboard: Ctrl+C, Enter", textToCopy);
		}
	$(".textToCopyInput").remove();
    
  }
}

$(document)
.ready(function(){
  PWP.calc('skip');
  $("#history-list").html(localStorage.getItem('measure-history'));
})
.on("submit", "#calc-cwp", function(e){
  e.preventDefault();
  PWP.calc();
})
.on("click", "#calc", function(e){
  e.preventDefault();
  PWP.calc();
})
.on("click", ".action--clear-history", function(e){
  localStorage.removeItem('measure-history');
  $("#history-list").html('');
})
.on("click", ".action--copy-val", function(e){
  e.preventDefault();
  var answer = $("#answer").text();
  PWP.sendToClipboard(answer);
})
.on("click", ".action--copy-css", function(e){
  e.preventDefault();
  var answer = $("#answer").text();
  PWP.sendToClipboard('width: '+answer+';');
})
;