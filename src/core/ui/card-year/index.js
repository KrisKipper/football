(function () {
    const tabs = (element) => {
        if (!element) return;
        const button = element.querySelector(".card-year__button");

        button.addEventListener('click', function() {
            const isActive = element.classList.contains('active');

            document.querySelectorAll('.card-year').forEach((card) => {
                card.classList.remove('active');
            });

            if (!isActive) {
                element.classList.add('active');
            }
        });
    };

    const onLoad = () => {
        document.querySelectorAll('.card-year').forEach((element) => {
            tabs(element);
        });
    };

    document.addEventListener('DOMContentLoaded', onLoad);
})();
