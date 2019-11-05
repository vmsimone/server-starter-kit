//CREATE
function addItem(item) {
    $.ajax({
        url: '/api/items',
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: () => {
            $('.add-section').html(`
                <button class="add">Add</button>
            `);
            loadListPage();
        }
    }); 
}

//READ
function getItems() {
    $.ajax({
        url: '/api/items',
        method: 'get',
        success: displayData
    });
}

//UPDATE
function updateItem(item) {
    $.ajax({
        url: `/api/items/${item.id}`,
        method: 'put',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: () => { loadListPage() }
    });
}

//DELETE
function deleteItem(itemId) {
    $.ajax({
        url: `/api/items/${itemId}`,
        method: 'delete',
        success: () => { loadListPage() }
    });
}