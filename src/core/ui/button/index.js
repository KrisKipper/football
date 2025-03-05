(function () {
  const component = (element) => {
    if (!element) return;

    const startCoords = element.getBoundingClientRect().top;
    const clientView = window.innerHeight;
    const startPos = clientView - startCoords;

    function fixMobileButton() {
      const scrollTop = document.body.scrollTop;
      if (startPos + scrollTop > 50) {
        element.classList.add('scroll');
      } else {
        element.classList.remove('scroll');
      }
    }

    window.addEventListener("scroll", fixMobileButton);
  };

  const mount = () => {
    document.querySelectorAll('[data-button="mobile-cart"]').forEach(component);
  };

  document.addEventListener('DOMContentLoaded', mount);
})();
