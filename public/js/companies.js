// Determining whether or not the user is signed in
firebase.auth().onAuthStateChanged(function(user) {
    // If the user is signed in
    if (user) {
        user.getIdToken().then(function(accessToken) {
            // Then we access the div in which will hold all the companies and store it in the variable below
            var companiesDiv = document.getElementById('companies'); 

            // Real-time listening so the DOM is automatically updated
            db.collection('companies').orderBy('name').onSnapshot(snapshot => { // Listing all the companies in the firestore database in ascending order according to name
                let changes = snapshot.docChanges();  

                // Basically, each change represents a change to the firestore database
                // We can interact with these changes and have access to their properties which include the company which was changed
                changes.forEach(change => {
                    // This represents a company being added
                    if (change.type == 'added') {

                        // Manipulating the DOM so that the companies are visible to the user
                        
                        /* 
                        The structure will be: 
                            <div id="companies">    
                                <div class="col s12 m6">
                                    <div class="card">
                                        <div class="card-image">
                                            <img src="*photoURL*">
                                        </div>
                                        <div class="card-content">
                                            <span class="card-title"> Company Name </span>
                                            <p> Company Description </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        */

                        /*----------------------------*/
                        /*----- DOM Manipulation -----*/

                        let col = document.createElement('div');
                        col.classList.add('col');  
                        col.classList.add('s12');
                        col.classList.add('m6');
                        companiesDiv.appendChild(col); 

                        let card = document.createElement('div'); 
                        card.classList.add('card');
                        col.appendChild(card); 

                        let card_image = document.createElement('div'); 
                        card_image.classList.add('card-image'); 
                        card.appendChild(card_image); 

                        let image = document.createElement('img');
                        image.src = change.doc.data().photoURL;
                        image.alt = change.doc.data().name; 
                        card_image.appendChild(image); 

                        let card_content = document.createElement('div'); 
                        card_content.classList.add('card-content'); 
                        card.appendChild(card_content); 

                        let card_title = document.createElement('span'); 
                        card_title.innerHTML = change.doc.data().name; 
                        card_title.classList.add('card-title'); 
                        card_content.appendChild(card_title);

                        let card_par = document.createElement('p'); 
                        card_par.innerHTML = change.doc.data().description;
                        card_content.appendChild(card_par);  

                        /*------- Ending DOM Manipulation -----*/
                        /*-------------------------------------*/
                    }
                }); 
            });
        }); 
    }
}); 

/** If the user is not signed in the auth.js file will automatically redirect them to the sign in page */
