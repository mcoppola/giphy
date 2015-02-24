

// RACE

// implement setTimeout as a Promise
// - makes it "thenable"
function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

Promise.race([

	    searchForGif('space jam'),

	    delay(5000).then(function () {
	        throw new Error('Timed out')
	    });
	])

	.then( loadGif )

	.catch(function (err) { 
		console.log(err);
});