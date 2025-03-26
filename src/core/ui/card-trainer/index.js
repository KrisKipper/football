(function () {
    const tabs = (element) => {
        if (!element) return;
        const openButton = element.querySelector(".card-trainer__button");
        const closeButton = element.querySelector(".card-trainer__button-close");
        const sliderTrainers = element.querySelector('.s-trainers__swiper') || element.closest('.s-trainers__swiper');

        const isActive = element.classList.contains('active');

        openButton.addEventListener('click', function() {

            document.querySelectorAll('.card-trainer').forEach((card) => {
                if (!isActive) {
                    card.classList.add('active');
                }
            });

            if(sliderTrainers) {
                sliderTrainers.classList.add('active');
            }
        });

        closeButton.addEventListener('click', function() {
            element.classList.remove('active');

            if(sliderTrainers) {
                sliderTrainers.classList.remove('active');
            }
        })
    };

    const onLoad = () => {
        document.querySelectorAll('.card-trainer').forEach((element) => {
            tabs(element);
        });
    };

    document.addEventListener('DOMContentLoaded', onLoad);
})();
