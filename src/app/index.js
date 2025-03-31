"use strict";

(function (window) {
    window.app = {
        components: {},

        isDev() {
            return /^localhost/.test(window.location.host);
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
//=require ../core/ui/header/index.js
//=require ../core/ui/swiper/index.js
//=require ../core/ui/card-year/index.js
//=require ../core/ui/card-faq/index.js
//=require ../core/ui/card-trainer/index.js
//=require ../core/ui/radio-accordion/index.js



