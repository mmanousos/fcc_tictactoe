QUnit.test( "test marker select", function( assert ) {
	assert.notOk($('#game-select').hasClass('hidden'), "Passed!" );
	event = $.Event( "click" );
	event.keyCode = 9;
	$( '#cross' ).trigger( event );
  	assert.ok($('#game-select').hasClass('hidden'), "Passed!" );
});