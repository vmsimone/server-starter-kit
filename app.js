//CREATE


//READ
function diplayListItems(list) {
    for (index in list) {
        let item = list[index];
        $('main').append(
            `
            <div class="list-item" id=${item.id}>
                <h3 class="title">${item.title}</h3>
                <p class="description">${item.description}</p>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            </div>
            `
        );
    }
}

//UPDATE
function updateItem(obj) {
    $.ajax({
        url: `/api/database/${obj.id}`,
        method: 'put',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: function() {
            loadPage('list');
        }
    });
}

function updateFormListener(targetID, valuesToUpdate) {
    $('.js-update').submit(event => {
        //updates the item on the database (or does nothing) and reloads page
        event.preventDefault();
        const putObject = createPutObject(event, valuesToUpdate, targetID);
        updateItem(putObject);
    });
    $('.cancel').on('click', () => {
      loadPage('list');
    });
}

function createPutObject(e, newValues, targetID) {
    let putObject = {
        "id": `${targetID}`
    }
    newValues.forEach(newVal => {
        const newValClass = '.' + newVal;
        putObject[newVal] = findFormValueByClass(e, newValClass);
    });
    return putObject;
}

function getCurrentValues(itemId, valuesArr) {
    let currentValuesObj = {};
    valuesArr.forEach(currentVal => {
        let key = valuesArr[currentVal];
        let value = $(itemId + "." + key).text();

        currentValuesObj[key] = value;
    });
    return currentValuesObj;
}

function readyUpdateForm(itemId) {
    const valuesToUpdate = ["title", "description"];
    const currentValues = getCurrentValues(itemId, valuesToUpdate);

    $(itemId).html(`
        <formset>
            <form action="#" name="update-form" class="js-update">    
                <h3>
                    <label for="title"></label>
                    <input id="title" type="text" default="${currentValues.title}">
                </h3>
                <p>
                    <label for="desc"></label>
                    <input id="desc" type="text" default="${currentValues.description}">
                </p>
                <button class="confirm">Submit</button>
            </form>
            <button class="cancel">Cancel</button>
        </formset>
    `);
}

//helper functions for above
function findFormValueByClass(e, valueClass) {
    return $(e.currentTarget).find(valueClass).val();
}

//DELETE
