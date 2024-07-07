window.onload = function() {
    var itemInput = document.getElementById('itemInput');
    var addItemButton = document.getElementById('addItem');
    var clearListButton = document.getElementById('clearList');
    var shoppingList = document.getElementById('shoppingList');

    var items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function renderList() {
        shoppingList.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement('li');
            li.textContent = items[i].name;
            if (items[i].purchased) {
                li.classList.add('purchased');
            }
            li.onclick = (function(index) {
                return function() {
                    items[index].purchased = !items[index].purchased;
                    localStorage.setItem('shoppingList', JSON.stringify(items));
                    renderList();
                };
            })(i);
            li.ondblclick = (function(index) {
                return function() {
                    var newName = prompt('Edit item name:', items[index].name);
                    if (newName) {
                        items[index].name = newName;
                        localStorage.setItem('shoppingList', JSON.stringify(items));
                        renderList();
                    }
                };
            })(i);
            shoppingList.appendChild(li);
        }
    }

    addItemButton.onclick = function() {
        var itemName = itemInput.value;
        if (itemName !== '') {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            localStorage.setItem('shoppingList', JSON.stringify(items));
            renderList();
        }
    };

    clearListButton.onclick = function() {
        items = [];
        localStorage.setItem('shoppingList', JSON.stringify(items));
        renderList();
    };

    renderList();
};
