import firebase from 'firebase';


describe('barf', () => {
    it('narf', async () => {
        const user = await signIn();
        var res = null;
        expect(async () => { await write() }).toThrow();

        console.log(res);
    });
});

async function write() {
    firebase.database().ref(`accounts/4444/transactions/12345`).set({
        id: '12345',
        amount: 123.00,
        category: 'General'
    });
}

async function signIn() {
    var config = {
        apiKey: "AIzaSyDo5eiki9OJZb1ZJSLQtSOwRXYOEXXfQMg",
        authDomain: "molly-budget-integration.firebaseapp.com",
        databaseURL: "https://molly-budget-integration.firebaseio.com",
        projectId: "molly-budget-integration",
        storageBucket: "molly-budget-integration.appspot.com",
        messagingSenderId: "55294010618"
    };
    firebase.initializeApp(config);
    return firebase.auth().signInAnonymously();
}

async function signOut() {

}