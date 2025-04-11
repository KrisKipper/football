(function () {
    const component = (formElement) => {
        const nameInput = formElement.querySelector('#name');
        const phoneInput = formElement.querySelector('#mobile-phone');
        const childNameInput = formElement.querySelector('#childName');
        const ageRadioGroup = formElement.querySelector('input[name="age"]:checked');
        const districtRadioGroup = formElement.querySelector('input[name="district"]:checked');
        const politicCheckbox = formElement.querySelector('#politicForm');
        const submitButton = formElement.querySelector('.form__button');

        const checkFormValidity = () => {
            const isNameValid = nameInput.value.trim() !== '';
            const isPhoneValid = phoneInput.value.trim() !== '' && !phoneInput.value.includes('_');
            const isChildNameValid = childNameInput.value.trim() !== '';
            const isAgeSelected = formElement.querySelector('input[name="age"]:checked') !== null;
            const isDistrictSelected = formElement.querySelector('input[name="district"]:checked') !== null;
            const isPoliticChecked = politicCheckbox.checked;

            if (isNameValid && isPhoneValid && isChildNameValid && isAgeSelected && isDistrictSelected && isPoliticChecked) {
                submitButton.classList.remove('disabled');
                submitButton.removeAttribute('disabled');
            } else {
                submitButton.classList.add('disabled');
                submitButton.setAttribute('disabled', 'disabled');
            }
        };


        nameInput.addEventListener('input', checkFormValidity);
        phoneInput.addEventListener('input', checkFormValidity);
        childNameInput.addEventListener('input', checkFormValidity);

        const radioButtons = formElement.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', checkFormValidity);
        });

        politicCheckbox.addEventListener('change', checkFormValidity);

        checkFormValidity();

        submitButton.addEventListener('click', () => {
            closeModal("form")
            openModal("finish")
        });
    };

    const mount = () => {
        document.querySelectorAll('.form').forEach(component);
    };

    document.addEventListener('DOMContentLoaded', mount);
})();
