$(function(){
	$(document).bind('masonryconf', function(){
		var $container = $('#product-board');
		
		var cw = 180;
		cwr = $container.width();
		if(cwr >= 1200){
			cw = 200;
		}
		if(cwr < 1200){
			cw = 180;
		}
		if(cwr < 767){
			cw = cwr/3;
		}
		if(cwr < 500){
			cw = cwr/2;
		}
		
		$container.imagesLoaded( function(){
		  $container.masonry({
				itemSelector: '.product',
				isAnimated: true,
				columnWidth: cw,
				animationOptions: {
					duration: 300
				}
		  });
		});
	}).trigger('masonryconf');
	
});

$(window).resize(function(){
		// Reflow masonry columns, not really needed in normal life, but web devs will appreciate
		var $container = $('#product-board');
		var cw = 180;
		cwr = $container.width();
		if(cwr >= 1200){
			cw = 200;
		}
		if(cwr < 1200){
			cw = 180;
		}
		if(cwr < 767){
			cw = cwr/3;
		}
		if(cwr < 520){
			cw = cwr/2;
		}
    $container.masonry( 'option', { columnWidth: cw });
});


$(window).load(function(){
	//Reflow masonry when fonts are loaded
	$('#product-board').masonry();
});

$(document).ready(function(){

	//Product board filtering 
	$(document).on('click', '.board-filters a', function(e){
		$filter = $(this);

		$('.board-filters a').removeClass('filter-hidden');
		
		if($filter.data('filter') == 'all'){
			//show all
			$('.product').show();
			$filter.addClass('filter-hidden');			
		}
		else{
			if(!$filter.hasClass('filter-hidden')){
				//hide
				$('.'+$filter.data('filter')).show();
				$('.product').not('.'+$filter.data('filter')).not('.static').hide();
				$filter.addClass('filter-hidden');
			}
			else{
				//show
				$('.product').not('.'+$filter.data('filter')).show();
				$filter.removeClass('filter-hidden');
			}
		}
		
		// reflow masonry		
		$('#product-board').masonry();
		
		e.preventDefault();
	});
	
	
	// Product details expand
	$(document).on('click', '.details-expand', function(e){
		if($('#'+$(this).data('target')).is(':visible')){
			$(this).html('+').removeClass('expanded');	
		}
		else{
			$(this).text('–').addClass('expanded');
		}
		$('#'+$(this).data('target')).toggle();
		
        $('#product-board').masonry();    
		
		e.preventDefault();
	});
	
	var hover;
	if($('html').hasClass('no-touch')){
		$("#main-nav a.top-level").hover( 
			function () {
				if($(window).width() > 979){
					hover = true;
					var menua = $(this);
					$(this).data('timeout', setTimeout( function(){showSubNav(menua)}, 300));
				}
			}, function () {
				clearTimeout($(this).data('timeout'));
				hover = false;
			}
		);
	}
	else{
		//Touch events for nav
		// Show menu dropdown
		$('#main-nav a.top-level').on('touchstart', function(e){ 
			if($(window).width() >= 979){
				if($(this).data('hit') == undefined){		
					var menua = $(this);
					setTimeout( function(){showSubNav(menua)}, 300);
					$(this).data('hit', 1);
					e.preventDefault();			
				}
			}
		});
		
		// Hiding menu dropdown
		$('body').on('touchstart', function(e){ 
			if(e.target.className != 'submenu-container' && e.target.className != 'top-level' && $(e.target).parents('.submenu-container').length == 0){
				$('.submenu-container:visible').slideUp(function(){
					resetNav();
				});
			}
		});
	}
	
	function showSubNav(menua) {
		var $container = $(menua).parent();
		
		// Show the submenu
		if($('.submenu-container').is(':visible') || $('#nav-number .submenu-container').is(':visible')){
			if($container.prop('id') == 'nav-number'){
				$('.submenu-container').hide();
			}
			$('.submenu-container', $container).show();
		}
		else{
			$('.submenu-container .submenu li.active .submenu-preview').hide();			
			$('.submenu-container', $container).slideDown('fast',function(){
				$('.submenu-container .submenu li.active .submenu-preview').show();			
			});
		}
		
		// Handling of the active class for top level menu
		if($container.prop('id') != 'nav-number'){
			$container.addClass('activehover');
			$container.siblings().removeClass('activehover');
			$('#nav-number .submenu-container').hide();
		}
		else{
			$container.prev().children(':first-child').children().removeClass('activehover');		
		}
		
		// No submenu on flat classed items so it gets hidden if its shown
		if($(menua).hasClass('flat')){
			$container.siblings().children('.submenu-container').slideUp();		
		}
		else{
			$container.siblings().children('.submenu-container').hide();				
		}
	}
	
	// Hide submenu
	if($('html').hasClass('no-touch')){
		$(document).on('mouseleave', '.submenu-container', function(e){
			setTimeout(function(){
				if(!hover){
					$('.submenu-container:visible').slideUp(function(){
						resetNav();
					});
				}
			}, 100);
		});
	}
	
	//Main menu item sub menu
	if($('html').hasClass('no-touch')){
		$(document).on('mouseover', '.sml', function(e){
			$(this).parent().siblings().removeClass('active');
			$(this).parent().siblings().children('.submenu-preview').hide();
			$(this).next().show();			
			$(this).parent().addClass('active');
		});
	}
	else{
		$('.sml').on('touchstart', function(e){
			if($(this).data('hit') == undefined){
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
				$(this).parent().siblings().children('.submenu-preview').hide();
				$(this).next().show();			
				$(this).data('hit', 1);
				
				e.preventDefault();
			}
		});
	}
	
	$(document).on('mouseleave', '#main-nav a.flat', function(e){
		$(this).parent().removeClass('activehover');
	});
	
	// Product page info tabs
	$('#product-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	
	//Image switching on product pages 
	$('.alternate-images a').click(function(e){
		var imgToShow = $(this).data('img');
		
		if($('.main-imgs img:visible').prop('id') != imgToShow){
			$('.main-imgs img:visible').fadeOut(function() {
				$('#'+imgToShow).fadeIn();
			});
		}
		
		e.preventDefault();
	});
	
	
	// Product review rating label
	$("#rate-review").bind('over', function (event, value) { 
		var label;
		
		if(value == '0.5' || value == '1'){label = 'Poor'}
		if(value == '1.5' || value == '2'){label = 'Fair'}
		if(value == '2.5' || value == '3'){label = 'Average'}
		if(value == '3.5' || value == '4'){label = 'Good'}
		if(value == '4.5' || value == '5'){label = 'Excellent'}
		
		if(label != null){
			$('#rate-review-label').text(label).show(); 
		}
		else{
			$('#rate-review-label').hide()
		}
	});
	$("#rate-review").bind('rated', function() { 
		value = $(this).rateit('value');
		if(value == '0.5' || value == '1'){label = 'Poor'}
		if(value == '1.5' || value == '2'){label = 'Fair'}
		if(value == '2.5' || value == '3'){label = 'Average'}
		if(value == '3.5' || value == '4'){label = 'Good'}
		if(value == '4.5' || value == '5'){label = 'Excellent'}
		$('#rate-review-label-final').text(label).show(); 
	});
	
	
	// Quantity update
	$('.quantity').click(function(e){
		var button = $(this);
		var itemPrice = parseInt(button.parent().find('.order-quantity').data('sub')); 
		var curAmt = parseInt(button.siblings('.order-quantity').html());
		var rowTotal = parseInt(button.parent().siblings('.sub-total').children('.total').html());
		var newRowTotal, newAmt;
		
		if(button.hasClass('plus')){
			newRowTotal = (curAmt + 1) * itemPrice;
			newAmt = curAmt + 1;
		}
		if(button.hasClass('minus')){
			newRowTotal = (curAmt - 1) * itemPrice;
			newAmt = curAmt - 1;			
		}
		if(newRowTotal <= 0){
			newAmt = 0;
			newRowTotal = 0;
		}
		button.parent().siblings('.sub-total').children('.total').html(newRowTotal);
		button.siblings('.order-quantity').html(newAmt);
		updateTotal();		
		
		e.preventDefault();
	});
	
	function updateTotal(){
		var total = 0;
		
		$('tr').each(function(e){
			if(!$(this).hasClass('cart-summary')){
				total += parseInt($('.total', $(this)).html());
			}
		});
		if(total != 0){
			$('.cart-summary .total-total').html(total);
		}
		else{
			$('.shopping-cart, .shopping-cart-help, .empty-cart').toggle();
		}
	}
	
	// Product remove
	$('.cart-remove').click(function(e){
		$(this).parent().parent().remove();
		updateTotal();
		e.preventDefault();
	});
	
	//Checkout step 1 submit 
	$('#checkout-1').click(function(e){
		var error = false;
		
		//Clear old errors 
		$('#checkout-details-main .control-group, #shipping-form .control-group').removeClass('has-error');
		$('#checkout-details-main .control-group .help-block, #shipping-form .control-group .help-block').hide();
		
		//Error validation 
		// Check inputs
		$('#checkout-details-main input.req').each(function(){
			if($(this).val() == ''){
				var $cg = $(this).parent().parent();
				$cg.addClass('has-error');
				$('.help-block', $cg).show();
				error = true;
			}
		});
		
		// Check selects
		$('#checkout-details-main select.req').each(function(){
			if($('option:selected',$(this)).val() == ''){
				var $cg = $(this).parent().parent();
				$cg.addClass('has-error');
				$('.help-block', $cg).show();
				error = true;
			}
		});
		
		if(!$('#shipping-toggle').is(':checked')){
			// Check input fields 
			$('#shipping-form input.req').each(function(){
				if($(this).val() == ''){
					var $cg = $(this).parent().parent();
					$cg.addClass('has-error');
					$('.help-block', $cg).show();
					error = true;						
				}
			});
			
			// Check selects
			$('#shipping-form select.req').each(function(){
				if($('option:selected',$(this)).val() == ''){
					var $cg = $(this).parent().parent();
					$cg.addClass('has-error');
					$('.help-block', $cg).show();
					error = true;
				}
			});
		}

		if(!error){
			//submit form, for dev it just redirect to checkout-2.html
			window.location = 'http://leapfrogui.com/checkout-2.html';
			//$('#checkout-details').submit();
		}
		
		e.preventDefault();
		
	});
	
	
	// Shipping form toggle
	$('#shipping-toggle').change(function(){
		$('#shipping-form-info, #shipping-form').toggle();
	});
	
	
	// Payment type selection
	$('input[name="gateway"]').change(function() {
		if($(this).val() == 'cc'){
			$('#cc-details').show();
		}
		else{
			$('#cc-details').hide();		
		}
	});
	
	// Review product form validation
	$('#review-product').click(function(e){
		var error = false;
		
		//Clear old errors 
		$('#review-product-form .control-group').removeClass('error');
		$('#review-product-form .control-group .help-block').hide();
		
		// Error validation
		// Check inputs
		$('#review-product-form input.req').each(function(){
			if($(this).val() == ''){
				var $cg = $(this).parent().parent();
				$cg.addClass('has-error');
				$('.help-block', $cg).show();
				error = true;
			}
		});
		
		// Check textarea
		$('#review-product-form textarea.req').each(function(){
			if($(this).val() == ''){
				var $cg = $(this).parent().parent();
				$cg.addClass('has-error');
				$('.help-block', $cg).show();
				error = true;
			}
		});
		
		//Check rating
		if($('#rate-review').rateit('value') == 0){
			$('#rate-review-label').html('<span class="help-block">You must give a rating</span>').show();
			$('#rate-review-label .help-block').show();
			error = true;
		}
		
		if(!error){
			//If no errors submit form, for dev we just redirect to thankyou page
			//$('#review-product').submit();
			window.location = 'http://leapfrogui.com/review-product-thanks.html';
		}
		
		e.preventDefault();
	});
	
}); //end doc ready

function resetNav(){
	$('.submenu li').removeClass('active');
			
	$('.submenu').each(function(){
		$('li', $(this)).eq(0).addClass('active');					
	});
	
	$('#main-nav li').removeClass('activehover');
}
