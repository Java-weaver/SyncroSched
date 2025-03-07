const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const syncBtn = document.getElementById("sync-btn");
syncBtn?.addEventListener("click", async () => {
    const otherEmail = document.getElementById("email_sync").value;
    async function fetchRowsSync(UEmail) {
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
    fetchRowsSync(otherEmail);
});

// Snapshot button

const shareBtn = document.getElementById("share-btn");
shareBtn?.addEventListener("click", async () => {
    const otherEmail = document.getElementById("email_sync").value;

    async function fetchRowsSnap(UEmail) {
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
    fetchRowsSnap(otherEmail);
});
//in progress
/*
for (let i = 0; i < ; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    daysContainer.appendChild(emptyDay);
}
const {data, error} = await supabase
    .from('table2')
    .update({[field]: value})
    .eq('email', userProfile.email);
if (error) {
    console.error(`Error updating ${field}:`, error);
} else {
    console.log(`${field} updated successfully:`, data);
    fetchProfile(); // Refresh profile data after update
}
*/
