var parseRecord = function (record){
	var local_results = [0,0,0,0,0,0,0,0];
	/*
	var local_moviePoster;
	
	var omdbapi = 'http://www.omdbapi.com/?';
	var build_call = omdbapi + 't=' + record.program.title + '&y=' + record.program.releaseYear + '&plot=short&r=json';
	console.log(build_call);
	_.getJSON( build_call, function(data) {
		if (data.Response && data.Poster !== 'N/A') {
			console.log( data.Poster );
			local_moviePoster = data.Poster;
		} else {
			console.log( data );
			local_moviePoster = "";
		}
	})
	.fail(function() {
		console.log( "error" );
		local_moviePoster = "";
	});
	*/
	//console.log(record.station.preferredImage);
	//console.log(record.station.preferredImage.width);
	var make_id = record.startTime.toString().concat(record.stationId, record.program.tmsId);
	//console.log(make_id);
	var local_listing = {
		_id :				make_id,
		"startTime":		new Date(record.startTime),
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
		"stationId":		record.stationId,
		"moviePoster":		Methods.getPoster(record),
		"channelCallSign":	record.station.callSign
	};

	if (Match.test(local_listing, Schemas.TVMovie)) {
		//console.log("TV Movie match is good");
		if (!TVMovies.findOne({_id: make_id})) {
			if (TVMovies.insert(local_listing)) {
				local_results[4] = 1;
				//console.log("Insert listing: " + local_listing._id);
			} else {
				local_results[5] = 1;
				//console.log("Insert failed: " + local_listing._id);
			}
		} else {
			local_results[6] = 1;
		}
	} else {
		local_results[7] = 1;
		//console.log("TV Movie match is bad");
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
				local_results[0] = 1;
				//console.log("Insert station: " + local_station._id);
			} else {
				local_results[1] = 1;
				//console.log("Insert station failed: " + local_station._id);
			}
		} else {
			local_results[2] = 1;
		}
	} else {
		local_results[3] = 1;
		//console.log("TV Station match is bad");
	}

	return local_results;
};

/*
========================================================================
LOAD CAUSE FIXTURES
========================================================================
*/
Methods.loadTVMovies = function(){
	var local_results = [0,0,0,0,0,0,0,0];
	_.each(tvmovies_file, function(record, index){
		var returned_results = parseRecord(record);
		local_results[0] += returned_results[0];
		local_results[1] += returned_results[1];
		local_results[2] += returned_results[2];
		local_results[3] += returned_results[3];
		local_results[4] += returned_results[4];
		local_results[5] += returned_results[5];
		local_results[6] += returned_results[6];
		local_results[7] += returned_results[7];
	});
	console.log("TV Stations inserted: " + local_results[0] + " failed insert: " + local_results[1] + " duplicated: " + local_results[2] + " bad record: " + local_results[3]);
	console.log("TV Movies (listings) inserted: " + local_results[4] + " failed insert: " + local_results[5] + " duplicated: " + local_results[6] + " bad record: " + local_results[7]);
};

//Meteor.methods({
//	getPoster: function (record) {
Methods.getPoster = function (record) {
		var omdbapi = 'http://www.omdbapi.com/?';
		var build_call = omdbapi + "t='" + record.program.title + "'&y=" + record.program.releaseYear + '&plot=short&r=json';
		//console.log(build_call);
		//this.unblock();
		var data_var = Meteor.http.call("get", build_call);
		//console.log(data_var.data.Response);
		if (data_var.data.Response) {
			if (data_var.data.Poster !== 'N/A') {
				//console.log( data_var.data.Poster );
				return data_var.data.Poster;
			} else {
				return "images/blank_poster.jpg";
			}
		} else {
			console.log( data );
			return "images/blank_poster.jpg";
		}
};


/*
========================================================================
STARTING POINT
========================================================================
*/

Meteor.startup(function(){

  // turn off because a lot of data was loaded
  console.log("Clearing fixtures");
  TVStations.remove({});
  TVMovies.remove({});
  
  console.log("Adding TV Movies fixtures");
  Methods.loadTVMovies();

});
