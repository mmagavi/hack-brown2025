const OpenAI = require("openai");

const openai = new OpenAI({ 
    apiKey: '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'
});

(async () => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Write a haiku about recursion in programming.",
                },
            ],
            store: true,
        });

        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching completion:", error);
    }
})();
