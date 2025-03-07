
const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const eventBtn = document.getElementById("eventInput-btn");
eventBtn?.addEventListener("click", async () => {
    console.log("clicked!");

    const startTime = document.getElementById("event_time_start").value;
    const endTime = document.getElementById("event_time_end").value;
    const eventName = document.getElementById("name_event").value;
    const dropdown = document.getElementById('dayDropdown');
    const selectedValue = dropdown.value;

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Event Name:", eventName);

    // Input validation
    if (!startTime || !endTime || !eventName || !selectedValue) {
        document.getElementById("error-msg").textContent = "All fields are required.";
        return; // Exit the function if any field is empty
    }

    // Validate time inputs
    if (new Date(endTime) <= new Date(startTime)) {
        document.getElementById("error-msg").textContent = "End time must be greater than start time.";
        return; // Exit the function if validation fails
    }

    async function getUserProfile() {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
            console.log('No valid session found:', sessionError);
            return null;
        }
        const userEmail = sessionData.session.user.email;
        const { data: userProfile, error } = await supabase
            .from('table1')
            .select('*')
            .eq('email', userEmail)
            .single();
        if (error){
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

    const { data: emailData, error: emailError } = await supabase
        .from('table1')
        .select('email')
        .eq('email', userProfile.email)
        .single();

    if (emailError) {
        console.error('Error fetching email:', emailError);
        return;
    }
    const emailEvent = emailData.email;
    console.log("emailEvent:", emailEvent);


    // Insert data into Supabase
    const {error: insertError} = await supabase.from('table2').insert([{
        eventTime_start: startTime,
        eventTime_end: endTime,
        eventName: eventName,
        email_event: emailEvent,
        day_event: selectedValue,
    }]);
    if (insertError) {
        console.error("Insert Error:", insertError);
        document.getElementById("error-msg").textContent = insertError.message;
    } else {
        console.log("Finished");
        async function fetchRows(UEmail) {
            // Fetch a specific row from the 'events' table
            const { data, error } = await supabase
                .from('table2')
                .select('*') // Select all columns
                .eq('email_event', UEmail) // Replace 'id' and '1' with your column and value to filter
            if (error) {
                console.error('Error fetching row:', error);
            } else {
                console.log('Fetched row:', data); // Log the entire row to the console
            }
        }

// Call the function to fetch and log the row
        fetchRows(emailEvent);
        //window.location.href = 'calendar.html';
    }
});
