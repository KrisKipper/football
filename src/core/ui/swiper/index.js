(function (window) {
    const windowWidth = window.innerWidth;
    const component = (element) => {
        if (!element) {
            return;
        }

        const sliderProgress = element.querySelector('.s-progress__swiper') || element.closest('.s-progress__swiper');
        const sliderTrainers = element.querySelector('.s-trainers__swiper') || element.closest('.s-trainers__swiper');
        const navNextBtn = element.querySelector('.swiper-button-next');
        const navPrevBtn = element.querySelector('.swiper-button-prev');
        const fractionPagination = element.querySelector('.swiper-pagination');

        const thumbsSchedule = element.querySelector('.s-schedule__swiper-thumbs') || element.closest('.s-schedule__swiper-thumbs');
        const sliderSchedule = element.querySelector('.s-schedule__swiper') || element.closest('.s-schedule__swiper');

        const thumbsScheduleSwiper = new Swiper(thumbsSchedule, {
            slidesPerView: 6,

            thumbs: {
                swiper: swiperSchedule,
            },
        });

        const swiperSchedule = new Swiper(sliderSchedule, {
            spaceBetween: 10,
            slidesPerView: 1,
            autoHeight: true,
            thumbs: {
                swiper: thumbsScheduleSwiper,
            },
        });



        const swiperProgress = new Swiper(sliderProgress, {
            breakpoints: {
                860: {
                    spaceBetween: 20,
                    slidesPerView: 1,
                },
                861: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                },
            },
            centeredSlides: true,
            pagination: {
                el: fractionPagination,
                type: "fraction",
            },
            loop: true,
            navigation: {
                nextEl: navNextBtn,
                prevEl: navPrevBtn,
            },
        });


        const swiperTrainers = new Swiper(sliderTrainers, {
            slidesPerView: 1,
            spaceBetween: 40,
            breakpoints: {
                860: {
                    spaceBetween: 0,
                },
                861: {
                    spaceBetween: 40,
                },
            },
            pagination: {
                el: fractionPagination,
                type: "fraction",
            },
            loop: true,
            autoHeight: true,
            navigation: {
                nextEl: navNextBtn,
                prevEl: navPrevBtn,
            },
        });
    };

    const mount = () => {
        const elements = document.querySelectorAll('.swiper-container');
        elements.forEach(component);
    };

    document.addEventListener('DOMContentLoaded', mount);
})(window);
