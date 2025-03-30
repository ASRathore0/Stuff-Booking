  
document.addEventListener("DOMContentLoaded", function () {
  // Get the current page path
  const currentPath = window.location.pathname;

  // Map of page paths to button IDs
  const pathToIdMap = {
    "/index.html": "explore-button",
    "/": "home-button",
    "/assets/other.html": "cart-button",
    "/assets/login.html": "profile-button",
    // Add more mappings as needed
  };

  // Find the corresponding button ID for the current path
  const activeButtonId = pathToIdMap[currentPath];

  // If a match is found, add the 'active' class to the button with that ID
  if (activeButtonId) {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
});
 
// Get the user's current location without an API key
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const nearestLocation = findNearestLocation(userLat, userLng);

        if (nearestLocation) {
          alert(`You are near ${nearestLocation.name}.`);
          locationInput.value = nearestLocation.name;
        } else {
          alert("Sorry, we are not available in your area yet.");
        }
      },
      function () {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

//  ----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButto");
  const cityPopup = document.getElementById("cityPopup");
  const closePopup = document.getElementById("closePopup");
  const cityItems = document.querySelectorAll(".city-item");
  const searchInput = document.getElementById("searchInput");
  const serviceBoxes = document.querySelectorAll(".service-box");
  const serviceCards = document.querySelectorAll(".service-card");
  const servicesSection = document.querySelector(".services-section");
  const servicesHeading = servicesSection.querySelector("h2");

  // Popup message container
  const resultPopup = document.createElement("div");
  resultPopup.id = "resultPopup";
  resultPopup.style.position = "fixed";
  resultPopup.style.top = "50%";
  resultPopup.style.left = "50%";
  resultPopup.style.transform = "translate(-50%, -50%)";
  resultPopup.style.backgroundColor = "#f8d7da";
  resultPopup.style.color = "#721c24";
  resultPopup.style.padding = "20px";
  resultPopup.style.border = "1px solid #f5c6cb";
  resultPopup.style.borderRadius = "8px";
  resultPopup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  resultPopup.style.display = "none";
  resultPopup.style.zIndex = "9999";
  resultPopup.style.fontSize = "16px";
  document.body.appendChild(resultPopup);

  // Toggle popup visibility on toggle button click
  toggleButton.addEventListener("click", () => {
      if (cityPopup.classList.contains("hidden")) {
          cityPopup.classList.remove("hidden");
      } else {
          cityPopup.classList.add("hidden");
      }
  });

  // Close popup on close button click
  closePopup.addEventListener("click", () => {
      cityPopup.classList.add("hidden");
  });

  // Fill city name in the search box when a city is clicked
  cityItems.forEach((city) => {
      city.addEventListener("click", () => {
          const cityName = city.getAttribute("data-city");
          searchInput.value = cityName;
          cityPopup.classList.add("hidden");
      });
  });

  // Show matching services when a service box is clicked
  serviceBoxes.forEach((box) => {
      box.addEventListener("click", () => {
          const locationName = searchInput.value.trim();
          const selectedService = box.getAttribute("data-target");
          const serviceName = box.querySelector("span").textContent;

          if (!locationName) {
              showPopup("Please select a location first!");
              return;
          }

          // Update the heading with the selected service and location
          servicesHeading.textContent = `${serviceName} in ${locationName}`;

          // Hide all service cards initially
          serviceCards.forEach((card) => {
              card.classList.add("hidden");
          });

          let foundMatch = false;

          // Show matching service cards based on location and service type
          serviceCards.forEach((card) => {
              const cardServiceType = card.getAttribute("id");
              const cardLocation = card.querySelector(".service-details p:nth-child(3)").innerText.trim();

              if (cardServiceType === selectedService && cardLocation.includes(locationName)) {
                  card.classList.remove("hidden");
                  foundMatch = true;
              }
          });

          if (foundMatch) {
              // showPopup("Results found for your selection!", "#d4edda", "#155724"); // Green popup
              servicesSection.scrollIntoView({ behavior: "smooth" });
          } else {
              showPopup(`Currently we're unable to serve a ${serviceName}  in ${locationName}. We'll serve soon. Stay tunned!`);
          }
      });
  });

  // Function to show popup messages
  function showPopup(message, bgColor = "#f8d7da", textColor = "#721c24") {
      resultPopup.textContent = message;
      resultPopup.style.backgroundColor = bgColor;
      resultPopup.style.color = textColor;
      resultPopup.style.display = "block";

      // Hide popup after 3 seconds
      setTimeout(() => {
          resultPopup.style.display = "none";
      }, 2500);
  }
});

// ---------------------------

