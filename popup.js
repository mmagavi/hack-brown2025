//Data needed throughout the script
let post_title = '';
let post_content = [];

//Get the current tab URL, and scrape the site for the post title and content
async function start() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    console.log(url);
    await scrapeSite(url);
};

//Scraping the Reddit page for the post title and content
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSite(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    post_title = $('shreddit-title').attr('title');
    $('div.text-neutral-content').each((i, elem) => {
        const content = $(elem).find('p').text();
        post_content.push(content);
    });
}
