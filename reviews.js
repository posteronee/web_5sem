document.addEventListener('DOMContentLoaded', function () {
    loadFeedbacksFromLocalStorage();
});

function addFeedback(event) {
    event.preventDefault();

    const feedbackInput = document.getElementById('feedback');
    const feedbackText = feedbackInput.value.trim();

    const ratingInputs = document.getElementsByName('rating');
    let ratingValue = 0;

    for (const input of ratingInputs) {
        if (input.checked) {
            ratingValue = input.value;
            break;
        }
    }

    if (feedbackText !== '' && ratingValue !== 0) {
        const newFeedback = document.createElement('div');
        newFeedback.className = 'feed';
        newFeedback.innerHTML = `<p>${feedbackText}</p><div class="rating-area rating-stars">${generateStars(ratingValue)}</div>`;
        const feedbacksList = document.getElementById('feedbacks-list');
        feedbacksList.appendChild(newFeedback);
        saveFeedbackAndRatingToLocalStorage(feedbackText, ratingValue);
        showMessage("Отзыв успешно отправлен!");
        feedbackInput.value = '';
        resetRatingInputs(ratingInputs);
    }
}

function generateStars(count) {
    let stars = '';
    for (let i = 1; i <= count; i++) {
        stars += '★';
    }
    return stars;
}

function saveFeedbackAndRatingToLocalStorage(feedbackText, ratingValue) {
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacksAndRatings')) || [];

    const newFeedback = {
        text: feedbackText,
        rating: ratingValue
    };
    existingFeedbacks.push(newFeedback);

    localStorage.setItem('feedbacksAndRatings', JSON.stringify(existingFeedbacks));
}

function loadFeedbacksFromLocalStorage() {
    const feedbacksList = document.getElementById('feedbacks-list');
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacksAndRatings')) || [];

    for (const feedback of existingFeedbacks) {
        const newFeedback = document.createElement('div');
        newFeedback.className = 'feed';
        newFeedback.innerHTML = `<p>${feedback.text}</p><div class="rating-area rating-stars">${generateStars(feedback.rating)}</div>`;
        feedbacksList.appendChild(newFeedback);
    }
}

function clearLocalStorageAndFeedbacks() {
    localStorage.removeItem('feedbacksAndRatings');
    const feedbacksList = document.getElementById('feedbacks-list');
    feedbacksList.innerHTML = '';
}

function showMessage(message) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        backgroundColor: "green",
    }).showToast();
}