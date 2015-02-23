
function searchForGif(q) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    var url ='http://api.giphy.com/v1/gifs/search?q=' + utils.slugify(q) + '&limit=1&api_key=dc6zaTOxFJmzC';

    req.open('GET', url);

    req.onload = function() {
      // Check the status
      if (req.status == 200) {

        // Resolve the promise
        resolve(JSON.parse(req.response));
      }
      else {
        
        // Reject the promise
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      // Reject the promise
      reject(Error("Network Error"));
    };

    req.send();
  });
}


function loadGif(res) {
  return new Promise(function(resolve, reject) {

    if (res.data.length == 0) reject();
    
    var gif = new Image();
    gif.width = 300;
    gif.height = 300;

    gif.onload = function() {
        $canvas.removeClass('loud');
        $bucket.removeClass('loading');
        $bucket.html(gif);

        resolve();
    }

    gif.onerror = function(e) {
      reject(e);
    }

    gif.src = res.data[0].images.downsized.url;
                
  });
}