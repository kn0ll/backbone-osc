$(function() {

	var socket = io.connect('http://localhost'),
		osc_socket = osc.connect(socket);

	$('.slider').slider({
	    orientation: 'vertical',
	    range: 'min'
	});

	$('input[type="checkbox"]').button();

	$('button').button();

});