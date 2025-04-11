(function () {
  const component = (element) => {
      if (!element) return;
      const cookie = element;
      const button = cookie.querySelector('[data-button="cookie"]');
      function getCookie(name) {
        const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      function setCookie(name, value, options) {
        options = options || {};
        let expires = options.expires;
        if (typeof expires == "number" && expires) {
          let d = new Date();
          d.setTime(d.getTime() + expires * 1000);
          expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
          options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        let updatedCookie = name + "=" + value;
        for (let propName in options) {
          updatedCookie += "; " + propName;
          let propValue = options[propName];
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
      const CookiesBlockOk = cookie.querySelector('.cookie__button');
      const options = {
        expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365)
      };
      CookiesBlockOk.addEventListener('click', function () {
        setCookie('cookie_modal', 1, options);
        cookie.classList.remove('visible');
      });
  };

  const mount = () => {
      document.querySelectorAll('.cookie').forEach(component);
  };

  document.addEventListener('DOMContentLoaded', mount);
})();
