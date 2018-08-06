// Ensuring that the user is signed in (All pages will redirect to sign in page if user is not signed in)
firebase.auth().onAuthStateChanged((user) => {
    // If the user is signed in
    if (user) {
        // The form that the user uses to enter personal information
        var form = document.getElementById('info-form'); 

        // When the user clicks the submit button at the end of the form
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieving the values entered by the user
            var firstname = document.getElementById('firstname').value; 
            var lastname = document.getElementById('lastname').value; 
            
            // Setting the user's display name to a concatenation of their first name and last name
            user.updateProfile({
                displayName: firstname + ' ' + lastname
            }).then(() => {
                notify('Profile details updated.', 'green lighten-1'); 

                // Redirecting to the app homepage
                setTimeout(redirect('/'), 5000); 
            }); 
        });
        
        // The Clear Button
        document.getElementById('clearBtn').addEventListener('click', (e) => {
            e.preventDefault(); 
            form.reset(); 
        }); 
    }

    // if the user is not signed in then we redirect to the homepage
    else {
        window.location.replace('signin.html'); 
    }
}); 
