//delete this?
function diplayListItems(list) {
    for (index in list) {
        let item = list[index];
        $('main').append(
            `
            <div class="list-item" id=${item.id}>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            </div>
            `
        );
    }
}