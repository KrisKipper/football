(function (window) {
  const select = (element) => {
    if (!element) {
      return;
    }

    const select2Container = element.parentNode.parentNode.parentNode;

    if (select2Container.classList.contains('_chose-type')) {
      $(element).select2({
        placeholder: 'Выберите тип',
        allowClear: true,
        width: 'resolve',
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent(),
      });
    } else {
      $(element).select2({
        width: 'resolve',
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent(),
      });
    }

    function formatState(state) {
      if (!state.id) {
        return state.text;
      }

      if (state.id === 'type') {
        return $(
          '<span class="select__title-option">' + state.text + '</span>'
        );
      }

      var $state = $('<span><span></span></span>');

      $state.find('span').addClass('select-filter-dropdown').text(state.text);

      return $state;
    }

    window.app.components.singleSelect = select;
  };

  const onLoad = () => {
    const selectElements = document.querySelectorAll('.jquery-select-single');
    selectElements.forEach((element) => {
      select(element);
    });
  };

  document.addEventListener('DOMContentLoaded', onLoad);
})(window);

(function (window) {
  const select = (element) => {
    if (!element) {
      return;
    }
    const select2Container = element.parentNode.parentNode.parentNode;
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
        dropdownCssClass: 'select-multiple',
      });
    } else {
      $(element).select2({
        width: 'resolve',
        closeOnSelect: false,
        // minimumResultsForSearch: -1,
        templateResult: formatState,
        dropdownParent: $(element).parent().parent().parent().parent().parent(),
        multiple: true,
        dropdownCssClass: 'select-multiple',
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

    let selectionTitle = element.nextElementSibling.querySelector(
      '.select2-selection__rendered'
    );
    let selectContainer = element.nextElementSibling.querySelector(
      '.select2-selection--multiple'
    );
    let arr = [];

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
      let ariaExpandedValue = selectContainer.getAttribute('aria-expanded');
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

  const onLoad = () => {
    const selectElements = document.querySelectorAll('.jquery-select-multiple');
    selectElements.forEach((element) => {
      select(element);
      // window.app.setObserver(element, select);
    });
  };

  window.app.components.multipleSelect = select;

  document.addEventListener('DOMContentLoaded', onLoad);
})(window);

(function (window) {
  const selectContainer = (element) => {
    if (!element) {
      return;
    }

    let container = element.querySelector('label');
    let template = element.querySelector('.select__copy-template');

    function deleteSelect(e) {
      let removedContainer = e.target.closest('.select__container');
      removedContainer.remove();
    }

    function addSelect(e) {
      e.stopImmediatePropagation();
      let clone = document.importNode(template.content.firstElementChild, true);
      container.appendChild(clone);

      window.app.components.singleSelect(
        clone.querySelector('.jquery-select-single')
      );
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.select__signature button')) {
        addSelect(e);
      } else if (e.target.matches('.select__container img')) {
        deleteSelect(e);
      }
    });
  };

  const onLoad = () => {
    const selectContainerElements = document.querySelectorAll('.select._logic');

    selectContainerElements.forEach((element) => {
      selectContainer(element);
    });
  };

  document.addEventListener('DOMContentLoaded', onLoad);
})(window);
