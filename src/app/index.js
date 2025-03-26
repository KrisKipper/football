"use strict";

(function (window) {
    window.app = {
        components: {},

        isDev() {
            return /^localhost/.test(window.location.host);
        },

        getIcon(iconName) {
            return window.app.isDev() ? `/assets/icons/default/sprite.svg#${iconName}` : `/local/templates/en-grasser/public/assets/icons/default/sprite.svg#${iconName}`;
        },

        getActualImage(href) {
            return window.app.isDev() ? `/assets/${href}` : `/local/templates/en-grasser/public/assets/${href}`;
        },

        closeModal(id) {
            bootstrap.Modal.getInstance(`#${id}`).hide();
        },

        openModal(id) {
            const myModal = new bootstrap.Modal(document.getElementById(id));

            if (myModal) {
                myModal.show();
            } else {
                console.log('Элемента с таким id не существет')
            }
        },

        addComponent(name, component) {
            this.components[name] = component;
        },

        getComponent(name) {
            return this.components[name];
        },

    };
})(window);

// =require ../core/config/js/index.js
// =require ../core/lib/js/index.js
//=require ../core/ui/input-mask/index.js
//=require ../core/ui/input/index.js
//=require ../core/ui/select/index.js
//=require ../core/ui/select/select.js
//=require ../core/ui/header/index.js
//=require ../core/ui/swiper/index.js
//=require ../core/ui/input-dropdown/index.js
//=require ../core/ui/card-year/index.js
//=require ../core/ui/card-faq/index.js
//=require ../core/ui/card-trainer/index.js
//=require ../core/ui/radio-accordion/index.js



