; (function (root) {

	var OrderViewModel = function(v) {
		
		var self = this;
	
		this.venue = ko.observable(v);
		
		this.orderVenueTitle = ko.observable();
		
		this.orderDetails = ko.observable().extend({
			required: { message: "You cannot leave this empty" }
		});
		
		this.name = ko.observable().extend({
			required: { message: "Please tell us your name" }
		});
		
		this.phone = ko.observable().extend({
			required: { message: "Please tell us your phone number" }
		});
		
		this.streetAddress = ko.observable().extend({
			required: { message: "Please tell us your street address" }
		});
		
		this.buildingNumber = ko.observable();
		
		this.step1 = ko.validatedObservable({
	        orderDetails: self.orderDetails
	    });
	    
	    this.step2 = ko.validatedObservable({
	        name: self.name,
	        phone: self.phone
	    });
	    
	    this.step3 = ko.validatedObservable({
	        streetAddress: self.streetAddress
	    });
		
	};
	
	OrderViewModel.prototype.toJSON = function() {
		var copy = ko.toJS(this);
		delete copy.orderVenueTitle;
		delete copy.step1;
		delete copy.step2;
		delete copy.step3;
		return copy;
	};
	
	var MenuViewModel = function() {
		
		var self = this;
		
		this.venue = [
		{
			type: "information",
			header: "Order",
			detailsLine1: "Please select the venue you would like to order from and fill in your information.",
			detailsLine2: "Usual delivery times vary between 30 to 50 minutes."
		},
		{
			type: "filter"	
		},
		{
			type: "food",
			label: "Wing Stop",
			logoPath: 'img/logos/WingStop.png'
		},
		{
			type: "food",
			label: "McAlister's",
			logoPath: 'img/logos/McAlisters.png'
		},
		{
			type: "food",
			label: "McDonalds",
			logoPath: 'img/logos/McDonalds.png'
		},
		{
			type: "food",
			label: "Yo Dreams",
			logoPath: 'img/logos/YoDreams.png'
		},
		{
			type: "food",
			label: "Burger King",
			logoPath: 'img/logos/BurgerKing.png'
		},
		{
			type: "food",
			label: "Cricket's Grill",
			logoPath: 'img/logos/CricketsGrill.png'
		},
		{
			type: "food",
			label: "Dairy Queen",
			logoPath: 'img/logos/DairyQueen.png'
		},
		{
			type: "food",
			label: "Denny's",
			logoPath: 'img/logos/Dennys.png'
		},
		{
			type: "food",
			label: "Bear Nutrition",
			logoPath: 'img/logos/BearNutrition.png'
		},
		{
			type: "food",
			label: "Fazoli's",
			logoPath: 'img/logos/Fazolis.png'
		},
		{
			type: "food",
			label: "Health Camp",
			logoPath: 'img/logos/HealthCamp.png'
		},
		{
			type: "food",
			label: "IHOP",
			logoPath: 'img/logos/IHOP.png'
		},
		{
			type: "food",
			label: "Jack In The Box",
			logoPath: 'img/logos/JackInTheBox.png'
		},
		{
			type: "food",
			label: "Jake's",
			logoPath: 'img/logos/Jakes.png'
		},
		{
			type: "food",
			label: "Jimmy John's",
			logoPath: 'img/logos/JimmyJohns.png'
		},
		{
			type: "food",
			label: "Long John Silver's",
			logoPath: 'img/logos/LongJohnSilvers.png'
		},
		{
			type: "food",
			label: "Ninfa's",
			logoPath: 'img/logos/Ninfas.png'
		},
		{
			type: "food",
			label: "Nizza Pizza",
			logoPath: 'img/logos/NizzaPizza.png'
		},
		{
			type: "food",
			label: "Olive Branch",
			logoPath: 'img/logos/OliveBranch.png'
		},
		{
			type: "food",
			label: "Oso's",
			logoPath: 'img/logos/Osos.png'
		},
		{
			type: "food",
			label: "Outlaw's BBQ",
			logoPath: 'img/logos/OutlawsBBQ.png'
		},
		{
			type: "food",
			label: "Rudy's",
			logoPath: 'img/logos/Rudys.png'
		},
		{
			type: "food",
			label: "Schlotzsky's",
			logoPath: 'img/logos/Schlotzskys.png'
		},
		{
			type: "food",
			label: "Shipley Donuts",
			logoPath: 'img/logos/ShipleyDonuts.png'
		},
		{
			type: "food",
			label: "Shorty's Pizza Shack",
			logoPath: 'img/logos/ShortysPizzaShack.png'
		},
		{
			type: "food",
			label: "Sonic",
			logoPath: 'img/logos/Sonic.png'
		},
		{
			type: "food",
			label: "Subway",
			logoPath: 'img/logos/Subway.png'
		},
		{
			type: "food",
			label: "Clay Pot",
			logoPath: 'img/logos/ClayPot.png'
		},
		{
			type: "food",
			label: "Taco Bell",
			logoPath: 'img/logos/TacoBell.png'
		},
		{
			type: "food",
			label: "Cupp's",
			logoPath: 'img/logos/Cupps.png'
		},
		{
			type: "food",
			label: "Taco Cabana",
			logoPath: 'img/logos/TacoCabana.png'
		},
		{
			type: "food",
			label: "Taqueria Arandas",
			logoPath: 'img/logos/TaqueriaArandas.png'
		},
		{
			type: "food",
			label: "Taqueria Zacatecas",
			logoPath: 'img/logos/TaqueriaZacatecas.png'
		},
		{
			type: "food",
			label: "Terriyaki Park",
			logoPath: 'img/logos/TerriyakiPark.png'
		},
		{
			type: "food",
			label: "Texas Road House",
			logoPath: 'img/logos/TexasRoadHouse.png'
		},
		{
			type: "food",
			label: "Trujillo's",
			logoPath: 'img/logos/Trujillos.png'
		},
		{
			type: "food",
			label: "Vitek's BBQ",
			logoPath: 'img/logos/ViteksBBQ.png'
		},
		{
			type: "food",
			label: "Whataburger",
			logoPath: 'img/logos/Whataburger.png'
		},
		{
			type: "food",
			label: "Yazzi's Cafe",
			logoPath: 'img/logos/YazzisCafe.png'
		},
		{
			type: "gas station",
			label: "Valero",
			logoPath: 'img/logos/Valero.png'
		},
		{
			type: "gas station",
			label: "7-Eleven",
			logoPath: 'img/logos/7-Eleven.png'
		},
		{
			type: "gas station",
			label: "Alon",
			logoPath: 'img/logos/Alon.png'
		},
		{
			type: "gas station",
			label: "Chevron",
			logoPath: 'img/logos/Chevron.png'
		},
		{
			type: "store",
			label: "Comet Cleaners",
			logoPath: 'img/logos/CometCleaners.png'
		},
		{
			type: "store",
			label: "Baylor Bookstore",
			logoPath: 'img/logos/BaylorBookstore.png'
		},
		{
			type: "store",
			label: "Dollar General",
			logoPath: 'img/logos/DollarGeneral.png'
		},
		{
			type: "store",
			label: "Family Dollar",
			logoPath: 'img/logos/FamilyDollar.png'
		}
		];
		
		this.order = ko.observable();
		
		this.orderVenueHeader = ko.observable();
		
		this.newOrder = function(data, event) {
			var v = event.target.value;
			self.order(new OrderViewModel(v));
			if (localStorage.getItem('order') != null){	
				var past = this;
				this.previousOrder = JSON.parse(localStorage.getItem('order'));
				self.order().name(past.previousOrder.name);
				self.order().phone(past.previousOrder.phone);
				self.order().streetAddress(past.previousOrder.streetAddress);
				self.order().buildingNumber(past.previousOrder.buildingNumber);
			}
			self.order().venue(event.target.value);
			self.order().orderVenueTitle("Order " + self.order().venue());
			$('.progress-bar').css('width', (self.currentStep() * 25) + '%');
		}
		
		this.count = ko.observable(1);
		
		this.saveOrder = function() {
			self.nextStep();
			var data = ko.toJSON(self.order());
			localStorage.setItem('order',data);
			
			$.ajax({
                url: '/order',
                type: 'POST',
                data: data,
                dataType: 'jsonp',
                contentType: 'application/json',
            	success: self.postOrderSuccess,
            	error: self.postOrderFail
            });

			self.count(self.count()+1);
			localStorage.setItem('firstTimeVisitor', false);
		}	
		
		this.postOrderSuccess = function() {
			console.log('success');
		}
		
		this.postOrderFail = function() {
			console.log('fail');
		}
		
		/* count and slide functions */
		
		this.currentStep = ko.observable(0);
		
		this.nextStep = function() {
			/* incrementing current step and clearing all error messages */
			self.currentStep(self.currentStep() + 1);
			$('#myCarousel').carousel('next');
			$('.progress-bar').css('width',(25*self.currentStep())+'%');
		}
				
		this.previousStep = function() {
			/* incrememnting current step and clearing all error messages */
			self.currentStep(self.currentStep() - 1);
			$('#myCarousel').carousel('prev');
			$('.progress-bar').css('width',(25*self.currentStep())+'%');
		}
		
		this.validateStep = function() {
			
			if (self.currentStep() == 1 && self.order().step1().isValid())
			{
					self.nextStep();
			}else if (self.currentStep() == 2 && self.order().step2().isValid())
			{
					self.nextStep();
			}else if (self.currentStep() == 3 && self.order().step3().isValid())
			{
					self.nextStep();
			}else {
				if (self.currentStep() == 1){
					self.order().step1().errors.showAllMessages();
				}else if (self.currentStep() == 2){
					self.order().step2().errors.showAllMessages();
				}else {
					self.order().step3().errors.showAllMessages();
				}
			}
		}
	};

	mvm = new MenuViewModel();

})(this);

