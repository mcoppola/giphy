

// PARALLEL

var queries = [
        'punk',
        'ave',
        'philly'
    ];

var promisedGifs = queries.map(searchForGif);

Promise.all(promisedGifs)

    .then(function (gifs) {
        // 'gifs' is an array of the results of each promise

        gifs.forEach(function (gif) {

            // do something to each gif here
        });
    })

    .catch(function (err) {
        // receives first rejection among the promises
});