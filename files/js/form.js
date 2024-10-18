const sportSelect = document.getElementById('sport');
const subSportSelect = document.getElementById('subSport');
const sportPlaceSelect = document.getElementById('sportPlace');
const sportTimesAndPrices = document.getElementById('timeAndPrice');
const dobElement = document.getElementById('dob');
const inputAgeElement = document.getElementById('age');
const dicElement = document.getElementById('dic');
const companyNameElement = document.getElementById('company-name');
const peopleCounterElement = document.getElementById('quantity');
const otherCheckbox = document.getElementById('other');
const otherInput = document.getElementById('other-textarea');
const paymentInput = document.getElementById('paymentYes');
const notPaymentInput = document.getElementById('paymentNo');
const paymentInputVisibContainer = document.getElementById('visibility-container');
const emailElement= document.getElementById('email');
const countryCodeElement= document.getElementById('country-code');
const phoneNumberElement= document.getElementById('phone-number');
const blockedFieldElement= document.getElementById('blocked-field');
const creatorsButtonElement= document.getElementById('creators-button');
const nameInput = document.getElementById('name');
const nameCharCount = document.getElementById('name-char-count');
const surnameInput = document.getElementById('surname');
const surnameCharCount = document.getElementById('surname-char-count');
const ageCharCount = document.getElementById('age-char-count');
const tentsInput = document.getElementById('comments');
const icoElement = document.getElementById('ico');
const tentsCharCount = document.getElementById('tents-char-count');
const phoneCharCount = document.getElementById('phone-char-count');
const emailCharCount = document.getElementById('email-char-count');
const icoCharCount = document.getElementById('ico-char-count');
const dicCharCount = document.getElementById('dic-char-count');
const companyNameCharCount = document.getElementById('company-name-char-count');

const modal = document.getElementById('orderPreviewModal');
const closeModalButton = document.getElementById('closeModalButton');
const finalSubmitButton = document.getElementById('finalSubmitButton');
const previewButton = document.getElementById('previewButton');
const previewLeftColumnContent = document.getElementById('left-column-content');
const previewRightColumnContent = document.getElementById('right-column-content');

function checkNotEmptyElement(element) {
    if (!element.value) {
        showAlert(element, null, "Toto pole nemôže byť prázdne");
        return false;
    }
    return true;
}

function checkName(namePart, type) {
    setNormalValidity(namePart);
    if (!checkNotEmptyElement(namePart)) {
        const nameInvaldMessage = type + " nemôže byť prázdne.";
        showAlert(namePart, null, nameInvaldMessage);
        return false;
    }
    const namePartText = namePart.value;
    const nameRegex = /^[A-Z][a-zA-Z\s\-]*$/;
    if (!nameRegex.test(namePartText)) {
        const nameInvaldMessage = "Názov môže obsahovať len písmená a symboly ' ', '-'";
        showAlert(namePart, null, nameInvaldMessage);
        return false;
    }
    return true;
}

function checkPersonalInfo() {
    const isNameValid = checkName(nameInput, "Meno");
    const isSurnameValid = checkName(surnameInput, "Priezvisko");
    const isBirthDateAndAgeValid = checkDateAndAge(dobElement, inputAgeElement);
    return isNameValid && isSurnameValid && isBirthDateAndAgeValid;
}

function checkSelected(selectItem, message) {
    setNormalValidity(selectItem);
    if (!selectItem.value || selectItem.value.includes("Vyberte")) {
        showAlert(selectItem, null, message);
        return false;
    }
    return true;
}

function checkRegistration() {
    const sportMessage = "Vyberte šport.";
    isSportSelected = checkSelected(sportSelect, sportMessage);

    const subSportMessage = "Vyberte podkategóriu.";
    isSubsportSelected = checkSelected(subSportSelect, subSportMessage);

    const sportPlaceMessage = "Vyberte miesto.";
    isPlaceSelected = checkSelected(sportPlaceSelect, sportPlaceMessage);

    const timeAndPriceMessage = "Vyberte cenu a čas.";
    isTimeAndPriceSelected = checkSelected(sportTimesAndPrices, timeAndPriceMessage);

    return (
        isSportSelected
        && isSubsportSelected
        && isPlaceSelected
        && isTimeAndPriceSelected
    );
}

