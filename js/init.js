(function($){
  $(function(){

    $('.button-collapse').sideNav({
      menuWidth: 150,
      edge: 'right',
      closeOnClick: true
    });
    $('.parallax').parallax();
	$('.scrollspy').scrollSpy({scrollOffset:64});
	
	$('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
	
	
	$('#form_contato').on('submit',(function(e) {
		$('#enviar').attr('disabled', true);
		e.preventDefault();
		$.ajax({
		   url: 'PHPMailer/mail-it.php',
		   data: $('#form_contato').serialize(),
		   error: function(jqXHR, exception) {
				alert('Erro na conexão com o servidor. Tente novamente em alguns segundos.');
				var msg = '';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				//cosole.log(msg);
		   },
		   success: function(data) {
				$('#form_contato').find("input[type=text], input[type=email], textarea").val("");
				Materialize.toast(data, 5000,'',function(){
					$('#enviar').attr('disabled', false);
				});
		   },
		   type: 'POST'
		});	
		
	}));
	
  }); // end of document ready
})(jQuery); // end of jQuery name space