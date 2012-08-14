module("utc", lifecycle );

test("getter and setter, utc", function() {
	equal( Globalize.utc(), false );
	equal( Globalize.utc(true), true );
	equal( Globalize.utc(), true );
	equal( Globalize.utc(false), false );
	equal( Globalize.utc(), false );
});

test("date parsing, utc", function() {
	function createDate( isUTC, year, month, day, hour, minute, second, milli ) {
		if ( isUTC ) {
			var millis = Date.UTC( year, month, day, hour, minute, second, milli );
			return new Date( millis );
		} else {
			return new Date( year, month, day, hour, minute, second, milli );
		}
	}

	Globalize.utc( false );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), createDate(false, 2011, 10, 17, 13, 23, 12, 0).valueOf() );
	Globalize.utc( true );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), createDate(true, 2011, 10, 17, 13, 23, 12, 0).valueOf() );
});

// This test is a nice sanity check but is really inadequate formatting coverage
test("date formatting, utc", function() {
	var now = new Date();
	for (var i = 0; i < 31536000000; i += 2678400000) {
		var sample = new Date(now.getTime() + i);

		if ( sample.getTimezoneOffset() !== 0 ) {
			Globalize.utc( false );
			var localString = Globalize.format(sample, 'F');
			Globalize.utc( true );
			var utcString = Globalize.format(sample, 'F');

			notEqual( localString, utcString );
		}
	}
});
