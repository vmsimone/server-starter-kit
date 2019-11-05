//CREATE
function addItem(item) {
    $.ajax({
        url: '/api/items',
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function() {
            $('.add-section').html(`
                <button class="add">Add</button>
            `);
            loadListPage();
        }
    }); 
}

//READ
function getItems() {
    console.log('GET request called');
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