function checkICO(element) {
    setNormalValidity(element);
    if (!checkNotEmptyElement(element)) {
        return false;
    }
    const isICOValid = /^\d+$/.test(element.value);
    if (!isICOValid) {
        showAlert(element, null, "ICO musí byť vo formáte 12345678.")
        return false;
    }
    return true;
}

function checkDIC(element) {
    setNormalValidity(element);
    if (!checkNotEmptyElement(element)) {
        return false;
    }
    const isDICValid = /^[a-zA-Z0-9]+$/.test(element.value);
    if (!isDICValid) {
        showAlert(element, null, "DIC musí obsahovať iba písmená a číslice.")
        return false;
    }
    return true;
}

function getPaymentAttributes() {
    let factPayment = "";
    if (paymentInput.checked) {
        factPayment = `
            <p><strong>Názov spoločnosti:</strong> ${companyNameElement.value}</p>
            <p><strong>IČO:</strong> ${icoElement.value}</p>
            <p><strong>DIČ:</strong> ${dicElement.value}</p>\n
        `;
    }
    return factPayment;
}

function getSportNeedsAttribudes() {
    const shoesCheckbox = document.getElementById('shoes');
    const tshirtCheckbox = document.getElementById('t-shirt');
    const beerCheckbox = document.getElementById('beer');
    let sportNeeds = "<p><strong>Športové potreby:</strong></p>\n<ul>";
    if (shoesCheckbox.checked) {
        sportNeeds += "<li>Tenisky</li>\n";
    }
    if (tshirtCheckbox.checked) {
        sportNeeds += "<li>Tričko</li>\n";
    }
    if (beerCheckbox.checked) {
        sportNeeds += "<li>Pivo</li>\n";
    }
    if (otherCheckbox.checked) {
        sportNeeds += `<li>${otherInput.value}</li>\n`;
    }
    sportNeeds += "</ul>\n";
    return sportNeeds;
}

function checkPaymentAndOther() {
    let isCompanyNameValid = true, isICOValid = true,
        isDICValid = true, isOtherValid = true;
    if (paymentInput.checked) {
        isCompanyNameValid = checkNotEmptyElement(companyNameElement);
        isICOValid = checkICO(icoElement);
        isDICValid = checkDIC(dicElement);
    }
    if (otherCheckbox.checked) {
        if (!otherInput.value) {
            isOtherValid = false;
        }
    }
    const isPhoneValid = isValidPhoneNumber(phoneNumberElement.value);
    const [isEmailValid, _] = isValidEmail(emailElement);
    return (
        isCompanyNameValid
        && isICOValid
        && isDICValid
        && isOtherValid
        && isPhoneValid
        && isEmailValid
    );
}

function checkForm() {
    const isPersonalInfoValid = checkPersonalInfo();
    const isRegistrationValid = checkRegistration();
    const isPaymentAndOtherValid = checkPaymentAndOther();
    return (
        isPersonalInfoValid
        && isRegistrationValid
        && isPaymentAndOtherValid
    );
}

previewButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (!checkForm()) {
        return;
    }

    const name = nameInput.value;
    const surname = surnameInput.value;
    const sport = sportSelect.value;
    const birthDate = dobElement.value;
    const subSport = subSportSelect.value;
    const place = sportPlaceSelect.value;
    const timeAndPrice = sportTimesAndPrices.value;
    const totalPeople = peopleCounterElement.value;
    const ageInYears = inputAgeElement.value;
    const gender = document.getElementById('gender').value;

    const personalData = `
        <p><strong>Meno a priezvisko:</strong> ${name} ${surname}</p>
        <p><strong>Dátum narodenia:</strong> ${birthDate}</p>
        <p><strong>Vek:</strong> ${ageInYears}</p>
        <p><strong>Pohlavie:</strong> ${gender}</p>\n
    `

    const registration = `
        <p><strong>Počet ľudí:</strong> ${totalPeople}</p>
        <p><strong>Šport:</strong> ${sport} (${subSport})</p>
        <p><strong>Miesto:</strong> ${place}</p>
        <p><strong>Čas a cena:</strong> ${timeAndPrice}</p>\n
    `

    const facturePayment = getPaymentAttributes();
    const otherSportNeeds = getSportNeedsAttribudes();
    const contactInfo = `
        <p><strong>Telefónne číslo:</strong> ${phoneNumberElement.value}</p>
        <p><strong>Email:</strong> ${emailElement.value}</p>\n
    `
    const notes = `
        <p><strong>Poznámky:</strong> ${tentsInput.value}</p>\n
    `

    const leftPreviewContent = personalData + registration + facturePayment;
    const rightPreviewContent = otherSportNeeds + contactInfo + notes;
    previewLeftColumnContent.innerHTML = leftPreviewContent;
    previewRightColumnContent.innerHTML = rightPreviewContent;

    modal.style.display = 'flex';
});

closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

