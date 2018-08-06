window.addEventListener('load', function() {
    // Determining whether or not the user is authenticated
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            user.getIdToken().then(function(accessToken) {// The sign out button at the button of the menu
                var signoutBtn = document.getElementById('signoutBtn'); 
                if (signoutBtn !== null) {
                    // When the user clicks the sign out button they are signed out and hence automatically redirected to the signin page
                    signoutBtn.addEventListener('click', (e) => {
                        e.preventDefault(); 
                        firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                            console.log('User signed out'); 
                        }).catch(function(error) {
                            notify(error, 'red'); 
                        });
                    }); 
                }
            });
        } 
        else {
            // If the user is not logged in they are automatically redirected to the sign in page
            window.location.replace('signin.html');  
        }
    }, function(error) {
        console.log(error);
        // If there was an error in authenticating the user they are redirected to the sign in page
        window.location.replace('signin.html');
    });
});