Schemas.TVMovie = new SimpleSchema({
	_id :  {
		type: String, 
		optional: true
	},
    "startTime": { 
		type 	: new Date, 
		optional: true
	},
    "endTime": { 
		type 	: new Date, 
		optional: true
	},
    "duration": { 
		type 	: Number, 
		optional: true
	},
	"qualifiers": {
		type 	: [String], 
		optional: true
	},
    "channels": { 
		type 	: [String], 
		optional: true
	},
	// ----- START ratings -------------
/*	"ratings" : {
		type: Object,
		optional: true
	},
        "ratings.body": { 
			type 	: String, 
			optional: true
		},
        "ratings.code": { 
			type 	: String, 
			optional: true
		},
*/	// ----- END ratings -------------

	// ----- START program -------------
	"program" : {
		type: Object,
		optional: false
	},
        "program.tmsId": { 
			type 	: String, 
			optional: false
		},
        "program.rootId": { 
			type 	: String, 
			optional: true
		},
        "program.subType": { 
			type 	: String, 
			optional: true
		},
        "program.title": { 
			type 	: String, 
			optional: true
		},
        "program.releaseYear": { 
			type 	: Number, 
			optional: true
		},
        "program.releaseDate": { 
			type 	: new Date, 
			optional: true
		},
        "program.titleLang": { 
			type 	: String, 
			optional: true
		},
        "program.descriptionLang": { 
			type 	: String, 
			optional: true
		},
        "program.entityType": { 
			type 	: String, 
			optional: true
		},
        "program.genres": { 
			type 	: [String], 
			optional: true
		},
        "program.longDescription": { 
			type 	: String, 
			optional: true
		},
        "program.shortDescription": { 
			type 	: String, 
			optional: true
		},
        "program.topCast": { 
			type 	: [String], 
			optional: true
		},
        "program.ratings": { 
			type 	: [Object], 
			optional: true
		},
			"program.ratings.body": { 
				type 	: String, 
				optional: true
			},
			"program.ratings.code": { 
				type 	: String, 
				optional: true
			},
        "program.preferredImage": { 
			type 	: Object, 
			optional: true
		},
            "program.preferredImage.width": { 
				type 	: String, 
				optional: true
			},
            "program.preferredImage.height": { 
				type 	: String, 
				optional: true
			},
            "program.preferredImage.uri": { 
				type 	: String, 
				optional: true
			},
            "program.preferredImage.category": { 
				type 	: String, 
				optional: true
			},
            "program.preferredImage.text": { 
				type 	: String, 
				optional: true
			},
            "program.preferredImage.primary": { 
				type 	: String, 
				optional: true
			},
	// ----- END program -------------
    "stationId": { 
		type 	: String, 
		optional: false
	},
	"moviePoster": { 
		type 	: String, 
		optional: true
	},
	"channelCallSign": {
		type 	: String, 
		optional: true
	}
});

TVMovies = new Mongo.Collection("tvmovies");
TVMovies.attachSchema(Schemas.TVMovie, {transform: true});

Schemas.TVStation = new SimpleSchema({
    _id: { 
		type 	: String, 
		optional: false
	},
	"callSign": { 
		type 	: String, 
		optional: false
	},
	"preferredImage": { 
		type 	: Object, 
		optional: true
	},
		"preferredImage.width": { 
			type 	: String, 
			optional: true
		},
		"preferredImage.height": { 
			type 	: String, 
			optional: true
		},
		"preferredImage.uri": { 
			type 	: String, 
			optional: true
		},
		"preferredImage.category": { 
			type 	: String, 
			optional: true
		},
		"preferredImage.primary": { 
			type 	: String, 
			optional: true
		}/*,
	"channels": { 
		type 	: Object, 
		optional: true
	},
		"channels.channel": { 
			type 	: String, 
			optional: true
		}*/
});

TVStations = new Mongo.Collection("tvstations");
TVStations.attachSchema(Schemas.TVStation, {transform: true});

