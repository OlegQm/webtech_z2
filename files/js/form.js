document.getElementById('dob').addEventListener('change', function() {
    const dob = new Date(this.value);
    
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const age = currentYear - birthYear;
    
    document.getElementById('age').innerText = 'Vek: ' + age;
    
    if (age < 0 || isNaN(age)) {
        alert('Zadajte platný dátum narodenia.');
    }
});

const sportSelect = document.getElementById('sport');
const subSportSelect = document.getElementById('subSport');

sportSelect.addEventListener('change', function() {
    const subSports = {
        'futbal': ['Ligový', 'Amatérsky'],
        'tenis': ['Dvojhra', 'Štvorhra']
    };
    
    subSportSelect.innerHTML = '';

    const options = subSports[this.value]; 

    if (options) {
        options.forEach(function(option) {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            subSportSelect.appendChild(opt);
        });
    }
});

const paymentYes = document.getElementById('paymentYes');
const paymentNo = document.getElementById('paymentNo');
const paymentDetails = document.getElementById('paymentDetails');

paymentYes.addEventListener('change', function() {
    paymentDetails.classList.remove('hidden');
});

paymentNo.addEventListener('change', function() {
    paymentDetails.classList.add('hidden');
});
