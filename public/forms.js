function loadUpdateForm(selectedItem) {
    const itemID = $(selectedItem).attr('id');

    const classSelector = `#${itemID} .updateable-fields`;
    const oldTitle = $(`#${itemID} .updateable-fields h3`).text();
    const oldDescription = $(`#${itemID} .updateable-fields p`).text();

    $(classSelector).html(`
        <form action="#" name="update-form" class="js-update">
            <fieldset>
                <label for="item-title">New Title:</label>
                <input type="text" id="item-title" value="${oldTitle}" autoselect>
                <br><br>
                <label for="item-description">New Description:</label>
                <input type="text" id="item-description" value="${oldDescription}">
                <br><br>
                <button type="submit" class="save">Save</button>
            </fieldset>
        </form>
        <br>
        <button class="cancel">Cancel</button>
    `);
    readyFormButtons(itemID);
}

function loadAddForm() {
    $('.add-section').html(`
        <form action="#" name="add-form" class="js-add">
            <fieldset>
                <label for="add-item-title">Title:</label>
                <input type="text" id="add-item-title" placeholder="Sample Title" required autoselect>
                <br><br>
                <label for="add-item-description">Description:</label>
                <input type="text" id="add-item-description" placeholder="Sample description" required>
                <br><br>
                <button type="submit" class="save">Save</button>
            </fieldset>
        </form>
        <br>
        <button class="cancel">Cancel</button>
    `);
    readyAddFormButtons();
}

function readyFormButtons(itemID) {
    $('.js-update').submit(event => {
        //update the item on the database and reload page
        event.preventDefault();
        
        let putObject = {
            "id": `${itemID}`,
            "title": `${getValById(`#${itemID}`, '#item-title')}`,
            "description": `${getValById(event.currentTarget, '#item-description')}`
        };
        updateItem(putObject);
    });

    $('.cancel').on('click', () => {
        loadListPage();
    });
}

function readyAddFormButtons() {
    $('.js-add').submit(event => {
        //add a new item to the database and reload page
        event.preventDefault();
        const title = $(event.currentTarget).find('#add-item-title').val();
        const desc = $(event.currentTarget).find('#add-item-description').val();

        let addObject = {
            "title": `${title}`,
            "description": `${desc}`
        };
        addItem(addObject);
    });

    $('.cancel').on('click', () => {
        $('.add-section').html(`
            <button class="add">Add</button>
        `);
        readyAddButton();
      });
}

function getValById(target, idSelector) {
    return $(target).find(idSelector).val();
}