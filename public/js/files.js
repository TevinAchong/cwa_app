firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user.getIdToken().then(function(accessToken) {
            // The loader that appears while the user is uploading a file
            var loaderHolder = document.getElementById('progress'); 
            var loader = document.createElement('div'); 

            // Defining the firebase storage object
            var storage = firebase.storage();

            // The list of documents will be stored here
            const docsList = document.querySelector('#docs-list');  

            let li, name, file, files_uploaded;

            // The form the user uses to upload the file
            const form = document.querySelector('#file-upload-form'); 

            //The input within the which the users uses to upload doc
            const form_input = document.querySelector('#file-upload-input'); 

            // When the user uploads a file this function runs
            form_input.addEventListener('change', (evt) => { 

                // The files uploaded by the user are stored in this variable
                files_uploaded = evt.target.files;
                
                // When the user uploads a file and clicks on the submit button this function runs
                form.addEventListener('submit', (e) => {
                    
                    // Preventing the default action of clicking the submit button (it would normally redirect to a new URL)
                    e.preventDefault(); 
                    
                    //Initializing variables to reference firebase storage and to store files to the storage respectively
                    var storageRef, task; 

                    // Cycling through all files uploaded by the user to access each file
                    for (var i = 0; i < files_uploaded.length; i += 1) {
                        
                        // This variable represents the file uploaded by the user
                        file = files_uploaded[i]; 

                        // Uploading each file uploaded by the user to firebase storage
                        storageRef = firebase.storage().ref('uploaded_files/' + file.name); 
                        task = storageRef.put(file);

                        var percentage; 

                        // Monitoring the progress of the upload
                        task.on('state_changed', function progress(snapshot) {
                            percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100; 

                            loaderHolder.classList.add('progress'); 

                            loader.classList.add('determinate'); 
                            loader.style.width = percentage.toString() + '%'; 
                            
                            loaderHolder.appendChild(loader);  
                            
                            loaderHolder.style.display = 'block'; 
                            loader.style.display = 'block'; 

                            // Checking to see whether or not the upload is complete
                            if (percentage >= 100) {

                                // Here the href of each uploaded file will be set (i.e. allowing the user to download the files)
                                // We retrieve the download URL of the file, and once it is retrieved we run the function
                                function uploadFile() {
                                    storage.ref("uploaded_files/" + file.name).getDownloadURL().then(function(url){
                                        
                                        // Uploading the file to the firestore database (files with duplicate names can be stored)
                                        db.collection('files').add({filename: file.name, uploadDate: new Date(), link: url, uploader: user.displayName});
                                        notify(`${file.name} successfully uploaded`, 'green lighten-1');
                                        loaderHolder.style.display = 'none';
                                    }).catch((error) => { // If there was an error uploading the file this function will run
                                        notify(`Error uploading ${file.name}`, 'red');   
                                        loaderHolder.style.display = 'none'; 
                                    });
                                }

                                // Attempting to upload the file 3 seconds later
                                setTimeout(uploadFile, 3000);
                            }
                        });             
                    }
                    files_uploaded = []; 
                    form.reset();
                });
            });

            var order_by = 'filename';  

            // Real-time listening so the DOM is automatically updated
            db.collection('files').orderBy(order_by).onSnapshot(snapshot => { // Listing all the files in ascending order according to file name
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
                        let li = document.createElement('li');
                        li.classList.add('collection-item');  
                        li.classList.add('avatar'); 

                        //Icon
                        let icon = document.createElement('i'); 
                        icon.classList.add('material-icons'); 
                        icon.classList.add('circle'); 
                        icon.classList.add('grey'); 
                        icon.textContent = 'file_download';
                        icon.classList.add("tooltipped"); 
                        icon.setAttribute("data-position", "bottom"); 
                        icon.setAttribute("data-tooltip", "Click to Download");  

                        //Name of the file
                        let name = document.createElement('a'); 
                        name.textContent = change.doc.data().filename; 
                        name.classList.add('title'); 
                        name.classList.add('black-text'); 

                        //File uploader
                        let uploader = document.createElement('p');
                        uploader.textContent = 'uploaded by ' + change.doc.data().uploader; 
                        uploader.classList.add('grey-text'); 

                        // File Downloader
                        let downloadLink = document.createElement('a'); 
                        downloadLink.href = change.doc.data().link; 
                        downloadLink.target = "_blank"; 
                        

                        li.appendChild(downloadLink); 
                        downloadLink.appendChild(icon); 
                        li.appendChild(name);
                        li.appendChild(uploader);  

                        // $('#docsList').prepend(li);
                        docsList.appendChild(li);

                        /*------- Ending DOM Manipulation -----*/
                        /*-------------------------------------*/
                    }
                }); 
            }); 
        }); 
    }
}); 


/* 
    TODO:
        1. Set href for all documents uploaded (to make it possible to download them)
        2. User registration and authentication (anonymous, facebook, twitter, google)
        3. Keep track of who uploaded which file
        4. Order documents by name
        5. Order documents by upload date
        6. Order documents by uploader
        7. Style
        8. Change name of file after it has been uploaded
*/