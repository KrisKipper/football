(function () {
    const tabs = (element) => {
        if (!element) return;
        const header = element.querySelector(".radio-accordion__header");

        header.addEventListener('click', function() {
            const isActive = element.classList.contains('active');


            if (!isActive) {
                element.classList.add('active');
            }
        });
    };

    const onLoad = () => {
        document.querySelectorAll('.radio-accordion').forEach((element) => {
            tabs(element);
        });
    };

    document.addEventListener('DOMContentLoaded', onLoad);
})();
