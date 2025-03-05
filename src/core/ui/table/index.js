(function () {
  
  const table = (element) => {
    if (!element) return;

    const wrapper = document.createElement('div');
    wrapper.classList = 'table-wrapper';
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  const onLoad = () => {
    const tables = document.querySelectorAll('table');
    tables.forEach((element) => {
      table(element);
    });
  }

  document.addEventListener('DOMContentLoaded', onLoad);
})();