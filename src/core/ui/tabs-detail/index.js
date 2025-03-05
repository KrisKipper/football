(function () {
  
  const tabs = (element) => {
    if (!element) return;
    element.addEventListener('click', function() {
            
      const tabButtons = document.querySelectorAll(`[data-tab-button]`);
      const containers = document.querySelectorAll(`[data-tab-container]`);
      const currentTab = element.dataset.tabButton;
      const isMobile =  1025 >= window.innerWidth 

      if (this.classList.contains('_status-active') && isMobile) {
        document.querySelectorAll(`[data-tab-button=${currentTab}]`).forEach(button => {
          button.classList.remove('_status-active');
        })
        document.querySelector(`[data-tab-container=${currentTab}]`).classList.remove('active');
        return;
      }

      tabButtons.forEach(button => button.classList.remove('_status-active'));
      containers.forEach(container => container.classList.remove('active'))

      tabButtons.forEach(button => {
        if (button.dataset.tabButton === this.dataset.tabButton)
        button.classList.add('_status-active')
      });

      document.querySelector(`[data-tab-container=${this.dataset.tabButton}]`).classList.add('active')
    })
  }

  const onLoad = () => {
    const tabElements = document.querySelectorAll('[data-tab-button]');
    tabElements.forEach((element) => {
      tabs(element);
    });
  }

  document.addEventListener('DOMContentLoaded', onLoad);
})();