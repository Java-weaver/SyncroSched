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
    document.getElementById('Month').innerText = monthYear.textContent
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

        dayButton.onclick = () => {
            // Clear previous highlights
            const highlightedDays = document.querySelectorAll('.highlight');
            highlightedDays.forEach(day => day.classList.remove('highlight'));

            const clickedDate = new Date(year, month, day);
            const clickedDay = clickedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

            // Highlight the entire week
            for (let i = 0; i < 7; i++) {
                const weekDay = new Date(clickedDate);
                weekDay.setDate(clickedDate.getDate() - clickedDay + i); // Adjust to the correct day of the week

                // Check if the day is within the current month
                if (weekDay.getMonth() === month) {
                    const dayButtons = daysContainer.getElementsByClassName('day');
                    for (let j = 0; j < dayButtons.length; j++) {
                        if (dayButtons[j].textContent == weekDay.getDate()) {
                            dayButtons[j].classList.add('highlight');
                        }
                    }
                }
            }

            const dayName = clickedDate.toLocaleString('default', { weekday: 'long' });
            alert(`You clicked on ${day} which is a ${dayName}`);
            if(clickedDay === 0) {
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Sunday').innerText = day
                document.getElementById('Monday').innerText = day+1
                document.getElementById('Tuesday').innerText = day+2
                document.getElementById('Wednesday').innerText = day+3
                document.getElementById('Thursday').innerText = day+4
                document.getElementById('Friday').innerText = day+5
                document.getElementById('Saturday').innerText = day+6
            }
            else if (clickedDay === 1){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Monday').innerText = day
                document.getElementById('Tuesday').innerText = day+1
                document.getElementById('Wednesday').innerText = day+2
                document.getElementById('Thursday').innerText = day+3
                document.getElementById('Friday').innerText = day+4
                document.getElementById('Saturday').innerText = day+5
                document.getElementById('Sunday').innerText = day-1
            }
            else if (clickedDay === 2){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Tuesday').innerText = day
                document.getElementById('Wednesday').innerText = day+1
                document.getElementById('Thursday').innerText = day+2
                document.getElementById('Friday').innerText = day+3
                document.getElementById('Saturday').innerText = day+4
                document.getElementById('Sunday').innerText = day-2
                document.getElementById('Monday').innerText = day-1
            }
            else if (clickedDay === 3){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Wednesday').innerText = day
                document.getElementById('Thursday').innerText = day+1
                document.getElementById('Friday').innerText = day+2
                document.getElementById('Saturday').innerText = day+3
                document.getElementById('Sunday').innerText = day-3
                document.getElementById('Monday').innerText = day-2
                document.getElementById('Tuesday').innerText = day-1
            }
            else if (clickedDay === 4){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Thursday').innerText = day
                document.getElementById('Friday').innerText = day+1
                document.getElementById('Saturday').innerText = day+2
                document.getElementById('Sunday').innerText = day-4
                document.getElementById('Monday').innerText = day-3
                document.getElementById('Tuesday').innerText = day-2
                document.getElementById('Wednesday').innerText = day-1
            }
            else if (clickedDay === 5){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Friday').innerText = day
                document.getElementById('Saturday').innerText = day+1
                document.getElementById('Sunday').innerText = day-5
                document.getElementById('Monday').innerText = day-4
                document.getElementById('Tuesday').innerText = day-3
                document.getElementById('Wednesday').innerText = day-2
                document.getElementById('Thursday').innerText = day-1
            }
            else if (clickedDay === 6){
                document.getElementById('Month').innerText = monthYear.textContent
                document.getElementById('Saturday').innerText = day
                document.getElementById('Sunday').innerText = day-6
                document.getElementById('Monday').innerText = day-5
                document.getElementById('Tuesday').innerText = day-4
                document.getElementById('Wednesday').innerText = day-3
                document.getElementById('Thursday').innerText = day-2
                document.getElementById('Friday').innerText = day-1
            }
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
    alert(`The update button works everything else is still under construction`);
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



}
// Add event listeners to each time slot
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        // Get the day from the corresponding row
        const day = this.parentElement.previousElementSibling.textContent; // Get the day name from the previous sibling
        const startTime = this.id.replace('_', ':'); // Convert ID back to HH:MM format
        const endTime = prompt("Enter end time (HH:MM):");
        if (endTime) {setGradient(day, startTime, endTime);}
    });
});
/////// Fetch info from supabase in eventData.js
// Function to parse time in "HH:MM" format
function parseTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convert to total minutes
}
// Function to set gradient based on time input
function setGradient(day, startTime, endTime) {
    // Finds percentage of time used in an hour
    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);
    const rangeMinutes = endMinutes - startMinutes;
    if (rangeMinutes <= 0) {alert("End time must be after start time."); return;}
    const percentage = (rangeMinutes / 60) * 100;
    // Get the time slot element for the specified day and start time
    const timeSlotId = `${startTime.replace(':', '_')}_${day}`;
    const timeSlot = document.getElementById(timeSlotId);
    if (timeSlot) {
        // Create the gradient style
        timeSlot.style.background = `linear-gradient(to bottom, red ${percentage}%, #F1F58F ${100-percentage}%)`;
    } else {alert("Time slot not found.");}
}