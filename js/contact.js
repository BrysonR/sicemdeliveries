; (function (root) {

	var ContactDataViewModel = function() {
	
		var self = this;
		
		this.contactEmail = ko.observable().extend({
			required: { message: "We need this to contact you" }
		});
		
		this.contactName = ko.observable().extend({
			required: { message: "You cannot leave out your name" }
		});
		
		this.contactMessage = ko.observable().extend({
			required: { message: "Please let us know why you are contacting us" }
		});
		
		this.contactDataErrors = ko.validatedObservable({
			contactEmail: self.contactEmail,
			contactName: self.contactName,
			contactMessage: self.contactMessage
		});
	};
	
	ContactDataViewModel.prototype.toJSON = function() {
		var copy = ko.toJS(this);
		delete copy.contactDataErrors;
		return copy;
	};
	
	var ContactViewModel = function() {
		
		var self = this;
		
		this.contactData = ko.observable();
		
		this.newContactData = function() {
			self.contactData(new ContactDataViewModel());	
		};
		
		this.submit = function() {
		
			if(self.contactData().contactDataErrors().isValid())
			{
				
				var contactData = ko.toJSON(self.contactData());
				
				$.ajax ({
					url: '/contactus',
					type: 'POST',
					data: contactData,
					dataType: 'jsonp',
					contentType: 'application/json',
					success: self.messageSuccess,
					failed: self.messageFailed
				});
			}else {
				self.contactData().contactDataErrors().errors.showAllMessages();
			}
		}
		
		this.messageSuccess = function() {
			$('#successModal').modal('show');
		}
		
		this.messageFailed = function() {
		}
		
		this.closeContactSuccessModal = function() {
			$('#successModal').modal('hide');
		}
		
	};
	
	cvm = new ContactViewModel();

})(this);

$(document).ready(function() {	

	// Social Icon Redirects
	$('#facebook').on('click', function() {
		window.open('http://facebook.com/SicEmDelivery');
	});
	
	$('#twitter').on('click', function() {
		window.open('http://twitter.com/SicEmDelivery');
	});

	// Initializing Furry Data
	FlurryAgent.startSession("36HQNF8PSBCR5RR8HBG5");
	
	cvm.newContactData();

	$('.modal').on('hide.bs.modal', function() {
		cvm.newContactData();
	});
	
});
