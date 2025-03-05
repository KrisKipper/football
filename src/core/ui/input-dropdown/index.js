(function () {
  const component = (element) => {
      if (!element) return;
    
    const dropdown = element;
    const dropdownValue = dropdown.querySelector('.input-dropdown__input');
    const checkboxes = element.querySelectorAll('.input-dropdown__checkbox');
    let valuesArray = [];

    dropdown.addEventListener('click', function() {
      if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
      } else {
        dropdown.classList.add('open');
      }
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.input-dropdown')) {
        dropdown.classList.remove('open');
      }
    })

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const inputCheckbox = checkbox.querySelector('input');
        const value = checkbox.querySelector('span').textContent;
        if (inputCheckbox.checked) {
          valuesArray.push(value);
          dropdownValue.value = valuesArray;
        } else {
          const removedCheck = valuesArray.indexOf(value);
          valuesArray.splice(removedCheck, 1)
          dropdownValue.value = valuesArray;
        }
      })
    })
  };

  const mount = () => {
      document.querySelectorAll('.input-dropdown').forEach(component);
  };

  document.addEventListener('DOMContentLoaded', mount);
})();

