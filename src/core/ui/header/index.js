(function () {
    const component = (element) => {
        if (!element) return;

        const burgerButton = element.querySelector('.header__burger');
        const closeButton = element.querySelector('.header__close-icon');
        const menu = element.querySelector('.header__content');

        const searchForm = element.querySelector('.input._type_search');

        const addActiveClass = () => {
            menu.classList.add('active')
        }

        const removeActiveClass = () => {
            menu.classList.remove('active')
        }

        try {
            if(burgerButton) burgerButton.addEventListener('click', addActiveClass)
            if(closeButton) closeButton.addEventListener('click', removeActiveClass)
        } catch (e) {
            console.error("Error:", e.message);
        }

        searchForm.addEventListener('click', function(){
          menu.classList.add('open');
        })

        document.addEventListener('click', function(e){
          if (!e.target.closest('.input__field-input')) {
            menu.classList.remove('open');
          }
        })

    };

    const mount = () => {
        document.querySelectorAll('.header').forEach(component);
    };

    document.addEventListener('DOMContentLoaded', mount);
})();
