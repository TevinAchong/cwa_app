firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user.getIdToken().then(function(accessToken) {
            var companiesDiv = document.getElementById('companies'); 

            // Real-time listening so the DOM is automatically updated
            db.collection('companies').orderBy('name').onSnapshot(snapshot => { // Listing all the files in ascending order according to file name
                let changes = snapshot.docChanges();  

                // Basically, each change represents a change to the firestore database
                // We can interact with these changes and have access to their properties which include the file which was changed
                changes.forEach(change => {
                    // This represents a document being added
                    if (change.type == 'added') {

                        // Manipulating the DOM so that the file names are visible to the user
                        
                        /* 
                        The structure will be: 
                            <ul id="docs-list">    
                                <li>
                                    <a href="file_download_url"> filename </a>
                                </li>
                            </ul>
                        */

                        /*----------------------------*/
                        /*----- DOM Manipulation -----*/

                        // List Item
                        let col = document.createElement('div');
                        col.classList.add('col');  
                        col.classList.add('s12');
                        col.classList.add('m6');
                        companiesDiv.appendChild(col); 

                        //Icon
                        let card = document.createElement('div'); 
                        card.classList.add('card');
                        col.appendChild(card); 

                        //Name of the file
                        let card_image = document.createElement('div'); 
                        card_image.classList.add('card-image'); 
                        card.appendChild(card_image); 

                        //File uploader
                        let image = document.createElement('img');
                        image.src = change.doc.data().photoURL;
                        card_image.appendChild(image); 

                        // File Downloader
                         
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
