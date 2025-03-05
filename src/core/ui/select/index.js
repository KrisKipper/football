(function () {
  const component = (element) => {
      if (!element) return;

      const dropdownElement = element.querySelector('.select__dropdown');
      const icon = element.querySelector('.select__toggle-icon');
      const trigger = element.querySelector('.select__trigger');
      const resultElement = element.querySelector('.select__selected-option');

      const state = {
          visibility: 'hidden',
          value: '',
      };

      const initSelectedClass = () => {
          const selectItems = element.querySelectorAll('.select__item');

          if(!selectItems) return

          selectItems.forEach(item => {
              if (item.checked) {
                  const labelElement = item.closest('.select__dropdown-item');

                  labelElement.classList.add('_active');
                  trigger.classList.add('_selected');
              }
          });
      }

      const renderVisibility = () => {
          if (state.visibility === 'shown') {
              if(dropdownElement) dropdownElement.classList.remove('_hidden');
              if(icon) icon.classList.add('_rotate');
          } else {
              if(dropdownElement)  dropdownElement.classList.add('_hidden');
              if(icon) icon.classList.remove('_rotate');
          }
      };

      const renderResult = () => {
          if (resultElement) {
              resultElement.textContent = state.value;
          } else {
              console.error('resultElement not found');
          }
      };

      const handleTogglerClick = (e) => {
          if(element.classList.contains('_disabled')) return;
          state.visibility = state.visibility === 'hidden' ? 'shown' : 'hidden';
          renderVisibility();
      };

      const handleValueChange = (e) => {
          e.stopPropagation();
          const target = e.target;

          const labelElement = target.closest('.select__dropdown-item');
          const labelElemets = element.querySelectorAll('.select__dropdown-item');
          const targetValue = labelElement ? labelElement.textContent : null;
          state.value = targetValue;
          state.visibility = 'hidden';

          trigger.classList.add('_selected');

          labelElemets.forEach(label => {
              label.classList.remove('_active');
              label.classList.remove('_checked');
          })

          labelElement.classList.add('_active');
          if(element.classList.contains('_type_check')) {
              labelElement.classList.add('_checked');
          }

          renderVisibility();
          renderResult();
          //диспатч
          const event = new CustomEvent('itemSelected', { detail: { value: targetValue } });
          element.dispatchEvent(event);
      };

      const handleIconClick = (e) => {
          e.stopPropagation();
          state.visibility = 'shown';
          renderVisibility();
      };

      const syncState = () => {
          const labels = element.querySelectorAll('.select__dropdown-item');

          labels.forEach((label) => {
              const input = label.querySelector('input');
              const targetValue = label ? label.textContent : null;

              if (!input.checked) {
                  return;
              }

              state.value = targetValue;
          })
      };

      const handleInit = () => {
          syncState();
          if(state.value) renderResult();
      };

      const onManualRefresh = () => {
          state.value = '';

          syncState();
          renderResult();
      };

      const handleOutsideClick = (e) => {
          const target = e.target;

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
        if(dropdownElement)  dropdownElement.addEventListener('change', handleValueChange);
        document.addEventListener('click', handleOutsideClick);
        if(icon) icon.addEventListener('click', handleIconClick);

      } catch (e) {
          console.error("Error:", e.message);
      }
      
  };

  const mount = () => {

    document.querySelectorAll('.select').forEach(component);

    const state = {
        addedVisibility: 'hidden',
        addedValue: '',
    };

    const syncState = () => {
        const labels = element.querySelectorAll('.select__dropdown-item');

        labels.forEach((label) => {
            const input = label.querySelector('input');
            const targetValue = label ? label.textContent : null;

            if (!input.checked) {
                return;
            }

            state.addedValue = targetValue;
        })
    };

    const renderResult = () => {
        if (resultElement) {
            resultElement.textContent = state.addedValue;
        } else {
            console.error('resultElement not found');
        }
    };

    const onManualRefresh = () => {
        state.addedValue = '';

        syncState();
        renderResult();
    };

    const addedRenderVisibility = (dropdown) => {
        if (state.addedVisibility === 'shown') {
            if(dropdown) dropdown.classList.remove('_hidden');
            //if(icon) icon.classList.add('_rotate');
        } else {
            if(dropdown)  dropdown.classList.add('_hidden');
            //if(icon) icon.classList.remove('_rotate');
        }
    }

    const handleAddedOutsideClick = (e) => {
        const target = e.target;

        if (!target.closest('.select') && state.addedVisibility === 'shown') {
            state.addedVisibility = 'hidden';
            addedRenderVisibility();
        }
    };

    const renderAddedResult = (addedElement) => {
        if (addedElement) {
          addedElement.textContent = state.addedValue;
        } else {
            console.error('resultElement not found');
        }
    };

    const addedHandleTogglerClick = (e) => {
        let selectDropdown = e.target.closest('.select').querySelector('.select__dropdown');
        state.addedVisibility = state.addedVisibility === 'hidden' ? 'shown' : 'hidden';
        addedRenderVisibility(selectDropdown);
    };

    const handleAddedValueChange = (e) => {
        e.stopPropagation();
        const target = e.target;

        const selectDropdown = target.closest('.select').querySelector('.select__dropdown');
        const labelElement = target.closest('.select__dropdown-item');
        const labelElemets = selectDropdown.querySelectorAll('.select__dropdown-item');
        const selectTrigger = target.closest('.select').querySelector('.select__trigger');
        const addedElement = selectTrigger.querySelector('.select__selected-option');
        const targetValue = labelElement ? labelElement.textContent : null;

        state.addedValue = targetValue;
        state.addedVisibility = 'hidden';

        selectTrigger.classList.add('_selected');

        labelElemets.forEach(label => {
            label.classList.remove('_active');
            label.classList.remove('_checked');
        })

        labelElement.classList.add('_active');

        addedRenderVisibility(selectDropdown);
        renderAddedResult(addedElement);

        //диспатч
        const event = new CustomEvent('itemSelected', { detail: { value: targetValue } });
        target.closest('.select').dispatchEvent(event);
    }

    let observer = new MutationObserver(mutationRecords => {
        let addedElements = mutationRecords[0].addedNodes
        if (addedElements.length) {
            addedElements.forEach(added => {
                if (!(added instanceof HTMLElement)) return;
                let addedSelects = added.querySelectorAll('.select._mob-dropdown_top');
                addedSelects.forEach((addedSelect) => {
                addedSelect.addEventListener('select:manual:refresh', onManualRefresh);
                addedSelect.addEventListener('click', addedHandleTogglerClick);
                let addedDropdownElement = addedSelect.querySelector('.select__dropdown');
                if(addedDropdownElement)  addedDropdownElement.addEventListener('change', handleAddedValueChange);
                document.addEventListener('click', handleAddedOutsideClick);
                })
            })
        }
    })

    observer.observe(document.querySelector('.body'), {
    childList: true,
    subtree: true,
    })
};

    const selectObserver = () => {
        let observer = new MutationObserver(mutationRecords => {
            let addedElements = mutationRecords[0].addedNodes
            if (addedElements.length) {
                addedElements.forEach(added => {
                    if (!(added instanceof HTMLElement)) return;
                    let addedSelects = added.querySelectorAll('.select._mob-dropdown_top');
                    addedSelects.forEach((addedSelect) => {
                    addedSelect.addEventListener('select:manual:refresh', onManualRefresh);
                    addedSelect.addEventListener('click', addedHandleTogglerClick);
                    let addedDropdownElement = addedSelect.querySelector('.select__dropdown');
                    if(addedDropdownElement)  addedDropdownElement.addEventListener('change', handleAddedValueChange);
                    document.addEventListener('click', handleAddedOutsideClick);
                    })
                })
            }
        })
    
        observer.observe(document.querySelector('.body'), {
        childList: true,
        subtree: true,
        })
    }

    window.app.addComponent('selectObserver', selectObserver);

  document.addEventListener('DOMContentLoaded', mount);
})();