function showButtons(card) {
  // Get the buttons container
  const buttons = document.querySelector(".buttons");

  // Check if the buttons are already appended to the clicked card
  if (card.contains(buttons)) {
      // Toggle visibility if the buttons are already in the clicked card
      buttons.classList.toggle("hidden");
  } else {
      // Remove buttons from any previous card and append to the current one
      document.querySelectorAll(".service-card").forEach(c => c.querySelector(".buttons")?.remove());

      // Append buttons to the clicked card and show them
      buttons.classList.remove("hidden");
      card.appendChild(buttons);
  }
}

// ------------------------------------

 // Example details for each card
 const cardDetails = {
  Plumber1: {
      address: "Nyi Abadi Jeet Rai Chakki, Gali No 20, House 20/24, Khanna HO, Khanna - 141401 (Gurdwara)",
      services: ["Pipes", "Taps", "Valves", "Sink installation", "Water Heaters", "drain cleaning"],
      contact: "+91 7947107441"
  },
  Plumber2: {
      address: "Khamanon, Bilaspur Road, Fatehgarh Sahib - 141801 (Near Fattak)",
      services: [ "Tap Repair", "Valve", "Pipes","Power socket", "Septic Tank", "Sink", "Pipes"],
      contact: "+91 7947420673"
  },
  Electrician1: {
      address: "Krishna Nagar, Khanna - 141401",
      services: ["Fan Installation & Repair", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 7947103994"
  },
  Electrician2: {
      address: "Chowk, Krishna Nagar, Gulmohar Nagar, Khanna - 141401 (Near Sai Market)",
      services: ["Refrigerator Repair ", "Air Conditioner (AC) Repair", "Washing Machine Repair", "Geyser & Water Heater Repair", " Microwave Oven Repair"],
      contact: "+91 7947126478"
  },
  Cleaner1: {
      address: "Nyi Abadi, Khanna - 141401",
      services: ["Curtain Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Home Cleaning", "Sinks", "Office Cleaning"],
      contact: "+91 0000000000"
  },
  Gardener1: {
      address: "Amloh Road Market, Amloh Road, Khanna H O, Khanna - 141401 (Near Sai Baba Mandir)",
      services: ["Fall Cleanup", "Planting ", "Lawn Mowing & Maintenance", "Tree Pruning & Trimming", "Stump Grinding"],
      contact: "+91 7947147285"
  },
  Gardener2: {
      address: "Pakhowal Road, Khanna - 141401",
      services: ["Planting ", "Lawn Mowing & Maintenance", "Fall Cleanup", "Tree Removal"],
      contact: "+91 0000000000"
  },
  Painter1: {
      address: "Singhabhenu Colony, 2 Number Gali, Krishna Nagar, Khattra, Galwaddi, Khanna - 141401",
      services: ["House Painting", "Wall Painting", "Furniture", "Epoxy Coating", "Spray Painting", "Machinery Painting"],
      contact: "+91 0000000000"
  },
  Painter2: {
      address: "Gt Road, Khanna - 141401",
      services: ["Wall Painting", "Furniture Painting", "Putty Work", "House Painting", "Wall Crack Filling "],
      contact: "+91 0000000000"
  },
  Carpenter1: {
      address: "Quality Wood Works, R-13, Lalheri Road-Khanna H O, Khanna - 141401 (Guru Teg Bahadur Nagar)",
      services: ["Furniture Making", "Wood Carving", "Table", "chair", "Bed"],
      contact: "+91 7942696286"
  },
  Carpenter2: {
      address: "Model Town, Nr C A Staff, Khanna Samrala Road, Khanna - 141401 (Near C A Staff,)",
      services: ["Furniture Making", "Table", "Bed", "Chair"],
      contact: "+91 8401604512"
  },
  Pest1: {
      address: "Khanna HO, Khanna - 141401 (Khanna City Centre)",
      services: ["Rodents", "Snakes", "Mosquitoes", "Cockroaches", "Flies", "Termites", "Bed Bugs"],
      contact: "+91 7947103023"
  },
  Pest2: {
      address: "Vishkarma Market, Chhote, Malerkotla Road, Khanna H O, Khanna - 141401",
      services: ["Mosquitoes", "Cockroaches", "Flies", "Termites"],
      contact: "+91 7947105448"
  },
  Tution1: {
      address: "Station Road, Khanna - 141401",
      services: ["Basics", "Core Subjects", "Mock Exams", "Homework Assistance"],
      contact: "+91 0000000000"
  },
  Tution2: {
      address: "Jamalpur, Khanna - 141401",
      services: ["Core Subjects", "Study Skills Development", "Basics"],
      contact: "+91 0000000000"
  },
  Mineral1: {
      address: "Street No 4/1/2 Guru Arjun Dev Nagar, Near Cheema Chowk, Samrala Road, Ludhiana - 141008 (Near Gurdwara)",
      services: ["Water", "Jarr"],
      contact: "+91 7947433274"
  },

  dj1: {
      address: "Ward No 22, Bhattian Khanna, Bhattian, Khanna - 141401 (Nr Petrol Pump)",
      services: ["smoke machines"],
      contact: "+91 8045781574"
  },
  dj2: {
      address: "H. No. 28, Khanna, 29, Ucha Vehra, Anant Nagar, Ahluwalia Mohalla, Khanna - 141401 (Near Bekunth Dham Gurudwara)",
      services: ["DJ", "Trolly"],
      contact: "+91 7947411660"
  },
  Photographer1: {
      address: "Krishna Nagar Chowk, Krishna Nagar, Khanna - 141401 (Near Sai Market)",
      services: ["Weddings", "Fashion Lookbooks", "Corporate Events", "Underwater Photography", "Parties ", "Family Portraits"],
      contact: "+91 9724362067"
  },
  Photographer2: {
      address: "Amloh Road, Amloh Khanna Road, Khanna - 141401 (Near Jain Mandir)",
      services: ["Parties ", "Weddings", "Family Portraits", "Corporate Events", "Magazine Shoots"],
      contact: "+91 7942684255"
  },
  Catering1: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Buffet Service", "Plated Service", "Arranging tables, chairs"],
      contact: "+91 0000000000"
  },
  Catering2: {
      address: "Bhandari park Khanna - 141401",
      services: ["Plated Service", "Equipment Rental", "Buffet Service"],
      contact: "+91 0000000000"
  },
  Decorator1: {
      address: "Meena Bazar, Khanna - 141401",
      services: ["Lighting Design", "Stage", "Welcome Gate"],
      contact: "+91 0000000000"
  },
  Decorator2: {
      address: "Ahluwalia Mohalla, Khanna - 141401",
      services: ["Venue Decoration", "Stage", "Lighting Design"],
      contact: "+91 0000000000"
  },
  Tent1: {
      address: "Malerkotla Road, Amloh Khanna Road, Khanna - 141401 (Near A S Modern School)",
      services: ["DJ", "Sound", "chair & Tables" , "Lights", "Trolly"],
      contact: "+91 9054635146"
  },
  Tent2: {
      address: "Doraha, Khanna - 141401",
      services: ["Sound", "Light", "Stage", "Seating Arrangements"],
      contact: "+91 0000000000"
  },
  Chef1: {
      address: "Rangia, Khanna - 141401",
      services: ["Food Consulting", "Restaurant Consulting", "Cooking Services"],
      contact: "+91 0000000000"
  },
  Chef2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Cooking Services", "Food Consulting"],
      contact: "+91 0000000000"
  },
  Jaimala1: {
      address: "Dehlon, Khanna - 141401",
      services: ["Stage", "Decoration", "Flowers", "Lightning"],
      contact: "+91 0000000000"
  },
  Jaimala2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Decoration", "Flowers", "Lightning"],
      contact: "+91 0000000000"
  },
  Beauty1: {
      address: "GT Road, Khanna - 141401",
      services: ["Makeup Services", "Hair Styling", "Nail Services", "Skincare Treatments", "Beard Grooming"],
      contact: "+91 0000000000"
  },
  Beauty2: {
      address: "Samrala Road, Khanna - 141401",
      services: ["Hair Styling", "Nail Services", "Makeup Services", "Shaving and Beard Grooming", "Facials"],
      contact: "+91 0000000000"
  },
  Vehicles1: {
      address: "Pratap Colony, Khanna - 141401",
      services: ["Cars", "Bus", "Taxi", "Auto", "Truck "],
      contact: "+91 0000000000"
  },
  Vehicles2: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Bus", "Cars", "Tractor", "Taxi", "Auto", "Truck "],
      contact: "+91 0000000000"
  },
  Bike1: {
      address: "Libra, Khanna - 141401",
      services: ["Apache", "Splender", "Scooty", "Yamaha", "cars", "Truck "],
      contact: "+91 0000000000"
  },
  Bike2: {
      address: "Nyi Abadi, Khanna - 141401",
      services: ["Pulser", "Apache", "Scooty", "Auto"],
      contact: "+91 0000000000"
  },
  Toto1: {
      address: "Nyi Abadi, Khanna - 141401",
      services: [],
      contact: "+91 0000000000"
  },
  Toto2: {
      address: "Amloh Road, Khanna - 141401",
      services: [],
      contact: "+91 0000000000"
  },



   
