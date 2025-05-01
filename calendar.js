const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

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

    const storedDay10 = localStorage.getItem('day10');

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
        dayButton.onclick = () => alert(`You clicked on ${day}`);

        dayButton.onclick = async () => {

            async function getUserProfile() {
                const {data: sessionData, error: sessionError} = await supabase.auth.getSession();
                if (sessionError || !sessionData.session) {
                    console.log('No valid session found:', sessionError);
                    return null;
                }
                const userEmail = sessionData.session.user.email;
                const {data: userProfile, error} = await supabase
                    .from('table1')
                    .select('*')
                    .eq('email', userEmail)
                    .single();
                if (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
                return userProfile;
            }

            const userProfile = await getUserProfile();

            if (!userProfile) {
                console.error('User profile not found, cannot update.');
                return;
            }

            const {data, error} = await supabase
                .from('table3')
                .select('*') // Select all columns
                .or(`primarySyncEmail.eq.${userProfile.email},secondarySyncEmail.eq.${userProfile.email}`);
            if (error) {
                console.error('Error fetching row:', error);
            } else {
                console.log('Fetched row:', data);
            }

           /* const { data: month, error19 } = await supabase
                .from('table2')
                .select('*')
                .eq('email_event', userProfile.email) // Correctly filter by email
                .eq('event_monthDate', day); // Filter by event_monthDate

            if (error) {
                console.error('Error fetching row:', error19);
            } else {
                console.log(month);
            }*/
            // Plan for Thursday: make it so another condition is the specific moth.
            //Right now the month is saved a sa number and if that is the same for the small calendar we are good.
            //If the small calendar utilizes the name of month (Which is prob the case) go down further in the code to where it displays the month
            //and take some code snippets from that abd make it a condition to get the certain event.
            //ALSO: wee need tp account for the other six days on the event table and get those events as well.,

            const { data: monthDate, error9 } = await supabase
                .from('table2')
                .select('*')
                .eq('email_event', userProfile.email) // Correctly filter by email
                .eq('event_monthDate', day); // Filter by event_monthDate

            if (error) {
                console.error('Error fetching row:', error9);
            } else {
                console.log(monthDate);

                const dayFromSupabase = monthDate?.[0]?.day_event;
                const timeStartFromSupabase = monthDate?.[0]?.eventTime_start;
                const timeEndFromSupabase = monthDate?.[0]?.eventTime_end;

                function parseTime(time) {
                    alert(`Error 11`);
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes; // Convert to total minutes
                }

                function setGradient(day, startTime, endTime) {
                    alert(`Error 10`);
                    // Finds percentage of time used in an hour
                    const startMinutes = parseTime(startTime);
                    const endMinutes = parseTime(endTime);
                    const rangeMinutes = endMinutes - startMinutes;

                    // Check if the end time is after the start time
                    if (rangeMinutes <= 0) {
                        alert("End time must be after start time.");
                        return;
                    }

                    const percentage = (rangeMinutes / 60) * 100; // Calculate percentage of time used

                    // Get the time slot element for the specified day and start time
                    const timeSlotId = `${startTime.replace(':', '_')}_${day}`;
                    const timeSlot = document.getElementById(timeSlotId);

                    // Check if the time slot exists
                    if (timeSlot) {
                        // Create the gradient style
                        timeSlot.style.background = `linear-gradient(to bottom, red ${percentage}%, #F1F58F ${100 - percentage}%)`;
                    } else {
                        alert("Time slot not found.");
                    }
                }

                setGradient(dayFromSupabase, timeStartFromSupabase, timeEndFromSupabase);
            }
            console.log('00000000000000000000000000000000000000000000000000000000000000000000000000');
            for (let i = 0; i <= data.length - 1; i++) {
                const SyncedFromSupabaseone = data?.[i]?.primarySyncEmail;
                const SyncedFromSupabasetwo = data?.[i]?.secondarySyncEmail;

                console.log('User  profile', userProfile.email);
                console.log('Primary', SyncedFromSupabaseone);
                console.log('Secondary', SyncedFromSupabasetwo);

                if (userProfile.email === SyncedFromSupabaseone) {
                    const { data: monthDate, error9 } = await supabase
                        .from('table2')
                        .select('*')
                        .eq('email_event', SyncedFromSupabasetwo) // Correctly filter by email
                        .eq('event_monthDate', day); // Filter by event_monthDate

                    if (error) {
                        console.error('Error fetching row:', error9);
                    } else {
                        console.log(monthDate);
                    }
                } else if (userProfile.email === SyncedFromSupabasetwo) {
                    const { data: monthDate, error9 } = await supabase
                        .from('table2')
                        .select('*')
                        .eq('email_event', SyncedFromSupabaseone) // Correctly filter by email
                        .eq('event_monthDate', day); // Filter by event_monthDate

                    if (error) {
                        console.error('Error fetching row:', error9);
                    } else {
                        console.log(monthDate);
                    }
                } else {
                    console.log("NOTE: no one synced");
                }

                console.log('00000000000000000000000000000000000000000000000000000000000000000000000000');

            }

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

            const dayName = clickedDate.toLocaleString('default', {weekday: 'long'});
            if (clickedDay === 0) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Sunday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Monday').innerText = day + 1)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 2 < 32) {(document.getElementById('Tuesday').innerText = day + 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 3 < 32) {(document.getElementById('Wednesday').innerText = day + 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 4 < 32) {(document.getElementById('Thursday').innerText = day + 4)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 5 < 32) {(document.getElementById('Friday').innerText = day + 5)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 6 < 32) {(document.getElementById('Saturday').innerText = day + 6)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 1) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Monday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Tuesday').innerText = day + 1)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 2 < 32) {(document.getElementById('Wednesday').innerText = day + 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 3 < 32) {(document.getElementById('Thursday').innerText = day + 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 4 < 32) {(document.getElementById('Friday').innerText = day + 4)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 5 < 32) {(document.getElementById('Saturday').innerText = day + 5)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Sunday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 2) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Tuesday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Wednesday').innerText = day + 1)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 2 < 32) {(document.getElementById('Thursday').innerText = day + 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 3 < 32) {(document.getElementById('Friday').innerText = day + 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 4 < 32) {(document.getElementById('Saturday').innerText = day + 4)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 2 > 0) {(document.getElementById('Sunday').innerText = day - 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Monday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 3) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Wednesday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Thursday').innerText = day + 1)} else {document.getElementById('Sunday').innerText = "0"}
                if (day + 2 < 32) {(document.getElementById('Friday').innerText = day + 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 3 < 32) {(document.getElementById('Saturday').innerText = day + 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 3 > 0) {(document.getElementById('Sunday').innerText = day - 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 2 > 0) {(document.getElementById('Monday').innerText = day - 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Tuesday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 4) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Thursday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Friday').innerText = day + 1)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 2 < 32) {(document.getElementById('Saturday').innerText = day + 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 4 > 0) {(document.getElementById('Sunday').innerText = day - 4)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 3 > 0) {(document.getElementById('Monday').innerText = day - 3)} else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 2 > 0) {(document.getElementById('Tuesday').innerText = day - 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Wednesday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 5) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Friday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day + 1 < 32) {(document.getElementById('Saturday').innerText = day + 1)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 5 > 0) {(document.getElementById('Sunday').innerText = day - 5)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 4 > 0) {(document.getElementById('Monday').innerText = day - 4)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 3 > 0) {(document.getElementById('Tuesday').innerText = day - 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 2 > 0) {(document.getElementById('Wednesday').innerText = day - 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Thursday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
            } else if (clickedDay === 6) {
                document.getElementById('Month').innerText = monthYear.textContent
                if (day < 32) {(document.getElementById('Saturday').innerText = day)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 6 > 0) {(document.getElementById('Sunday').innerText = day - 6)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 5 > 0) {(document.getElementById('Monday').innerText = day - 5)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 4 > 0) {(document.getElementById('Tuesday').innerText = day - 4)} else{document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 3 > 0) {(document.getElementById('Wednesday').innerText = day - 3)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 2 > 0) {(document.getElementById('Thursday').innerText = day - 2)}else {document.getElementById('Sunday').innerText = "0"}
                if (day < 32 && day - 1 > 0) {(document.getElementById('Friday').innerText = day - 1)}else {document.getElementById('Sunday').innerText = "0"}
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
}/*
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
}*/