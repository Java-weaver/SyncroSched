const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const removeEventBtn = document.getElementById("removeEvent-Btn");
removeEventBtn?.addEventListener("click", async () => {
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

    const { data, error } = await supabase
        .from('table3')
        .select('*') // Select all columns
        .or(`primarySyncEmail.eq.${userProfile.email},secondarySyncEmail.eq.${userProfile.email}`);
    if (error) {
        console.error('Error fetching row:', error);
    } else {
        console.log('Fetched row:', data); // Log the entire row to the console
    }

    for (let i = 0; i <= data.length - 1; i++) {
        const SyncedFromSupabaseone = data?.[i]?.primarySyncEmail;
        const SyncedFromSupabasetwo = data?.[i]?.secondarySyncEmail;

        console.log('User  profile', userProfile.email);
        console.log('Primary', SyncedFromSupabaseone);
        console.log('Secondary', SyncedFromSupabasetwo);

        if (userProfile.email === SyncedFromSupabaseone) {
            const { data, error } = await supabase
                .from('table2')
                .delete()
                .eq('email_event', SyncedFromSupabasetwo)
                .eq('eventName', event_toBeRemoved);

            if (error) {
                console.error('Error deleting row:', error);
                return;
            }

        } else if (userProfile.email === SyncedFromSupabasetwo) {
            const { data, error } = await supabase
                .from('table2')
                .delete()
                .eq('email_event', SyncedFromSupabaseone)
                .eq('eventName', event_toBeRemoved);

            if (error) {
                console.error('Error deleting row:', error);
                return;
            }

        } else {
            const { data, error } = await supabase
                .from('table2')
                .delete()
                .eq('email_event', userProfile.email)
                .eq('eventName', event_toBeRemoved);

            if (error) {
                console.error('Error deleting row:', error);
                return;
            }

            let deletedCurrentUser_Event = true;
            localStorage.setItem('deletedCurrentUser Event', deletedCurrentUser_Event.toString());
        }
        const deletedCurrentUser_Event_String = localStorage.getItem('deletedCurrentUser Event'); // Get the string from localStorage
        const deletedCurrentUser_Event = deletedCurrentUser_Event_String === 'true';

        console.log(deletedCurrentUser_Event);

        if (deletedCurrentUser_Event === false) {
            const { data, error } = await supabase
                .from('table2')
                .delete()
                .eq('email_event', userProfile.email)
                .eq('eventName', event_toBeRemoved);

            if (error) {
                console.error('Error deleting row:', error);
                return;
            }
        }

        console.log('00000000000000000000000000000000000000000000000000000000000000000000000000');

    }
    window.location.href = 'calendar.html';
});