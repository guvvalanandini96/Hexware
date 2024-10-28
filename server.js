const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;  // Change this if you prefer another port
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Your OpenAI API Key

app.use(express.json()); // Middleware to parse JSON data
app.use(express.static('public')); // Serve static files from the 'public' directory

// API endpoint to generate quiz questions
app.post('/generate-questions', async (req, res) => {
    async function generateQuestions() {
        const topic = document.getElementById('topic').value;
        const level = document.getElementById('level').value;
        const numQuestions = document.getElementById('numQuestions').value;
    
        const response = await fetch('/generate-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, level, numQuestions }),
        });
    
        if (response.ok) {
            const data = await response.json();
            displayQuestions(data.questions); // Call the function to display questions
        } else {
            console.error('Error generating questions:', response.statusText);
        }
    }
    
    function displayQuestions(questions) {
        const questionsDiv = document.getElementById('questions');
        questionsDiv.innerHTML = ''; // Clear previous questions
    
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <ul>
                    ${q.options.map((option, i) => `<li>${String.fromCharCode(65 + i)}) ${option}</li>`).join('')}
                </ul>
            `;
            questionsDiv.appendChild(questionElement);
        });
    }
    
    // ... (your existing code)
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