// Delhi location
// Delhi location

   
  // Home Services 
  Plumber51: {
      address: "E 37 Khirki Extension, Malviya Nagar, Delhi - 110017 (Near Select City Mall), Delhi NCR",
      services: ["Tap", "sink", "Tank"],
      contact: "+91 8147794876"
  },
  Plumber52: {
      address: "Ram Kishor Plumbing Contractor, Shiv Mandir Vali Gali, Tugalpur, Greater Noida - 201310 (Behind Ansal Plaza)",
      services: ["Tap", "sink", "Tank", "Pipe"],
      contact: "+91 7411848722"
  }, 
  Plumber53: {
      address: "Hno 1778, Sector 16, Faridabad Sector 16, Faridabad - 121002 (Near Pawan Dairy)",
      services: ["Drain cleaning", "Tap", "sink"],
      contact: "+91 9036209680"
  }, 
  Electrician51: {
      address: "Gaurav Electrician, Dlf Phase 1, Gurgaon Sector 18, Gurgaon - 122015 (Gurugram Sector 18)",
      services: ["Fan Installation & Repair", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 7487988790"
  },
  Electrician52: {
      address: "Dayal Public School, Gurgaon Sector 28, Gurgaon - 122002 (Near Dayal Public School)",
      services: ["Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 9724979586"
  },
  Electrician53: {
      address: "Office No-71, Pkt-2, Rohini Sector 24, Delhi - 110085 (Near DPS)",
      services: ["Fan Installation", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 7947434809"
  },
  Electrician54: {
      address: "113, Model Basti, Karol Bagh, Delhi - 110005 (Near Filmistan Cinema)",
      services: ["Fan Installation", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 8867845671"
  },
  Electrician55: {
      address: "Building No.- B 415, Ghaziabad, Ghaziabad Maliwara, Ghaziabad - 201001 (Near Maliwara Chowk)",
      services: ["Fan Installation", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 8460298602"
  }, 
  Cleaner51: {
      address: "Samaspur, Samas Pur Road, Gurgaon Sector 51, Gurgaon - 122003 (Mohipal Shop, Near Mata Mandir)",
      services: ["Car", "Curtain Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Home Cleaning", "Sinks", "Office Cleaning"],
      contact: "+91 8401276762"
  },
  Cleaner52: {
      address: "D - 148, Sadarpur Colony, Noida Sector 45, Noida - 201303",
      services: ["Home Cleaning", "Mattress ", "Window & Glass Cleaning", "Hotel & Restaurant", "Bathroom Cleaning", "Kitchen Cleaning"],
      contact: "+91 8105071825"
  }, 
  Cleaner53: {
      address: "Golf Course Road 7th Tree, Dwarka Sec 14, Dwarka Sector 14, Delhi - 110078 (DDA PARK)",
      services: ["Curtain Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Home Cleaning", "Sinks", "Office Cleaning"],
      contact: "+91 8460491754"
  },
  Gardener51: {
      address: "P-22/A-6, P-Pocket, Dilshad Garden, Delhi - 110095 (Opposite to DDA Market)",
      services: ["Fall Cleanup", "Planting ", "Lawn Mowing & Maintenance", "Tree Pruning & Trimming", "Stump Grinding"],
      contact: "+91 7947128717"
  }, 
  Painter51: {
      address: "A 194, Hari Enclave, Rohini, Delhi - 110085 (Near Choti Maszid)",
      services: ["House Painting", "Wall Painting", "Furniture", "Epoxy Coating", "Spray Painting", "Machinery Painting"],
      contact: "+91 8460302138"
  },
  Painter52: {
      address: "F - 71, Vishwakarma Colony, Delhi - 110044 (Near By Sabki Rasoi)",
      services: ["Wall Painting", "Furniture Painting", "Putty Work", "House Painting", "Wall Crack Filling "],
      contact: "+91 8511426798"
  },
  Painter53: {
      address: "Block C, House No.- 135, Sudma Puri, Noida Extension, Noida - 201305 (Near Gaur City)",
      services: ["Putty Work", "Wall Painting", "Furniture Painting", "House Painting", "Wall Crack Filling "],
      contact: "+91 8460235285"
  }, 
  Carpenter51: {
      address: "New Lahore Colony, New Lahore Colony-Shastri Nagar, Delhi - 110031 (Near Neelkanth Mandir)",
      services: ["Furniture Making", "Wood Carving", "Table", "chair", "Bed"],
      contact: "+91 9980400395"
  },
  Carpenter52: {
      address: "Shiva Market, Pitampura, Delhi - 110034 (Shiva Market)",
      services: ["Furniture Making", "Table", "Bed", "Chair"],
      contact: "+91 7947159146"
  },
  Carpenter53: {
      address: "RU BLOCK, Pitampura, Pitampura Ru Block, Delhi - 110034 (Power House)",
      services: ["Furniture Making", "Wood Carving", "Table", "chair", "Bed"],
      contact: "+91 8511415741"
  },
  Carpenter54: {
      address: "N-87 A, Jamia Nagar, Delhi - 110025",
      services: ["Furniture Making", "Table", "Bed", "Chair"],
      contact: "+91 8401581753"
  }, 
  Pest51: {
      address: "Mayank Pest Control, Street No- 34, Uttam Nagar, Delhi - 110059 (Uttam Nagar East Metro Station)",
      services: ["Rodents", "Snakes", "Mosquitoes", "Cockroaches", "Flies", "Termites", "Bed Bugs"],
      contact: "+91 8123506019"
  },
  Pest52: {
      address: "Office No WZ-202, Dwarka Mod, Dwarka More, Delhi - 110059 (Near Bhagwati Garden Extension)",
      services: ["Mosquitoes", "Cockroaches", "Flies", "Termites"],
      contact: "+91 9725511520"
  }, 
// Event Services
  dj51: {
      address: "House No 2059, Laxman Vihar, Laxman Vihar Industrial Area, Gurgaon - 122001 (Doultabad Flyover)",
      services: ["Smoke Machines", "Box"],
      contact: "+91 8128882509"
  },
  dj52: {
      address: "RZ-181, Gali No. 5, Vaishali Colony, Dabri Road, Dwarka, Delhi - 110075",
      services: ["DJ", "Trolly"],
      contact: "+91 8105778829"
  },
  dj53: {
      address: "H-2815/59, Gali Number-5, Gurudawara Gali, Gandhi Nagar, Delhi - 110031 (Kalish Nagar)",
      services: ["DJ", "Trolly", "Generator"],
      contact: "+91 7041487503"
  },
  dj54: {
    address: "Shop No. 47, West Punjabi Bagh, West Punjabi Bagh, Delhi - 110026",
    services: ["DJ", "Live Music", "Live Performance"],
    contact: "+91 8147422177"
  },
  dj55: {
      address: "House No 2059, Laxman Vihar, Laxman Vihar Industrial Area, Gurgaon - 122001 (Doultabad Flyover)",
      services: ["Parties", "Get-togethers", "Corporate events"],
      contact: "+91 8123483114"
  },
  dj56: {
    address: "A/163 LIG Flats, Rajouri Garden, Delhi - 110027 (Near Bharat Sweets)",
    services: ["Jagran", "Bhajan", "Bhajan Sandhya"],
    contact: "+91 8460439281"
  },
  dj57: {
    address: "Malhotra Sounds & DJ Services, Vivekanand Puri, Sarai Rohilla, Delhi - 110035",
    services: ["Smoke machines", "Box", "DJ", "Live Music"],
    contact: "+91 7795696020"
  },
  dj58: {
    address: "Building No.114, 3rd Floor, Mathura Road, Hari Nagar Ashram, Delhi - 110014 (Near Ashram Chowk)",
    services: ["Cultural events", "Corporate Events", "Wedding Special"],
    contact: "+91 8485915971"
  },
  
 Photographer51: {
      address: "4 X 504, Greater Noida, Greater Noida - 201310 (Opposite Yathaarth Hospital, Awho Gurjinder Vihar)",
      services: ["Weddings Shoot", "Fashion Lookbooks", "Newborn Shoot"],
      contact: "+91 8105878732"
  },
  Photographer52: {
      address: "Amloh Road, Khanna - 141401",
      services: ["Parties ", "Weddings", "Family Portraits", "Corporate Events", "Magazine Shoots"],
      contact: "+91 0000000000"
  },
  Photographer53: {
    address: "ZS Modeling Agency and Fashion Studio, Ashok Vihar, Delhi - 110052",
    services: ["Parties ", "Weddings", "Family Portraits", "Reels Shoots"],
    contact: "+91 8197335675"
  },
  Photographer54: {
    address: "A Block, Noida Sector 104, Noida - 201304 (Near By Starling Mall)",
    services: ["Pre Wedding Shoot", "Candid Photography", "Photography"],
    contact: "+91 9740026491"
  },
  Photographer55: {
    address: "Building No 53, Darya Ganj, Delhi - 110002",
    services: ["Wedding", "Birthday Parties", "School Events", "Sports Events"],
    contact: "+91 8105325049"
  },
  Photographer56: {
    address: "Building No 53, Darya Ganj, Delhi - 110002",
    services: ["Candid Photography", "Birthday Photography", "Wedding Photography"],
    contact: "+91 7625041902"
  },
  Photographer57: {
    address: "Building No WZ-3943, Rani Bagh, Delhi - 110034 (Near Ram Mandir)",
    services: ["Reels Shoots", "Professional Photography", "Wedding Photography"],
    contact: "+91 0000000000"
  },
  Catering51: {
      address: "Shop Number 15, Chokkhandi, Gurudwara Singh Sabha Market, Tilak Nagar, Delhi - 110018 (Near Haldiram Sweets)",
      services: ["Buffet Service", "Plated Service", "Arranging tables, chairs"],
      contact: "+91 8460517056"
  },
  Catering52: {
      address: "Shop No-3, Cherry County, Noida Extension, Noida - 201305 (Near Ek Murti Gol Chakkar)",
      services: ["Plated Service", "Equipment Rental", "Buffet Service"],
      contact: "+91 8123244917"
  },
  Catering53: {
    address: "Sethi Arcade, Sethi Max Royal, Noida Sector 76, Noida - 201304",
    services: ["Plated Service", "Buffet Service", "Fast Food", "Street Food"],
    contact: "+91 8511888167"
  },
  Catering54: {
    address: "Shop No. 157, Main Road, Tibbia College, Karol Bagh, Delhi - 110005 (Opposite Ajmal Khan Park, Netaji Subhash Market)",
    services: ["Plated Service", "Chinese", "Fast Food", "Street Food"],
    contact: "+91 7048898537"
  },
  Catering55: {
    address: "8628/c8, Vasant Kunj, Delhi - 110070 (Near By Bses Office)",
    services: ["Plated Service", "Bengali Food", "SouthIndian Food"],
    contact: "+91 8147987753"
  },
  Catering56: {
    address: "Shop No-20, Dda Gole Market, Rohini Sector 9, Delhi - 110085 (Near Varun Apartment)",
    services: ["Plated Service", "Chinese", "Fast Food", "Street Food"],
    contact: "+91 9980678797"
  },
  Catering57: {
    address: "134, Yamaha Vihar Sec 49, Noida Sector 49, Noida Sector 49, Noida - 201303 (Opp Radha Swami Satsang)",
    services: ["Plated Service", "Pure Veg", "Snacks", "Sweets"],
    contact: "+91 8904926215"
  },
  Decorator51: {
      address: "Birthday Favours Serves Delhi NCR, Dwarka, Delhi - 110075",
      services: ["Birthday Special", "Lighting Design", "Stage", "Welcome Gate"],
      contact: "+91 8105978925"
  },
  Decorator52: {
      address: "Shop No. 1, Innerline Road, Lodhi Road, Delhi - 110003 (Sai Baba Mandir)",
      services: ["Venue Decoration", "Stage", "Lighting Design"],
      contact: "+91 0000000000"
  },
  Decorator53: {
    address: "Office No G F 2 B-11, RDC Raj Nagar, Rdc-raj Nagar Ghaziabad, Ghaziabad - 201002 (Near Kuthcery Road)",
    services: ["Venue Decoration", "Stage", "Lighting Design", "Wedding Special"],
    contact: "+91 8401395315"
  },
  Decorator54: {
    address: "Building No-F-141, Khanpur Village, Khanpur, Delhi - 110062 (Near Puspa Bhawan)",
    services: ["Wedding", "Office Party", "Lighting Design", "Naming Ceremony"],
    contact: "+91 9606404752"
  },
  Decorator55: {
    address: "Shop No: 24, Mini Central Market, Dda Flats-kalkaji, Delhi - 110019 (Near Sai Mandir)",
    services: ["Wedding Ceremony", "Lighting Design", "Naming Ceremony"],
    contact: "+91 8123090321"
  },
  Tent51: {
      address: "1361/40, DDA Flat, Saket, Delhi - 110017 (Opposite Sector 3 Pushp Vihar)",
      services: ["DJ", "Sound", "chair & Tables" , "Lights", "Trolly"],
      contact: "+91 7383406639"
  },
  Tent52: {
      address: "Shop No-D-1, Main Road, Chattarpur, Delhi - 110074",
      services: ["Sound", "Light", "Stage", "Seating Arrangements"],
      contact: "+91 8123889513"
  },
  Tent53: {
    address: "S R Complex, Naya Bans, Sec-15, Noida, Main Market., Noida Sector 15, Noida - 201301 (Near -Justdial Office.)",
    services: ["Sound", "Stage", "Seating Arrangements", "Lighting"],
    contact: "+91 0000000000"
  },
  Tent54: {
    address: "Shop Number 15, Chokkhandi, Gurudwara Singh Sabha Market, Tilak Nagar, Delhi - 110018 (Near Haldiram Sweets)",
    services: ["Sound", "Light", "Stage", "Seating Arrangements"],
    contact: "+91 8460517056"
  },
  Tent55: {
    address: "Sector 7 Metro Road, Rohini Sector 7, Delhi - 110085 (Near Metro Pillar 401)",
    services: ["Event Management", "Catering Service", "Flower Decorations", "Sound", "Light", "Stage", "Seating Arrangements", "Multi Lightening"],
    contact: "+91 9725270956"
  },
  Chef51: {
      address: "Shop Number- G- 1, Pankaj Galaxy1, Main Road., Dwarka Sector 12, Delhi - 110078 (Opposite Allahabad Bank)",
      services: ["Food Consulting", "Restaurant Consulting", "Cooking Services"],
      contact: "+91 0000000000"
  },
  Chef52: {
      address: "Shop- 64, Rajouri Garden, Delhi - 110027 (Dda market)1",
      services: ["Cooking Services", "Food Consulting"],
      contact: "+91 0000000000"
  },
  Chef53: {
    address: "H 801/1/1, Sukdev Nagar Mrkt Kotla Mubrakpur, Kotla Mubarakpur, Delhi - 110003",
    services: ["Cooking Services", "Fast Food", "Food Consulting"],
    contact: "+91 0000000000"
  },
  Chef54: {
    address: "Shop Number B 3, Main Road, New Ashok Nagar, Delhi - 110096 (Near Aggarwal Sweets, Near Sarpanch Chowk, B Block)",
    services: ["Cooking Services", "Fast Food", "Food Consulting", "Veg Special"],
    contact: "+91 0000000000"
  },
  Jaimala51: {
      address: "Shop No.A-183, Yamuna Vihar, ADARSH MARKET, Yamuna Vihar, Delhi - 110053 (Delhi Jal Board)",
      services: ["Stage", "Decoration", "Flowers", "Lightning"],
      contact: "+91 8147850531"
  },
  Jaimala52: {
      address: "I-866-67, Jahangir Puri, Delhi - 110033",
      services: ["Decoration", "Flowers", "Lightning"],
      contact: "+91 0000000000"
  },
  Jaimala53: {
    address: "Ladpura, Greater Noida, Greater Noida, Greater Noida - 201310 (Oxford Green Public School)",
    services: ["Decoration", "Flowers", "Lightning", "Lotus Decoration"],
    contact: "+91 0000000000"
  },
  Jaimala54: {
    address: "Ranhera, Noida - 203155 (Near Adarsh Inter College & Sarva UP Gramin Bank, Sharma Market)",
    services: ["Decoration", "Flowers", "Lightning", "Lotus Decoration"],
    contact: "+91 0000000000"
  },
  Mineral51: {
    address: "469 Dda Flat, New Ranjit Nagar, Delhi - 110008 (Near Satyam Pvr)",
    services: ["water","Jaar"],
    contact: "+91 7947106511"
  },
  Mineral52: {
    address: "Baba Water Supply, Batra Cinema, Dr Mukherjee Nagar, Delhi - 110009 (Malhotra Parking)",
    services: ["water", "Jaar"],
    contact: "+91 8460253255"
  }, 
  Mineral53: {
    address: "House No 522, D 16, 60 Ft Road, Chattarpur, Delhi - 110074 (Near Diwanbajaj)",
    services: ["water", "Jaar"],
    contact: "+91 7942698699"
  },
  Mineral54: {
    address: "Rz -51, Dayal Singh Road, Uttam Nagar, Delhi - 110059 (Adarsh Model School)",
    services: ["water", "Jaar"],
    contact: "+91 7942685569"
  },
  Mineral55: {
    address: "Plot Number-8B, Shalimar Bagh, Delhi - 110088 (Near By Hanuman Mandir, Sahipur Village)",
    services: ["water", "Jaar"],
    contact: "+91 7942696841"
  }, 
// Working Professionals   
  Beauty51: {
      address: "H3/69 Sector-11, Rohini, Delhi - 110085 (Opposite BPIT College)",
      services: ["Makeup Services", "Hair Styling", "Nail Services", "Skincare Treatments", "Beard Grooming"],
      contact: "+91 8460504704"
  },
  Beauty52: {
      address: "G-18/7a, 1st Floor, Rajouri Garden, Delhi - 110027 (Near Gupta Namkeen & Gambhir Hospital)",
      services: ["Hair Styling", "Nail Services", "Makeup Services"],
      contact: "+91 8105620517"
  },
  Beauty53: {
    address: "Building No 275, Rajdhani Enclave, Pitampura, Delhi - 110034 (Near Yes Bank)",
    services: ["Hair Styling", "Nail Services", "Makeup Services"],
    contact: "+91 8147932011"
  },
  Beauty54: {
    address: "No. 45, N.W.A, Club Road, Punjabi Bagh Extension, Delhi - 110026",
    services: ["Hair Styling", "Nail Services", "Makeup Services"],
    contact: "+91 8105578508"
  }, 




   
   
// Siwan location
// Siwan location



   
   
  Plumber501: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Tap", "sink"],
      contact: "+91 07947431168"
  },
  Plumber502: {
      address: "Purani Quila, Siwan - 841226",
      services: ["Tap", "sink", "Tank", "Pipe"],
      contact: "+91 07947428985"
  }, 
  Plumber503: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Drain cleaning", "Tap", "sink"],
      contact: "+91 07947129036"
  }, 
  Electrician501: {
      address: "Siwan HO, Siwan - 841226",
      services: ["Fan Installation & Repair", "Lighting Installation & Repair", "Wiring & Rewiring", "Power Socket & Switch Installation", "Water Heaters"],
      contact: "+91 07947129036"
  }, 



   // Maharajganj
   // Maharajganj


    Carpenter551: {
      address: "Fatehpur village Maharajganj, Siwan ",
      services: ["Furniture Making", "Wood Carving", "Table", "chair", "Bed"],
      contact: "+91 9006688721"
   },
   Tent551: {
    address: "Ramapali Chitragachhi, Maharajganj, Siwan 841238",
    services: ["Sound", "Light", "Stage", "Seating Arrangements"],
    contact: "+91 9955817356"
  },
    Other551: {
      address: "Ramapali Chitragachhi, Maharajganj, Siwan 841238 ",
      services: ["Bolero", "Tractor"],
      contact: "+91 9525674195"
  },
   Jaimala551: {
      address: "Ramapali Chitragachhi, Maharajganj, Siwan 841238",
      services: ["Stage"],
      contact: "+91 6202965319"
  },
   
   
   


   // Mirganj
   // Mirganj


   Scorpio601: {
      address: "Bhairopatti (Badheya) Mirganj, Gopalganj ",
      services: ["Scorpio", "Tractor"],
      contact: "+91 9523054093"
  },
  
};

document.addEventListener("DOMContentLoaded", function () {
    let activeCard = null; // Keep track of the currently selected card

    // Select all service cards
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", function () {
            const cardId = card.getAttribute("data-card-id");
            const buttonsContainer = document.querySelector(".buttons");

            // If the same card is clicked again, toggle visibility
            if (activeCard === cardId) {
                buttonsContainer.classList.add("hidden"); // Hide buttons
                activeCard = null; // Reset active card
            } else {
                // Update the common buttons' functionality
                buttonsContainer.querySelector("button:nth-child(1)").setAttribute("onclick", `makeCall('${cardId}')`);
                buttonsContainer.querySelector("button:nth-child(2)").setAttribute("onclick", `openWhatsApp('${cardId}')`);
                buttonsContainer.querySelector("button:nth-child(3)").setAttribute("onclick", `openGoogleMaps('${cardId}')`);

                // Show buttons
                buttonsContainer.classList.remove("hidden");
                activeCard = cardId; // Set the clicked card as active
            }
        });
    });
});

