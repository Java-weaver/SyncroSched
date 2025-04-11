const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const removeEventBtn = document.getElementById("removeEvent-Btn");
removeEventBtn?.addEventListener("click", async () => {
    const otherEmail = localStorage.getItem('otherEmail');
    const event_toBeRemoved = document.getElementById("eventName_removed").value;

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


    let isAlrSynced = false

    const { data, error3 } = await supabase
        .from('table3')
        .select(otherEmail) // Select all columns
        .eq('email_event', userProfile)
    if (error3) {
        console.error('Error fetching row:', error3);
    } else {
        console.log('Fetched row:', data); // Log the entire row to the console
        isAlrSynced = true;
    }

    if(isAlrSynced) {
        const { error3 } = await supabase
            .from('table2')
            .delete()
            .match({ event_email: userProfile, otherEmail: otherEmail, eventName: event_toBeRemoved });

        if (error3) {
            console.error('Error deleting row(s):', error3);
        } else {
            console.log('Rows have been deleted');
        }
        window.location.href = 'calendar.html';
    } else {
        const { error3 } = await supabase
            .from('table2')
            .delete()
            .match({ event_email: userProfile, eventName: event_toBeRemoved });

        if (error3) {
            console.error('Error deleting row(s):', error3);
        } else {
            console.log('Rows have been deleted');
        }
        window.location.href = 'calendar.html';
    }

});