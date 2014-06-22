// Keep a reference to this window so it does not get collected on Android.
//var messageWin;
function ApplicationTabGroup() {
	



	var self = Ti.UI.createTabGroup(),
		BaseUIWindow = require('ui/common/BaseUIWindow'),
		ControlsWindow = require('ui/common/ControlsWindow'),
		PhoneWindow = require('ui/common/PhoneWindow'),
		PlatformWindow = require('ui/common/PlatformWindow'),
		MashupsWindow = require('ui/common/MashupsWindow');
		//MessageWindow = require('ui/common/MessageWindow');
	
	
	self.tabsBackgroundColor = '#54C1E9';
	self.barColor = '#54C1E9';
	self.tabsBackgroundSelectedColor = '#8DD52E';
	
	
	
	
		//create app tabs
	var baseUIWin = new BaseUIWindow(L('base_ui_title')),
		controlsWin = new ControlsWindow(L('controls_win_title')),
		phoneWin = new PhoneWindow(L('phone_win_title')),
		platformWin = new PlatformWindow(L('platform_win_title')),
		mashupsWin = new MashupsWindow(L('mashups_win_title'));
		//messageWin = new MessageWindow();
	
	
	
	var baseUITab = Ti.UI.createTab({
		title: L('base_ui_title'),
		icon: '/images/KS_nav_ofertas.png',
		window: baseUIWin
	});
	baseUIWin.containingTab = baseUITab;
	
	// On Tizen/Mobile Web, the tabGroup property must be initialized manually.
	// It serves to remember the tab group control that hosts the window.
	// This is needed for the tab group-related tests to be able to access the
	// main tab group control.
	Ti.Platform.osname === 'tizen' && (baseUIWin.tabGroup = self);
	
	self.addTab(baseUITab);
	
	var controlsTab = Ti.UI.createTab({
		title: L('controls_win_title'),
		icon: '/images/KS_nav_destacados.png',
		window: controlsWin,
	
		
	});
	
	controlsWin.containingTab = controlsTab;
	self.addTab(controlsTab);
	
	var phoneTab = Ti.UI.createTab({
		title:L('phone_win_title'),
		icon:'/images/KS_nav_cate.png',
		window:phoneWin
	});
	phoneWin.containingTab = phoneTab;
	self.addTab(phoneTab);
	
	var platformTab = Ti.UI.createTab({
		title:L('platform_win_title'),
		icon:'/images/KS_nav_wish.png',
		window:platformWin
	});
	platformWin.containingTab = platformTab;
	self.addTab(platformTab);
	
	var mashupsTab = Ti.UI.createTab({
		title:L('mashups_win_title'),
		icon:'/images/KS_nav_cart.png',
		window:mashupsWin
	});
	mashupsWin.containingTab = mashupsTab;
	self.addTab(mashupsTab);
	
	self.setActiveTab(0);
	
	
	// Tabgroup events and message window
	messageWin = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:70,
		borderRadius:10,
		touchEnabled:false,
		orientationModes : [
			Titanium.UI.PORTRAIT,
			Titanium.UI.UPSIDE_PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
	});
	//if (Ti.Platform.osname === 'iphone') {
	//	messageWin.orientationModes = [Ti.UI.PORTRAIT];
	//	}
	
	var messageView = Titanium.UI.createView({
		id:'messageview',
		height:30,
		width:250,
		borderRadius:10,
		backgroundColor:'#000',
		opacity:0.7,
		touchEnabled:false
	});
		
	var messageLabel = Titanium.UI.createLabel({
		id:'messagelabel',
		text:'',
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});
	messageWin.add(messageView);
	messageWin.add(messageLabel);
	
	self.addEventListener('close', function(e) {
		if (e.source == self){
			if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
				self.open();
			}
		}
	});
	
	self.addEventListener('open',function(e) {
		if (e.source == self){
			Titanium.UI.setBackgroundColor('white');
			messageLabel.text = 'tab group open event';
			messageWin.open();
	
			setTimeout(function() {
				messageWin.close({opacity:0,duration:500});
			},1000);
		}
	});
	/* ******** esrtos son los toats comentarios  
	
	self.addEventListener('focus', function(e) {
		// On iOS, the "More..." tab is actually a tab container, not a tab. When it is clicked, e.tab is undefined.
		if (!e.tab) {
			return;
		}

		// iOS fires with source tabGroup. Android with source tab
		if ((e.source == baseUITab) || (e.source == controlsTab) || (e.source == phoneTab) || (e.source == platformTab) || (e.source == mashupsTab) || (e.source == self)) {

			messageLabel.text = 'tab changed to ' + e.index + ' old index ' + e.previousIndex;
			messageWin.open();

			setTimeout(function() {
				Ti.API.info('tab = ' + e.tab.title + ', prevTab = ' + (e.previousTab ? e.previousTab.title : null));
				messageLabel.text = 'active title ' + e.tab.title + ' old title ' + (e.previousTab ? e.previousTab.title : null);
			}, 1000);

			setTimeout(function() {
				messageWin.close({
					opacity : 0,
					duration : 500
				});
			}, 2000);
		}

	}); 
	*/
	/*self.addEventListener('blur', function(e) {
		Titanium.API.info('tab blur - new index ' + e.index + ' old index ' + e.previousIndex);
	});*/
	
	self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;
