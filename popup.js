console.log('This is a popup!');

// Data needed throughout the script
let post_title = '';
let post_content = [];
let response = '';

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

const OpenAI = require("openai");

const openai = new OpenAI({ 
    apiKey: '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'
});

//Function that feeds the post content to the GPT-4o model and generates a response
async function generateResponse() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                // System role defines behavior + context (prompt)
                { role: "system", content: `You are a user reading an online forum site about a certain disease. 
                You want to be sure that the posts you are reading are not written in a misleading way or by relying heavily 
                on anecdotes to make conclusions. Read this post, and find the central claim and the pieces of evidence used to support it. 
                Classify each of those pieces of evidence as one of the following: anecdotal, unlikely to be supported by evidence, 
                misleading, untrue, likely to be supported by evidence, not misleading, true.` },
                {
                // User role defines first message in the chat (post to respond to)
                    role: "user",
                    content: postContent[0],
                },
            ],
            store: true,
        });
        // completion.choices[0].message provides the object for the response message
        // .content accesses the actual text output
        response = completion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching completion:", error);
    }
}

// Function to display the response in the popup window
function displayResponse() {
    const head2Div = document.querySelector('.head-2');
    const textFieldDiv = document.getElementById('text-field');
    const verifyButton = document.querySelector('button');

    // Hide the elements
    head2Div.style.display = 'none';
    textFieldDiv.style.display = 'none';
    verifyButton.style.display = 'none';

    // Create a new div to show the response
    const responseDiv = document.createElement('div');
    responseDiv.classList.add('response');
    responseDiv.textContent = response;
    document.body.appendChild(responseDiv);

    // Create a back button with the same style
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.className = verifyButton.className; // Copy styles from verify button
    document.body.appendChild(backButton);

    // Add event listener to reset the UI when back is clicked
    backButton.addEventListener('click', () => {
        head2Div.style.display = 'block';
        textFieldDiv.style.display = 'block';
        verifyButton.style.display = 'block';
        responseDiv.remove();
        backButton.remove();
    });
}


// Call the start function when the popup loads
document.addEventListener('DOMContentLoaded', start);
//Generate and display response when verify button is clicked
document.querySelector('button').addEventListener('click', async () => {
    await generateResponse();
    displayResponse();
});