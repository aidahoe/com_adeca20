function BaseUIWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	
	
	var isMobileWeb = Titanium.Platform.osname == 'mobileweb';
	
	// create table view data object
	var data = [
		//{title:'Tab Groups', hasChild:!isMobileWeb, test:'ui/common/baseui/tab_groups', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"},
		//{title:'Window Properties', hasChild:true, test:'ui/common/baseui/window_properties'},
		//{title:'Window Layout', hasChild:true, test:'ui/common/baseui/window_layout'},
		//{title:'Window (Standalone)', hasChild:true, test:'ui/common/baseui/window_standalone'},
		//{title:'Views', hasChild:true, test:'ui/common/baseui/views'},
		//{title:'Custom Events', hasChild:true, test:'ui/common/baseui/custom_events'},
		//{title:'Window Events', hasChild:true, test:'ui/common/baseui/window_events'},
		//{title:'Vertical Layout', hasChild:true, test:'ui/common/baseui/vertical_layout'},
		//{title:'Horizontal Layout', hasChild:true, test:'ui/common/baseui/horizontal_layout'}
	];
	
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		//data.push({title:'Tabs', hasChild:true, test:'ui/handheld/ios/baseui/tabs'});
		//data.push({title:'Window NavBar', hasChild:true, test:'ui/handheld/ios/baseui/window_navbar'});
		//data.push({title:'Window Toolbar', hasChild:true, test:'ui/handheld/ios/baseui/window_toolbar'});
		//data.push({title:'Window Constructor', hasChild:true, test:'ui/handheld/ios/baseui/window_constructor'});
		//data.push({title:'Animation', hasChild:true, test:'ui/handheld/ios/baseui/animation'});
		if (Ti.version < '3.2.0') {
		//	data.push({title:'Nav Group', hasChild:true, test:'ui/handheld/ios/baseui/navgroup'});
		}
	
		Ti.include("/etc/version.js");
	
		if (isIPhone3_2_Plus())
		{
		//	data.push({title:'Modal Windows', hasChild:true, test:'ui/handheld/ios/baseui/modal_windows'});
		//	data.push({title:'Custom Fonts', hasChild:true, test:'ui/handheld/ios/baseui/custom_fonts'});
		}
	}
	
	// add android specific tests
	if (Titanium.Platform.osname == 'android')
	{
		//data.push({title:'Preferences', hasChild:true, test:'ui/handheld/android/baseui/preferences'});
	    //data.push({title:'Hide Soft Keyboard (Android)', hasChild:true, test:'ui/handheld/android/baseui/android_hide_softkeyboard'});
	    //data.push({title: 'Window Soft Input (Android)', hasChild:true, test:'ui/handheld/android/baseui/android_window_soft_input_mode'});
	    //data.push({title: 'Menu (Android)', hasChild:true, test:'ui/handheld/android/baseui/android_menus'});
	}
	
	//alert ('entramos');
	//json buscando ofertas
	// Function ofertas()
