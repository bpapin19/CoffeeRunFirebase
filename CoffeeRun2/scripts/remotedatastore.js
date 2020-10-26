(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {
        constructor() {
            console.log('running the FireBaseDataStore function');

            firebase.initializeApp(firebaseConfig);
            var firestore = firebase.firestore();
            this.db = firebase.firestore();
            this.getAll()
                .then(d => {
                    console.log(`d: ${JSON.stringify(d)}`)
                });
        }

        async add(key, val) { return this.db.collection(`order`).add(val); }

        async get(email, cb)  { 
            const docRef = this.db.collection(`order`);
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            return await snapshot.docs.map(e => e.data());
        }

        async getAll(cb)    { 
            const docRef = this.db.collection(`order`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }

        async remove(email)   { 
            const docRef = await this.db.collection(`order`);
            const batch = this.db.batch();
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
    }

    
    // class RemoteDataStore {
    //     constructor(url) {
    //         console.log('running the RemoteDataStore function');
    //         if (!url) { throw new Error('No remote URL supplied.'); }
    //         this.serverURL = url;
    //     }
    //     ajaxposthelper(type, url, val) {
    //         return $.ajax({ type: type, url: url, contentType: 'application/json',
    //             data: JSON.stringify(val), success: function(response) { 
    //                 console.log('function returned: ' + JSON.stringify(response));
    //             }
    //         });
    //     }
    //     ajaxhelper(type, url, cb) {
    //         return $.ajax({ type: type, url: url, contentType: 'application/json',
    //             success: function(response) { 
    //                 console.log('function returned: ' + JSON.stringify(response));
    //                 if (cb !== undefined) { cb(response); }
    //             }
    //         });
    //     }

    //     //add(key, val) { return this.ajaxposthelper('POST',   this.serverURL,             val); }
    //     //get(key, cb)  { return this.ajaxhelper    ('GET',    this.serverURL + '/' + key, cb); }
    //     //getAll(cb)    { return this.ajaxhelper    ('GET',    this.serverURL,             cb); }
    //     //remove(key)   { return this.ajaxhelper    ('DELETE', this.serverURL + '/' + key); } 

            
    // }
    

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);


  