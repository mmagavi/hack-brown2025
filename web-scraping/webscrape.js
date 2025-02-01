const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSite(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results = [];
    $('div.text-neutral-content').each((i, elem) => {
        const post = $(elem).find('p').text();
        results.push(post);
    });
    return results;
}

const url = "https://www.reddit.com/r/cancer/comments/1fqnrdd/what_mystery_symptoms_did_you_have_before/";
scrapeSite(url).then((data) => {
    console.log(data)
}).catch((err) => console.log(err));