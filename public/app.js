document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let questions = [];

    // Fetch the JSON data
    fetch('history.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        });

    // Function to display the current question
    function displayQuestion() {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const questionContainer = document.getElementById('question-container');
            const questionElement = document.getElementById('question');
            const answersElement = document.getElementById('answers');

            const currentQuestion = questions[currentQuestionIndex];

            questionElement.textContent = currentQuestion.question;
            answersElement.innerHTML = '';

            currentQuestion.answers.forEach((answer, index) => {
                const li = document.createElement('li');
                li.textContent = answer;
                answersElement.appendChild(li);
            });
        }
    }

    // Event listener for the next question button
    document.getElementById('next-question').addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0; // Loop back to the first question
        }
        displayQuestion();
    });

    // Event listener for the save question button
    document.getElementById('save-question').addEventListener('click', function() {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            saveQuestion(currentQuestion);
        }
    });

    // Function to save the question to the server
    function saveQuestion(question) {
        fetch('http://localhost:3000/save-question', { // Use the full URL to the local server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to download saved questions as a JSON file
    function downloadSavedQuestions() {
        fetch('http://localhost:3000/history_zapisane.json')
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'history_zapisane.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
