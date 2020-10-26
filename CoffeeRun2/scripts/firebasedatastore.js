(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class FirebaseDataStore {
        constructor() {
            console.log('running the FirebaseDataStore function');

            firebase.initializeApp(window.firebaseConfig);
            this.db = firebase.firestore();
            this.getAll()
                .then(d => {
                    console.log(`d: ${JSON.stringify(d)}`)
                });
        }

        async add(key, val) {return this.db.collection(`order`).add(val); }

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

    App.FirebaseDataStore = FirebaseDataStore;
    window.App = App;
    
})(window);