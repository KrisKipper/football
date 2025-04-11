"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function (window) {
  window.app = {
    components: {},
    isDev: function isDev() {
      return /^localhost/.test(window.location.host);
    },
    closeModal: function closeModal(id) {
      bootstrap.Modal.getInstance("#".concat(id)).hide();
    },
    openModal: function openModal(id) {
      var myModal = new bootstrap.Modal(document.getElementById(id));
      if (myModal) {
        myModal.show();
      } else {
        console.log('Элемента с таким id не существет');
      }
    },
    addComponent: function addComponent(name, component) {
      this.components[name] = component;
    },
    getComponent: function getComponent(name) {
      return this.components[name];
    }
  };
})(window);
window.openModal = function (id) {
  var modalElement = document.getElementById(id);
  if (modalElement) {
    var myModal = new bootstrap.Modal(modalElement);
    myModal.show();
  } else {
    console.error("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441 id \"".concat(id, "\" \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442."));
  }
};
window.closeModal = function (id) {
  var modal = bootstrap.Modal.getInstance("#".concat(id));
  if (modal) {
    modal.hide();
  } else {
    console.error("\u041C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E \u0441 id \"".concat(id, "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E."));
  }
};
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var breakpoints = {
    xxl: 1919,
    xl: 1439,
    lg: 1279,
    md: 991,
    sm: 575
  };
  var events = {}; // кастомные события

  window.app.config = {
    events: events,
    breakpoints: breakpoints
    // ...
  };
})(window);
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var checkResponse = function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status));
  };
  var checkResponseSuccess = function checkResponseSuccess(res) {
    if (res && res.success) {
      return res;
    }
    return Promise.reject("\u041E\u0442\u0432\u0435\u0442 \u043D\u0435 success: ".concat(res));
  };
  var buildHttpClient = function buildHttpClient(baseUrl) {
    return function (endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch("".concat(baseUrl).concat(endpoint), options).then(checkResponse).then(checkResponseSuccess);
    };
  };
  var setObserver = function setObserver(element, handleObserve) {
    var manualConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = _objectSpread({
      childList: true
    }, manualConfig);
    var observer = new MutationObserver(function () {
      return handleObserve(element);
    });
    observer.observe(element, config);
  };
  var findAncestorsByClassName = function findAncestorsByClassName(el, className) {
    var stopElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var ancestorEls = [];
    var currentParent = el.parentElement;
    if (!currentParent) {
      return ancestorEls;
    }
    while (currentParent !== null && currentParent !== stopElement) {
      if (currentParent.classList.contains(className)) {
        ancestorEls = [].concat(_toConsumableArray(ancestorEls), [currentParent]);
      }
      currentParent = currentParent.parentElement;
    }
    return ancestorEls;
  };
  var findAncestorByClassName = function findAncestorByClassName(el, className) {
    var ancestorEl = el.parentElement;
    while (!ancestorEl.classList.contains(className)) {
      ancestorEl = ancestorEl.parentElement;
      if (!ancestorEl) {
        return null;
      }
    }
    return ancestorEl;
  };
  var buildComponentLogger = function buildComponentLogger(componentName) {
    return function (text) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var msg = context ? "".concat(componentName, ":").concat(context, ":").concat(text) : "".concat(componentName, ":").concat(text);
      console.debug(msg);
      if (data) {
        console.dir(data);
      }
    };
  };
  var debounce = function debounce(callee, timeoutMs) {
    return function perform() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(function () {
        return callee.apply(void 0, args);
      }, timeoutMs);
    };
  };
  var throttle = function throttle(callee, timeout) {
    var timer = null;
    return function perform() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (timer) return;
      timer = setTimeout(function () {
        callee.apply(void 0, args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  };
  window.app.lib = {
    setObserver: setObserver,
    findAncestorsByClassName: findAncestorsByClassName,
    findAncestorByClassName: findAncestorByClassName,
    buildComponentLogger: buildComponentLogger,
    debounce: debounce,
    throttle: throttle,
    checkResponse: checkResponse,
    checkResponseSuccess: checkResponseSuccess,
    buildHttpClient: buildHttpClient
  };
})(window);
(function (window) {
  var dateInput = document.querySelector('[data-mask="date"]');
  var component = function component(element) {
    if (!element) {
      return;
    }
    var formatMobilePhone = {
      mask: '+{7} 000 000 00 00'
    };
    var formatINN = {
      mask: '0000000000'
    };
    var formatNumber = {
      mask: Number
    };
    var formatDate = {
      mask: Date,
      pattern: 'm/`d/`Y',
      autofix: true,
      format: function format(date) {
        return date.toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      },
      parse: function parse(str) {
        var yearMonthDay = element.getAttribute('value').split('/');
        return new Date(yearMonthDay[2], yearMonthDay[0] - 1, yearMonthDay[1]);
      },
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
          placeholderChar: 'D'
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
          placeholderChar: 'M'
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2050,
          // maxLength: 4, 
          placeholderChar: 'Y'
        }
      },
      lazy: false
    };
    var formatEmail = {
      mask: /^\S*@?\S*$/
    };
    var formatText = {
      mask: /^[A-Za-zА-Яа-я\s]*$/
    };
    function applyMask() {
      if (!element.hasAttribute('data-mask')) {
        return;
      }
      var maskType = element.getAttribute('data-mask');
      var mask;
      switch (maskType) {
        case 'mobile-phone':
          mask = IMask(element, formatMobilePhone);
          break;
        case 'inn':
          mask = IMask(element, formatINN);
          break;
        case 'number':
          mask = IMask(element, formatNumber);
          break;
        case 'date':
          mask = IMask(element, formatDate);
          element.addEventListener('focus', function () {
            mask.updateOptions({
              lazy: false,
              pattern: 'm/d/Y',
              format: function format(date) {
                return date.toLocaleString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });
              },
              parse: function parse(str) {
                var yearMonthDay = str.split('/');
                return new Date(yearMonthDay[2], yearMonthDay[0] - 1, yearMonthDay[1]);
              },
              blocks: {
                d: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 31,
                  maxLength: 2,
                  placeholderChar: 'D'
                },
                m: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 12,
                  maxLength: 2,
                  placeholderChar: 'M'
                },
                Y: {
                  mask: IMask.MaskedRange,
                  from: 1900,
                  to: 2050,
                  maxLength: 4,
                  placeholderChar: 'Y'
                }
              }
            });
          }, true);
          element.addEventListener('blur', function () {
            mask.updateOptions({
              lazy: false
            });
          }, true);
          break;
        case 'email':
          mask = IMask(element, formatEmail);
          break;
        case 'text':
          mask = IMask(element, formatText);
          break;
        default:
          break;
      }
    }
    try {
      applyMask();
    } catch (e) {
      console.log(e.message);
    }
  };
  var mount = function mount() {
    var elements = document.querySelectorAll('input');
    elements.forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function () {
  var component = function component(element) {
    if (!element) return;
    var inputField = element.querySelector('.input__field');
    var input = element.querySelector('.input__field-input');
    var crossPromoBtn = element.querySelector('.input__reset-button');
    var removeErrorClass = function removeErrorClass() {
      return element.classList.remove('_error');
    };
    var removeActiveStyles = function removeActiveStyles() {
      if (input) {
        input.value = "";
      }
      element.classList.remove('_active');
      element.classList.remove('_applied');
    };
    if (crossPromoBtn) {
      crossPromoBtn.addEventListener('click', function () {
        removeErrorClass();
        removeActiveStyles();
      });
    }
    if (inputField) inputField.addEventListener('input', removeErrorClass);
    if (element.dataset.type === 'password') {
      var toggler = element.querySelector('.input__password-toggler');
      if (!input || !toggler) return;
      element.classList.toggle('_filled', !!input.value);
      var togglePasswordVisibility = function togglePasswordVisibility() {
        input.type = input.type === 'password' ? 'text' : 'password';
        toggler.innerHTML = "<svg class=\"icon _size_sm input__password-icon\"><use xlink:href=\"".concat(window.app.getIcon(input.type === 'password' ? 'password-unlock' : 'password-lock'), "\"></use></svg>");
      };
      var mutePassword = function mutePassword() {
        input.type = 'password';
        toggler.innerHTML = "<svg class=\"icon _size_sm input__password-icon\"><use xlink:href=\"".concat(window.app.getIcon('password-unlock'), "\"></use></svg>");
      };
      var updateStyles = function updateStyles(e) {
        if (e.target.tagName === 'INPUT') {
          element.classList.toggle('_focus', input === document.activeElement);
          element.classList.toggle('_filled', !!input.value);
        }
      };
      toggler.addEventListener('click', togglePasswordVisibility);
      document.addEventListener('focus', function (e) {
        return updateStyles(e);
      });
      document.addEventListener('blur', function (e) {
        return updateStyles(e);
      });
      document.addEventListener('input', function (e) {
        return updateStyles(e);
      });
      if (document.querySelector('.s-profile__edit-button') || document.querySelector('.s-profile__edit-button')) {
        var editBtns = document.querySelectorAll('.s-profile__edit-button');
        editBtns.forEach(function (editBtn) {
          editBtn.addEventListener('click', mutePassword);
        });
      }
      //updateStyles();
    }
    if (element.classList.contains('_type_search')) {
      var searchButton = element.querySelector('.input__search-button');
      var crossButton = element.querySelector('.input__cross-button');
      if (!input || !searchButton || !crossButton) return;
      var addActiveStyles = function addActiveStyles() {
        if (input.value) {
          element.classList.add('_active');
          element.classList.remove('_dropdown-close');
        } else {
          element.classList.remove('_active');
          element.classList.remove('_dropdown-close');
        }
      };
      var handleOutsideClick = function handleOutsideClick(e) {
        var target = e.target;
        if (!element.contains(target)) {
          element.classList.add('_dropdown-close');
        }
      };
      try {
        if (searchButton) searchButton.addEventListener('click', addActiveStyles);
        if (input) input.addEventListener('input', addActiveStyles);
        if (crossButton) crossButton.addEventListener('click', removeActiveStyles);
        document.addEventListener('click', handleOutsideClick);
      } catch (e) {
        console.error("Error:", e.message);
      }
    }
    if (element.classList.contains('_type_promo')) {
      var toggleStyles = function toggleStyles() {
        element.classList.toggle('_active', !!inputField.value);
      };
      inputField.addEventListener('input', toggleStyles);
    }
  };
  var mount = function mount() {
    document.querySelectorAll('.input').forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})();
(function () {
  var component = function component(element) {
    if (!element) return;
    document.querySelectorAll('a').forEach(function (link) {
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
    });
    var burgerButton = element.querySelector('.header__button');
    var navItems = element.querySelectorAll('.header__nav-item');
    try {
      if (burgerButton) {
        burgerButton.addEventListener('click', function () {
          element.classList.toggle('_active');
        });
      }
      navItems.forEach(function (item) {
        item.addEventListener('click', function () {
          if (window.innerWidth < 1025) {
            element.classList.remove('_active');
          }
          var href = item.dataset.href || '';
          var hashIndex = href.indexOf('#');
          var anchor = hashIndex !== -1 ? href.substring(hashIndex) : '';
          window.location.href = "index.html".concat(anchor);
        });
      });
    } catch (e) {
      console.error("Error:", e.message);
    }
  };
  var mount = function mount() {
    document.querySelectorAll('.header').forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})();
(function (window) {
  var windowWidth = window.innerWidth;
  var component = function component(element) {
    if (!element) {
      return;
    }
    var sliderProgress = element.querySelector('.s-progress__swiper') || element.closest('.s-progress__swiper');
    var sliderTrainers = element.querySelector('.s-trainers__swiper') || element.closest('.s-trainers__swiper');
    var navNextBtn = element.querySelector('.swiper-button-next');
    var navPrevBtn = element.querySelector('.swiper-button-prev');
    var fractionPagination = element.querySelector('.swiper-pagination');
    var thumbsSchedule = element.querySelector('.s-schedule__swiper-thumbs') || element.closest('.s-schedule__swiper-thumbs');
    var sliderSchedule = element.querySelector('.s-schedule__swiper') || element.closest('.s-schedule__swiper');
    var thumbsScheduleSwiper = new Swiper(thumbsSchedule, {
      slidesPerView: 6,
      thumbs: {
        swiper: swiperSchedule
      }
    });
    var swiperSchedule = new Swiper(sliderSchedule, {
      spaceBetween: 10,
      slidesPerView: 1,
      autoHeight: true,
      thumbs: {
        swiper: thumbsScheduleSwiper
      }
    });
    var swiperProgress = new Swiper(sliderProgress, {
      breakpoints: {
        860: {
          spaceBetween: 20,
          slidesPerView: 1
        },
        861: {
          spaceBetween: 20,
          slidesPerView: 3
        }
      },
      centeredSlides: true,
      pagination: {
        el: fractionPagination,
        type: "fraction"
      },
      loop: true,
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
    var swiperTrainers = new Swiper(sliderTrainers, {
      slidesPerView: 1,
      spaceBetween: 40,
      breakpoints: {
        860: {
          spaceBetween: 0
        },
        861: {
          spaceBetween: 40
        }
      },
      pagination: {
        el: fractionPagination,
        type: "fraction"
      },
      loop: true,
      autoHeight: true,
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
  };
  var mount = function mount() {
    var elements = document.querySelectorAll('.swiper-container');
    elements.forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function () {
  var tabs = function tabs(element) {
    if (!element) return;
    var button = element.querySelector(".card-year__button");
    button.addEventListener('click', function () {
      var isActive = element.classList.contains('active');
      document.querySelectorAll('.card-year').forEach(function (card) {
        card.classList.remove('active');
      });
      if (!isActive) {
        element.classList.add('active');
      }
    });
  };
  var onLoad = function onLoad() {
    document.querySelectorAll('.card-year').forEach(function (element) {
      tabs(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})();
(function () {
  var tabs = function tabs(element) {
    if (!element) return;
    var button = element.querySelector(".card-faq__button");
    button.addEventListener('click', function () {
      var isActive = element.classList.contains('active');
      document.querySelectorAll('.card-faq').forEach(function (card) {
        card.classList.remove('active');
      });
      if (!isActive) {
        element.classList.add('active');
      }
    });
  };
  var onLoad = function onLoad() {
    document.querySelectorAll('.card-faq').forEach(function (element) {
      tabs(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})();
(function () {
  var tabs = function tabs(element) {
    if (!element) return;
    var openButton = element.querySelector(".card-trainer__button");
    var closeButton = element.querySelector(".card-trainer__button-close");
    var sliderTrainers = element.querySelector('.s-trainers__swiper') || element.closest('.s-trainers__swiper');
    var cards = document.querySelectorAll('.card-trainer');
    var isActive = element.classList.contains('active');
    openButton.addEventListener('click', function () {
      cards.forEach(function (card) {
        if (!isActive) {
          card.classList.add('active');
        }
      });
      if (sliderTrainers) {
        sliderTrainers.classList.add('active');
      }
    });
    closeButton.addEventListener('click', function () {
      element.classList.remove('active');
      cards.forEach(function (card) {
        if (!isActive) {
          card.classList.remove('active');
        }
      });
      if (sliderTrainers) {
        sliderTrainers.classList.remove('active');
      }
    });
  };
  var onLoad = function onLoad() {
    document.querySelectorAll('.card-trainer').forEach(function (element) {
      tabs(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})();
(function () {
  var tabs = function tabs(element) {
    if (!element) return;
    var header = element.querySelector(".radio-accordion__header");
    header.addEventListener('click', function () {
      var isActive = element.classList.contains('active');
      if (!isActive) {
        element.classList.add('active');
      }
    });
  };
  var onLoad = function onLoad() {
    document.querySelectorAll('.radio-accordion').forEach(function (element) {
      tabs(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})();
(function () {
  var component = function component(element) {
    if (!element) return;
    var cookie = element;
    var button = cookie.querySelector('[data-button="cookie"]');
    function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    function setCookie(name, value, options) {
      options = options || {};
      var expires = options.expires;
      if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }
      value = encodeURIComponent(value);
      var updatedCookie = name + "=" + value;
      for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += "=" + propValue;
        }
      }
      document.cookie = updatedCookie;
    }
    setTimeout(function () {
      // if (!getCookie('cookie_modal')) {
      //   cookie.classList.add('visible');
      // }
      cookie.classList.add('visible');
    }, 2000);
    button.addEventListener('click', function () {
      cookie.classList.remove('visible');
    });
    var CookiesBlockOk = cookie.querySelector('.cookie__button');
    var options = {
      expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365)
    };
    CookiesBlockOk.addEventListener('click', function () {
      setCookie('cookie_modal', 1, options);
      cookie.classList.remove('visible');
    });
  };
  var mount = function mount() {
    document.querySelectorAll('.cookie').forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})();
(function () {
  var component = function component(formElement) {
    var nameInput = formElement.querySelector('#name');
    var phoneInput = formElement.querySelector('#mobile-phone');
    var childNameInput = formElement.querySelector('#childName');
    var ageRadioGroup = formElement.querySelector('input[name="age"]:checked');
    var districtRadioGroup = formElement.querySelector('input[name="district"]:checked');
    var politicCheckbox = formElement.querySelector('#politicForm');
    var submitButton = formElement.querySelector('.form__button');
    var checkFormValidity = function checkFormValidity() {
      var isNameValid = nameInput.value.trim() !== '';
      var isPhoneValid = phoneInput.value.trim() !== '' && !phoneInput.value.includes('_');
      var isChildNameValid = childNameInput.value.trim() !== '';
      var isAgeSelected = formElement.querySelector('input[name="age"]:checked') !== null;
      var isDistrictSelected = formElement.querySelector('input[name="district"]:checked') !== null;
      var isPoliticChecked = politicCheckbox.checked;
      if (isNameValid && isPhoneValid && isChildNameValid && isAgeSelected && isDistrictSelected && isPoliticChecked) {
        submitButton.classList.remove('disabled');
        submitButton.removeAttribute('disabled');
      } else {
        submitButton.classList.add('disabled');
        submitButton.setAttribute('disabled', 'disabled');
      }
    };
    nameInput.addEventListener('input', checkFormValidity);
    phoneInput.addEventListener('input', checkFormValidity);
    childNameInput.addEventListener('input', checkFormValidity);
    var radioButtons = formElement.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function (radio) {
      radio.addEventListener('change', checkFormValidity);
    });
    politicCheckbox.addEventListener('change', checkFormValidity);
    checkFormValidity();
    submitButton.addEventListener('click', function () {
      closeModal("form");
      openModal("finish");
    });
  };
  var mount = function mount() {
    document.querySelectorAll('.form').forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})();