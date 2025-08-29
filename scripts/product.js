import addToProducts from '../data/addproduct.js';

const uploadImage = document.getElementById('upload-image')
const productImage = document.getElementById('product-image')

uploadImage.addEventListener('change', () => {
    productImage.src = URL.createObjectURL(uploadImage.files[0])

})
// Firebase Configuration (USE YOUR OWN CONFIG HERE)
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const authAlert = document.getElementById('auth-alert');
    const loadingSpinner = document.getElementById('loading-spinner');
    const addProductForm = document.getElementById('add-product-form');
    const formAlert = document.getElementById('form-alert');

    // Check user authentication and role
    const userData = sessionStorage.getItem('smarthomes_user');
    const isLoggedIn = localStorage.getItem('smarthomes_logged_in');
    
    let currentUser = null;
    let userRole = null;

    if (userData && isLoggedIn === 'true') {
        currentUser = JSON.parse(userData);
        userRole = currentUser.role;
    }

    loadingSpinner.style.display = 'none'; // Hide loading spinner initially

    if (userRole === 'stock-manager') {
        addProductForm.style.display = 'block'; // Show the form
        addProductForm.addEventListener('submit', handleAddProduct);
    } else {
        authAlert.textContent = 'You do not have permission to access this page. Redirecting to login...';
        authAlert.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); // Redirect after 3 seconds
    }
});



/*const newProduct = {
    name: productName,
    unitPrice: unitPrice,
    quantityInStock: quantityInStock,
    reorderLevel: reorderLevel,
    category: category,
    description: description,
    image: productImage}*/



async function handleAddProduct(event) {
    event.preventDefault(); // Prevent default form submission

    const formAlert = document.getElementById('form-alert');
    formAlert.style.display = 'none'; // Hide previous alerts

    const productName = document.getElementById('product-name').value.trim();
    const unitPrice = parseFloat(document.getElementById('unit-price').value);
    const quantityInStock = parseInt(document.getElementById('quantity-in-stock').value, 10);
    const reorderLevel = parseInt(document.getElementById('reorder-level').value, 10);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();

    // Basic Form Validation
    if (!productName || isNaN(unitPrice) || isNaN(quantityInStock) || isNaN(reorderLevel) || !category) {
        showAlert('Please fill in all required fields with valid values.', 'danger');
        return;
    }
    if (unitPrice < 0 || quantityInStock < 0 || reorderLevel < 0) {
        showAlert('Price, quantity, and reorder level cannot be negative.', 'danger');
        return;
    }

    

    // Create a new product object
    const newProduct = {
        name: productName,
        unitPrice: unitPrice,
        quantityInStock: quantityInStock,
        reorderLevel: reorderLevel,
        category: category,
        description: description,
        image: productImage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp for creation
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()  // Timestamp for last update
    };

    addToProducts(newProduct)

    /*try {
        // Add product to Firestore 'products' collection
        const docRef = await db.collection('products').add(newProduct);
        console.log("Document written with ID: ", docRef.id);

        showAlert('Product added successfully! Redirecting to dashboard...', 'success');
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);

    } catch (e) {
        console.error("Error adding document: ", e);
        showAlert('Failed to add product. Please try again.', 'danger');
    }*/

    
}

function showAlert(message, type) {
    const formAlert = document.getElementById('form-alert');
    formAlert.textContent = message;
    formAlert.className = `alert alert-${type}`; // Set class for styling
    formAlert.style.display = 'block';
}
