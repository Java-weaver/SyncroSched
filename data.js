//import supabase from "./supabaseClient";
const{createClient} = window.supabase;
let supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";

supabase = createClient(supabaseURL, supabaseKEY);
const profileDataDiv = document.getElementById('profile-data');

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
    if (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
    return userProfile;
}
async function fetchProfile() {
    const userProfile = await getUserProfile();
    if (userProfile) {
        console.log('User Profile:', userProfile);
        profileDataDiv.innerHTML = `
            <p><strong>First Name:</strong> ${userProfile.first_name}</p>
            <p><strong>Last Name:</strong> ${userProfile.last_name}</p>
            <p><strong>Email:</strong> ${userProfile.email}</p>
            <p><strong>City:</strong> ${userProfile.city}</p>
            <p><strong>Sync Id:</strong> ${userProfile.sync_Id}</p>
        `;
    } else {
        profileDataDiv.innerHTML = '<p>No user profile found</p>';
    }
}
fetchProfile().catch(error => console.error('Error fetching profile:', error));
async function updateProfileField(field, value) {
    const userProfile = await getUserProfile();
    if (!userProfile) {
        console.error('User profile not found, cannot update.');
        return;
    }
    const { data, error } = await supabase
        .from('table1')
        .update({ [field]: value })
        .eq('email', userProfile.email);
    if (error) {
        console.error(`Error updating ${field}:`, error);
    } else {
        console.log(`${field} updated successfully:`, data);
        fetchProfile(); // Refresh profile data after update
    }
}
// Event Listeners for Update Buttons
document.getElementById("updateFn-btn")?.addEventListener("click", async () => {
    const firstName = document.getElementById("first-name").value;
    await updateProfileField('first_name', firstName);
});

document.getElementById("updateLn-btn")?.addEventListener("click", async () => {
    const lastName = document.getElementById("last-name").value;
    await updateProfileField('last_name', lastName);
});

document.getElementById("updateC-btn")?.addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    await updateProfileField('city', city);
});
document.getElementById("updateS-btn")?.addEventListener("click", async () => {
    function getRandomTenDigitNumber() {
        // Generate a random 10-digit number
        const min = 1000000000; // Minimum 10-digit number
        const max = 9999999999; // Maximum 10-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomTenDigitNumber = getRandomTenDigitNumber();
    console.log(`Random 10-digit number: ${randomTenDigitNumber}`);
    await updateProfileField('sync_Id', randomTenDigitNumber);

    //const sync_Id = document.getElementById('sync-id');
    //sync_Id.innerText = randomTenDigitNumber;

    document.getElementById('sync-id').innerText = randomTenDigitNumber
});
document.getElementById("remove-btn")?.addEventListener("click", async () => {
    window.location.href = 'remove_sync.html';
});