$(document).ready(function() {

	// Social Icon Redirects
	$('#facebook').on('click', function() {
		window.open('http://facebook.com/SicEmDelivery');
	});
	
	$('#twitter').on('click', function() {
		window.open('http://twitter.com/SicEmDelivery');
	});

	// initialize Flurry Analytics
	FlurryAgent.startSession("36HQNF8PSBCR5RR8HBG5");
	
	// initialize ko validation	
	ko.validation.init({
	    parseInputAttributes: true,
	    decorateElement: true,
	    writeInputAttributes: true,
	    errorElementClass: "error"
	});

    /* initialize carousel */
    $('#myCarousel').carousel({
	    pause: false
    }); 
    
    /*var addToHomeConfig = {
		animationIn: 'bubble',
		animationOut: 'drop',
		lifespan: 5000,
		expire:2,
		touchIcon:true,
		closeButton: true,	
		message:'This is a custom message. Your device is an <strong>%device</strong>. The action icon is `%icon`.'
	};*/
    
    
    // Model fix for ios keyboard 
	if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ) {
	
	    $('.modal').on('show.bs.modal', function() {
	        $(this)
	            .css({
	                position: 'absolute',
	                marginTop: $(window).scrollTop() + 'px',
	                bottom: 'auto'
	            });
	        
	        setTimeout( function() {
	            $('.modal-backdrop').css({
	                position: 'absolute', 
	                top: 0, 
	                left: 0,
	                width: '100%',
	                height: Math.max(
	                    document.body.scrollHeight, document.documentElement.scrollHeight,
	                    document.body.offsetHeight, document.documentElement.offsetHeight,
	                    document.body.clientHeight, document.documentElement.clientHeight
	                ) + 'px'
	            });
	        }, 0);
	
	    });
	    $('.modal').on('hide.bs.modal', function() {
			/*if(localStorage.getItem('firstTimeVisitor') == null)
			{
				mvm.currentStep(0);
			}else {
				mvm.currentStep(1);	
			}*/
			mvm.currentStep(0);
		});

	}else {
		$('.modal').on('show.bs.modal', function() {
			$('body').addClass('noscroll');
		});
		$('.modal').on('hide.bs.modal', function() {
			$('body').removeClass('noscroll');
			/*if(localStorage.getItem('firstTimeVisitor') == null)
			{
				mvm.currentStep(0);
			}else {
				mvm.currentStep(1);	
			}*/
			mvm.currentStep(0);
		});
	}
});
