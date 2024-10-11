const sportSelect = document.getElementById('sport');
const subSportSelect = document.getElementById('subSport');
const sportPlaceSelect = document.getElementById('sportPlace');
const sportTimesAndPrices = document.getElementById('timeAndPrice');
const dobElement = document.getElementById('dob');
const inputAgeElement = document.getElementById('age');
const peopleCounterElement = document.getElementById('quantity');
const otherCheckbox = document.getElementById('other');
const otherInput = document.getElementById('other-textarea');
const paymentInput = document.getElementById('paymentYes');
const paymentInputVisibContainer = document.getElementById('visibility-container');

function addSelectElements(selectElement, options) {
    options.forEach(function(option) {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

function showAlert(element, secondElement, message) {
    element.setCustomValidity(message);
    element.reportValidity();
    const errorStyle = "0.15rem solid red"
    element.style.border = errorStyle;
    secondElement.style.border = errorStyle;
}

function setNormalValidity(element, secondElement) {
    element.setCustomValidity('');
    const validStyle = "0.15rem solid green";
    element.style.border = validStyle;
    secondElement.style.border = validStyle;
}

function checkAge(ageElement, dobElement, age) {
    if (ageElement.value === '') {
        ageElement.value = age;
    } else {
        const providedAge = parseInt(ageElement.value);
        if (isNaN(providedAge)) {
            showAlert(ageElement, dobElement, 'Zadajte vek ako celé číslo.');
            return;
        }
        setNormalValidity(ageElement, dobElement);
        if (providedAge != age) {
            showAlert(ageElement, dobElement, 'Zadaný vek sa nezhoduje s dátumom narodenia.');
            return;
        }
        setNormalValidity(ageElement, dobElement);
    }
}

function checkDateAndAge(dobElement, inputAgeElement) {
    const dob = new Date(dobElement.value);
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const age = currentYear - birthYear;
    const dateDiff = new Date() - dob;
        
    if (dateDiff < 0 || isNaN(age)) {
        showAlert(dobElement, inputAgeElement, 'Zadajte platný dátum narodenia.');
        return;
    }
    setNormalValidity(dobElement, inputAgeElement);
    checkAge(inputAgeElement, dobElement, age);
}

dobElement.addEventListener('change', function() {
    checkDateAndAge(dobElement, inputAgeElement);
});

inputAgeElement.addEventListener('change', function() {
    checkDateAndAge(dobElement, inputAgeElement);
});

sportSelect.addEventListener('change', function() {
    const subSports = {
        'futbal': ['Vyberte podkategóriu', 'Ligový', 'Amatérsky'],
        'tenis': ['Vyberte podkategóriu', 'Dvojhra', 'Štvorhra']
    };
    
    subSportSelect.innerHTML = '';
    sportPlaceSelect.innerHTML = '';

    const options = subSports[this.value];
    addSelectElements(subSportSelect, options);
});

subSportSelect.addEventListener('change', function() {
    const places = {
        'Ligový': ['Vyberte miesto', 'Baltika-9 arena', 'Spartak arena'],
        'Amatérsky': ['Vyberte miesto', 'Baltika-7 arena', 'Spartak arena'],
        'Dvojhra': ['Vyberte miesto', 'Holland sturval arena', 'Baltika-7 arena'],
        'Štvorhra': ['Vyberte miesto', 'Holland sturval arena', 'Baltika-9 arena']
    };
    
    sportPlaceSelect.innerHTML = '';
    sportTimesAndPrices.innerHTML = '';

    const options = places[this.value];
    addSelectElements(sportPlaceSelect, options);
});

function createTimesAndPrices(times, prices) {
    const result = {};
    const peopleCount = parseInt(peopleCounterElement.value);
    for (const place in times) {
        result[place] = ['Vyberte cenu a čas', ...times[place].map(time => {
            const [hours] = time.split(':');
            const price = prices[place] + parseInt(hours) + peopleCount;
            return `${time} - ${price} eur`;
        })];
    }
    return result;
}

sportPlaceSelect.addEventListener('change', function() {
    const times = {
        'Baltika-9 arena': ['10:00', '12:00', '15:00'],
        'Spartak arena': ['11:00', '13:00', '16:00'],
        'Baltika-7 arena': ['09:00', '14:00'],
        'Holland sturval arena': ['08:00', '17:00']
    };
    const prices = {
        'Baltika-9 arena': 20,
        'Spartak arena': 15,
        'Baltika-7 arena': 10,
        'Holland sturval arena': 25
    };

    sportTimesAndPrices.innerHTML = '';

    const timesAndPrices = createTimesAndPrices(times, prices);
    options = timesAndPrices[this.value];
    addSelectElements(sportTimesAndPrices, options);
});

peopleCounterElement.addEventListener('change', function() {
    let currentValue = peopleCounterElement.value;
    if (currentValue % 2 !== 0) {
        currentValue++;
    }
    if (currentValue < 2) {
        currentValue = 2;
    }
    if (currentValue > 10) {
        currentValue = 10;
    }
    peopleCounterElement.value = currentValue;
});

function handleOther() {
    if (otherCheckbox.checked) {
        otherInput.style.display = "block";
        return;
    } else {
        otherInput.style.display = "none";
    }
}

function handleFacturePayment() {
    if (paymentInput.checked) {
        paymentInputVisibContainer.style.display = "block";
        return;
    } else {
        paymentInputVisibContainer.style.display = "none";
    }
}
