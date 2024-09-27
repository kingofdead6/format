// Function to get submissions from localStorage or return an empty array if none exist
function getSubmissions() {
    const submissions = localStorage.getItem("submissions");
    return submissions ? JSON.parse(submissions) : [];
}

// Handle contact form submission and save data to localStorage
document.getElementById("ContactForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form data from contact form
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    
    // Create a new submission object for contact information
    const newContactSubmission = { type: "contact", name, age, email, phone };
    
    // Get existing submissions from localStorage
    const submissions = getSubmissions();
    
    // Add the new contact submission to the array
    submissions.push(newContactSubmission);
    
    // Store updated submissions back in localStorage
    localStorage.setItem("submissions", JSON.stringify(submissions));
    
    // Enable the house preference submit button
    document.getElementById("submitHousePreference").disabled = false;

    // Optionally, redirect to the display page here
    // window.location.href = "done.html"; // Uncomment if you want to redirect after contact form submission
});

// Handle house preference form submission and save data to localStorage
document.getElementById("HousePreferenceForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form data from house preference form
    const option = document.getElementById("option").value;
    const surface = document.getElementById("surface").value;
    const numRooms = document.getElementById("numRooms").value;
    const situation = document.getElementById("situation").value;
    const price = document.getElementById("price").value;
    const whenNeeded = document.getElementById("whenNeeded").value;
    const location = document.getElementById("location").value;
    
    // Create a new submission object for house preferences
    const newHouseSubmission = { 
        type: "house", 
        option, 
        surface, 
        numRooms, 
        situation, 
        price, 
        whenNeeded, 
        location 
    };
    
    // Get existing submissions from localStorage
    const submissions = getSubmissions();
    
    // Add the new house submission to the array
    submissions.push(newHouseSubmission);
    
    // Store updated submissions back in localStorage
    localStorage.setItem("submissions", JSON.stringify(submissions));
    
    // Redirect to the display page
    window.location.href = "done.html";
});

// On the display page, retrieve and show all submissions
window.addEventListener("load", function() {
    const submissionsContainer = document.getElementById("submissions");
    const clearButton = document.getElementById("clearSubmissions");

    // Function to display submissions
    function displaySubmissions() {
        // Clear the current content
        submissionsContainer.innerHTML = "";

        // Retrieve submissions from localStorage
        const submissions = getSubmissions();
        
        // If there are any submissions, display them
        if (submissions.length > 0) {
            submissions.forEach(submission => {
                const submissionDiv = document.createElement("div");
                submissionDiv.classList.add("submission");

                // Display based on submission type
                if (submission.type === "contact") {
                    submissionDiv.innerHTML = `<p><strong>Name:</strong> ${submission.name}</p>
                                               <p><strong>Age:</strong> ${submission.age}</p>
                                               <p><strong>Email:</strong> ${submission.email}</p>
                                               <p><strong>Phone:</strong> ${submission.phone}</p>`;
                } else if (submission.type === "house") {
                    submissionDiv.innerHTML = `<p><strong>Option:</strong> ${submission.option}</p>
                                               <p><strong>Surface:</strong> ${submission.surface} sq m</p>
                                               <p><strong>Number of Rooms:</strong> ${submission.numRooms}</p>
                                               <p><strong>Situation:</strong> ${submission.situation}</p>
                                               <p><strong>Price:</strong> ${submission.price}</p>
                                               <p><strong>When Needed:</strong> ${submission.whenNeeded}</p>
                                               <p><strong>Location:</strong> ${submission.location}</p>`;
                }

                submissionsContainer.appendChild(submissionDiv);
            });
        } else {
            submissionsContainer.innerHTML = "<p>No submissions found.</p>";
        }
    }

    // Initial display of submissions
    displaySubmissions();

    // Clear submissions on button click
    clearButton.addEventListener("click", function() {
        localStorage.removeItem("submissions"); // Clear submissions from localStorage 
        displaySubmissions(); // Refresh the display
    });
});
