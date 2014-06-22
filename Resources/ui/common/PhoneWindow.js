/*
function tv_dynamic(_args) {
	var win = Ti.UI.createWindow({
		title:_args.title
	});
	
	var data = [];
	
	
	
	var lastRow = 10;
	for (var c=0;c<lastRow;c++)
	{
		data[c] = {title:"Row "+(c+1)};
	}
	
	
	
	// aqui tenemos que sacar los datos
	
	
	
	
	var tableView = Ti.UI.createTableView({
		data: data
	});
	
	win.add(tableView);
	
	var navActInd = Titanium.UI.createActivityIndicator();
	
		var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//iphone ipad
	if (osname === 'iphone' || osname === 'ipad') {
	win.setRightNavButton(navActInd);
	}
	else{
	}
	//android 
	
	
	
	var updating = false;
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."});
	
	function beginUpdate()
	{
		updating = true;
		navActInd.show();
	
		tableView.appendRow(loadingRow);
	
		// just mock out the reload
		setTimeout(endUpdate,2000);
	}
	
	function endUpdate()
	{
		updating = false;
	
		tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	
		// simulate loading
		for (var c=lastRow;c<lastRow+10;c++)
		{
			tableView.appendRow({title:"Row "+(c+1)},{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
		}
		lastRow += 10;
	
		// just scroll down a bit to the new rows to bring them into view
		tableView.scrollToIndex(lastRow-9,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
	
		navActInd.hide();
	}
	
	var lastDistance = 0; // calculate location to determine direction
	
	tableView.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
	
		// going down is the only time we dynamically load,
		// going up we can safely ignore -- note here that
		// the values will be negative so we do the opposite
		if (distance < lastDistance)
		{
			// adjust the % of rows scrolled before we decide to start fetching
			var nearEnd = theEnd * .75;
	
			if (!updating && (total >= nearEnd))
			{
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
	return win;
};

module.exports = tv_dynamic;
*/

//hasta aqui va con el escaneo linea a  linea

//http://cocoawithlove.com/2009/04/easy-custom-uitableview-drawing.html


