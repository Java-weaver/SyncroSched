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
    const totalCells = firstDay + totalDays;
    const emptyCells = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < emptyCells; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        daysContainer.appendChild(emptyDay);
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
}*/


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

/*Highlight Grid*/
let highlightedSlots = [];
timeSlots.forEach((slot, index) => {

    slot.addEventListener('click', () => {
        if (!firstClick) {//First click
            firstClick = slot; //Store  first clicked slot
            slot.classList.add('highlight'); //Highlight first clicked slot
            highlightedSlots[0] = index; //Save index of first highlighted slot
        } else {//Second click
            if (firstClick.parentElement === slot.parentElement) { //Check if both clicks are in the same row
                //Highlight second clicked slot
                slot.classList.add('highlight'); //Highlight second click
                highlightedSlots[1] = index; //Save index of second highlighted slot
            }
            //Save both indices in local storage
            localStorage.setItem('highlightedSlots', JSON.stringify(highlightedSlots));
            //Reset first click for next selection
            firstClick = null; //Reset first click for next selection
        }
    });
});
// Load highlighted slots from local storage on page load
window.onload = () => {
    const savedSlots = localStorage.getItem('highlightedSlots');
    if (savedSlots) {
        highlightedSlots = JSON.parse(savedSlots);
        highlightedSlots.forEach(slotIndex => {
            if (slotIndex !== undefined) {
                const highlightedSlot = timeSlots[slotIndex];
                if (highlightedSlot) {
                    highlightedSlot.classList.add('highlight');
                }
            }
        });
    }
};
/*async function fetchRows(UEmail) {
    // Fetch a specific row from the 'events' table
    const { data, error } = await supabase
        .from('table2')
        .select('*') // Select all columns
        .eq('email_event', UEmail)}// Replace 'id' and '1' with your column and value to filter*/

/* Placeholder function for navigation
function navigateToForm() {
    // Here you would implement the logic to navigate to the form
    // For example, you could change the window location or show a modal
    console.log("Navigating to form...");
}*/