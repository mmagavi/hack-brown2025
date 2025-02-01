# Hack @ Brown 2025

# Contributors:

Gianna Dyer

Pranav Gundrala

Maya Magavi

# Goals

1. What our extension looks like upon opening
2. How we get text from the page
3. API calls - ask the question to the model, input & output
4. Output format, look
5. Loading
6. Design + messaging
7. Stated goals
8. Fun name

# Web Scraping

Using Nodejs, Cheerio, and Axios to scrape Reddit pages

Nodejs install: https://nodejs.org/

Run in Terminal to Install: 

```
npm install axios cheerio
```

# API Call/Prompt
Using GPT-4o 
0.0025 /1K input tokens
0.01 /1K output tokens

Example: https://www.reddit.com/r/cancer/comments/1fqnrdd/what_mystery_symptoms_did_you_have_before/

Prompt: You are a user reading an online forum site about a certain disease. You want to be sure that the posts you are reading are not written in a misleading way or by relying heavily on anecdotes to make conclusions. Read this post, and find the central claim and the pieces of evidence used to support it. Classify each of those pieces of evidence as one of the following: anecdotal, unlikely to be supported by evidence, misleading, untrue, likely to be supported by evidence, not misleading, true.

Output in: 
