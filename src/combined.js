$(document).ready(getQuote);

var quote = "";

function getQuote() {
	$.getJSON('quotes.json', function(data) {
		// $('#quote').hide();
		$('.quote').empty().hide();
		$('.author').empty().hide();
		var random_entry = data[Math.floor(Math.random()*data.length)];

		var quote = '';
		var author = '';
		quote += random_entry['quote'] + '';
		author += '<cite>—' + random_entry['author'] + '</cite>';

		$('.quote').append(quote).fadeIn(500);
		$('.author').append(author).removeClass('turn-to-red').fadeIn();
		setTimeout(function() {
			$('.author').addClass('turn-to-red');
		}, 300);

		tweetQuote = "";
		tweetQuote += random_entry['quote'];
		tweetQuote += ' —' + random_entry['author'];
	});
};

// Tweet Button
function fbs_click() {
	var quoteClean = tweetQuote.replace(/[&]nbsp[;]/gi," "); // removes all occurrences of &nbsp;
	tweetQuote = quoteClean.replace(/[<]br[^>]*[>]/gi,"");  // removes all <br>
	var twtTitle = tweetQuote;
	var twtUrl = location.href;
	var maxLength = 140 - (twtUrl.length + 12);
	var difference = twtTitle.length - maxLength;
	if (difference > -1) {
		twtTitle = twtTitle.substr(0, (maxLength - 1)) + '…';
	}
	var twtLink = 'http://twitter.com/share?text=' + encodeURIComponent(twtTitle) + '&url=' + encodeURIComponent(twtUrl) + '&hashtags=typography&related=matejlatin';
	window.open(twtLink);
}

$(document).bind('keypress', function(e) {
	if(e.keyCode==32){
		getQuote();
		ga('send', 'event', 'Keypress', 'Get Another');
		$('#keyboard').fadeOut(70).fadeIn(130);
		setTimeout(function(){
			$('.instructions').addClass('fadeOutDown')
		}, 300);
	}
});

var bw = $(window).width();

setTimeout(function(){
	if (bw > 1199){
		$('.instructions').addClass('animated').addClass('fadeInUp');
	}
}, 1500);
