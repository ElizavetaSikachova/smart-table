export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            const select = elements[elementName];
            if (!select) return;
            
            const firstOption = select.firstElementChild;
            select.innerHTML = '';
            
            if (firstOption && firstOption.value === '') {
                select.appendChild(firstOption);
            }

            Object.entries(indexes[elementName]).forEach(([id, name]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = name;
                select.appendChild(option);
            });
        });
    };

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent?.querySelector('input');
            if (input) {
                input.value = '';
                const fieldName = action.dataset?.field || parent?.dataset?.field;
                if (fieldName) {
                    state[fieldName] = '';
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные, используя компаратор (теперь через сервер)
        const filter = {};
        
        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element && ['INPUT', 'SELECT'].includes(element.tagName) && element.value) {
                filter[`filter[${element.name}]`] = element.value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}