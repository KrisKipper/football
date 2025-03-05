(function (window) {

  const windowWidth = window.innerWidth
  const component = (element) => {
      if (!element) {
          return;
      }

      const sliderPromo = element.querySelector('.s-promo__swiper') || element.closest('.s-promo__swiper');
      const sliderVideoTutorials = element.querySelector('.s-video-tutorials__swiper') || element.closest('.s-video-tutorials__swiper');
      const sliderBlog = element.querySelector('.s-blog__swiper') || element.closest('.s-blog__swiper');
      const sliderStories = element.querySelector('.s-stories__swiper') || element.closest('.s-stories__swiper');
      const sliderReviews = element.querySelector('.s-reviews__swiper') || element.closest('.s-reviews__swiper');
      const sliderComment = element.querySelector('.comment__swiper') || element.closest('.comment__swiper');
      const sliderAdvantages = element.querySelector('.s-about__swiper') || element.closest('.s-about__swiper');
      const sliderOrderCard = element.querySelector('.order-userpage__swiper') || element.closest('.order-userpage__swiper');
      const sliderVideoTutorialsPage = element.querySelector('.s-video-tutorials__slider') || element.closest('.s-video-tutorials__slider');
      const sliderMasterClassInfo = element.querySelector('.s-pattern__info-swiper') || element.closest('.s-pattern__info-swiper');
      const sliderCategory = element.querySelector('.s-category__slider') || element.closest('.s-category__slider');
      const sliderPatterns = element.querySelector('.s-patterns__slider') || element.closest('.s-patterns__slider');
      const sliderPatternsAdditional = element.querySelector('.s-patterns__slider-addiotional') || element.closest('.s-patterns__slider-addiotional');
      const sliderPatternsAdditionalInner = element.querySelector('.s-patterns__slider-addiotional._inner') || element.closest('.s-patterns__slider-addiotional._inner');

      const sliderPatternGalleryMain = document.querySelector('.s-pattern__gallery-main') || element.closest('.s-pattern__gallery-main');
      const sliderPatternGalleryThumbs = document.querySelector('.s-pattern__gallery-thumbs') || element.closest('.s-pattern__gallery-thumbs');

      const navNextBtn = element.querySelector('.swiper-button-next');
      const navPrevBtn = element.querySelector('.swiper-button-prev');

      if (sliderOrderCard) {
        const sliderSection = document.querySelector('.section__list');

        const observer = new MutationObserver(mutationRecords => {
          const oldClassList = mutationRecords[0].oldValue.split(' ');
          if (oldClassList.includes('is-loading')) {
            const sliderList = document.querySelectorAll('.order-userpage__swiper');
            sliderList.forEach(newSlider => {
              new Swiper(newSlider, {
              spaceBetween: 10,
              breakpoints: {
                1: {
                    slidesPerView: 3,
                },
                769: {
                  slidesPerView: 4,
                },
                1025: {
                  slidesPerView: 3,
                },
                1919: {
                  slidesPerView: 4,
                }
                }
              })
            })
          }
        });
  
        observer.observe(sliderSection, {
          attributes: true,
          attributeOldValue: true,
        });
      }

      new Swiper(sliderPromo, {
          slidesPerView: 1,
          spaceBetween: 8,
          pagination: {
              el: ".swiper-pagination",
          },
          loop: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          observer: true,
          observeParents: true,
          preventClicks: false,
          preventClicksPropagation: false,
          preventInteractionOnTransition: false
      });

      new Swiper(sliderVideoTutorials, {
          breakpoints: {
              1: {
                  slidesPerView: 2,
                  spaceBetween: 12,
              },
              576: {
                  slidesPerView: 2,
                  spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1439: {
                  slidesPerView: 4,
                  spaceBetween: 20,
              },
          },
          navigation: {
              nextEl: navNextBtn,
              prevEl: navPrevBtn,
          },
      });

      new Swiper(sliderBlog, {
          breakpoints: {
              1: {
                  slidesPerView: 2,
                  spaceBetween: 12,
              },
              576: {
                  slidesPerView: 3,
                  spaceBetween: 20,
              },
              1439: {
                  slidesPerView: 4,
                  spaceBetween: 20,
              },
          },
          navigation: {
              nextEl: navNextBtn,
              prevEl: navPrevBtn,
          },
      });

      new Swiper(sliderStories, {
          breakpoints: {
              1: {
                  slidesPerView: 1,
                  spaceBetween: 12,
              },
              576: {
                  slidesPerView: 3,
                  spaceBetween: 20,
              },
              1439: {
                  slidesPerView: 4,
                  spaceBetween: 20,
              },
          },
          navigation: {
              nextEl: navNextBtn,
              prevEl: navPrevBtn,
          },
      });

      new Swiper(sliderComment, {
          spaceBetween: 10,
          slidesPerView: 'auto',
      });

      new Swiper(sliderReviews, {
          breakpoints: {
              1: {
                  slidesPerView: 1,
                  spaceBetween: 12,
              },
              576: {
                  slidesPerView: 3,
                  spaceBetween: 20,
              },
              1439: {
                  slidesPerView: 4,
                  spaceBetween: 20,
              },
          },
          navigation: {
              nextEl: navNextBtn,
              prevEl: navPrevBtn,
          },
      });

      new Swiper(sliderVideoTutorialsPage, {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: '.s-video-tutorials-arrow-next',
          prevEl: '.s-video-tutorials-arrow-prev',
        },
        breakpoints: {
          1: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          1279: {
            slidesPerView: 3,
          },
          1919: {
            slidesPerView: 4,
          }
        }
      });

      const sliderAdditional = new Swiper(sliderPatternsAdditional, {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.s-patterns-arrow-next',
          prevEl: '.s-patterns-arrow-prev',
        },
        breakpoints: {
          1: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          767: {
            slidesPerView: 2,
          },
          1279: {
            slidesPerView: 3,
          },
          1919: {
            slidesPerView: 4,
          }
        }
      });

      const sliderAdditionalInner = new Swiper(sliderPatternsAdditionalInner, {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: '.s-category-arrow-next',
          prevEl: '.s-category-arrow-prev',
        },
        breakpoints: {
          1: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          767: {
            slidesPerView: 3,
          },
          1919: {
            slidesPerView: 3,
          }
        }
      })

      new Swiper(sliderCategory, {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: '.s-category-arrow-next',
          prevEl: '.s-category-arrow-prev',
        },
        breakpoints: {
          1: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          767: {
            slidesPerView: 2,
          },
          1279: {
            slidesPerView: 3,
          },
          1919: {
            slidesPerView: 4,
          }
        }
      });

      new Swiper(sliderOrderCard, {
        spaceBetween: 10,
        breakpoints: {
          1: {
              slidesPerView: 3,
          },
          769: {
            slidesPerView: 4,
          },
          1025: {
            slidesPerView: 3,
          },
          1919: {
            slidesPerView: 4,
          }
        }
      });

      new Swiper(sliderMasterClassInfo, {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.s-pattern-info-arrow-next',
          prevEl: '.s-pattern-info-arrow-prev',
        },
      });

      if (window.innerWidth < 576) {
        new Swiper(sliderAdvantages, {
          navigation: {
              nextEl: navNextBtn,
              prevEl: navPrevBtn,
          },
          navigation: {
            nextEl: '.s-about-custom-arrow-next',
            prevEl: '.s-about-custom-arrow-prev',
          },
        })
      }

      const sliderPatternThumbs = new Swiper(sliderPatternGalleryThumbs, {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        direction: "vertical",
        navigation: {
          nextEl: '.s-pattern__nav-arrow-next',
          prevEl: '.s-pattern__nav-arrow-prev',
        },
        breakpoints: {
          1: {
            direction: "horizontal",
            slidesPerView: "auto",
            spaceBetween: 8,
          },
          1439: {
            slidesPerView: "auto",
          }
        }
      });

      const sliderPatternMain = new Swiper(sliderPatternGalleryMain, {
        spaceBetween: 10,
        thumbs: {
          swiper: sliderPatternThumbs
        }
      });
      new Swiper(sliderPatterns, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.slider__arrow-section-next',
          prevEl: '.slider__arrow-section-prev',
        },
        pagination: {
            el: ".s-patterns__pagination",
        },
      })
  };

  const mount = () => {
      const elements = document.querySelectorAll('.swiper');
      elements.forEach(component);
  };

  document.addEventListener('DOMContentLoaded', mount);
})(window);
