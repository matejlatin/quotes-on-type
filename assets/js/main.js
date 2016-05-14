$(document).ready(getQuotes());

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getQuotes(){
	$.ajax({
		url: "https://quotes-on-type.stamplayapp.com/api/codeblock/v1/run/get_quotes",
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		success: pushQuotes,
		error: function(){
			var quote;
			console.log("Cannot get data");
			$('.quote').empty().hide();
			quote += 'Oops, something went wrong. Please refresh the page.';
			$('.quote').append(quote).fadeIn(500);
		}
	});
};

function pushQuotes(data) {
	quotes = data;
	getQuote();

	function getQuote(){
		$('.quote').empty().hide();
		$('.author').empty().hide();
		var objectLength = quotes.data.length;
		var max = objectLength - 1;
		random_number = randomIntFromInterval(0, max);
		random_entry = quotes.data[random_number];

		quote = '';
		author = '';
		quote += random_entry['Quote'] + '';
		author += '<cite class="safari_only">—' + random_entry['Author'] + '</cite>';

		$('.quote').append(quote).fadeIn(500);
		$('.author').append(author).removeClass('turn-to-red').fadeIn();
		setTimeout(function() {
			$('.author').addClass('turn-to-red');
		}, 300);

		tweetQuote = "";
		tweetQuote += random_entry['Quote'];
		tweetQuote += ' —' + random_entry['Author'];
	}

	// Get Another Link
	$('#getAnother').on('click', function(){
		getQuote();
	});

	// On Keypress
	$(document).bind('keydown', function(e) {
		if(e.keyCode==32){
			e.preventDefault();
			getQuote();
			ga('send', 'event', 'Keypress', 'Get Another');
			$('#keyboard').fadeOut(70).fadeIn(130);
			setTimeout(function(){
				$('.instructions').addClass('fadeOutDown')
			}, 300);
		}
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

var bw = $(window).width();

// Keyboard Instructions
setTimeout(function(){
	if (bw > 1199){
		$('.instructions').addClass('animated').addClass('fadeInUp');
	}
}, 1500);
