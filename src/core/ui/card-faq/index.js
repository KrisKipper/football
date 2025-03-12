(function () {
    const tabs = (element) => {
        if (!element) return;
        const button = element.querySelector(".card-faq__button");

        button.addEventListener('click', function() {
            const isActive = element.classList.contains('active');

            document.querySelectorAll('.card-faq').forEach((card) => {
                card.classList.remove('active');
            });

            if (!isActive) {
                element.classList.add('active');
            }
        });
    };

    const onLoad = () => {
        document.querySelectorAll('.card-faq').forEach((element) => {
            tabs(element);
        });
    };

    document.addEventListener('DOMContentLoaded', onLoad);
})();
