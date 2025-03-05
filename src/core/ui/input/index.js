(function () {
  const component = (element) => {
      if (!element) return;

      const inputField = element.querySelector('.input__field');
      const input = element.querySelector('.input__field-input');
      const crossPromoBtn  = element.querySelector('.input__reset-button');

      const removeErrorClass = () => element.classList.remove('_error');
      const removeActiveStyles = () => {
          if (input) {
              input.value = "";
          }
          element.classList.remove('_active');
          element.classList.remove('_applied');
      };

      if (crossPromoBtn) {
          crossPromoBtn.addEventListener('click', () => {
              removeErrorClass();
              removeActiveStyles();
          })
      }

      if (inputField) inputField.addEventListener('input', removeErrorClass);

      if (element.dataset.type === 'password') {
          const toggler = element.querySelector('.input__password-toggler');

          if (!input || !toggler) return;

          element.classList.toggle('_filled', !!input.value);

          const togglePasswordVisibility = () => {
              input.type = input.type === 'password' ? 'text' : 'password';
              toggler.innerHTML = `<svg class="icon _size_sm input__password-icon"><use xlink:href="${window.app.getIcon(input.type === 'password' ? 'password-unlock' : 'password-lock')}"></use></svg>`;
          };

          const mutePassword = () => {
              input.type = 'password';
              toggler.innerHTML = `<svg class="icon _size_sm input__password-icon"><use xlink:href="${window.app.getIcon('password-unlock')}"></use></svg>`;
          }

          const updateStyles = (e) => {
              if (e.target.tagName === 'INPUT') {
                  element.classList.toggle('_focus', input === document.activeElement);
                  element.classList.toggle('_filled', !!input.value);
              }
          };

          toggler.addEventListener('click', togglePasswordVisibility);
          document.addEventListener('focus', (e) => updateStyles(e));
          document.addEventListener('blur', (e) => updateStyles(e));
          document.addEventListener('input', (e) => updateStyles(e));

          if (document.querySelector('.s-profile__edit-button') || document.querySelector('.s-profile__edit-button')) {
              const editBtns = document.querySelectorAll('.s-profile__edit-button');

              editBtns.forEach((editBtn ) => {
                  editBtn.addEventListener('click', mutePassword);

              })
          }
          //updateStyles();
      }

      if (element.classList.contains('_type_search')) {
          const searchButton = element.querySelector('.input__search-button');
          const crossButton = element.querySelector('.input__cross-button');

          if (!input || !searchButton || !crossButton) return;

          const addActiveStyles = () => {

              if (input.value) {
                  element.classList.add('_active');
                  element.classList.remove('_dropdown-close');
              } else {
                  element.classList.remove('_active');
                  element.classList.remove('_dropdown-close');
              }
          };

          const handleOutsideClick = (e) => {
              const target = e.target;

              if (!element.contains(target)) {
                  element.classList.add('_dropdown-close');
              }
          };

          try {
              if(searchButton) searchButton.addEventListener('click', addActiveStyles);
              if(input) input.addEventListener('input', addActiveStyles);
              if(crossButton) crossButton.addEventListener('click', removeActiveStyles);
              document.addEventListener('click', handleOutsideClick);
          } catch (e) {
              console.error("Error:", e.message);
          }

      }

      if (element.classList.contains('_type_promo')) {
          const toggleStyles = () => {
              element.classList.toggle('_active', !!inputField.value);
          };

          inputField.addEventListener('input', toggleStyles);
      }
  };

  const mount = () => {
      document.querySelectorAll('.input').forEach(component);
  };

  document.addEventListener('DOMContentLoaded', mount);
})();
