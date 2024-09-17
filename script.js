
let selectedRow = null;
let selectedRowIndex = null;
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
  
  


function initTable() {
  const tableBody = document.getElementById("chemicalsBody");
  tableBody.innerHTML = "";

  chemicalData.forEach((chem, index) => {
    let row = tableBody.insertRow();
    row.insertCell(0).innerHTML = chem.id;
    row.insertCell(1).innerHTML = chem.name;
    row.insertCell(2).innerHTML = chem.vendor;
    row.insertCell(3).innerHTML = chem.density;
    row.insertCell(4).innerHTML = chem.viscosity;
    row.insertCell(5).innerHTML = chem.packaging;
    row.insertCell(6).innerHTML = chem.packSize || "N/A";
    row.insertCell(7).innerHTML = chem.unit;
    row.insertCell(8).innerHTML = chem.quantity;

    row.addEventListener("click", () => {
      // Highlight selected row
      if (selectedRow) selectedRow.classList.remove("selected");
      selectedRow = row;
      selectedRowIndex = index;
      row.classList.add("selected");
    });

    // Retain the selected row after re-rendering the table
    if (selectedRowIndex === index) {
      row.classList.add("selected");
      selectedRow = row;
    }
  });
}

// Add new row 
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
  initTable();
});

// Move row down 
document.getElementById("moveDownBtn").addEventListener("click", () => {
  if (!selectedRow) {
    alert("Please select a row to move.");
    return;
  }

  let rowIndex = selectedRow.rowIndex - 1;
  if (rowIndex < chemicalData.length - 1) {
    [chemicalData[rowIndex], chemicalData[rowIndex + 1]] = [chemicalData[rowIndex + 1], chemicalData[rowIndex]];
    selectedRowIndex++;
    initTable();
  } else {
    alert("Cannot move down the last row.");
  }
});

// Move row up 
document.getElementById("moveUpBtn").addEventListener("click", () => {
  if (!selectedRow) {
    alert("Please select a row to move.");
    return;
  }

  let rowIndex = selectedRow.rowIndex - 1;
  if (rowIndex > 0) {
    [chemicalData[rowIndex], chemicalData[rowIndex - 1]] = [chemicalData[rowIndex - 1], chemicalData[rowIndex]];
    selectedRowIndex--;
    initTable();
  } else {
    alert("Cannot move up the first row.");
  }
});

// Delete selected row
document.getElementById("deleteRowBtn").addEventListener("click", () => {
  if (!selectedRow) {
    alert("Please select a row to delete.");
    return;
  }

  let rowIndex = selectedRow.rowIndex - 1;
  chemicalData.splice(rowIndex, 1);
  selectedRow = null;
  selectedRowIndex = null;
  initTable();
});

// Refresh table 
document.getElementById("refreshBtn").addEventListener("click", initTable);

// Save data functionality 
document.getElementById("saveBtn").addEventListener("click", () => {
  console.log("Saving data...", chemicalData);
  alert("Data saved (check the console for logged data).");
});

// Highlight selected row with CSS
document.head.insertAdjacentHTML("beforeend", `
  <style>
    .selected {
      background-color: red;
      color: #000; 
    }
  </style>
`);

// Initialize table on page load
initTable();
