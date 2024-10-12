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
const emailElement= document.getElementById('email');
const countryCodeElement= document.getElementById('country-code');
const phoneNumberElement= document.getElementById('phone-number');
const blockedFieldElement= document.getElementById('blocked-field');
const creatorsButtonElement= document.getElementById('creators-button');

function addSelectElements(selectElement, options) {
    options.forEach(function(option) {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

function showAlert(element, secondElement=null, message) {
    element.setCustomValidity(message);
    element.reportValidity();
    const errorStyle = "0.15rem solid red"
    element.style.border = errorStyle;
    if (secondElement !== null)
        secondElement.style.border = errorStyle;
}

function setNormalValidity(element, secondElement=NaN) {
    element.setCustomValidity('');
    const validStyle = "0.15rem solid green";
    element.style.border = validStyle;
    if (!isNaN(secondElement))
        secondElement.style.border = validStyle;
}

function checkAge(ageElement, dobElement, age) {
    setNormalValidity(emailElement);
    if (ageElement.value === '') {
        ageElement.value = age;
    } else {
        const providedAge = parseInt(ageElement.value);
        if (isNaN(providedAge)) {
            showAlert(ageElement, dobElement, 'Zadajte vek ako celé číslo.');
            return;
        }
        if (providedAge != age) {
            showAlert(ageElement, dobElement, 'Zadaný vek sa nezhoduje s dátumom narodenia.');
            return;
        }
    }
}

function checkDateAndAge(dobElement, inputAgeElement) {
    setNormalValidity(dobElement, inputAgeElement);
    const dob = new Date(dobElement.value);
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const age = currentYear - birthYear;
    const dateDiff = new Date() - dob;
        
    if (dateDiff < 0 || isNaN(age)) {
        showAlert(dobElement, inputAgeElement, 'Zadajte platný dátum narodenia.');
        return;
    }
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

function isValidEmail(email) {
    const atSymbolIndex = email.indexOf('@');
    if (atSymbolIndex < 3) {
        reason = "Znak @ chýba alebo je na začiatku emailu.\n";
        return [false, reason];
    }

    const domainPart = email.slice(atSymbolIndex + 1);
    const domainParts = domainPart.split('.');
    if (domainParts.length < 2) {
        reason = "Doménová časť chýba alebo je neplatná.\n";
        return [false, reason];
    }

    const topLevelDomain = domainParts[domainParts.length - 1];
    if (topLevelDomain.length < 2 || topLevelDomain.length > 4) {
        reason = "Najvyššia úroveň domény je neplatná.\n";
        return [false, reason];
    }

    return [true, reason];
}

emailElement.addEventListener('change', function() {
    setNormalValidity(emailElement);
    [isValid, reason] = isValidEmail(emailElement.value);
    console.log(reason);
    if (!isValid) {
        showAlert(emailElement, null, message=reason);
    }
});

function extractCountryCode(code) {
    const plusIndex = code.indexOf('+');
    if (plusIndex !== -1) {
        return code.slice(plusIndex + 1);
    }
    return '';
}

function isValidPhoneNumber(phoneNumber) {
    setNormalValidity(phoneNumberElement);
    if (phoneNumber === '') {
        showAlert(phoneNumberElement, null, 'Zadajte telefónne číslo.');
        return;
    }
    const countryCode = extractCountryCode(countryCodeElement.value);
    const containsIncorrectChars = /[^\d\s]/.test(phoneNumber);
    if (containsIncorrectChars) {
        showAlert(phoneNumberElement, null, 'Telefónne číslo musí mať format 123 456 789.');
        return;
    }
    const numbersLengths = {
        '421': 9,
        '380': 9,
        '41': 9
    }

    const currentNumberLength = numbersLengths[countryCode];
    let number = phoneNumber.replace(/[^0-9]/g, '');
    if (number.length === currentNumberLength + 1 && number[0] === '0') {
        number = number.slice(1);
    }
    if (number.length !== currentNumberLength) {
        showAlert(phoneNumberElement, null, 'Telefónne číslo musí mať format 123 456 789.');
    }
    return;
}

phoneNumberElement.addEventListener('change', function() {
    isValidPhoneNumber(phoneNumberElement.value);
});

function handleCreatorsName() {
    if (creatorsButtonElement.textContent === 'Zobraziť meno gladiátora') {
        creatorsButtonElement.textContent = 'Skryť meno gladiátora'
        blockedFieldElement.style.display = "block";
    } else {
        creatorsButtonElement.textContent = 'Zobraziť meno gladiátora'
        blockedFieldElement.style.display = "none";
    }
}
