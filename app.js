document.getElementById('carForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const resultDiv = document.getElementById('result');

    // Fetch car data from the Car Query API
    try {
        const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&model=${model}`);
        const data = await response.json();

        if (data.Trims && data.Trims.length > 0) {
            const car = data.Trims[0];  // Get the first matching car
            const weight = car.curb_weight_kg;
            const licenseFee = (weight / 100) * 27.56;
            const totalRegoPrice = licenseFee + 491.40 + 8.25;

            resultDiv.innerHTML = `
                <h2>Rego Price Calculation</h2>
                <p>Car Make: ${make}</p>
                <p>Car Model: ${model}</p>
                <p>Vehicle Weight: ${weight} kg</p>
                <p>License Fee: $${licenseFee.toFixed(2)}</p>
                <p>Additional Fees: $499.65</p>
                <h3>Total Rego Price: $${totalRegoPrice.toFixed(2)}</h3>
            `;
        } else {
            resultDiv.innerHTML = "Car not found. Please check the make and model.";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Error retrieving car information. Please try again.";
    }
});
