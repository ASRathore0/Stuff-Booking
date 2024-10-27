// Function to open modal for Sign In
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Event listeners for buttons to open modals
document.querySelector('.auth-buttons .button').addEventListener('click', function () {
    openModal('signinModal');
});

// Close modal when clicking outside of it
window.onclick = function (event) {
    const signinModal = document.getElementById('signinModal');
    if (event.target === signinModal) {
        closeModal('signinModal');
    }
};

// Function to handle form submission (just a placeholder for now)
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would typically send the data to the backend
    console.log(`Email: ${email}, Password: ${password}`);
    closeModal('signinModal'); // Close the modal after submission
}

// Add event listener to the form submit
document.getElementById('signinForm').addEventListener('submit', handleFormSubmit);

// Function to open modal for Registration
document.querySelector('.auth-buttons .button:nth-child(2)').addEventListener('click', function () {
    openModal('registerModal');
});

// Function to handle registration form submission
function handleRegisterFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const regEmail = document.getElementById('reg-email').value;
    const regPassword = document.getElementById('reg-password').value;
    const regConfirmPassword = document.getElementById('reg-confirm-password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value; // Get user type

    // Basic validation
    if (regPassword !== regConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Here you would typically send the data to the backend
    console.log(`Registering Email: ${regEmail}, Password: ${regPassword}, User Type: ${userType}`);
    closeModal('registerModal'); // Close the modal after submission
}

// Add event listener to the registration form submit
document.getElementById('registerForm').addEventListener('submit', handleRegisterFormSubmit);


// Add event listener to the registration form submit
document.getElementById('registerForm').addEventListener('submit', handleRegisterFormSubmit);

// Function to handle booking an item
function bookItem(itemName) {
    alert(`${itemName} has been booked successfully!`);
}

// Function to handle vendor item submission
function handleVendorFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const vendorName = document.getElementById('vendor-name').value;
    const itemName = document.getElementById('item-name').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemImage = document.getElementById('item-image').value;

    // Here you would typically send the data to the backend
    console.log(`Vendor: ${vendorName}, Item: ${itemName}, Description: ${itemDescription}, Image URL: ${itemImage}`);
    
    alert(`Item "${itemName}" has been submitted successfully!`);
    document.getElementById('vendorForm').reset(); // Reset the form after submission
}

// Add event listener to the vendor form submit
document.getElementById('vendorForm').addEventListener('submit', handleVendorFormSubmit);

// Sample vendor data with available stuff (replace with backend data)
const vendors = [
    { name: "Vendor 1", lat: 28.7041, lng: 77.1025, stuff: ["Bicycle", "Scooter"] }, // Delhi
    { name: "Vendor 2", lat: 19.0760, lng: 72.8777, stuff: ["Car", "Bike"] }, // Mumbai
    { name: "Vendor 3", lat: 12.9716, lng: 77.5946, stuff: ["Scooter", "Skateboard"] }, // Bangalore
    { name: "Vendor 4", lat: 13.0827, lng: 80.2707, stuff: ["Car", "Cycle"] }, // Chennai
];

// Function to calculate the distance (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to find nearest vendors and their stuff
function findNearestVendors(userLat, userLng) {
    let nearestVendors = [];

    vendors.forEach(vendor => {
        const distance = calculateDistance(userLat, userLng, vendor.lat, vendor.lng);
        if (distance <= 50) { // Search within 50 km radius
            nearestVendors.push(vendor);
        }
    });

    return nearestVendors;
}

// Function to display available stuff from nearest vendors
function displayAvailableStuff(vendors) {
    const availableStuffDiv = document.getElementById("availableStuff");
    availableStuffDiv.innerHTML = ""; // Clear previous results

    if (vendors.length === 0) {
        availableStuffDiv.innerHTML = "<p>No vendors found near your location.</p>";
    } else {
        vendors.forEach(vendor => {
            const vendorInfo = `
                <div class="vendor-item">
                    <h3>${vendor.name}</h3>
                    <p>Available Stuff: ${vendor.stuff.join(', ')}</p>
                </div>
            `;
            availableStuffDiv.innerHTML += vendorInfo;
        });
    }
}

// Function to get user's current location using Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const nearestVendors = findNearestVendors(userLat, userLng);
            displayAvailableStuff(nearestVendors);
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to handle manual location input (this would need actual geocoding)
function handleManualLocation() {
    // For demo purposes, let's assume manual location always returns Delhi coordinates
    const userLat = 28.7041; // Delhi
    const userLng = 77.1025;

    const nearestVendors = findNearestVendors(userLat, userLng);
    displayAvailableStuff(nearestVendors);
}

// Event listeners for the buttons
document.getElementById("locationBtn").addEventListener("click", getLocation);
document.getElementById("manualLocation").addEventListener("change", handleManualLocation);

// Function to load user profile data when the icon is clicked
document.getElementById("profileIcon").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    document.getElementById("profileSection").style.display = "block"; // Show profile section
    loadUserProfile(); // Load user data
});
