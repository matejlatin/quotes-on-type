$(document).ready(getQuote);

var quote = "";

function getQuote() {
	$.getJSON('quotes.json', function(data) {
		$('#quote').empty().hide();
		var random_entry = data[Math.floor(Math.random()*data.length)];

		var html = '<p>';
		html += random_entry['quote'] + '</p>';
		html += '<footer><cite>—' + random_entry['author'] + '</cite></footer>';
		quote = "";
		quote += random_entry['quote'];
		quote += ' —' + random_entry['author'];

		$('#quote').append(html).fadeIn();
	});
};

// Tweet Button
function fbs_click() {
	var quoteClean = quote.replace(/[&]nbsp[;]/gi," "); // removes all occurrences of &nbsp;
	quote = quoteClean.replace(/[<]br[^>]*[>]/gi,"");  // removes all <br>
	var twtTitle = quote;
	console.log(twtTitle);
	var twtUrl = location.href;
	var maxLength = 140 - (twtUrl.length + 1);
	if (twtTitle.length > maxLength) {
		twtTitle = twtTitle.substr(0, (maxLength - 14)) + '...';
	}
	var twtLink = 'http://twitter.com/share?text=' + twtTitle + '&url=' + encodeURIComponent(twtUrl) + '&hashtags=typography&related=matejlatin';
	window.open(twtLink);
}
