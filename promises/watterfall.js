

// "A promise represents the eventual result of an asynchronous operation."


// DECLARE

// This will run right now
var searchForGif = new Promise(function (resolve, reject) {

	// async stuff ...
	
	if (successful) {
		resolve(data);
	} else {
		reject(new Error('bummer'));
	}
});


// This returns a new promise that runs when you call it
function searchForGif(q) {
  	// Return a new promise.
  	return new Promise(function (resolve, reject) {

  		// async stuff ...

  		if (successful) {
  			resolve(data);
  		} else {
  			reject(new Error('bummer'));
  		}
  	});
}


// --------------------------------------------------------------------------- //

function searchForGif(q) {
  // Return a new promise.
  return new Promise(function (resolve, reject) {

    var req = new XMLHttpRequest();
    var url ='http://api.giphy.com/v1/gifs/search?q=' + utils.slugify(q) + '&limit=1&api_key=dc6zaTOxFJmzC';

    req.open('GET', url);

    req.onload = function() {
      // Check the status
      if (req.status == 200) {
        // Resolve the promise
        resolve(JSON.parse(req.response));
      } else {
        // Reject the promise
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      // Reject the promise
      reject(Error("Network Error"));
    };

    req.send();
  });
}


// USE

searchForGif( 'query' )

	.then(function (result) {

		// it was successful, do something else

	}, function (err) {

		// it failed
	})

	.catch( function(error) {

    	noResults();
      	console.error("Failed!", error);
});