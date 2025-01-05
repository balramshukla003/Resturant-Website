document.querySelectorAll(".delete").forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function () {
        const itemBox = document.getElementById("item-box");
        if (itemBox) {
            itemBox.remove();
        }
    });
});


const dishCounts = {}; // Object to keep track of each dish and its count

function addIteam(dish, price) {
    const container = document.getElementById('iteams-box');
    if (container) {
        // Increment the count for the dish
        if (dishCounts[dish]) {
            dishCounts[dish]++;
        } else {
            dishCounts[dish] = 1;
        }

        // Check if the dish is already in the list
        let existingElement = Array.from(container.children).find(
            element => element.getAttribute('data-dish') === dish
        );

        if (existingElement) {
            // If it exists, just update the count
            const dishName = existingElement.querySelector('.dish-name');
            dishName.textContent = `${dishCounts[dish]} * ${dish}`;
        } else {
            // If it doesn't exist, create a new element
            const newElement = document.createElement('div');
            newElement.style.display = 'flex';
            newElement.style.justifyContent = 'space-between';
            newElement.style.alignItems = 'center';
            newElement.setAttribute('data-dish', dish);

            const dishName = document.createElement('span');
            dishName.textContent = `${dishCounts[dish]} * ${dish}`;
            dishName.classList.add('dish-name');

            const deleteBtn = document.createElement('p');
            deleteBtn.textContent = 'X';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.onclick = () => {
                container.removeChild(newElement);
                delete dishCounts[dish]; // Remove the dish from the count object
            };

            newElement.appendChild(dishName);
            newElement.appendChild(deleteBtn);
            container.appendChild(newElement);
        }
        alert("Dish Added Successfully")
    } else {
        console.error('Container element not found');
    }
}

function addIteam(itemName, itemPrice) {
    const box = document.getElementById('iteams-box');

    let existingItem = Array.from(box.children).find(item => {
        return item.getAttribute('data-name') === itemName;
    });

    if (existingItem) {
        // Increment count if item already exists
        const countElement = existingItem.querySelector('.item-count');
        const currentCount = parseInt(countElement.textContent); // get current count
        const newCount = currentCount + 1; // increment count
        countElement.textContent = newCount;

        // Update item text with correct price
        const itemNameElement = existingItem.querySelector('.item-name');
        itemNameElement.textContent = `${newCount} x ${itemName} - ₹${(newCount * itemPrice)}`;
    } else {
        // Create new item element if it does not exist
        const newItem = document.createElement('div');
        newItem.setAttribute('data-name', itemName);
        newItem.setAttribute('data-type', 'dish');
        newItem.className = 'cart-item';

        // Add item details with delete button
        newItem.innerHTML = `
            <div class="item-details" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="item-name">
                    <span class="item-count">1</span> x ${itemName} - ₹${itemPrice}
                </span>
                <p class="delete-btn" style="cursor: pointer; color: red; margin-left: 10px;">X</p>
            </div>
        `;

        // Append the item to the iteams-box
        box.appendChild(newItem);

        // Add event listener to delete button
        newItem.querySelector('.delete-btn').addEventListener('click', function () {
            box.removeChild(newItem);
        });
    }
}

function addToCart() {
    // Get the form inputs and items
    const date = document.getElementById('date').value;
    const tableNumber = document.getElementById('table-number').value;
    const name = document.getElementById('name').value;
    const itemsBox = document.getElementById('iteams-box');

    // Check if any of the fields are empty
    if (!date) {
        alert('Please select a date.');
        return;
    }
    if (!tableNumber) {
        alert('Please select a table.');
        return;
    }
    if (!name) {
        alert('Please enter your name.');
        return;
    }
    if (!itemsBox || itemsBox.children.length === 0) {
        alert('Please add at least one item to the cart.');
        return;
    }

    // Prepare the data to be stored
    const cartData = {
        date: date,
        table: tableNumber,
        name: name,
        items: []
    };

    // Loop through each item in itemsBox and store its details along with count and price
    for (let i = 0; i < itemsBox.children.length; i++) {
        const item = itemsBox.children[i];
        const itemNameElement = item.querySelector('.item-name');
        const itemCountElement = item.querySelector('.item-count');

        if (itemNameElement && itemCountElement) {
            // Extract name, count, and price from the item element
            const itemCount = parseInt(itemCountElement.textContent);
            const itemName = itemNameElement.textContent.split(' x ')[1].split(' - ')[0].trim();
            const itemPrice = parseFloat(itemNameElement.textContent.split('₹')[1]);

            cartData.items.push({
                name: itemName,
                count: itemCount,
                price: itemPrice / itemCount // Store the price per single unit
            });
            sessionStorage.setItem('cartData', JSON.stringify(cartData));
            location.href='cart.html'
        } else {
            console.warn(`Item at index ${i} is missing the necessary details.`);
        }
    }

}






function booking() {

    const dateInput = document.getElementById('date').value;
    const tableInput = document.getElementById('table-number').value;
    const nameInput = document.getElementById('name').value;

    if (!dateInput || !tableInput || !nameInput) {
        alert("Please fill in all fields.");
        return;
    }

    const bookingDetails = {
        date: dateInput,
        table: tableInput,
        name: nameInput
    };

    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    document.getElementById('date').value = '';
    document.getElementById('table-number').selectedIndex = 0; // Reset to the default option
    document.getElementById('name').value = '';

    alert("Table booked successfully!");
    window.location.href = 'cart.html';
}