TVMovies.helpers({
  displayStartTime: function() {
    return new Date(this.startTime).toLocaleTimeString();
  },
  displayStartDate: function() {
    return new Date(this.startTime).toLocaleDateString();
  },
  getChannelCallSign2: function() {
	var data = TVStations.findOne({stationId: this.stationId}, {fields: {callSign: 1}});
	console.log(data);
	if (data) {
		return data.callSign;
	} else {
		return "N/A";
	}
  }
/*  moviePoster2: function() {
	var omdbapi = 'http://www.omdbapi.com/?';
	var build_call = omdbapi + 't=' + this.program.title + '&y=' + this.program.releaseYear + '&plot=short&r=json';
	console.log(build_call);
	$.getJSON( build_call, function(data) {
		if (data.Response && data.Poster !== 'N/A') {
			console.log( data.Poster );
			return data.Poster;
		} else {
			console.log( data );
			return "";
		}
	})
	.fail(function() {
		console.log( "error" );
		return "";
	});
	
	$.getJSON( omdbapi, {
		t: JSON.stringify(this.program.title),
		y: JSON.stringify(this.program.releaseYear),
		plot: 'short',
		r: 'json'
	}, function(data) {
		console.log( "in done");
		console.log( data );
		console.log( data.Poster );
	})
	.fail(function() {
		console.log( "error" );
	}); */
  
  /*,
  allStartDates: function() {
	return _.uniq( TVMovies, true, function (TVMovies){ 
			return TVMovies.startTime;
		});
  }*/
});

