(function () {
    const component = (element) => {
        if (!element) return;

        const burgerButton = element.querySelector('.header__button');
        const navItems = element.querySelectorAll('.header__nav-item');

        try {
            if(burgerButton) {
                burgerButton.addEventListener('click', () => {
                    element.classList.toggle('_active');
                });
            }

            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth < 1025) {
                        element.classList.remove('_active');
                    }

                    const href = item.dataset.href || '';

                    const hashIndex = href.indexOf('#');
                    const anchor = hashIndex !== -1 ? href.substring(hashIndex) : '';

                    window.location.href = `index.html${anchor}`;
                });
            });

        } catch (e) {
            console.error("Error:", e.message);
        }
    };

    const mount = () => {
        document.querySelectorAll('.header').forEach(component);
    };

    document.addEventListener('DOMContentLoaded', mount);
})();
