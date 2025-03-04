
const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const settingButton = document.getElementById('settings');
//const eventButton = document.getElementById('events');
const dayOfWeekDisplay = document.getElementById('dayOfWeek');


//SMALL CALENDER SCRIPT
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Clear previous days
    daysContainer.innerHTML = '';

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Get the number of days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Fill in the days
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        daysContainer.appendChild(emptyDay);
    }
    for (let day = 1; day <= totalDays; day++) {
        const dayButton = document.createElement('button');
        dayButton.classList.add('day');
        dayButton.textContent = day;

        // Set data-date attribute for highlighting
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayButton.setAttribute('data-date', dateStr);

        dayButton.onclick = () => {
            highlightWeek(day, firstDay);
            showDayOfWeek(day, month, year);
        };

        daysContainer.appendChild(dayButton);
    }
}

/*function highlightWeek(day, firstDay) {
    // Clear previous highlights
    const allDays = document.querySelectorAll('.day');
    allDays.forEach(d => d.classList.remove('highlight'));

    // Calculate the index of the clicked day
    const clickedDayIndex = firstDay + day - 1;

    // Calculate the start of the week (Sunday)
    const startOfWeek = clickedDayIndex - (clickedDayIndex % 7);
    // Highlight the week (7 days)
    for (let i = 0; i < 7; i++) {
        const indexToHighlight = startOfWeek + i;
        if (indexToHighlight >= 0 && indexToHighlight < allDays.length) {
            allDays[indexToHighlight].classList.add('highlight');
        }
    }
} */



function showDayOfWeek(day, month, year) {
    const date = new Date(year, month, day);
    const options = { weekday: 'long' }; // Get the full name of the day
    const dayOfWeek = date.toLocaleDateString('default', options);
    dayOfWeekDisplay.textContent = `You clicked on ${day} which is a ${dayOfWeek}.`;
}

// Initial render
renderCalendar();

prevButton.addEventListener('click', () => {
    console.log("yes1");
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    console.log("yes2");
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

settingButton.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

//LARGE EVENT GRID SCRIPT
const timeSlots = document.querySelectorAll('.time-slot');
let firstClick = null;

timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        const columnIndex = Array.from(slot.parentElement.children).indexOf(slot); // Get the column index based on the slot's position in its parent

        if (!firstClick) {
            firstClick = slot; //First click
            slot.classList.add('highlight');
        } else {
            // Second click
            if (firstClick.parentElement === slot.parentElement) { // Check if both clicks are in the same row
                const firstIndex = Array.from(timeSlots).indexOf(firstClick);
                const secondIndex = Array.from(timeSlots).indexOf(slot);

                // Determine the range of indices to highlight
                const start = Math.min(firstIndex, secondIndex);
                const end = Math.max(firstIndex, secondIndex);

                // Highlight all items in the range
                for (let i = start; i <= end; i++) {
                    const currentItem = timeSlots[i];
                    if (currentItem.parentElement === slot.parentElement) { // Ensure it's in the same column
                        currentItem.classList.add('highlight');
                    }
                }
            }
            // Reset first click
            firstClick.classList.remove('highlight');
            firstClick = null;
        }
    });
});