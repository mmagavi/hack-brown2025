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
    const my_string = "\"" + post_title + post_content + "... \""
    textFieldDiv.textContent = truncateString(my_string, 195);
}

// Scraping the Reddit page for the post title and content
async function scrapeSite(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        post_title = doc.querySelector('h1').textContent; // Adjust selector as needed
        doc.querySelectorAll('div.text-neutral-content p').forEach((elem) => {
            post_content.push(elem.textContent);
        });
    } catch (error) {
        console.error('Error scraping site:', error);
    }
}

// Function to truncate a string to a certain number of characters
function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '... \"';
}

// Call the start function when the popup loads
document.addEventListener('DOMContentLoaded', start);