window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var bg = new Trippy(context, canvas.width, canvas.height);


	$(function() {
		$input = $('#input');
		$bucket = $('#gif-bucket');
		$canvas = $('#canvas');
		$noresults = $('#noresults');

	    

	    $('#search').submit(function(e) {
		    e.preventDefault();

		    loud();
		   
		    // Promise
	    	searchForGif( $input.val() )

		    	.then( fetchGif )

		    	.then( quiet )

	    		.catch( function(error) {

			    	noResults();
			      	console.error("Failed!", error);
	  		});
		});



		function noResults() {
			$canvas.removeClass('loud');
			$noresults.addClass('active');
		}
		function loud() {
			$canvas.addClass('loud');
		    $bucket.addClass('loading');
		    $noresults.removeClass('active');
		}
		function quiet() {
			$canvas.removeClass('loud');
			$bucket.removeClass('loading');
		}
	});

	(function drawFrame () {
	   utils.getAnimationFrame();
	   window.requestAnimationFrame(drawFrame, canvas);
	 
	   bg.update();
	}());
};