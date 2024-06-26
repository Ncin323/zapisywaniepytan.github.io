const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use CORS
app.use(express.static('public'));

app.post('/save-question', (req, res) => {
    const newQuestion = req.body;

    fs.readFile('history_zapisane.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }

        let questions = [];
        if (data) {
            questions = JSON.parse(data);
        }

        questions.push(newQuestion);

        fs.writeFile('history_zapisane.json', JSON.stringify(questions, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write file' });
            }
            res.status(200).json({ message: 'Question saved successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
