let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

(function() {
    function calculateLoadTime() {
        let startTime = performance.timing.navigationStart;
        let currentTime = Date.now();
        let loadTimeInSeconds = (currentTime - startTime) / 1000;
        return loadTimeInSeconds.toFixed(3);
    }

    function displayStatistics() {
        let loadTime = calculateLoadTime();
        console.log("Время загрузки страницы: " + loadTime + " секунды");

        // Добавим вывод на страницу
        let loadTimeElement = document.createElement("p");
        loadTimeElement.textContent = "Время загрузки страницы: " + loadTime;
        document.getElementById("footer").appendChild(loadTimeElement);
    }

    window.addEventListener("load", displayStatistics);
})();

function goToHomePage() {
    window.location.href = 'index.html';
}
