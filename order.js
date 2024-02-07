document.getElementById('tableForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);

    if (isValidTableSize(rows, columns)) {
        generateTable(rows, columns);
    } else {
        alert('Max table size is 10x10.');
    }
});

function isValidTableSize(rows, columns) {
    return rows > 0 && rows <= 10 && columns > 0 && columns <= 10;
}


document.addEventListener('DOMContentLoaded', function () {
    const savedTableHTML = localStorage.getItem('savedTable');
    const savedRows = localStorage.getItem('savedRows');
    const savedColumns = localStorage.getItem('savedColumns');

    if (savedTableHTML) {
        document.getElementById('tableContainer').innerHTML = savedTableHTML;
        restoreTextFromLocalStorage();
        restoreEventListeners();
    }

    if (savedRows && savedColumns) {
        document.getElementById('rows').value = savedRows;
        document.getElementById('columns').value = savedColumns;
    }
});

window.addEventListener('beforeunload', function () {
    const tableContainer = document.getElementById('tableContainer');
    const tableHTML = tableContainer.innerHTML;
    localStorage.setItem('savedTable', tableHTML);

    const rows = document.getElementById('rows').value;
    const columns = document.getElementById('columns').value;
    localStorage.setItem('savedRows', rows);
    localStorage.setItem('savedColumns', columns);
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
            textarea.rows = 2;
            const savedText = localStorage.getItem(`cell-${i}-${j}`);
            if (savedText) {
                textarea.value = savedText;
                textarea.rows = textarea.scrollHeight / 20;
            }

            textarea.addEventListener('input', createInputHandler(i, j));

            cell.appendChild(textarea);
        }
    }

    tableContainer.appendChild(table);

    restoreEventListeners();
}

function restoreEventListeners() {
    const table = document.querySelector('#tableContainer table');
    if (table) {
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                const textarea = cell.querySelector('textarea');

                textarea.addEventListener('input', createInputHandler(i, j));
            }
        }
    }
}

function createInputHandler(row, col) {
    return function () {
        this.rows = this.scrollHeight / 20;
        localStorage.setItem(`cell-${row}-${col}`, this.value);
    };
}

function restoreTextFromLocalStorage() {
    const table = document.querySelector('#tableContainer table');
    if (table) {
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                const textarea = cell.querySelector('textarea');
                const savedText = localStorage.getItem(`cell-${i}-${j}`);
                if (savedText) {
                    textarea.value = savedText;
                    textarea.rows = textarea.scrollHeight / 20;
                }
            }
        }
    }
}

document.getElementById('resetButton').addEventListener('click', function () {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    document.getElementById('rows').value = '';
    document.getElementById('columns').value = '';
    localStorage.clear();
});
