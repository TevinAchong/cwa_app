// Used for displaying notifications on the screen to the user
function notify(html, color) {
    // This function depends on materialize being used in the html file
    M.toast({
        html: html, // A toast with the specified text appears
        classes: color // A toast with the specified background color appears
    });
}

// Used for redirecting to another page
function redirect(url) {
    window.location.replace(url); 
} 

