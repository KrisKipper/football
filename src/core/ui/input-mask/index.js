(function (window) {
    const dateInput = document.querySelector('[data-mask="date"]');
    const component = (element) => {

        if (!element) {
            return;
        }

        const formatMobilePhone = {
            mask: '+{7} 000 000 00 00',
        }

        const formatINN = {
            mask: '0000000000',
        }

        const formatNumber = {
            mask: Number,
        }

        const formatDate = {
            mask: Date,
            pattern: 'm/`d/`Y',
            autofix: true,
            format: function (date) {
                return date.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
            },
            parse: function (str) {
                var yearMonthDay = element.getAttribute('value').split('/');
                return new Date(yearMonthDay[2], yearMonthDay[0]-1, yearMonthDay[1]);
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
              },
            },
            lazy: false,
            
        }

        const formatEmail = {
            mask: /^\S*@?\S*$/,
        }

        const formatText = {
            mask: /^[A-Za-zА-Яа-я\s]*$/,
        };

        function applyMask() {

            if (!element.hasAttribute('data-mask')) {
                return;
            }
            const maskType = element.getAttribute('data-mask');

            let mask;

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
                    element.addEventListener('focus', function(){
                        mask.updateOptions({ 
                            lazy: false,
                            pattern: 'm/d/Y',

                            format: function (date) {
                                return date.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            },
                            parse: function (str) {
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
                              },
                            },
                        });
                    }, true)
                    element.addEventListener('blur', function(){
                        mask.updateOptions({ lazy: false });
                    }, true)
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

    const mount = () => {
        const elements = document.querySelectorAll('input');

        elements.forEach(component);
    };

    document.addEventListener('DOMContentLoaded', mount);
})(window);
