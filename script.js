window.onload = () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const clearListButton = document.getElementById('clearList');
    const shoppingList = document.getElementById('shoppingList');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            li.onclick = () => {
                item.purchased = !item.purchased;
                localStorage.setItem('shoppingList', JSON.stringify(items));
                renderList();
            };
            li.ondblclick = () => {
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                    item.name = newName;
                    localStorage.setItem('shoppingList', JSON.stringify(items));
                    renderList();
                }
            };
            shoppingList.appendChild(li);
        });
    };

    addItemButton.onclick = () => {
        const itemName = itemInput.value;
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            localStorage.setItem('shoppingList', JSON.stringify(items));
            renderList();
        }
    };

    clearListButton.onclick = () => {
        items = [];
        localStorage.setItem('shoppingList', JSON.stringify(items));
        renderList();
    };

    renderList();
};
