function loadUpdateForm(selectedItem) {
    console.log('form loaded');
    const itemID = $(selectedItem).attr('id');
    const classSelector = `#${itemID} .updateable-fields`;

    console.log(classSelector);

    $(classSelector).html(`
        <form action="#" name="update-form" class="js-update">
            <fieldset>
                <label for="item-title">New Title:</label>
                <input type="text" id="item-title" value="">
                <label for="item-description">New Description:</label>
                <input type="text" id="item-description" value="">
                <button type="submit" class="save">Save</button>
            </fieldset>
        </form>
        <button class="cancel">Cancel</button>
    `);
}

// function readyUpdate(targetID) {
//     $('.js-update-comic').submit(event => {
//         //update the item on the database and reload page
//         event.preventDefault();
//         let newPagesRead = $(event.currentTarget).find('#pages-read').val();
//         let newRating = $(event.currentTarget).find('#rating').val();
        
//         let putObject = {
//             "id": `${targetID}`,
//             "pagesRead": `${newPagesRead}`,
//             "rating": `${newRating}`
//         };
//         updateComic(putObject);
//     });
//     $('.cancel').on('click', () => {
//       loadPage('list');
//     });
// }

// function updateComicJSON(targetComic) {
//     let thisComicID = $(targetComic).attr('id');
//     let updateableSelector = `#${thisComicID} .updateable`;

//     let spanSelector = `#${thisComicID} .total-pages`;
//     let totalPages = $(spanSelector).html();

//     $(updateableSelector).html(`
    
//     `);
//     readyUpdate(thisComicID);
// }