// Function to make a call
function makeCall(cardId) {
    const phoneNumber = cardDetails[cardId]?.contact || "Not available";
    if (phoneNumber !== "Not available") {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        alert("Phone number not available.");
    }
}

// Function to open WhatsApp chat
function openWhatsApp(cardId) {
    const phoneNumber = cardDetails[cardId]?.contact || "";
    if (phoneNumber) {
        window.location.href = `https://wa.me/${phoneNumber.replace("+", "")}`;
    } else {
        alert("WhatsApp number not available.");
    }
}

// Function to open Google Maps for directions
function openGoogleMaps(cardId) {
    const address = cardDetails[cardId]?.address || "";
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
    } else {
        alert("Address not available.");
    }
}

function showDetails(event, button) {
  event.stopPropagation(); // Prevent parent click event

  // Get the parent card
  const card = button.closest('.service-card');
  const cardId = card.getAttribute('data-card-id'); // Fetch unique card identifier

  // Get the details section within the card
  const detailsDiv = card.querySelector('.details');

  // Check if details are already visible
  if (!detailsDiv.classList.contains('hidden')) {
      detailsDiv.classList.add('hidden');
      detailsDiv.innerHTML = ""; // Clear the details
  } else {
      // Populate details dynamically
      const details = cardDetails[cardId];

      if (details) {
          detailsDiv.innerHTML = `
              <div class="address">
                  <p><b>Address:</b></p>
                  <p>${details.address}</p>
              </div>
              <div class="services">
                  <h3>Services</h3>
                  <ul>
                      ${details.services.map(service => `<li><i class="fas fa-check-circle"></i> ${service}</li>`).join('')}
                  </ul>
              </div>
          `;
          detailsDiv.classList.remove('hidden');
      } else {
          detailsDiv.innerHTML = `<p>Details not available.</p>`;
          detailsDiv.classList.remove('hidden');
      }
  }
}
