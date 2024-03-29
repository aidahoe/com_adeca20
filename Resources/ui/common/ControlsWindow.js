function ControlsWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	// create table view data object
	var data = [
	/*	{title:'Slider', hasChild:true, test:'ui/common/controls/slider'},
	//	{title:'Switch', hasChild:true, test:'ui/common/controls/switch'},
		{title:'Activity Indicator', hasChild:true, test:'ui/common/controls/activity_indicator'},
		{title:'Progress Bar', hasChild:true, test:'ui/common/controls/progress_bar'},
		{title:'Button', hasChild:true, test:'ui/common/controls/button'},*/
		{title:'MAPAS', hasChild:true, test:'ui/common/controls/m'},
		{title:'Text Field', hasChild:true, test:'ui/common/controls/textfield'},
		{title:'win Properties', hasChild:true, test:'ui/common/baseui/window_properties'},
		{title:'map Layout', hasChild:true, test:'ui/common/baseui/map_view'},
		{title:'select cell (Standalone)', hasChild:true, test:'ui/common/baseui/select_cell'},
		{title:'escalar imagen', hasChild:true, test:'ui/common/controls/escalar'} 
	];
	
	
	if (Titanium.Platform.name == 'android') {
		if (Ti.Platform.Android.API_LEVEL > 10) {
			data.push({title:'Action Bar', hasChild:true, test:'ui/handheld/android/controls/actionbar'});
		}
	}
	
	
	
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS') {
		data.push({title:'Button Bar', hasChild:true, test:'ui/handheld/ios/controls/buttonbar'});
	//	data.push({title:'Tabbed Bar', hasChild:true, test:'ui/handheld/ios/controls/tabbedbar'});
	//	data.push({title:'System Buttons', hasChild:true, test:'ui/handheld/ios/controls/system_buttons'});
		data.push({title:'Toolbar', hasChild:true, test:'ui/handheld/ios/controls/toolbar'});
	}
	
	
	// create table view
	for (var i = 0; i < data.length; i++ ) { data[i].color = '#000'; data[i].font = {fontWeight:'bold'}; };
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e) {
		if (e.rowData.test) {
			var ExampleWindow = require(e.rowData.test),
				win = new ExampleWindow({
					title:e.rowData.title,
					containingTab:self.containingTab,
					tabGroup:self.tabGroup
				});
			self.containingTab.open(win,{animated:true});
		}
	});
	
	// add table view to the window
	self.add(tableview);
	
	return self;
};

module.exports = ControlsWindow;
