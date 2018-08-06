// Ensuring that the user is not signed in
firebase.auth().onAuthStateChanged((user) => {
    // If the user is not signed in
    if (!user || !user.emailVerified) {
        // Retrieving the sign-up form
        var form = document.getElementById('signup-form')

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value; 
            var password_2 = document.getElementById('password_2').value; 

            // Manually Verifying that the password and the repeated password match
            if (password === password_2) {
                
                firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {        
                    // Displaying the error notification message to the user
                    notify(error.message, 'red');
                    
                    // Clearing the form after an error has been detected
                    document.getElementById('email').value = ''; 
                    document.getElementById('password').value = ''; 
                    document.getElementById('password_2').value = '';
                }).then(() => { // Then is included here to avoid asynchronous behaviour

                    // This is basically a check to see if an error has occurred
                    if (document.getElementById('email').value !== '' && document.getElementById('password').value !== '' && document.getElementById('password_2').value !== '') {
                        // Storing the current user in a variable
                        var user = firebase.auth().currentUser;

                        // Sending verification email to the user who just signed up
                        user.sendEmailVerification().then(function() {
                            notify(`Please check your inbox at ${email} to verify your account`, 'black');
                        }).catch(function(error) {
                            notify(error.message, 'red');
                        });

                        function redirect() {
                            window.location.replace('signin.html');
                        }
                        /********* Function for testing purposes *********/
                        function before() {
                            console.log('Redirecting to signin.html'); 
                        }

                        before(); 
                        // After the form has been successfully completed, we redirect to the sign in page
                        setTimeout(redirect, 5000); 
                        //form.reset(); 
                    }
                });
            } 
            // Notifying the user that the passwords did not match and need to be re-entered
            else {
                notify('Passwords do not match', 'red'); 
            }
        });
    }
    else {
        console.log(user.email); 
        if (user.emailVerified) {
            console.log('User is verified'); 
        }
        else {
            console.log('User is not verified')
        }
        // Redirecting the user to the homepage if they are already signed in (Users should not see the register page if they are signed in)
        //window.location.replace('/'); 
    }
}); 