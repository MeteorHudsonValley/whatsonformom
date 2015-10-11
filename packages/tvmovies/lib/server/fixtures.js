var parseRecord = function (record){
	//console.log(record.station.preferredImage);
	//console.log(record.station.preferredImage.width);
	var make_id = record.startTime.toString().concat(record.stationId, record.program.tmsId);
	//console.log(make_id);
	var local_listing = {
		_id :				make_id,
		"startTime":		record.startTime,
		"endTime":			record.endTime,
		"duration":			record.duration,
		"qualifiers":		record.qualifiers,
		"channels":			record.channels,
		"program" : {
			"tmsId":			record.program.tmsId,
			"rootId":			record.program.rootId,
			"subType":			record.program.subType,
			"title":			record.program.title,
			"releaseYear":		record.program.releaseYear,
			"releaseDate":		record.program.releaseDate,
			"titleLang":		record.program.titleLang,
			"descriptionLang":	record.program.descriptionLang,
			"entityType":		record.program.entityType,
			"genres":			record.program.genres,
			"longDescription":	record.program.longDescription,
			"shortDescription":	record.program.shortDescription,
			"topCast":			record.program.topCast,
			//"ratings":			record.program.ratings,
			/*"ratings":{
				"body":			record.program.ratings.body,
				"code":			record.program.ratings.code
			},*/
			"preferredImage": {
				"width":		record.program.preferredImage.width,
				"height":		record.program.preferredImage.height,
				"uri":			record.program.preferredImage.uri,
				"category":		record.program.preferredImage.category,
				"text":			record.program.preferredImage.text,
				"primary":		record.program.preferredImage.primary
			}
		},
		"stationId":		record.stationId
	};

	if (Match.test(local_listing, Schemas.TVMovie)) {
		//console.log("TV Movie match is good");
		if (!TVMovies.findOne({_id: make_id})) {
			if (TVMovies.insert(local_listing)) {
				console.log("Insert listing: " + local_listing._id);
			} else {
				console.log("Insert failed: " + local_listing._id);
			}
		}
	} else {
		console.log("TV Movie match is bad");
	}


	var local_station = {
		_id:				record.station.stationId, 
		"callSign":			record.station.callSign,
		"preferredImage":	{
			"width":		record.station.preferredImage.width,
			"height":	record.station.preferredImage.height,
			"uri":		record.station.preferredImage.uri,
			"category":	record.station.preferredImage.category,
			"primary":	record.station.preferredImage.primary
		}/*,
		"channels":			{
			"channels.channel":			record.station.channel
		}*/
		};

	if (Match.test(local_station, Schemas.TVStation)) {
		//console.log("TV Movie match is good");
		if (!TVStations.findOne({_id: local_station._id})) {
			if (TVStations.insert(local_station)) {
				console.log("Insert station: " + local_station._id);
			} else {
				console.log("Insert station failed: " + local_station._id);
			}
		}
	} else {
		console.log("TV Station match is bad");
	}

	return local_station;
};

/*
========================================================================
LOAD CAUSE FIXTURES
========================================================================
*/
Methods.loadTVMovies = function(){
	var station = {};
	//station = JSON.parse(Assets.getText("tvmovies.json"));
	//station = myjson;
	//console.log("in Method loadTVMovies");
	//jQuery.each(myjson, function( index, value ) {
	_.each(myjson, function(record, index){
		//alert( index + ": " + value );
		station = record;
		//var myerror = check(1, String);
		var org = parseRecord(station);
		/*var myerror = Match.test(org, Schemas.TVStation);
		//console.log(org);
		if (myerror) {
			if (!TVStations.findOne({_id: org._id})) {
				if (TVStations.insert(org)) {
					console.log("Insert station: " + org._id);
				} else {
					console.log("Insert failed: " + org._id);
				}
			}
		}*/
		//check(station, Schemas.TVStation);
		//console.log("after check myerror: " + myerror); 
	});
};

/*
========================================================================
STARTING POINT
========================================================================
*/

Meteor.startup(function(){
  console.log("Clearing fixtures");
  TVStations.remove({});
  TVMovies.remove({});
  
  console.log("Adding TV Movies fixtures");
  Methods.loadTVMovies();

});