/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 2.0.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 2.0 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 2.0 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	//var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	
	// iPhone makes use of the platform-specific navigation controller,
	// all other platforms follow a similar UI pattern
	if (osname === 'iphone' || osname === 'ipad') {
		Window = require('ui/handheld/ios/ApplicationWindow');
	}
	else if (osname === 'mobileweb'){
		Window = require('ui/mobileweb/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/android/ApplicationWindow');
	}

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var theTabGroup = new ApplicationTabGroup();
	if (osname === 'iphone' || osname === 'ipad') {
		theTabGroup.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	}
	else{
		theTabGroup.open();
	}
	
	//var MessageWindow = require('ui/common/MessageWindow'),
	//	messageWin = new MessageWindow();
		
	/*Titanium.App.addEventListener('event_one', function(e) {
		messageWin.setLabel('app.js: event one, array length = ' + e.data.length);
		messageWin.open();
		setTimeout(function() {
			messageWin.close({opacity:0,duration:500});
		},1000);
	});
	*/
	/*Titanium.App.addEventListener('event_two', function(e) {
		messageWin.setLabel('app.js: event two, name = ' + e.name);
		messageWin.open();
		setTimeout(function() {
			messageWin.close({opacity:0,duration:500});
		},1000);	
	});*/
	
	// test out logging to developer console, formatting and localization
	//Ti.API.info(String.format("%s%s",L("welcome_message","default_not_set"),Titanium.version));
	//Ti.API.debug(String.format("%s %s",L("user_agent_message","default_not_set"),Titanium.userAgent));
	
	
	//Ti.API.info("should be 1.0, was = "+String.format('%1.1f',1));
	
	//i.API.info("should be hello, was = "+String.format('%s','hello'));
	
	
	
		
})();