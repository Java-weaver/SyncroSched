const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const syncBtn = document.getElementById("sync-btn");
syncBtn?.addEventListener("click", async () => {
    const otherEmail = document.getElementById("email_sync").value;
    console.log(otherEmail);
    localStorage.setItem('otherEmail', otherEmail);
    //const originalEmail = localStorage.getItem('originalEmail');
    //console.log(originalEmail);

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
    localStorage.setItem('originalEmail', userProfile.email);

    window.location.href = 'accept_sync.html';
});

const agreeSyncBtn = document.getElementById("yesSyncBtn");
agreeSyncBtn?.addEventListener("click", async () => {
    const otherEmail = localStorage.getItem('otherEmail');
    const originalEmail = localStorage.getItem('originalEmail');

    if(otherEmail === originalEmail){
        console.error('Error fetching row:', 'Attempting to sync an email with itself');
        alert(`ERROR: Attempting to sync an email with itself`);

        window.location.href = 'calendar.html';
    }

    const { data: otherProfile, error } = await supabase
        .from('table1')
        .select('sync_Id') // Select all columns
        .eq('email', otherEmail) // Replace 'id' and '1' with your column and value to filter
    if (error) {
        console.error('Error fetching row:', error);
    } else {
        console.log(otherProfile); // Log the entire row to the console
    }

    //const specificColumnValue = otherProfile.sync_Id; // Find a way to actually get the id from the data because it just gets "undefined"
    const syncIdFromSupabase = otherProfile?.[0]?.sync_Id;

    console.log("clicked!");
    const synciD = document.getElementById("Sync_ID").value.trim();
    localStorage.setItem('synciD', synciD);
    console.log('What you put in:', synciD);
    console.log('From supabase:', syncIdFromSupabase);
    console.log(typeof syncIdFromSupabase); // probably "number"
    console.log(typeof synciD);             // definitely "string"

    //4879234564

    if (String(syncIdFromSupabase) !== String(synciD)) {
        alert(`ERROR: Invalid Id inputted`);
        window.location.href = 'calendar.html';
    } else {
        await sync();
    }
});

async function sync(){
    const originalEmail = localStorage.getItem('originalEmail');
    console.log(originalEmail);
    const otherEmail = localStorage.getItem('otherEmail');

    const {error: insertError} = await supabase.from('table3').insert([{
        primarySyncEmail: originalEmail,
        secondarySyncEmail: otherEmail

    }]);
    if (insertError) {
        console.error("Insert Error:", insertError);
        document.getElementById("error-msg").textContent = insertError.message;
    } else {
        console.log("Finished");
    }
    async function fetchRowsSnap(UEmail) {
        // Fetch a specific row from the 'events' table
        const { data, error } = await supabase
            .from('table2')
            .select('*') // Select all columns
            .eq('email_event', UEmail)
        if (error) {
            console.error('Error fetching row:', error);
        } else {
            console.log('Fetched row:', data); // Log the entire row to the console
            window.location.href = 'calendar.html';
        }
    }
// Call the function to fetch and log the row
    await fetchRowsSnap(otherEmail);
}


// Snapshot button
const shareBtn = document.getElementById("share-btn");
shareBtn?.addEventListener("click", async () => {
    const otherEmail = document.getElementById("email_to_share").value;
    console.log(otherEmail);
    localStorage.setItem('otherEmail', otherEmail);

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
    localStorage.setItem('originalEmail', userProfile.email);

    window.location.href = 'accept_share.html';

});

const agreeShareBtn = document.getElementById("yesSnapBtn");
agreeShareBtn?.addEventListener("click", async () => {
    const otherEmail = localStorage.getItem('otherEmail');
    const originalEmail = localStorage.getItem('originalEmail');

    if(otherEmail === originalEmail){
        console.error('Error fetching row:', 'Attempting to sync an email with itself');
        alert(`ERROR: Attempting to send snapshot to same account`);

        window.location.href = 'calendar.html';
    }

    const { data: otherProfile, error } = await supabase
        .from('table1')
        .select('sync_Id') // Select all columns
        .eq('email', otherEmail) // Replace 'id' and '1' with your column and value to filter
    if (error) {
        console.error('Error fetching row:', error);
    } else {
        console.log(otherProfile); // Log the entire row to the console
    }

    //const specificColumnValue = otherProfile.sync_Id; // Find a way to actually get the id from the data because it just gets "undefined"
    const syncIdFromSupabase = otherProfile?.[0]?.sync_Id;

    console.log("clicked!");
    const synciD = document.getElementById("Sync_ID").value.trim();
    localStorage.setItem('synciD', synciD);
    console.log('What you put in:', synciD);
    console.log('From supabase:', syncIdFromSupabase);
    console.log(typeof syncIdFromSupabase); // probably "number"
    console.log(typeof synciD);             // definitely "string"

    let isAlrSynced = false


    const { data, error2 } = await supabase
        .from('table3')
        .select(otherEmail) // Select all columns
        .eq('email_event', originalEmail) //IMPORTANT so if it does not work exactly it this ones fault
    if (error2) {
        console.error('Error fetching row:', error2);
    } else {
        console.log('Fetched row:', data); // Log the entire row to the console
        isAlrSynced = true
    }

    if (String(syncIdFromSupabase) !== String(synciD)) {
        alert(`ERROR: Invalid Id inputted`);
        window.location.href = 'calendar.html';
    } else if(isAlrSynced === true){
        alert(`ERROR: You are already Synced with this person and are not permitted to send a snapshot`);
        window.location.href = 'calendar.html';
    } else {
        await share();
    }
});

async function share(){
    const otherEmail = localStorage.getItem('otherEmail');

    async function fetchRowsSnap(UEmail) {
        // Fetch a specific row from the 'events' table
        const { data, error } = await supabase
            .from('table2')
            .select('*') // Select all columns
            .eq('email_event', UEmail)
        if (error) {
            console.error('Error fetching row:', error);
        } else {
            console.log('Fetched row:', data); // Log the entire row to the console
        }
    }
// Call the function to fetch and log the row
    await fetchRowsSnap(otherEmail);
}