//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:String.format(L('welcome'),'Titanium'),
		height:'auto',
		width:'auto'
	});
	self.add(label);
	/*
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	*/
	return self;
}

module.exports = FirstView;


// llamaremos a una funcion para inicializar las bases de datos ?????? 

/*
 * 
 * 
 * 	 var url = "http://test06.snt.es/categorias.php";
 			var client = Ti.Network.createHTTPClient({
				     
				     // function called when the response data is available
				    
			 onload : function(e) {
				         
				         
				         alert("Received text: " + this.responseText);
				         alert('success');
				         
				         
				         
				         
			},
				     // function called when an error occurs, including a timeout
				     onerror : function(e) {
				         Ti.API.debug(e.error);
				         alert('error');
				     },
				     timeout : 5000  // in milliseconds
		    });
			 // Prepare the connection.
		client.open("GET", url);
			// Send the request.
		client.send();
	
 * 
 * 
 * 
 * 
 * 
 */