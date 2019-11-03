function loadUpdateForm(selectedItem) {
    const itemID = $(selectedItem).attr('id');

    const classSelector = `#${itemID} .updateable-fields`;
    const oldTitle = $(`#${itemID} .updateable-fields h3`).text();
    const oldDescription = $(`#${itemID} .updateable-fields p`).text();

    $(classSelector).html(`
        <form action="#" name="update-form" class="js-update">
            <fieldset>
                <label for="item-title">New Title:</label>
                <input type="text" id="item-title" value="${oldTitle}">
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

function readyFormButtons(itemID) {
    console.log('form buttons listening');
    $('.js-update').submit(event => {
        //update the item on the database and reload page
        event.preventDefault();
        
        let putObject = {
            "id": `${itemID}`,
            "title": `${getValById(`#${itemID}`, '#item-title')}`,
            "description": `${getValById(event.currentTarget, '#item-description')}`
        };
        console.log(putObject);
        updateItem(putObject);
    });

    $('.cancel').on('click', () => {
      loadPage('list');
    });
}

function getValById(target, idSelector) {
    console.log(target);
    return $(target).find(idSelector).val();
}

function buildPutObject(target, fieldsToUpdateArr) {
    
}