function tv_layout4(_args) {
	var win = Titanium.UI.createWindow({
		title:_args.title
	});
	win.backgroundImage = '/images/gradientBackground.png';
	
	var data = [];
	
	var headerView = Ti.UI.createView({
		height:80
	});
	
	var headerLabel = Ti.UI.createLabel({
		top:10,
		left:20,
		width:'auto',
		height:'auto',
		text:'Categorias',
		color:'white',
		shadowColor:'black',
		shadowOffset:{x:0,y:1},
		font:{fontWeight:'bold',fontSize:22}
	});
	
	var footerLabel = Ti.UI.createLabel({
		text:'Prueba Categorias',
		color:'white',
		width:'auto',
		height:'auto',
		textAlign:'center',
		shadowColor:'black',
		shadowOffset:{x:0,y:1},
		font:{fontWeight:'bold',fontSize:15}
	});
	
	var footerView = Ti.UI.createView({
		height:60
	});
	
	headerView.add(headerLabel);
	footerView.add(footerLabel);
	
	
	Ti.App.myGlobalVar = [];
	var colors = [];
	Ti.App.Properties.setList('categor', colors);
	
	
	//base de datos con tabla categorias
	
	var db = Titanium.Database.install('/etc/ADECA.sqlite', 'adeca');
	
	db.execute('CREATE TABLE IF NOT EXISTS CATEGORIAS  (ID INTEGER, DESCRIPCION TEXT, PATH TEXT)');
	
	
	
	
	
	//sacamos los datos de categorias //
	
	var url = "http://test06.snt.es/categorias.php";
 	var client = Ti.Network.createHTTPClient({
				     
				     // function called when the response data is available
				    
			 onload : function(e) {
				         
				         //hay que parsear 
				         
				         var ofertas = eval('('+this.responseText+')');
		
						 
					
						 
						 
								for (var i = 0; i < ofertas.length; i++)
								{
									var version = ofertas[i].descr; // The tweet message
									var name = ofertas[i].id; // The screen name of the user
									var api = ofertas[i].patch; // The profile image
									// Create a row and set its height to auto
									
								var colors = Ti.App.Properties.getList('categor', []);
								colors.push(version);
								Ti.App.Properties.setList('categor', colors);								
								Ti.API.info('los categor = ',colors);
								
							//	db.execute('INSERT INTO CATEGORIAS (ID, NAME, PATH ) VALUES(?,?,?)',name,version,api);
								
								
							//	db.execute('INSERT INTO CATEGORIAS VALUES(name, "2", "3")');																
								Titanium.API.info('JUST INSERTED, rowsAffected = ' + db.rowsAffected);
							
						
								
								}
								
								
								
									   				         			         		         		      
				        		         
			},
				     // function called when an error occurs, including a timeout
				     onerror : function(e) {
				         Ti.API.debug(e.error);
				      
				     },
				     timeout : 5000  // in milliseconds
				     
				  
		    });
			 // Prepare the connection.
		client.open("GET", url);
			// Send the request.
		client.send();
		
		
		
	//llamamos a la global categoriasjson
	

	var rows = db.execute('SELECT * FROM CATEGORIAS');
	Titanium.API.info('ROW COUNT = ' + rows.getRowCount());
	//alert(rows.rowCount);
	//alert (rows);		
	var cantidad = rows.rowCount;
	// rows.close();
	//db.close(); // close db when you're done to save resources
								
	
	
	
	// y los sacamos tantas veces como salgan en el tema
	
	
	for (var c=0;c<cantidad;c++)
	{
		var row = Ti.UI.createTableViewRow();
		row.rightImage = '/images/tableview/easycustom/indicator.png';
		if (c === 0)
		{
			row.backgroundImage = '/images/tableview/easycustom/topRow.png';
			row.selectedBackgroundImage = '/images/tableview/easycustom/topRowSelected.png';
		}
		else if (c < 29)
		{
			row.backgroundImage = '/images/tableview/easycustom/middleRow.png';
			row.selectedBackgroundImage = '/images/tableview/easycustom/middleRowSelected.png';
		}
		else
		{
			row.backgroundImage = '/images/tableview/easycustom/bottomRow.png';
			row.selectedBackgroundImage = '/images/tableview/easycustom/bottomRowSelected.png';
		}
		if ((c % 3) == 0)
		{
			row.leftImage = "/images/tableview/easycustom/imageA.png";
		}
		else if ((c % 3) == 1)
		{
			row.leftImage = "/images/tableview/easycustom/imageB.png";
		}
		else
		{
			row.leftImage = "/images/tableview/easycustom/imageC.png";
		}
		//db.execute("COMMIT");
	
		Titanium.API.info(rows.field(1) + '\n' + rows.field(0) + ' col 1 ' + rows.fieldName(0) + ' col 2 ' + rows.fieldName(1));
	
		var label = Ti.UI.createLabel({
			text: rows.field(1) ,
			color: '#420404',
			shadowColor:'#FFFFE6',
			shadowOffset:{x:0,y:1},
			textAlign:'left',
			top:20,
			left:85,
			width: 'auto',
			height:'auto',
			font:{fontWeight:'bold',fontSize:18}
		});
		if (Titanium.Platform.name == 'android') {
			label.top = 10;
		}
		row.add(label);
		
		label.addEventListener('click',function(e)
		{
			alert("pulsaste en "+e.source);
		});
	
		var label2 = Ti.UI.createLabel({
			text: "Segunda info",
			color: '#420404',
			shadowColor:'#FFFFE6',
			textAlign:'left',
			shadowOffset:{x:0,y:1},
			font:{fontWeight:'bold',fontSize:13},
			bottom:22,
			height:'auto',
			left:85,
			right:50
		});
		if (Titanium.Platform.name == 'android') {
			label2.right = 30;
		}
		row.add(label2);
		data[c]=row;
		rows.next();
	
	}
	
	var tableview = Titanium.UI.createTableView({
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
		backgroundColor:'transparent',
		headerView:headerView,
		footerView:footerView,
		maxRowHeight:100,
		minRowHeight:100,
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	
	tableview.addEventListener('click',function(e)
	{
		alert("Pulsaste en  = "+e.source);
	});
	
	win.add(tableview);
	return win;
	
	
	rows.close();
	db.close(); // 
};

module.exports = tv_layout4;