/* example data 
 {
    "startTime": "2015-10-10T23:00Z",
    "endTime": "2015-10-11T01:00Z",
    "duration": 120,
    "channels": ["039"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV007536810000",
        "rootId": "11733029",
        "subType": "TV Movie",
        "title": "A Country Wedding",
        "releaseYear": 2015,
        "releaseDate": "2015-06-27",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "Sparks fly when an engaged country-music star (Jesse Metcalfe) reconnects with a childhood friend (Autumn Reeser).",
        "shortDescription": "Sparks fly when an engaged country-music star (Jesse Metcalfe) reconnects with a childhood friend.",
        "topCast": ["Jesse Metcalfe", "Autumn Reeser", "Lauren Holly"],
        "ratings": [{
            "body": "USA Parental Rating",
            "code": "TVG"
        }],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "uri": "assets/p11733029_b_v5_ab.jpg",
            "category": "Banner-L1",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "039"
    }
}, {
    "startTime": "2015-10-10T23:00Z",
    "endTime": "2015-10-11T01:00Z",
    "duration": 120,
    "channels": ["123"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV007536810000",
        "rootId": "11733029",
        "subType": "TV Movie",
        "title": "A Country Wedding",
        "releaseYear": 2015,
        "releaseDate": "2015-06-27",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "Sparks fly when an engaged country-music star (Jesse Metcalfe) reconnects with a childhood friend (Autumn Reeser).",
        "shortDescription": "Sparks fly when an engaged country-music star (Jesse Metcalfe) reconnects with a childhood friend.",
        "topCast": ["Jesse Metcalfe", "Autumn Reeser", "Lauren Holly"],
        "ratings": [{
            "body": "USA Parental Rating",
            "code": "TVG"
        }],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "uri": "assets/p11733029_b_v5_ab.jpg",
            "category": "Banner-L1",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "123"
    }
}, {
    "startTime": "2015-10-10T19:00Z",
    "endTime": "2015-10-10T21:00Z",
    "duration": 120,
    "channels": ["039"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV003874320000",
        "rootId": "9077753",
        "subType": "TV Movie",
        "title": "How to Fall in Love",
        "releaseYear": 2012,
        "releaseDate": "2012-07-21",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "An awkward accountant (Eric Mabius) receives dating tips from his high-school crush (Brooke D'Orsay).",
        "shortDescription": "An awkward man (Eric Mabius) receives dating tips from his high-school crush (Brooke D'Orsay).",
        "topCast": ["Eric Mabius", "Brooke D'Orsay", "Kathy Najimy"],
        "directors": ["Mark Griffiths"],
        "ratings": [{
            "body": "USA Parental Rating",
            "code": "TVG"
        }],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "caption": {
                "content": "How to Fall in Love (2012)",
                "lang": "en"
            },
            "uri": "assets/p9077753_p_v5_aa.jpg",
            "category": "Poster Art",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "039"
    }
}, {
    "startTime": "2015-10-10T19:00Z",
    "endTime": "2015-10-10T21:00Z",
    "duration": 120,
    "channels": ["123"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV003874320000",
        "rootId": "9077753",
        "subType": "TV Movie",
        "title": "How to Fall in Love",
        "releaseYear": 2012,
        "releaseDate": "2012-07-21",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "An awkward accountant (Eric Mabius) receives dating tips from his high-school crush (Brooke D'Orsay).",
        "shortDescription": "An awkward man (Eric Mabius) receives dating tips from his high-school crush (Brooke D'Orsay).",
        "topCast": ["Eric Mabius", "Brooke D'Orsay", "Kathy Najimy"],
        "directors": ["Mark Griffiths"],
        "ratings": [{
            "body": "USA Parental Rating",
            "code": "TVG"
        }],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "caption": {
                "content": "How to Fall in Love (2012)",
                "lang": "en"
            },
            "uri": "assets/p9077753_p_v5_aa.jpg",
            "category": "Poster Art",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "123"
    }
}, {
    "startTime": "2015-10-10T21:00Z",
    "endTime": "2015-10-10T23:00Z",
    "duration": 120,
    "channels": ["039"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV008002560000",
        "rootId": "12102385",
        "subType": "Feature Film",
        "title": "Autumn Dreams",
        "releaseYear": 2015,
        "releaseDate": "2015",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "Years after the annulment of their spontaneous marriage a couple discovers a mistake in the paperwork that means they are still husband and wife.",
        "shortDescription": "A couple is forced to reunite to annul their marriage from years earlier.",
        "topCast": ["Jill Wagner", "Colin Egglesfield"],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "caption": {
                "content": "Autumn Dreams (2015)",
                "lang": "en"
            },
            "uri": "assets/p12102385_p_v5_aa.jpg",
            "category": "Poster Art",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "039"
    }
}, {
    "startTime": "2015-10-10T21:00Z",
    "endTime": "2015-10-10T23:00Z",
    "duration": 120,
    "channels": ["123"],
    "ratings": [{
        "body": "USA Parental Rating",
        "code": "TVG"
    }],
    "program": {
        "tmsId": "MV008002560000",
        "rootId": "12102385",
        "subType": "Feature Film",
        "title": "Autumn Dreams",
        "releaseYear": 2015,
        "releaseDate": "2015",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": ["Romance"],
        "longDescription": "Years after the annulment of their spontaneous marriage a couple discovers a mistake in the paperwork that means they are still husband and wife.",
        "shortDescription": "A couple is forced to reunite to annul their marriage from years earlier.",
        "topCast": ["Jill Wagner", "Colin Egglesfield"],
        "preferredImage": {
            "width": "240",
            "height": "360",
            "caption": {
                "content": "Autumn Dreams (2015)",
                "lang": "en"
            },
            "uri": "assets/p12102385_p_v5_aa.jpg",
            "category": "Poster Art",
            "text": "yes",
            "primary": "true"
        }
    },
    "stationId": "11221",
    "station": {
        "stationId": "11221",
        "callSign": "HALL",
        "preferredImage": {
            "width": "360",
            "height": "270",
            "uri": "h3/NowShowing/11221/s11221_h3_aa.png",
            "category": "Logo",
            "primary": "true"
        },
        "channel": "123"
    }
},
*/