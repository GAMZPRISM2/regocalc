document.getElementById('carForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const manualWeightInput = document.getElementById('manualWeight');
    const manualWeightDiv = document.getElementById('manualWeightDiv');
    const resultDiv = document.getElementById('result');
    
    // Clear previous results and hide manual weight field
    resultDiv.innerHTML = "";
    manualWeightDiv.style.display = "none";

    try {
        // Fetch car data from the Car Query API
        const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&model=${model}&year=${year}`);
        const data = await response.json();

        let weight;

        // Check if API returned data
        if (data.Trims && data.Trims.length > 0 && data.Trims[0].curb_weight_kg) {
            weight = data.Trims[0].curb_weight_kg;
            resultDiv.innerHTML = `<p>Vehicle Weight (from API): ${weight} kg</p>`;
        } else {
            // Show manual weight input field if API fails
            manualWeightDiv.style.display = "block";
            resultDiv.innerHTML = "Car not found in database. Please enter the weight manually.";
            return; // Stop execution here to wait for user input
        }

        calculateAndDisplayRego(weight);

    } catch (error) {
        console.error("Fetch error:", error);
        resultDiv.innerHTML = "Error retrieving car information. Please try again.";
        manualWeightDiv.style.display = "block";  // Show manual weight input field
    }

    // Function to calculate and display rego price
    function calculateAndDisplayRego(weight) {
        const licenseFee = (weight / 100) * 27.56;
        const totalRegoPrice = licenseFee + 491.40 + 8.25;

        resultDiv.innerHTML += `
            <h2>Rego Price Calculation</h2>
            <p>Vehicle Weight: ${weight} kg</p>
            <p>License Fee: $${licenseFee.toFixed(2)}</p>
            <p>Additional Fees: $499.65</p>
            <h3>Total Rego Price: $${totalRegoPrice.toFixed(2)}</h3>
        `;
    }

    // Event listener for when the user enters manual weight
    manualWeightInput.addEventListener('input', function() {
        const manualWeight = parseFloat(manualWeightInput.value);
        if (!isNaN(manualWeight) && manualWeight > 0) {
            calculateAndDisplayRego(manualWeight);
        }
    });
});
