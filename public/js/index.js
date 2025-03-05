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
    getIcon: function getIcon(iconName) {
      return window.app.isDev() ? "/assets/icons/default/sprite.svg#".concat(iconName) : "/local/templates/en-grasser/public/assets/icons/default/sprite.svg#".concat(iconName);
    },
    getActualImage: function getActualImage(href) {
      return window.app.isDev() ? "/assets/".concat(href) : "/local/templates/en-grasser/public/assets/".concat(href);
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
    var dropdownElement = element.querySelector('.select__dropdown');
    var icon = element.querySelector('.select__toggle-icon');
    var trigger = element.querySelector('.select__trigger');
    var resultElement = element.querySelector('.select__selected-option');
    var state = {
      visibility: 'hidden',
      value: ''
    };
    var initSelectedClass = function initSelectedClass() {
      var selectItems = element.querySelectorAll('.select__item');
      if (!selectItems) return;
      selectItems.forEach(function (item) {
        if (item.checked) {
          var labelElement = item.closest('.select__dropdown-item');
          labelElement.classList.add('_active');
          trigger.classList.add('_selected');
        }
      });
    };
    var renderVisibility = function renderVisibility() {
      if (state.visibility === 'shown') {
        if (dropdownElement) dropdownElement.classList.remove('_hidden');
        if (icon) icon.classList.add('_rotate');
      } else {
        if (dropdownElement) dropdownElement.classList.add('_hidden');
        if (icon) icon.classList.remove('_rotate');
      }
    };
    var renderResult = function renderResult() {
      if (resultElement) {
        resultElement.textContent = state.value;
      } else {
        console.error('resultElement not found');
      }
    };
    var handleTogglerClick = function handleTogglerClick(e) {
      if (element.classList.contains('_disabled')) return;
      state.visibility = state.visibility === 'hidden' ? 'shown' : 'hidden';
      renderVisibility();
    };
    var handleValueChange = function handleValueChange(e) {
      e.stopPropagation();
      var target = e.target;
      var labelElement = target.closest('.select__dropdown-item');
      var labelElemets = element.querySelectorAll('.select__dropdown-item');
      var targetValue = labelElement ? labelElement.textContent : null;
      state.value = targetValue;
      state.visibility = 'hidden';
      trigger.classList.add('_selected');
      labelElemets.forEach(function (label) {
        label.classList.remove('_active');
        label.classList.remove('_checked');
      });
      labelElement.classList.add('_active');
      if (element.classList.contains('_type_check')) {
        labelElement.classList.add('_checked');
      }
      renderVisibility();
      renderResult();
      //диспатч
      var event = new CustomEvent('itemSelected', {
        detail: {
          value: targetValue
        }
      });
      element.dispatchEvent(event);
    };
    var handleIconClick = function handleIconClick(e) {
      e.stopPropagation();
      state.visibility = 'shown';
      renderVisibility();
    };
    var syncState = function syncState() {
      var labels = element.querySelectorAll('.select__dropdown-item');
      labels.forEach(function (label) {
        var input = label.querySelector('input');
        var targetValue = label ? label.textContent : null;
        if (!input.checked) {
          return;
        }
        state.value = targetValue;
      });
    };
    var handleInit = function handleInit() {
      syncState();
      if (state.value) renderResult();
    };
    var onManualRefresh = function onManualRefresh() {
      state.value = '';
      syncState();
      renderResult();
    };
    var handleOutsideClick = function handleOutsideClick(e) {
      var target = e.target;
      if (!element.contains(target) && state.visibility === 'shown') {
        state.visibility = 'hidden';
        renderVisibility();
      }
    };
    try {
      initSelectedClass();
      handleInit();
      element.addEventListener('select:manual:refresh', onManualRefresh);
      element.addEventListener('click', handleTogglerClick);
      if (dropdownElement) dropdownElement.addEventListener('change', handleValueChange);
      document.addEventListener('click', handleOutsideClick);
      if (icon) icon.addEventListener('click', handleIconClick);
    } catch (e) {
      console.error("Error:", e.message);
    }
  };
  var mount = function mount() {
    document.querySelectorAll('.select').forEach(component);
    var state = {
      addedVisibility: 'hidden',
      addedValue: ''
    };
    var syncState = function syncState() {
      var labels = element.querySelectorAll('.select__dropdown-item');
      labels.forEach(function (label) {
        var input = label.querySelector('input');
        var targetValue = label ? label.textContent : null;
        if (!input.checked) {
          return;
        }
        state.addedValue = targetValue;
      });
    };
    var renderResult = function renderResult() {
      if (resultElement) {
        resultElement.textContent = state.addedValue;
      } else {
        console.error('resultElement not found');
      }
    };
    var onManualRefresh = function onManualRefresh() {
      state.addedValue = '';
      syncState();
      renderResult();
    };
    var addedRenderVisibility = function addedRenderVisibility(dropdown) {
      if (state.addedVisibility === 'shown') {
        if (dropdown) dropdown.classList.remove('_hidden');
        //if(icon) icon.classList.add('_rotate');
      } else {
        if (dropdown) dropdown.classList.add('_hidden');
        //if(icon) icon.classList.remove('_rotate');
      }
    };
    var handleAddedOutsideClick = function handleAddedOutsideClick(e) {
      var target = e.target;
      if (!target.closest('.select') && state.addedVisibility === 'shown') {
        state.addedVisibility = 'hidden';
        addedRenderVisibility();
      }
    };
    var renderAddedResult = function renderAddedResult(addedElement) {
      if (addedElement) {
        addedElement.textContent = state.addedValue;
      } else {
        console.error('resultElement not found');
      }
    };
    var addedHandleTogglerClick = function addedHandleTogglerClick(e) {
      var selectDropdown = e.target.closest('.select').querySelector('.select__dropdown');
      state.addedVisibility = state.addedVisibility === 'hidden' ? 'shown' : 'hidden';
      addedRenderVisibility(selectDropdown);
    };
    var handleAddedValueChange = function handleAddedValueChange(e) {
      e.stopPropagation();
      var target = e.target;
      var selectDropdown = target.closest('.select').querySelector('.select__dropdown');
      var labelElement = target.closest('.select__dropdown-item');
      var labelElemets = selectDropdown.querySelectorAll('.select__dropdown-item');
      var selectTrigger = target.closest('.select').querySelector('.select__trigger');
      var addedElement = selectTrigger.querySelector('.select__selected-option');
      var targetValue = labelElement ? labelElement.textContent : null;
      state.addedValue = targetValue;
      state.addedVisibility = 'hidden';
      selectTrigger.classList.add('_selected');
      labelElemets.forEach(function (label) {
        label.classList.remove('_active');
        label.classList.remove('_checked');
      });
      labelElement.classList.add('_active');
      addedRenderVisibility(selectDropdown);
      renderAddedResult(addedElement);

      //диспатч
      var event = new CustomEvent('itemSelected', {
        detail: {
          value: targetValue
        }
      });
      target.closest('.select').dispatchEvent(event);
    };
    var observer = new MutationObserver(function (mutationRecords) {
      var addedElements = mutationRecords[0].addedNodes;
      if (addedElements.length) {
        addedElements.forEach(function (added) {
          if (!(added instanceof HTMLElement)) return;
          var addedSelects = added.querySelectorAll('.select._mob-dropdown_top');
          addedSelects.forEach(function (addedSelect) {
            addedSelect.addEventListener('select:manual:refresh', onManualRefresh);
            addedSelect.addEventListener('click', addedHandleTogglerClick);
            var addedDropdownElement = addedSelect.querySelector('.select__dropdown');
            if (addedDropdownElement) addedDropdownElement.addEventListener('change', handleAddedValueChange);
            document.addEventListener('click', handleAddedOutsideClick);
          });
        });
      }
    });
    observer.observe(document.querySelector('.body'), {
      childList: true,
      subtree: true
    });
  };
  var selectObserver = function selectObserver() {
    var observer = new MutationObserver(function (mutationRecords) {
      var addedElements = mutationRecords[0].addedNodes;
      if (addedElements.length) {
        addedElements.forEach(function (added) {
          if (!(added instanceof HTMLElement)) return;
          var addedSelects = added.querySelectorAll('.select._mob-dropdown_top');
          addedSelects.forEach(function (addedSelect) {
            addedSelect.addEventListener('select:manual:refresh', onManualRefresh);
            addedSelect.addEventListener('click', addedHandleTogglerClick);
            var addedDropdownElement = addedSelect.querySelector('.select__dropdown');
            if (addedDropdownElement) addedDropdownElement.addEventListener('change', handleAddedValueChange);
            document.addEventListener('click', handleAddedOutsideClick);
          });
        });
      }
    });
    observer.observe(document.querySelector('.body'), {
      childList: true,
      subtree: true
    });
  };
  window.app.addComponent('selectObserver', selectObserver);
  document.addEventListener('DOMContentLoaded', mount);
})();
(function (window) {
  var select = function select(element) {
    if (!element) {
      return;
    }
    var select2Container = element.parentNode.parentNode.parentNode;
    if (select2Container.classList.contains('_chose-type')) {
      $(element).select2({
        placeholder: 'Выберите тип',
        allowClear: true,
        width: 'resolve',
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent()
      });
    } else {
      $(element).select2({
        width: 'resolve',
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent()
      });
    }
    function formatState(state) {
      if (!state.id) {
        return state.text;
      }
      if (state.id === 'type') {
        return $('<span class="select__title-option">' + state.text + '</span>');
      }
      var $state = $('<span><span></span></span>');
      $state.find('span').addClass('select-filter-dropdown').text(state.text);
      return $state;
    }
    window.app.components.singleSelect = select;
  };
  var onLoad = function onLoad() {
    var selectElements = document.querySelectorAll('.jquery-select-single');
    selectElements.forEach(function (element) {
      select(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})(window);
(function (window) {
  var select = function select(element) {
    if (!element) {
      return;
    }
    var select2Container = element.parentNode.parentNode.parentNode;
    if (select2Container.classList.contains('_city')) {
      $(element).select2({
        placeholder: 'Выберите город',
        allowClear: true,
        width: 'resolve',
        closeOnSelect: false,
        minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent(),
        multiple: true,
        dropdownCssClass: 'select-multiple'
      });
    } else {
      $(element).select2({
        width: 'resolve',
        closeOnSelect: false,
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent(),
        multiple: true,
        dropdownCssClass: 'select-multiple'
      });
    }
    function formatState(state) {
      if (!state.id) {
        return state.text;
      }
      var $state = $('<span><span></span></span>');
      $state.find('span').addClass('select-filter-dropdown').text(state.text);
      return $state;
    }
    var selectionTitle = element.nextElementSibling.querySelector('.select2-selection__rendered');
    var selectContainer = element.nextElementSibling.querySelector('.select2-selection--multiple');
    var arr = [];

    // const observer = new MutationObserver(() => {
    //   let chosenOptions = selectionTitle.childElementCount;
    //   selectContainer.classList.remove('_rotation');
    //   if (chosenOptions > 1) {
    //     selectionTitle.querySelector('li').style.display = 'none';
    //     arr = [];
    //     selectContainer.querySelectorAll('li').forEach((li) => {
    //       arr.push(li.textContent);
    //     });
    //     arr = arr.slice(1).map((el) => {
    //       return el.slice(1);
    //     });
    //   }
    // });

    // const observerDropdown = new MutationObserver(() => {
    //   let ariaExpandedValue = selectContainer.getAttribute('aria-expanded');
    //   let chosenOptions = selectionTitle.childElementCount;
    //   if (ariaExpandedValue == 'true') {
    //     let options = document.querySelectorAll('.select2-results__option');
    //     options.forEach((option) => {
    //       if (arr.includes(option.querySelector('.select-filter-dropdown')?.textContent)) {
    //         option.classList.add('_chosen');
    //       }
    //       if (chosenOptions < 2)
    //         options.forEach((option) => {
    //           option.classList.remove('_chosen');
    //         });
    //     });
    //   } else {
    //   }
    // });

    function moveArrow(event) {
      var ariaExpandedValue = selectContainer.getAttribute('aria-expanded');
      if (ariaExpandedValue == 'true') {
        selectContainer.classList.add('_rotation');
      } else {
        selectContainer.classList.remove('_rotation');
      }
    }
    document.addEventListener('click', moveArrow);

    // const config = { childList: true, subtree: true };
    // const configDropdown = { attributes: true, childList: true, subtree: true };
    // observer.observe(selectionTitle, config);
    // observerDropdown.observe(selectContainer, configDropdown);
  };
  var onLoad = function onLoad() {
    var selectElements = document.querySelectorAll('.jquery-select-multiple');
    selectElements.forEach(function (element) {
      select(element);
      // window.app.setObserver(element, select);
    });
  };
  window.app.components.multipleSelect = select;
  document.addEventListener('DOMContentLoaded', onLoad);
})(window);
(function (window) {
  var selectContainer = function selectContainer(element) {
    if (!element) {
      return;
    }
    var container = element.querySelector('label');
    var template = element.querySelector('.select__copy-template');
    function deleteSelect(e) {
      var removedContainer = e.target.closest('.select__container');
      removedContainer.remove();
    }
    function addSelect(e) {
      e.stopImmediatePropagation();
      var clone = document.importNode(template.content.firstElementChild, true);
      container.appendChild(clone);
      window.app.components.singleSelect(clone.querySelector('.jquery-select-single'));
    }
    document.addEventListener('click', function (e) {
      if (e.target.matches('.select__signature button')) {
        addSelect(e);
      } else if (e.target.matches('.select__container img')) {
        deleteSelect(e);
      }
    });
  };
  var onLoad = function onLoad() {
    var selectContainerElements = document.querySelectorAll('.select._logic');
    selectContainerElements.forEach(function (element) {
      selectContainer(element);
    });
  };
  document.addEventListener('DOMContentLoaded', onLoad);
})(window);
(function () {
  var component = function component(element) {
    if (!element) return;
    var burgerButton = element.querySelector('.header__burger');
    var closeButton = element.querySelector('.header__close-icon');
    var menu = element.querySelector('.header__content');
    var searchForm = element.querySelector('.input._type_search');
    var addActiveClass = function addActiveClass() {
      menu.classList.add('active');
    };
    var removeActiveClass = function removeActiveClass() {
      menu.classList.remove('active');
    };
    try {
      if (burgerButton) burgerButton.addEventListener('click', addActiveClass);
      if (closeButton) closeButton.addEventListener('click', removeActiveClass);
    } catch (e) {
      console.error("Error:", e.message);
    }
    searchForm.addEventListener('click', function () {
      menu.classList.add('open');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.input__field-input')) {
        menu.classList.remove('open');
      }
    });
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
    var sliderPromo = element.querySelector('.s-promo__swiper') || element.closest('.s-promo__swiper');
    var sliderVideoTutorials = element.querySelector('.s-video-tutorials__swiper') || element.closest('.s-video-tutorials__swiper');
    var sliderBlog = element.querySelector('.s-blog__swiper') || element.closest('.s-blog__swiper');
    var sliderStories = element.querySelector('.s-stories__swiper') || element.closest('.s-stories__swiper');
    var sliderReviews = element.querySelector('.s-reviews__swiper') || element.closest('.s-reviews__swiper');
    var sliderComment = element.querySelector('.comment__swiper') || element.closest('.comment__swiper');
    var sliderAdvantages = element.querySelector('.s-about__swiper') || element.closest('.s-about__swiper');
    var sliderOrderCard = element.querySelector('.order-userpage__swiper') || element.closest('.order-userpage__swiper');
    var sliderVideoTutorialsPage = element.querySelector('.s-video-tutorials__slider') || element.closest('.s-video-tutorials__slider');
    var sliderMasterClassInfo = element.querySelector('.s-pattern__info-swiper') || element.closest('.s-pattern__info-swiper');
    var sliderCategory = element.querySelector('.s-category__slider') || element.closest('.s-category__slider');
    var sliderPatterns = element.querySelector('.s-patterns__slider') || element.closest('.s-patterns__slider');
    var sliderPatternsAdditional = element.querySelector('.s-patterns__slider-addiotional') || element.closest('.s-patterns__slider-addiotional');
    var sliderPatternsAdditionalInner = element.querySelector('.s-patterns__slider-addiotional._inner') || element.closest('.s-patterns__slider-addiotional._inner');
    var sliderPatternGalleryMain = document.querySelector('.s-pattern__gallery-main') || element.closest('.s-pattern__gallery-main');
    var sliderPatternGalleryThumbs = document.querySelector('.s-pattern__gallery-thumbs') || element.closest('.s-pattern__gallery-thumbs');
    var navNextBtn = element.querySelector('.swiper-button-next');
    var navPrevBtn = element.querySelector('.swiper-button-prev');
    if (sliderOrderCard) {
      var sliderSection = document.querySelector('.section__list');
      var observer = new MutationObserver(function (mutationRecords) {
        var oldClassList = mutationRecords[0].oldValue.split(' ');
        if (oldClassList.includes('is-loading')) {
          var sliderList = document.querySelectorAll('.order-userpage__swiper');
          sliderList.forEach(function (newSlider) {
            new Swiper(newSlider, {
              spaceBetween: 10,
              breakpoints: {
                1: {
                  slidesPerView: 3
                },
                769: {
                  slidesPerView: 4
                },
                1025: {
                  slidesPerView: 3
                },
                1919: {
                  slidesPerView: 4
                }
              }
            });
          });
        }
      });
      observer.observe(sliderSection, {
        attributes: true,
        attributeOldValue: true
      });
    }
    new Swiper(sliderPromo, {
      slidesPerView: 1,
      spaceBetween: 8,
      pagination: {
        el: ".swiper-pagination"
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
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
          spaceBetween: 12
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1439: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
    new Swiper(sliderBlog, {
      breakpoints: {
        1: {
          slidesPerView: 2,
          spaceBetween: 12
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1439: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
    new Swiper(sliderStories, {
      breakpoints: {
        1: {
          slidesPerView: 1,
          spaceBetween: 12
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1439: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
    new Swiper(sliderComment, {
      spaceBetween: 10,
      slidesPerView: 'auto'
    });
    new Swiper(sliderReviews, {
      breakpoints: {
        1: {
          slidesPerView: 1,
          spaceBetween: 12
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1439: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn
      }
    });
    new Swiper(sliderVideoTutorialsPage, {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: '.s-video-tutorials-arrow-next',
        prevEl: '.s-video-tutorials-arrow-prev'
      },
      breakpoints: {
        1: {
          slidesPerView: 2
        },
        767: {
          slidesPerView: 2
        },
        1279: {
          slidesPerView: 3
        },
        1919: {
          slidesPerView: 4
        }
      }
    });
    var sliderAdditional = new Swiper(sliderPatternsAdditional, {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.s-patterns-arrow-next',
        prevEl: '.s-patterns-arrow-prev'
      },
      breakpoints: {
        1: {
          slidesPerView: 2,
          spaceBetween: 12
        },
        767: {
          slidesPerView: 2
        },
        1279: {
          slidesPerView: 3
        },
        1919: {
          slidesPerView: 4
        }
      }
    });
    var sliderAdditionalInner = new Swiper(sliderPatternsAdditionalInner, {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.s-category-arrow-next',
        prevEl: '.s-category-arrow-prev'
      },
      breakpoints: {
        1: {
          slidesPerView: 2,
          spaceBetween: 12
        },
        767: {
          slidesPerView: 3
        },
        1919: {
          slidesPerView: 3
        }
      }
    });
    new Swiper(sliderCategory, {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.s-category-arrow-next',
        prevEl: '.s-category-arrow-prev'
      },
      breakpoints: {
        1: {
          slidesPerView: 2,
          spaceBetween: 12
        },
        767: {
          slidesPerView: 2
        },
        1279: {
          slidesPerView: 3
        },
        1919: {
          slidesPerView: 4
        }
      }
    });
    new Swiper(sliderOrderCard, {
      spaceBetween: 10,
      breakpoints: {
        1: {
          slidesPerView: 3
        },
        769: {
          slidesPerView: 4
        },
        1025: {
          slidesPerView: 3
        },
        1919: {
          slidesPerView: 4
        }
      }
    });
    new Swiper(sliderMasterClassInfo, {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.s-pattern-info-arrow-next',
        prevEl: '.s-pattern-info-arrow-prev'
      }
    });
    if (window.innerWidth < 576) {
      new Swiper(sliderAdvantages, _defineProperty({
        navigation: {
          nextEl: navNextBtn,
          prevEl: navPrevBtn
        }
      }, "navigation", {
        nextEl: '.s-about-custom-arrow-next',
        prevEl: '.s-about-custom-arrow-prev'
      }));
    }
    var sliderPatternThumbs = new Swiper(sliderPatternGalleryThumbs, {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesProgress: true,
      direction: "vertical",
      navigation: {
        nextEl: '.s-pattern__nav-arrow-next',
        prevEl: '.s-pattern__nav-arrow-prev'
      },
      breakpoints: {
        1: {
          direction: "horizontal",
          slidesPerView: "auto",
          spaceBetween: 8
        },
        1439: {
          slidesPerView: "auto"
        }
      }
    });
    var sliderPatternMain = new Swiper(sliderPatternGalleryMain, {
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
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.slider__arrow-section-next',
        prevEl: '.slider__arrow-section-prev'
      },
      pagination: {
        el: ".s-patterns__pagination"
      }
    });
  };
  var mount = function mount() {
    var elements = document.querySelectorAll('.swiper');
    elements.forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function () {
  var component = function component(element) {
    if (!element) return;
    var dropdown = element;
    var dropdownValue = dropdown.querySelector('.input-dropdown__input');
    var checkboxes = element.querySelectorAll('.input-dropdown__checkbox');
    var valuesArray = [];
    dropdown.addEventListener('click', function () {
      if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
      } else {
        dropdown.classList.add('open');
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.input-dropdown')) {
        dropdown.classList.remove('open');
      }
    });
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        var inputCheckbox = checkbox.querySelector('input');
        var value = checkbox.querySelector('span').textContent;
        if (inputCheckbox.checked) {
          valuesArray.push(value);
          dropdownValue.value = valuesArray;
        } else {
          var removedCheck = valuesArray.indexOf(value);
          valuesArray.splice(removedCheck, 1);
          dropdownValue.value = valuesArray;
        }
      });
    });
  };
  var mount = function mount() {
    document.querySelectorAll('.input-dropdown').forEach(component);
  };
  document.addEventListener('DOMContentLoaded', mount);
})();