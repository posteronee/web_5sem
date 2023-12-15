document.getElementById('tableForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);

    generateTable(rows, columns);
});

window.addEventListener('beforeunload', function () {
    localStorage.clear();
});

function generateTable(rows, columns) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();

        for (let j = 0; j < columns; j++) {
            const cell = row.insertCell();
            const textarea = document.createElement('textarea');
            textarea.rows = 2; // Начальное значение, можете установить по умолчанию

            // Восстановление сохраненного текста
            const savedText = localStorage.getItem(`cell-${i}-${j}`);
            if (savedText) {
                textarea.value = savedText;
                textarea.rows = textarea.scrollHeight / 20; // 20 - высота одной строки, можете настроить под свой дизайн
            }

            // Обработчик события для сохранения текста при изменении
            textarea.addEventListener('input', function () {
                this.rows = this.scrollHeight / 20;
                localStorage.setItem(`cell-${i}-${j}`, this.value);
            });

            cell.appendChild(textarea);
        }
    }

    tableContainer.appendChild(table);
}
