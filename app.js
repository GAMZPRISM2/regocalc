document.getElementById('regoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const manualWeightInput = document.getElementById('manualWeight').value;
    const resultDiv = document.getElementById('result');
    
    const weight = parseFloat(manualWeightInput);

    if (!isNaN(weight) && weight > 0) {
        const licenseFee = (weight / 100) * 27.56;
        const totalRegoPrice = licenseFee + 491.40 + 8.25;

        resultDiv.innerHTML = `
            <h2>Rego Price Calculation</h2>
            <p>Vehicle Weight: ${weight} kg</p>
            <p>License Fee: $${licenseFee.toFixed(2)}</p>
            <p>Additional Fees: $499.65</p>
            <h3>Total Rego Price: $${totalRegoPrice.toFixed(2)}</h3>
        `;
    } else {
        resultDiv.innerHTML = "Please enter a valid weight.";
    }
});
