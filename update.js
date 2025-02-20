
const { createClient } = window.supabase;
let supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM"
let supabase = createClient(supabaseURL, supabaseAnonKey);
//fetches and displays the current user's information

async function displayUserInfo() {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData || !sessionData.session) {
        console.error('No user session found or error getting session:', sessionError);
        document.getElementById('user-info').innerHTML = 'You need to be logged in to see user information.';
        return;
    }
    const { user } = sessionData.session;
    //fetch user data
    const { data, error } = await supabase.from('table1').select('*').eq('email', user.email); // Fetch user data by email
    if (error) {
        console.error('Error fetching user data:', error);
        document.getElementById('user-info').innerHTML = 'Error fetching user data.';
    } else {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = ''; // Clears previous data
        if (data.length === 0) {
            userInfoDiv.innerHTML = 'No user information available.';
        } else {
            const userProfile = data[0];
            userInfoDiv.innerHTML = `
              <p><strong>First Name:</strong> <span id="display-first-name">${userProfile.first_name}</span></p>
              <p><strong>Last Name:</strong> <span id="display-last-name">${userProfile.last_name}</span></p>
              <p><strong>City:</strong> <span id="display-city">${userProfile.city}</span></p>
          `;
        }
    }
}
//on click
document.getElementById('update-button').addEventListener('click', async () => {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const city = document.getElementById('city').value;
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession(); // Get the session of the logged-in user

    // Checks retrieved successfully
    if (sessionError || !sessionData || !sessionData.session) {
        alert('You need to be logged in to update your information.');
        return;
    }
    const { user } = sessionData.session;

    try {
        // Update the data in Supabase table by matching with email
        const { data, error } = await supabase
            .from('table1')
            .update({ first_name: firstName, last_name: lastName, city: city })
            .eq('email', user.email); // Update the record with user's email

        if (error) {
            console.error('Error updating data:', error);
            alert('Failed to update user info: ' + error.message);
        } else {
            alert('User info updated successfully!');
            // Update the displayed info without re-fetching
            document.getElementById('display-first-name').innerText = firstName;
            document.getElementById('display-last-name').innerText = lastName;
            document.getElementById('display-city').innerText = city;
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});
