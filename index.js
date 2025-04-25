document.addEventListener("DOMContentLoaded", () => {
    const calcBlock = document.querySelector(".calc");
    const tableContainer = document.querySelector(".table-container");
    const calculateButton = document.querySelector(".calc button");
    const dayInput = document.querySelector(".day__input");
    const monthInput = document.querySelector(".month__input");
    const yearInput = document.querySelector(".year__input");

    tableContainer.style.display = "none";

    function validateInput(input, min, max) {
        if (input.value === "" || isNaN(parseInt(input.value, 10)) || parseInt(input.value, 10) < min || parseInt(input.value, 10) > max) {
            input.classList.add("error");
            return false;
        } else {
            input.classList.remove("error");
            return true;
        }
    }

    calculateButton.addEventListener("click", () => {
        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            alert("Введите корректную дату рождения");
            return;
        }

        const matrix = new Matrix();
        matrix.init(day, month, year);
        const matrixData = {
            additionalNumbers: matrix.getMainNumbers(),
            destinyNumber: matrix.fate_num,
            temperament: matrix.temperament_num,
            character: matrix.array[0],
            health: matrix.array[3],
            lucky: matrix.array[6],
            goal: matrix.aim_num,
            energy: matrix.array[1],
            work: matrix.array[5],
            family: matrix.family_num,
            interest: matrix.array[2],
            logic: matrix.array[4],
            dolg: matrix.array[7],
            memory: matrix.array[8],
            habits: matrix.habbits_num,
            everydayLife: matrix.every_day_life_num
        };

        updateTable(matrixData);
        dataCopy(matrixData);

        calcBlock.style.display = "none";
        tableContainer.style.display = "block";
    });

    function updateTable(data) {
        document.querySelector("#additionalNumbers .bold").textContent = data.additionalNumbers;
        document.querySelector("#destinyNumber .bold").textContent = data.destinyNumber;
        document.querySelector("#temperament .bold").textContent = data.temperament;
        document.querySelector("#character .bold").textContent = data.character;
        document.querySelector("#health .bold").textContent = data.health;
        document.querySelector("#goal .bold").textContent = data.goal;
        document.querySelector("#energy .bold").textContent = data.energy;
        document.querySelector("#family .bold").textContent = data.family;
        document.querySelector("#interest .bold").textContent = data.interest;
        document.querySelector("#memory .bold").textContent = data.memory;
        document.querySelector("#habits .bold").textContent = data.habits;
        document.querySelector("#lucky .bold").textContent = data.lucky;
        document.querySelector("#dolg .bold").textContent = data.dolg;
        document.querySelector("#logic .bold").textContent = data.logic;
        document.querySelector("#work .bold").textContent = data.work;
        document.querySelector("#everydayLife .bold").textContent = data.everydayLife;
    }
    function dataCopy(data) {
        const copyTextElement = document.querySelector(".copy__text");

        if (!copyTextElement) {
            console.error("Элемент .copy__text не найден!");
            return;
        }

        const fields = [
            data.character, data.energy, data.interest, data.health,
            data.logic, data.work, data.family, data.lucky,
            data.dolg, data.memory
        ].map(value => value !== undefined && value !== null && value !== "" ? value : "-");

        copyTextElement.textContent = `${fields.join("/")};ЧС:${data.destinyNumber ?? "-"}`;
    }
});
const copyButton = document.querySelector("#additionalNumbers img"); // Ищем иконку копирования
if (copyButton) {
    copyButton.addEventListener("click", () => {
        const textToCopy = document.querySelector("#additionalNumbers .copy__text")?.textContent;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("Скопировано:", textToCopy); // Убираем alert, чтобы не мешало UX
            }).catch(err => {
                console.error("Ошибка копирования:", err);
            });
        } else {
            console.error("Текст для копирования не найден!");
        }
    });
} else {
    console.error("Кнопка копирования не найдена!");
}


const dayInput = document.querySelector('.day__input');
const monthInput = document.querySelector('.month__input');
const yearInput = document.querySelector('.year__input');
const errorMessage = document.querySelector('.error-message');
const calculateButton = document.querySelector('button');

function validateDate(day, month, year) {
    day = parseInt(day) || 0;
    month = parseInt(month) || 0;
    year = parseInt(year) || 0;
    errorMessage.textContent = '';
    if (year < 1900 || year > new Date().getFullYear()) {

        return false;
    }

    // Проверка месяца
    if (month < 1 || month > 12) {
        errorMessage.textContent = 'Месяц должен быть от 1 до 12';
        return false;
    }

    // Определяем количество дней в месяце
    const daysInMonth = new Date(year, month, 0).getDate();

    // Проверка дня
    if (day < 1 || day > daysInMonth) {
        errorMessage.textContent = `День должен быть от 1 до ${daysInMonth} для выбранного месяца`;
        return false;
    }

    return true;
}

// Функция для обновления состояния кнопки
function updateButtonState() {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    calculateButton.disabled = !validateDate(day, month, year);
}

// Добавляем обработчики событий для реактивной валидации
[dayInput, monthInput, yearInput].forEach(input => {
    input.addEventListener('input', () => {
        updateButtonState();

        // Дополнительно можно подсвечивать поля с ошибками
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;

        // Сбрасываем стили
        dayInput.classList.remove('error');
        monthInput.classList.remove('error');
        yearInput.classList.remove('error');

        if (!validateDate(day, month, year)) {
            if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
                dayInput.classList.add('error');
            }
            if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
                monthInput.classList.add('error');
            }
            if (year && (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear())) {
                yearInput.classList.add('error');
            }
        }
    });
});

// Начальная проверка
updateButtonState();