function addSelectElements(selectElement, options) {
    options.forEach(function(option) {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

function showAlert(element, secondElement = null, message) {
    element.reportValidity();
    const errorStyle = "0.15rem solid red";
    element.style.border = errorStyle;
    if (secondElement !== null) {
        secondElement.style.border = errorStyle;
    }

    removeAlertDiv(element);

    let alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.textContent = message;
    alertDiv.dataset.forElement = element.id;

    const rect = element.getBoundingClientRect();
    alertDiv.style.position = 'absolute';
    alertDiv.style.left = `${rect.left + window.scrollX}px`;
    alertDiv.style.top = `${rect.bottom + window.scrollY + 3}px`;
    alertDiv.style.backgroundColor = '#f8d7da';
    alertDiv.style.color = '#721c24';
    alertDiv.style.padding = '0.75rem';
    alertDiv.style.border = '0.05rem solid #f5c6cb';
    alertDiv.style.borderRadius = '0.35rem';
    alertDiv.style.zIndex = '1000';

    if (window.innerWidth <= 768) {
        alertDiv.style.width = '50%';
    }

    document.body.appendChild(alertDiv);
}

function setNormalValidity(
    element,
    secondElement = null,
    greenBorder = true
) {
    if (element == null) {
        return;
    }

    if (greenBorder) {
        const validStyle = "0.15rem solid green";
        element.style.border = validStyle;
        if (secondElement != null) {
            secondElement.style.border = validStyle;
        }
    }

    removeAlertDiv(element);
}

function removeAlertDiv(element) {
    const alertDiv = document.querySelector(`.custom-alert[data-for-element="${element.id}"]`);
    if (alertDiv) {
        document.body.removeChild(alertDiv);
    }
}

function checkAge(ageElement, dobElement, age) {
    if (ageElement.value === '') {
        ageElement.value = age;
        setNormalValidity(ageElement);
    } else {
        const providedAge = parseInt(ageElement.value);
        if (isNaN(providedAge)) {
            showAlert(ageElement, dobElement, 'Zadajte vek ako celé číslo.');
            return false;
        }
        if (providedAge != age) {
            showAlert(ageElement, dobElement, 'Zadaný vek sa nezhoduje s dátumom narodenia.');
            return false;
        }
    }
    setNormalValidity(ageElement);
    return true;
}

function checkDateAndAge(dobElement, inputAgeElement) {
    setNormalValidity(dobElement, inputAgeElement);
    if (!dobElement.value) {
        showAlert(dobElement, inputAgeElement, 'Zadajte dátum narodenia.');
        return false;
    }

    const dob = new Date(dobElement.value);
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const age = currentYear - birthYear;
    const dateDiff = new Date() - dob;
        
    if (dateDiff < 0 || isNaN(age)) {
        showAlert(dobElement, inputAgeElement, 'Zadajte platný dátum narodenia.');
        return false;
    }
    return checkAge(inputAgeElement, dobElement, age);
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
    sportTimesAndPrices.innerHTML = '';

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

function isValidEmail(emailElement) {
    if (!checkNotEmptyElement(emailElement)) {
        return [false, "Toto pole nemôže byť prázdne"];
    }
    const email = emailElement.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return [false, "Email musí obsahovať iba písmená, číslice, jeden znak '@' a jeden znak '.'"];
    }

    const atSymbolIndex = email.indexOf('@');
    let reason = "";
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
    [isValid, reason] = isValidEmail(emailElement);
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
        return false;
    }
    const countryCode = extractCountryCode(countryCodeElement.value);
    const containsIncorrectChars = /[^\d\s]/.test(phoneNumber);
    if (containsIncorrectChars) {
        showAlert(phoneNumberElement, null, 'Telefónne číslo musí mať format 123 456 789.');
        return false;
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
        return false;
    }
    return true;
}

phoneNumberElement.addEventListener('change', function() {
    isValidPhoneNumber(phoneNumberElement.value);
});

nameInput.addEventListener('blur', function() {
    checkName(nameInput, "Meno");
});

surnameInput.addEventListener('blur', function() {
    checkName(surnameInput, "Priezvisko");
});

sportSelect.addEventListener('blur', function() {
    const sportMessage = "Vyberte šport.";
    checkSelected(sportSelect, sportMessage);
});

subSportSelect.addEventListener('blur', function() {
    const subSportMessage = "Vyberte podkategóriu.";
    checkSelected(subSportSelect, subSportMessage);
});

sportPlaceSelect.addEventListener('blur', function() {
    const sportPlaceMessage = "Vyberte miesto.";
    checkSelected(sportPlaceSelect, sportPlaceMessage);
});

sportTimesAndPrices.addEventListener('blur', function() {
    const timeAndPriceMessage = "Vyberte cenu a čas.";
    checkSelected(sportTimesAndPrices, timeAndPriceMessage);
});

companyNameElement.addEventListener('blur', function() {
    checkNotEmptyElement(companyNameElement);
});

icoElement.addEventListener('blur', function() {
    checkICO(icoElement);
});

dicElement.addEventListener('blur', function() {
    checkDIC(dicElement);
});

otherCheckbox.addEventListener('change', function() {
    handleOther();
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

function charsCounter(element, charCountElement) {
    const maxLength = element.getAttribute('maxlength');
    const currentLength = element.value.length;
    charCountElement.textContent = `${maxLength - currentLength}/${maxLength}`;
}

notPaymentInput.addEventListener('change', function() {
    if(notPaymentInput.checked) {
        setNormalValidity(companyNameElement, null, false);
        setNormalValidity(icoElement, null, false);
        setNormalValidity(dicElement, null, false);
    }
});

paymentInput.addEventListener('change', function() {
    if (otherCheckbox.checked) {
        handleOtherInput();
    }
});

nameInput.addEventListener('input',
    function() {
        charsCounter(nameInput, nameCharCount);
    }
);

surnameInput.addEventListener('input',
    function() {
        charsCounter(surnameInput, surnameCharCount);
    }
);

inputAgeElement.addEventListener('input',
    function() {
        charsCounter(inputAgeElement, ageCharCount);
    }
);

tentsInput.addEventListener('input',
    function() {
        charsCounter(tentsInput, tentsCharCount);
    }
);

phoneNumberElement.addEventListener('input',
    function() {
        charsCounter(phoneNumberElement, phoneCharCount);
    }
);

emailElement.addEventListener('input',
    function() {
        charsCounter(emailElement, emailCharCount);
    }
);

icoElement.addEventListener('input',
    function() {
        charsCounter(icoElement, icoCharCount);
    }
);

dicElement.addEventListener('input',
    function() {
        charsCounter(dicElement, dicCharCount);
    }
);

function handleOtherInput() {
    setNormalValidity(otherInput);
    checkNotEmptyElement(otherInput);
}

otherInput.addEventListener('blur', function() {
    handleOtherInput();
});

otherCheckbox.addEventListener('change', function() {
    if (!otherCheckbox.checked) {
        setNormalValidity(otherInput, null, false);
        return;
    }
});

companyNameElement.addEventListener('input',
    function() {
        charsCounter(companyNameElement, companyNameCharCount);
    }
);
