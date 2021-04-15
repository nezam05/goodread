const express = require('express');
const request = require('request');
const Promise = require('bluebird');
const xml2js = require('xml2js');

const app = express();
const parseString = Promise.promisify(xml2js.parseString);
const requestAsync = Promise.promisify(request);

const DEFAULT_PAGE = 1;

function mapBook(bookData) {
    const data = bookData.best_book.shift();
    const authorName = data.author.pop().name.shift();
    const imageUrl = data.image_url.shift();
    const title = data.title.shift();
    
    const avgRating = bookData.average_rating.shift();
    const goodreadId = bookData.id.shift()._;
    const ratingCount= bookData.ratings_count.shift()._;


    return {
        authorName,
        imageUrl,
        title,
        avgRating,
        goodreadId,
        ratingCount
    };
}

function transformResponse(response) {
    const data = response.GoodreadsResponse.search.shift();
    const items = data.results.shift().work;
    const list = items.map(mapBook);
    const total = parseInt(data['total-results'].shift(), 10);
    const start = parseInt(data['results-start'].shift(), 10);
    const end = parseInt(data['results-end'].shift(), 10);

    return {
        list,
        total,
        start,
        end
    };
}

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, credentials, accept, Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
});

app.get('/search/:term', async function (req, res) {
    console.log(req.query)
    const page = req.query.page || DEFAULT_PAGE;
    const requestOptions = {
        baseUrl: 'https://www.goodreads.com/',
        qs: {
            key: 'fylVXMzp2hU0m4YFUMSAUg',
            page,
            q: req.params.term
        },
        uri: '/search/index.xml'
    };

    try {
        const searchResponse = await requestAsync(requestOptions);
        console.log(searchResponse.body);
        const results = await parseString(searchResponse.body,{mergeAttrs:true});
        

        res.send(transformResponse(results));
    } catch (e) {
        res
            .status(500)
            .send(e);
    }
});

app.listen(3000, () => console.log('server started'));