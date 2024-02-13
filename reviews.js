function addFeedback(event) {
    event.preventDefault();

    const feedbackInput = document.getElementById('feedback');
    const feedbackText = feedbackInput.value.trim();

    if (feedbackText !== '') {
        // Создаем новый элемент отзыва
        const newFeedback = document.createElement('div');
        newFeedback.className = 'feed';
        newFeedback.textContent = feedbackText;

        // Добавляем новый отзыв в список
        const feedbacksList = document.getElementById('feedbacks-list');
        feedbacksList.appendChild(newFeedback);

        // Сохраняем отзыв в локальное хранилище
        saveFeedbackToLocalStorage(feedbackText);

        // Очищаем поле ввода
        feedbackInput.value = '';
    }
}

function saveFeedbackToLocalStorage(feedback) {
    // Получаем текущий список отзывов из локального хранилища
    let storedFeedbacks = localStorage.getItem('feedbacks') || '[]';
    storedFeedbacks = JSON.parse(storedFeedbacks);

    // Добавляем новый отзыв
    storedFeedbacks.push(feedback);

    // Сохраняем обновленный список в локальное хранилище
    localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
}

// Загружаем отзывы из локального хранилища при загрузке страницы
window.onload = function() {
    loadFeedbacksFromLocalStorage();
};

function loadFeedbacksFromLocalStorage() {
    const storedFeedbacks = localStorage.getItem('feedbacks');

    if (storedFeedbacks) {
        const feedbacksList = document.getElementById('feedbacks-list');

        // Проходимся по сохраненным отзывам и добавляем их на страницу
        JSON.parse(storedFeedbacks).forEach(function(feedbackText) {
            const newFeedback = document.createElement('div');
            newFeedback.className = 'feed';
            newFeedback.textContent = feedbackText;
            feedbacksList.appendChild(newFeedback);
        });
    }
}

function clearLocalStorageAndFeedbacks() {
    localStorage.removeItem('feedbacks'); // Очищаем локальное хранилище отзывов
    const feedbacksList = document.getElementById('feedbacks-list');
    feedbacksList.innerHTML = ''; // Очищаем отзывы на странице
}


