// Global variable to store the parsed CSV data
let majors = [];

// Function to fetch and parse the CSV data
function loadCSV() {
  Papa.parse("dataset - Sheet1.csv", {
    download: true,
    header: true,
    complete: function(results) {
      majors = results.data; // Store the parsed data
      console.log("CSV Data Loaded:", majors);
    },
    error: function(error) {
      console.error("Error loading CSV:", error);
    }
  });
}

// Function to filter and show the dropdown based on user input
function showDropdown() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const dropdown = document.getElementById("dropdownResults");

  // Clear previous dropdown items
  dropdown.innerHTML = "";

  if (input.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  // Filter majors based on the input
  const filteredMajors = majors.filter(major => major.major.toLowerCase().startsWith(input));

  // If no majors match, hide the dropdown
  if (filteredMajors.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  // Show the dropdown and populate with filtered majors
  dropdown.style.display = "block";
  filteredMajors.forEach(major => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = major.major;

    // When a major is clicked, redirect to the detailed page
    item.onclick = () => {
      localStorage.setItem("selectedMajor", JSON.stringify(major));  // Store major data in localStorage
      window.location.href = "majorDetails.html";  // Redirect to the details page
    };

    dropdown.appendChild(item);
  });
}

// Hide dropdown if clicked outside
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("dropdownResults");
  if (!dropdown.contains(event.target) && event.target !== document.getElementById("searchInput")) {
    dropdown.style.display = "none";
  }
});

// Load the CSV data when the page loads
window.onload = loadCSV;
