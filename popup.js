console.log('This is a popup!');

// Data needed throughout the script
let post_title = '';
let post_content = [];

// Get the current tab URL, and scrape the site for the post title and content
async function start() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    console.log(url);
    await scrapeSite(url);
    const textFieldDiv = document.getElementById('text-field');
    textFieldDiv.textContent = post_title;
}

// Scraping the Reddit page for the post title and content
async function scrapeSite(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        post_title = $('h1').first().text(); // Adjust selector as needed
        $('div.text-neutral-content').each((i, elem) => {
            const content = $(elem).find('p').text();
            post_content.push(content);
        });
    } catch (error) {
        console.error('Error scraping site:', error);
    }
}

// Call the start function when the popup loads
document.addEventListener('DOMContentLoaded', start);