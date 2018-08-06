// Ensuring that the user is not signed in
firebase.auth().onAuthStateChanged((user) => {
    // If the user is not signed in || if the user has just registered and the account is awaiting verification
    if (!user || !user.emailVerified) {
        /*----- FOR DEBUGGING -----*/
        if (!user)
            console.log('No user'); 
        else if (!user.emailVerified)
            console.log('Email not verified'); 
            
        // The form the user uses to enter information
        var form = document.getElementById('signup-form'); 

        // When the user clicks the submit button on the form, atempting to login
        form.addEventListener('submit', (e) => {
            // Storing the entered email and password in variables
            var email = document.getElementById('email').value; 
            var password = document.getElementById('password').value; 

            // Preventing the default behaviour of clicking the submit button
            e.preventDefault(); 

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Display an error message to the user if they failed to login
                notify(error.message, 'red'); 

                document.getElementById('password').value = ''; 
            }).then(() => {
                // After the user has entered information, we store the current user in a variable
                firebase.auth().onAuthStateChanged((user) => {

                    if (user !== null) {
                        // If the user has not clicked on the verification link in their email...
                        if (!user.emailVerified) {
                            // We notify the user that they need to verify their email before signing in
                            notify('Email has not yet been verified (Check your email inbox for the verification link).', 'black'); 
                        }
            
                        // If the user has clicked the verification link in their email...
                        else {
                            // Notify the user that the sign in was successful
                            notify(`${user.email} successfully signed in!`, 'green lighten-1'); 
            
                            // The variable holding the location the user will be redirected to after successfully signing in
                            var successful_signin_redirect_url; 
            
                            // If the user has no display name, we redirect them to a page where we can collect that information
                            // Otherwise, they can start using the app
                            if (user.displayName === null) {
                                successful_signin_redirect_url = 'get_user_name.html';
                            }
                            else {
                                console.log('Redirecting to homepage'); 
                                successful_signin_redirect_url = 'index.html';  
                            }
                            function redirect() {
                                window.location.replace(successful_signin_redirect_url); 
                            }
                            // Redirect after 5 seconds
                            setTimeout(redirect, 5000);
                            console.log(user.email);
                        }
                    }
                    else {
                        console.log('Could not login');   
                    }
                });

                
            });
        }); 

        // When the user taps the clear button
        document.getElementById('clearBtn').addEventListener('click', (e) => {
            // Preventing the default behaviour of clicking this button
            e.preventDefault(); 
            // Setting all fields in the form to blank
            form.reset();
        }); 
    }
    else {
        // Redirecting the user to the homepage if they are already signed in (Users should not see the sign in page if they are signed in)
        window.location.replace('/');  
    }
});

