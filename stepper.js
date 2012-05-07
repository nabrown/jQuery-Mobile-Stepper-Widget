/* 
* "stepper" plugin: add incrementer decrementer buttons to quantity input, looks for container w/ looks for data-role="stepper"
*/	
(function ($, undefined){
	$.widget("mobile.stepper", $.mobile.widget, {
		options: {
			direction: "horizontal",
			shadow: false,
			excludeInvisible: true,
			step: 1
		},
		_create: function(){
			var $el = this.element,
				o = this.options,
				theme = $el.jqmData("theme"),
			 	$input = $el.find('input'),
				$incBtn = $('<a class="inc" data-role="button">+</a>'),
				$decBtn = $('<a class="dec" data-role="button">-</a>'),
				min = parseInt($input.attr('min')),
				max = parseInt($input.attr('max')),
				flCorners = o.direction == "horizontal" ? [ "ui-corner-left", "ui-corner-right" ] : [ "ui-corner-top", "ui-corner-bottom" ];
					
			$input.before($decBtn).after($incBtn);
				
			$el.find('.inc, .dec').click(function(){
				$input.trigger('change');
				var $btn = $(this),
					oldVal = parseInt($input.val());
				
				if ($btn.hasClass('inc')){
					var newVal = oldVal == max ? max : oldVal + parseInt(o.step);
				} else {
					var newVal = oldVal == min ? min : oldVal - parseInt(o.step);
				}
				$input.val(newVal);
			}).buttonMarkup({theme: theme});

			$el.addClass( "ui-controlgroup ui-controlgroup-" + o.direction );
				
			function flipClasses( els ) {
				els.removeClass( "ui-btn-corner-all ui-shadow" )
					.eq( 0 ).addClass( flCorners[ 0 ] )
					.end()
					.last().addClass( flCorners[ 1 ] ).addClass( "ui-controlgroup-last" );
			}
			
			flipClasses( $el.find( ".ui-btn" + ( o.excludeInvisible ? ":visible" : "" ) ) );
			flipClasses( $el.find( ".ui-btn-inner" ) );

			if ( o.shadow ) {
				$el.addClass( "ui-shadow" );
			}
		}
	});
	
	//auto self-init widgets
	$( document ).bind( "pagecreate create", function( e ){
		$( ":jqmData(role='stepper')", e.target ).stepper({ excludeInvisible: false });
	});
	
})(jQuery);