function loadofertas()
{
	
	
	var rowData = [];
	// Create our HTTP Client and name it "loader"
	var loader = Titanium.Network.createHTTPClient();
	// Sets the HTTP request method, and the URL to get data from
	loader.open("GET","http://test06.snt.es");
	// Runs the function when the data is ready for us to process
	
	loader.onload = function() 
	{
		var ofertas = eval('('+this.responseText+')');
		
		
		for (var i = 0; i < ofertas.length; i++)
		{
			var version = ofertas[i].ver; // The tweet message
			var name = ofertas[i].name; // The screen name of the user
			var api = ofertas[i].api; // The profile image
			// Create a row and set its height to auto
			
			var row = Titanium.UI.createTableViewRow({height:'auto'});



			//aqui separaremos por ipad,,,, que tiene que ser 640px
			
			
			//telefonos rollo samsmung 310 alto. x 300 ancho

			// Create the view that will contain the text and avatar
			var post_view = Titanium.UI.createView({
				height:310, 
				layout:'vertical',
				top:5,
				right:10,
				bottom:5,
				left:10
			});
			
			// Create image view to hold profile pic
		
		
		
			var av_image = Ti.UI.createImageView({
				image:api, // the image for the image view
				top:0,
				left:0,
				height:'auto',
				width:300
			});
			
			
			post_view.add(av_image);
			
			
			
			
			// Create the label to hold the screen name
			
			//create the label to hold the deal name
			
			var logo = Ti.UI.createImageView({
				image: '/images/fondo_faldilla.png',
				height:70,
				with:320,
								
			});
			
			post_view.add(logo);
			
			var user_lbl = Titanium.UI.createLabel({
				text:version,
				left:54,
				width:120,
				top:-68,
				bottom:2,
				height:20,
				textAlign:'left',
				color:'#444444',
				font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
			});
			
			
			
			post_view.add(user_lbl);
			
			var titulo_label = Titanium.UI.createLabel({
				text:name,
				left:54,
				top:0,
				bottom:2,
				height:'auto',
				width:236,
				textAlign:'left',
				font:{fontSize:14}
			});
			
			
			post_view.add(titulo_label);
			
			
			
			// Add the post view to the row
			row.add(post_view);
			// Give each row a class name
			row.className = "item"+i;
			// Add row to the rowData array
			rowData[i] = row;
		

		}
		
		var tableView = Titanium.UI.createTableView({data:rowData});
		//Add the table view to the window
		self.add(tableView);
		
		tableView.addEventListener('click', function(e)
	{
		
		//alert('You clicked row '+e.index);
	   
		if (Ti.Platform.name == "iPhone OS") {
					
					//win.hideTabBar();
					//IOS7 has a weird bug where it will not resize the ViewController correctly when the tabbar is hidden.
					//TIMOB-14998
					win.extendEdges = [Ti.UI.EXTEND_EDGE_BOTTOM];
					win.includeOpaqueBars = true;
					
			};
			
		if (Ti.Platform.name==='android') {
				// As explained in apidoc for Window, if opacity is ever to be changed for an Android
				// activity during its lifetime, it needs to use a translucent background.  We trigger
				// using a translucent theme by the presence of the opacity property, so we need to
				// set it here.  Setting it to 1 means it's totally opaque, but gives us the property to
				// make it more transparent later with the "toggle opacity" test.
				win.backgroundColor = "#54C1E9";
				win.opacity = 1;
			}
		
		//e.section.getItemAt(e.itemIndex).properties.title be.source.rowID
		 
		 var MyGlobalVars = {
		 	
    			indice: e.index,
    		
			};
		
		var indices = e.index;
		var section_mos = e.section;
		var row_mos = e.row;
		var rowdata_mos = e.rowData;
			//message = e.section.getItemAt(e.itemIndex).properties.title;
						// event data
		
	
						
						
        self.containingTab.open(Ti.UI.createWindow({
            title:e.indices + section_mos + row_mos + rowdata_mos,  
            backgroundColor:'white',
            url:'/ui/common/detalles.js',
            barColor:'#54C1E9',
            tab:'#54C1E9'
        }));
   		
		 
		 
	//	self.containingTab.open(win,{animated:true});
		
	});
	
		return tableView;
		
		
		
	    //data.push({title: 'Menu (Android)', hasChild:true, test:'ui/handheld/android/baseui/android_menus'});
	};
	
	
	// Send the HTTP request
	loader.send();
	
	
}	
	
loadofertas();
	

	// create table view
	for (var i = 0; i < data.length; i++ ) {
		var d = data[i];
		// On Android, if touchEnabled is not set explicitly, its value is undefined.
		if (d.touchEnabled !== false) {
			d.color = '#000';
		}
		d.font = {fontWeight:'bold'};
	};
	
	var tableView = Titanium.UI.createTableView({
		data:data
	});
	
				
	
	
	// add table view to the window
	self.add(tableView);
	
	self.addEventListener('focus', function()
	{
		Ti.API.info('FOCUS RECEIVED IN base_ui');
		Ti.App.fireEvent('nav_back');
		
		if (!(Ti.Platform.osname === 'mobileweb' || Ti.Platform.osname === 'tizen')) {
			Ti.API.info(Ti.dumpCoverage());
		}
	});
	//
	//  ADD EVENT LISTENERS FOR CUSTOM EVENTS
	//
	var win = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:110,
		borderRadius:10
	});
	
	var view = Titanium.UI.createView({
		backgroundColor:'#54C1E9',
		opacity:0.7,
		height:30,
		width:250,
		borderRadius:10
	});
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		font:{fontSize:13},
		textAlign:'center',
		width:'auto',
		height:'auto'
	});
	win.add(view);
	win.add(label);
	
	Titanium.App.addEventListener('event_one', function(e)
	{
		label.text = 'base_ui.js: event one, array length = ' + e.data.length;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	});
	
	Titanium.App.addEventListener('event_two', function(e)
	{
		label.text = 'base_ui.js: event two, name = ' + e.name;
		win.open();
		setTimeout(function()
		{
			win.close({opacity:0,duration:500});
		},1000);
	
	});

	
	return self;
};

module.exports = BaseUIWindow;
;