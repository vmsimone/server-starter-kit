//delete this?
function loadHomePage() {
    $('main').html(`
        <h2>This is the home page.</h2>
        <p>Click "List" to run a GET command and view a list of items in the database</p>
    `);
}

function loadListPage() {
    $('main').html(`
        <h2>Below are all of the items in the "items" collection</h2>
    `);
    getItems();
}

function readyNavButtons() {
    $('#home').on('click', () => {
        loadHomePage();
    });
    $('#list').on('click', () => {
        loadListPage();
    });
}

//activated after CREATE req
function displayData(data) {
    console.log(data);
    for (index in data.items) {
        let thisItem = data.items[index];
        $('main').append(
            `
            <div class="item" id=${thisItem.id}>
                <h3>${thisItem.title}</h3>
                <p>${thisItem.description}</p>
                <button class="put">Update</button>
                <button class="del">Remove from list</button>
            </div>
            `
        );
    }
}

$(readyNavButtons)