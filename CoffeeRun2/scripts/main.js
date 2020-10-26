(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'https://co.audstanley.com/coffeeorders';
    //var SERVER_URL = 'https://coffeerun-23e06.firebaseio.com';
    //var SERVER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]';
    //var SERVER_URL = 'http://localhost:3000/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = App.DataStore;
    //var RemoteDataStore = App.RemoteDataStore;
    var FirebaseDataStore = App.FirebaseDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    //var remoteDS = new RemoteDataStore(SERVER_URL);
    var remoteFirebase =  new FirebaseDataStore();
    var truck = new Truck('ncc-1701', remoteFirebase);
    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        return truck.createOrder.call(truck, data)
        .then(function () {
            checkList.addRow.call(checkList, data);
        },
        function() {
            alert('Server unreachable. Try again later.');
        }
        );
    });

    truck.printOrders(checkList.addRow.bind(checkList));

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);