// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8jg4wnj6vfC5-OodbcYGjAGUMxpcktoY",
  authDomain: "manager-48742.firebaseapp.com",
  databaseURL: "https://manager-48742-default-rtdb.firebaseio.com",
  projectId: "manager-48742",
  storageBucket: "manager-48742.appspot.com",
  messagingSenderId: "1066014118416",
  appId: "1:1066014118416:web:2f268664b7be90af473095",
  measurementId: "G-VX7JYDTJQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
document.getElementById('loadData').addEventListener('click', loadDataFromFirebase);

function loadDataFromFirebase() {
    var database = firebase.database();
    var ref = database.ref("/Item"); // Replace with the correct path to your data

    ref.once("value")
        .then(function(snapshot) {
            var data = snapshot.val();
            displayDataInTable(data);
        })
        .catch(function(error) {
            console.error("Error fetching data from Firebase: ", error);
        });
}

function displayDataInTable(data) {
    var table = document.getElementById('dataTable');
    var tbody = table.querySelector('tbody');

    tbody.innerHTML = ''; // Clear existing table rows

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var rowData = data[key];
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + key + '</td>' +
                            '<td>' + rowData.ItemName + '</td>' +
                            '<td>' + rowData.ItemLastPrice + '</td>' +
                            '<td>' + rowData.Quantity + '</td>' +
                            '<td>' + rowData.ItemAvgPrice + '</td>';
            tbody.appendChild(row);
        }
    }
}
