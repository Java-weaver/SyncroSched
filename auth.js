//initialize supabase
const {createClient} = window.supabase;
supabaseURL = "https://wfcsacqljwpwvjvswmdo.supabase.co";
supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY3NhY3Fsandwd3ZqdnN3bWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzE0MjYsImV4cCI6MjAzOTY0NzQyNn0.VWdL47ee1oNEQipI3EgkgDOLn5zQL6CZYEg6J1c1CWM";
supabase= createClient(supabaseURL, supabaseAnonKey);

//Login
const loginBtn = document.getElementById("Login-btn");loginBtn?.addEventListener("click", async()=> {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const {error, session} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
        document.getElementById("error-msg").textContent = error.message;
    } else {
        alert(`Hello! Thank you for testing our app SyncroSched. Please keep in mind that the app still has A LOT of bugs and some buttons just dont work and for good reason(prob not finished) so when clicking around and exploring this app please keep that in mind. Thank you and welcome!`);
         window.location.href = 'calendar.html';
    }
});

//Signup
const signupBtn = document.getElementById("signup-btn");signupBtn?.addEventListener("click", async()=> {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const city = document.getElementById("city").value;
    const{error: signupError, user} = await supabase.auth.signUp({email, password});
    if(signupError){
        document.getElementById("error-msg").textContent = signupError.message;
    } else {
        function getRandomTenDigitNumber() {
            // Generate a random 10-digit number
            const min = 1000000000; // Minimum 10-digit number
            const max = 9999999999; // Maximum 10-digit number
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomTenDigitNumber = getRandomTenDigitNumber();
        console.log(`Random 10-digit number: ${randomTenDigitNumber}`);
        //document.getElementById('sync-id').innerText = randomTenDigitNumber
        const{error: insertError} = await supabase.from('table1').insert([{
            first_name: firstName, last_name: lastName, city: city, email: email, sync_Id: randomTenDigitNumber
        }]);
        if (insertError) {
            document.getElementById("error-msg").
                textContent = insertError.message;
        } else {
            window.location.href = 'index.html';
        }
    }
})