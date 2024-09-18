// Initial data
let chemicalData = [
  { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
  { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100, unit: "kg", quantity: 8751.90 },
  { id: 3, name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },
  { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },
  { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4154.33 },
  { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: null, unit: "t", quantity: 6272.34 },
  { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250, unit: "kg", quantity: 8749.54 },
  { id: 8, name: "Sodium Nitrate", vendor: "Formosa", density: 4571.33, viscosity: 64.67, packaging: "Bag", packSize: 300, unit: "kg", quantity: 5433.72 },
  { id: 9, name: "Sulfuric Acid", vendor: "DowDuPont", density: 1837.44, viscosity: 80.24, packaging: "Drum", packSize: 120, unit: "L", quantity: 2345.12 },
  { id: 10, name: "Hydrochloric Acid", vendor: "LG Chem", density: 1492.25, viscosity: 55.17, packaging: "Drum", packSize: 60, unit: "L", quantity: 7482.95 },
  { id: 11, name: "Acetone", vendor: "Sinopec", density: 2561.34, viscosity: 22.10, packaging: "Canister", packSize: 100, unit: "L", quantity: 7842.32 },
  { id: 12, name: "Ethanol", vendor: "Formosa", density: 3692.21, viscosity: 38.41, packaging: "Drum", packSize: 120, unit: "L", quantity: 4523.54 },
  { id: 13, name: "Toluene", vendor: "LG Chem", density: 5123.29, viscosity: 41.11, packaging: "Drum", packSize: 150, unit: "L", quantity: 5682.11 },
  { id: 14, name: "Ammonia", vendor: "Sinopec", density: 6395.29, viscosity: 62.77, packaging: "Cylinder", packSize: 200, unit: "kg", quantity: 9132.41 },
  { id: 15, name: "Benzene", vendor: "DowDuPont", density: 7284.23, viscosity: 52.89, packaging: "Drum", packSize: 180, unit: "L", quantity: 3412.78 }
];

// Selected row index
let selectedRowIndex = null;
let sortDirection = true; 
// Load data from localStorage if available
window.onload = function() {
  const storedData = localStorage.getItem("chemicalData");
  if (storedData) {
      chemicalData = JSON.parse(storedData);
  }
  renderTable();
};

// Save data to localStorage
function saveData() {
  localStorage.setItem("chemicalData", JSON.stringify(chemicalData));
}

// Render the table
function renderTable(filteredData=chemicalData) {
  const tableBody = document.getElementById("chemicalsBody");
  tableBody.innerHTML = ""; // Clear previous table

  filteredData.forEach((chemical, index) => {
      let row = document.createElement("tr");

      // Create a cell for each property
      Object.values(chemical).forEach(value => {
          let cell = document.createElement("td");
          cell.textContent = value;
          cell.addEventListener("click", () => editCell(cell, index));
          row.appendChild(cell);
      });

      row.addEventListener("click", () => selectRow(index, row)); // Highlight row on click
      tableBody.appendChild(row);
  });
}

// Edit a cell
function editCell(cell, rowIndex) {
  const originalValue = cell.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalValue;
  cell.textContent = ""; // Clear cell for input field
  cell.appendChild(input);

  // Update the value and save on blur
  input.addEventListener("blur", () => {
      const newValue = input.value;
      const colIndex = Array.from(cell.parentNode.children).indexOf(cell);
      const keys = Object.keys(chemicalData[0]); // Get object keys for updating
      chemicalData[rowIndex][keys[colIndex]] = newValue;

      renderTable(); // Re-render table
      saveData(); // Save updated data to localStorage
  });

  input.focus();
}

// Highlight the selected row
function selectRow(index, row) {
  if (selectedRowIndex !== null) {
      document.querySelectorAll("tr")[selectedRowIndex + 1].classList.remove("selected"); 
  }
  selectedRowIndex = index;
  row.classList.add("selected"); // Highlight the new row
}

// Add a new row
document.getElementById("addRowBtn").addEventListener("click", () => {
  let newRow = {
      id: chemicalData.length + 1,
      name: prompt("Enter Chemical name:"),
      vendor: prompt("Enter Vendor name:"),
      density: parseFloat(prompt("Enter Density:")),
      viscosity: parseFloat(prompt("Enter Viscosity:")),
      packaging: prompt("Enter Packaging type:"),
      packSize: parseInt(prompt("Enter Pack Size:")),
      unit: prompt("Enter Unit:"),
      quantity: parseFloat(prompt("Enter Quantity:"))
  };
  chemicalData.push(newRow);
  renderTable(); 
  saveData(); 
});

// Delete selected row
document.getElementById("deleteRowBtn").addEventListener("click", () => {
  if (selectedRowIndex !== null) {
      chemicalData.splice(selectedRowIndex, 1); // Remove the selected row from data
      selectedRowIndex = null; 
      renderTable(); 
      saveData(); 
  } else {
      alert("Please select a row to delete.");
  }
});

// Move the selected row up
document.getElementById("moveUpBtn").addEventListener("click", () => {
  if (selectedRowIndex !== null && selectedRowIndex > 0) {
      const temp = chemicalData[selectedRowIndex];
      chemicalData[selectedRowIndex] = chemicalData[selectedRowIndex - 1];
      chemicalData[selectedRowIndex - 1] = temp;
      selectedRowIndex--; 
      renderTable(); 
      saveData(); 
  }else {
    alert("Please select a row to move.");
  }
});



// Move the selected row down
document.getElementById("moveDownBtn").addEventListener("click", () => {
  if (selectedRowIndex !== null && selectedRowIndex < chemicalData.length - 1) {
      const temp = chemicalData[selectedRowIndex];
      chemicalData[selectedRowIndex] = chemicalData[selectedRowIndex + 1];
      chemicalData[selectedRowIndex + 1] = temp;
      selectedRowIndex++; 
      renderTable(); 
      saveData(); 
  }
  else {
    alert("Please select a row to move.");
  }
});

// Sort table by column index
function sortTable(columnIndex) {
  const keys = Object.keys(chemicalData[0]);
  const key = keys[columnIndex];

  chemicalData.sort((a, b) => {
      if (a[key] < b[key]) return sortDirection ? -1 : 1;
      if (a[key] > b[key]) return sortDirection ? 1 : -1;
      return 0;
  });

  sortDirection = !sortDirection; // Toggle sort direction
  renderTable();
  saveData();
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredData = chemicalData.filter(chemical => {
      return Object.values(chemical).some(value =>
          value.toString().toLowerCase().includes(searchTerm)
      );
  });
  renderTable(filteredData);
});  
 

document.head.insertAdjacentHTML("beforeend", `
  <style>
    .selected {
      background-color: yellow;
      color: black;
    }
  </style>
`); 

// Initial table rendering

renderTable();
