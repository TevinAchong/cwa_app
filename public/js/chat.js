// Determining whether or not the user is logged in 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user.getIdToken().then(function(accessToken) {
            
            // The div in the DOM within which the messages will be displayed
            const messageDiv = document.getElementById('messages');
            var messageList = document.createElement('ul'); 
            messageDiv.appendChild(messageList); 
             
            // Variables which will hold the DOM elements containing the message information
            let li, message;

            // The form the user uses to enter the message
            const form = document.querySelector('#messageForm'); 

            // When the user clicks the send button this event is triggered 
            form.addEventListener('submit', (e) => { 
 
                // Preventing the default action of clicking the submit button (it would normally redirect to a new URL)
                e.preventDefault(); 

                // The value the user entered into the input (The message the user wants to send)
                message = document.getElementById('message').value; 
                

                console.log('Sending...'); 

                // This function uploads the message to the Firestore database with the message content, the upload time (current time), and the sender
                function uploadMessage() {
                    db.collection('messages').add({message: message, uploadDate: new Date(), sender: user.displayName});
                }
                uploadMessage();            
                
                // After the message has been sent the input field is set to blank
                document.getElementById('message').value = ''; 
            });

            // Real-time listening so the DOM is automatically updated
            db.collection('messages').orderBy('uploadDate').onSnapshot(snapshot => { // Listing all messages in the order they were sent
                let changes = snapshot.docChanges();  

                // Basically, each change represents a change to the firestore database
                // We can interact with these changes and have access to their properties which include the message which was changed
                changes.forEach(change => {
                    // This represents a message being sent (each message in the DB will constantly be 'added')
                    if (change.type == 'added') {

                        // Manipulating the DOM so that the messages and who sent them are visible to the user
                        
                        /* 
                        The structure will be: 
                            <ul id="messages">    
                                <li>
                                    <span> Sender </span>
                                    <p> Message </p>
                                </li>
                            </ul>
                        */

                        /*----------------------------*/
                        /*----- DOM Manipulation -----*/

                        /* The classes are mainly MaterializeCSS classes */

                        let collection_item = document.createElement('li'); 
                        collection_item.classList.add('collection-item'); 

                        let sender = document.createElement('span'); 
                        sender.classList.add('title');
                        sender.innerHTML = change.doc.data().sender;
                        sender.classList.add('green-text'); 
                        sender.classList.add('lighten-text-3');
                        collection_item.appendChild(sender); 

                        let mess = document.createElement('p'); 
                        mess.innerHTML = change.doc.data().message; 
                        collection_item.appendChild(mess); 

                        // let date_sent = document.createElement('p'); 
                        // date_sent.innerHTML = change.doc.data().uploadDate; 
                        // collection_item.appendChild(date_sent); 
    
                        messageList.appendChild(collection_item); 
                        
                        // This line keeps the screen focused on the most recent message sent
                        messageDiv.scrollTop = messageDiv.scrollHeight;
                        
                        /*-------------------------------------*/
                        /*------- Ending DOM Manipulation -----*/
                        /*-------------------------------------*/
                    }
                }); 
            });
        }); 
    }
}); 