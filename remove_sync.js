//initialize supabase
const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

const syncGenBtn = document.getElementById("syncGen");
syncGenBtn?.addEventListener("click", async () => {

    async function getUserProfile(){
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
        console.log(userProfile);
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
            // Append the secondary sync email to the div
            document.getElementById('get_sync').innerHTML += `<div>${SyncedFromSupabasetwo}</div>`;
        } else if (userProfile.email === SyncedFromSupabasetwo) {
            // Append the primary sync email to the div
            document.getElementById('get_sync').innerHTML += `<div>${SyncedFromSupabaseone}</div>`;
        } else {
            alert('You have nobody Synced');
        }

        console.log('00000000000000000000000000000000000000000000000000000000000000000000000000');
    }

});

const syncDelBtn = document.getElementById("remove-btn");
syncDelBtn?.addEventListener("click", async () => {
    const syncRemove = document.getElementById("email_to_remove").value;

    async function getUserProfile(){
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
        console.log(userProfile);
        return userProfile;
    }
    const userProfile = await getUserProfile();

    const { data, error } = await supabase
        .from('table3')
        .delete()
        .or(`primarySyncEmail.eq.${userProfile.email},secondarySyncEmail.eq.${userProfile.email}`)
        .or(`primarySyncEmail.eq.${syncRemove},secondarySyncEmail.eq.${syncRemove}`)
    if (error) {
        console.error('Error deleting row:', error);
    } else {
        console.log('Deleted!');
    }
});
