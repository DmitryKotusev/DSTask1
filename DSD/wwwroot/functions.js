var isEdited = false;
var isAdded = false;
var toEdit = [];
var toAdd = [];
var toDelete = [];
var data = [];

(function () {
    function makeApplyZone(number) {
        let table = document.getElementsByClassName('table-fill')[0];
        let applyZone = table.insertRow(number);
        applyZone.innerHTML =
            `<th colspan=12 class="app">
            <div class="applyEdit">
                <button class="buttonApplyClass">Apply</button>
            </div>
        </th>`
    }

    function makeApplyAddZone(number) {
        let table = document.getElementsByClassName('table-fill')[0];
        let applyZone = table.insertRow(number);
        applyZone.innerHTML =
            `<th colspan=12 class="app">
            <div class="applyAddEdit">
                <button class="buttonApplyBackClass">Back</button>
                <button class="buttonApplyAddClass">Apply</button>
            </div>
        </th>`
    }

    function makeTr(obj, table, number) {
        let newTr = table.insertRow(number);
        newTr.id = obj.playerid;
        newTr.innerHTML =
            `<th class="text-left">
            <div contenteditable="false">${obj.playerid}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.jersey ? obj.jersey : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.fname ? obj.fname : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.sname ? obj.sname : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.position ? obj.position : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.birthday ? obj.birthday.toLocaleDateString() : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.weight ? obj.weight : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.height ? obj.height : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.birthcity ? obj.birthcity : ''}</div>
        </th>
        <th class="text-left">
            <div contenteditable="false">${obj.birthstate ? obj.birthstate : ''}</div>
        </th>
        <th class="text-center">
            <button type="button" class="buttonEditClass">
                <img src="edit_write_icon.png" class="iconClass">
            </button>
        </th>
        <th class="text-center">
            <button type="button" class="buttonDeleteClass">
                <img src="delete_write_icon.png" class="iconClass">
            </button>
        </th>`
    }

    function deleteTr(number) {
        document.getElementsByClassName('table-fill')[0].deleteRow(number);
    }

    function makeRecoverZone(number, id) {
        let table = document.getElementsByClassName('table-fill')[0];
        let recoverZone = table.insertRow(number);
        recoverZone.id = id;
        recoverZone.innerHTML =
            `<th colspan=12 class="app">
            <div class="applyAddEdit">
                <button class="buttonRecoverClass">Recover</button>
            </div>
        </th>`
    }

    function deleteRecoverZone(number) {
        document.getElementsByClassName('table-fill')[0].deleteRow(number);
    }

    function deleteApplyAddZone(number) {
        document.getElementsByClassName('table-fill')[0].deleteRow(number);
    }

    function deleteApplyZone(number) {
        document.getElementsByClassName('table-fill')[0].deleteRow(number);
    }

    function makeEditable(tr) {
        let divArr = tr.getElementsByTagName('div');
        let thArr = tr.getElementsByTagName('th');
        for (let index = 0; index < divArr.length; index++) {
            divArr[index].contentEditable = true;
            thArr[index].style.color = 'black';
            thArr[index].style.backgroundColor = 'white';
        }
        thArr[10].style.color = 'black';
        thArr[10].style.backgroundColor = 'white';
        thArr[11].style.color = 'black';
        thArr[11].style.backgroundColor = 'white';
    }

    function makeNonEditable(tr) {
        let divArr = tr.getElementsByTagName('div');
        let thArr = tr.getElementsByTagName('th');
        for (let index = 0; index < divArr.length; index++) {
            divArr[index].contentEditable = false;
            thArr[index].style.color = '#D5DDE5';
            thArr[index].style.backgroundColor = '#1b1e24';
        }
        thArr[10].style.color = '#D5DDE5';
        thArr[10].style.backgroundColor = '#1b1e24';
        thArr[11].style.color = '#D5DDE5';
        thArr[11].style.backgroundColor = '#1b1e24';
    }

    function enableAllButtons() {
        let tableButtons = document.getElementsByClassName('buttonClass');
        let addButton = document.getElementsByClassName('buttonAddClass')[0];
        let applyAllButton = document.getElementsByClassName('buttonApplyAllClass')[0];
        for (let index = 0; index < tableButtons.length; index++) {
            tableButtons[index].disabled = false;
        }
        addButton.disabled = false;
        applyAllButton.disabled = false;
    }

    function disableAllButtons() {
        let tableButtons = document.getElementsByClassName('buttonClass');
        let addButton = document.getElementsByClassName('buttonAddClass')[0];
        let applyAllButton = document.getElementsByClassName('buttonApplyAllClass')[0];
        for (let index = 0; index < tableButtons.length; index++) {
            tableButtons[index].disabled = true;
        }
        addButton.disabled = true;
        applyAllButton.disabled = true;
    }

    function globalListenerFunction(event) {
        if (!isEdited && !isAdded) {
            if (event.target.className === 'buttonEditClass') {
                // alert('edit');
                editEventFunc(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonEditClass') !== null) {
                // alert('edit');
                editEventFunc(event.target.closest('tr'));
                return;
            }

            if (event.target.className === 'buttonDeleteClass') {
                // alert('delete');
                deleteEventFunc(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonDeleteClass') !== null) {
                // alert('delete');
                deleteEventFunc(event.target.closest('tr'));
                return;
            }

            if (event.target.className === 'buttonApplyAllClass') {
                // alert('applyAll');
                applyAllEventFunc();
                return;
            } else if (event.target.closest('.buttonApplyAllClass') !== null) {
                // alert('applyAll');
                applyAllEventFunc();
                return;
            }

            if (event.target.className === 'buttonAddClass') {
                // alert('add');
                addEventFunc();
                return;
            } else if (event.target.closest('.buttonAddClass') !== null) {
                // alert('add');
                addEventFunc();
                return;
            }

            if (event.target.className === 'buttonRecoverClass') {
                // alert('recover');
                recoverEventFunc(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonRecoverClass') !== null) {
                // alert('recover');
                recoverEventFunc(event.target.closest('tr'));
                return;
            }
        }

        if (isEdited) {
            if (event.target.className === 'buttonApplyClass') {
                // alert('apply');
                applyEditing(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonApplyClass') !== null) {
                // alert('apply');
                applyEditing(event.target.closest('tr'));
                return;
            }
        }

        if (isAdded) {
            if (event.target.className === 'buttonApplyBackClass') {
                // alert('applyBack');
                cancelAdd();
                return;
            } else if (event.target.closest('.buttonApplyBackClass') !== null) {
                // alert('applyBack');
                cancelAdd();
                return;
            }

            if (event.target.className === 'buttonApplyAddClass') {
                // alert('applyAdd');
                applyAdding(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonApplyAddClass') !== null) {
                // alert('applyAdd');
                applyAdding(event.target.closest('tr'));
                return;
            }
        }
    }

    function applyAllEventFunc() {
        synchroniseArrays();
        sendData();
    }

    function editEventFunc(tr) {
        isEdited = true;
        disableAllButtons();
        let rowIndex = tr.rowIndex + 1;

        makeApplyZone(rowIndex);
        makeEditable(tr);
    }

    function deleteEventFunc(tr) {
        let rowIndex = tr.rowIndex;
        let id = tr.id;
        deleteTr(rowIndex);
        makeRecoverZone(rowIndex, id);
        toDelete.push(
            {
                playerid: tr.id,
            }
        );
    }

    function recoverEventFunc(tr) {
        let rowIndex = tr.rowIndex;
        deleteRecoverZone(rowIndex);
        let deletedObj = toDelete.find(
            (element) => {
                return element.playerid === tr.id;
            }
        );
        toDelete.splice(toDelete.indexOf(deletedObj), 1);
        let obj = data.find(
            (element) => {
                return element.playerid === deletedObj.playerid;
            }
        );
        if (!obj) {
            obj = toAdd.find(
                (element) => {
                    return element.playerid === deletedObj.playerid;
                }
            );
        }
        let table = document.getElementsByClassName('table-fill')[0];
        makeTr(obj, table, rowIndex);
    }

    function addEventFunc() {
        isAdded = true;
        disableAllButtons();
        let emptyZone = buildNewEmptyLine();
        makeEditable(emptyZone);
        let table = document.getElementsByClassName('table-fill')[0];
        makeApplyAddZone(table.rows.length);
    }

    function deleteNewEmptyLine(number) {
        document.getElementsByClassName('table-fill')[0].deleteRow(number);
    }

    function buildNewEmptyLine() {
        let table = document.getElementsByClassName('table-fill')[0];
        let applyZone = table.insertRow(table.rows.length);
        applyZone.innerHTML =
            `<tr id="1">
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-left">
            <div contenteditable="true"></div>
        </th>
        <th class="text-center">
            <button type="button" class="buttonEditClass">
                <img src="edit_write_icon.png" class="iconClass">
            </button>
        </th>
        <th class="text-center">
            <button type="button" class="buttonDeleteClass">
                <img src="delete_write_icon.png" class="iconClass">
            </button>
        </th>
    </tr>`;
        return applyZone;
    }

    function makeDate(text) {
        let arrD = text.split(".");
        arrD[1] -= 1;
        let d = new Date(arrD[2], arrD[1], arrD[0]);
        return d;
    }

    function applyEditing(tr) {
        let rowIndex = tr.rowIndex;
        let table = document.getElementsByClassName('table-fill')[0];
        if (checkData(tr.previousElementSibling)) {
            let divs = tr.previousElementSibling.getElementsByTagName('div');
            // divs = [].slice.apply(divs);
            let elemToEdit = toEdit.find((element) => {
                return element.oldId === divs[0].textContent
            });
            if (!elemToEdit) {
                toEdit.push(
                    {
                        oldId: tr.previousElementSibling.id,
                        playerid: divs[0].textContent,
                        jersey: divs[1].textContent ? parseInt(divs[1].textContent, 10) : null,
                        fname: divs[2].textContent ? divs[2].textContent : null,
                        sname: divs[3].textContent ? divs[3].textContent : null,
                        position: divs[4].textContent ? divs[4].textContent : null,
                        birthday: divs[5].textContent ? makeDate(divs[5].textContent) : null,
                        weight: divs[6].textContent ? parseInt(divs[6].textContent, 10) : null,
                        height: divs[7].textContent ? parseInt(divs[7].textContent, 10) : null,
                        birthcity: divs[8].textContent ? divs[8].textContent : null,
                        birthstate: divs[9].textContent ? divs[9].textContent : null
                    }
                );
            } else {
                elemToEdit.playerid = divs[0].textContent,
                    jersey = divs[1].textContent ? parseInt(divs[1].textContent, 10) : null,
                    fname = divs[2].textContent ? divs[2].textContent : null,
                    sname = divs[3].textContent ? divs[3].textContent : null,
                    position = divs[4].textContent ? divs[4].textContent : null,
                    birthday = divs[5].textContent ? makeDate(divs[5].textContent) : null,
                    weight = divs[6].textContent ? parseInt(divs[6].textContent, 10) : null,
                    height = divs[7].textContent ? parseInt(divs[7].textContent, 10) : null,
                    birthcity = divs[8].textContent ? divs[8].textContent : null,
                    birthstate = divs[9].textContent ? divs[9].textContent : null
            }
            // Тут было приравнивание id
            makeNonEditable(tr.previousElementSibling);
            table.deleteRow(rowIndex);
            enableAllButtons();
            if (isEdited) {
                isEdited = false;
            } else {
                isAdded = false;
            }
        }
    }

    function applyAdding(tr) {
        let rowIndex = tr.rowIndex;
        let table = document.getElementsByClassName('table-fill')[0];
        if (checkData(tr.previousElementSibling)) {
            let divs = tr.previousElementSibling.getElementsByTagName('div');
            tr.previousElementSibling.id = divs[0].textContent;
            toAdd.push(
                {
                    playerid: divs[0].textContent,
                    jersey: divs[1].textContent ? parseInt(divs[1].textContent, 10) : null,
                    fname: divs[2].textContent ? divs[2].textContent : null,
                    sname: divs[3].textContent ? divs[3].textContent : null,
                    position: divs[4].textContent ? divs[4].textContent : null,
                    birthday: divs[5].textContent ? makeDate(divs[5].textContent) : null,
                    weight: divs[6].textContent ? parseInt(divs[6].textContent, 10) : null,
                    height: divs[7].textContent ? parseInt(divs[7].textContent, 10) : null,
                    birthcity: divs[8].textContent ? divs[8].textContent : null,
                    birthstate: divs[9].textContent ? divs[9].textContent : null
                }
            );
            makeNonEditable(tr.previousElementSibling);
            table.deleteRow(rowIndex);
            // Занести в массив
            enableAllButtons();
            if (isEdited) {
                isEdited = false;
            } else {
                isAdded = false;
            }
        }
    }

    function isDateValid(date) {
        var arrD = date.split(".");
        arrD[1] -= 1;
        var d = new Date(arrD[2], arrD[1], arrD[0]);
        if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
            return true;
        } else {
            alert('Введена некорректная дата, формат даты: dd.mm.yyyy.');
            return false;
        }
    }

    function checkData(tr) {
        let divs = tr.getElementsByTagName('div');
        if (divs[0].textContent !== '') {
            if (document.getElementById(divs[0].textContent) !== null) {
                if (document.getElementById(divs[0].textContent) !== tr) {
                    alert('Некорректный id');
                    return false;
                }
            }
        } else {
            alert('Id не должен быть пустым');
            return false;
        }
        if (divs[5].textContent !== '') {
            return isDateValid(divs[5].textContent);
        }
        return true;
    }

    function cancelAdd() {
        isAdded = false;
        let table = document.getElementsByClassName('table-fill')[0];
        deleteApplyAddZone(table.rows.length - 1);
        deleteNewEmptyLine(table.rows.length - 1);
        enableAllButtons();
    }

    function synchroniseArrays() {
        let nothingToDelete = [];
        // Обработка массивов toEdit и toAdd
        toDelete.forEach(deletedElement => {
            let deletedElInToEdit = toEdit.find(
                (element) => {
                    return element.oldId === deletedElement.playerid
            });
            if (deletedElInToEdit) {
                toEdit.splice(toEdit.indexOf(deletedElInToEdit), 1);
            }

            let deletedElInToAdd = toAdd.find(
                (element) => {
                    return element.playerid === deletedElement.playerid
            });
            if (deletedElInToAdd) {
                toAdd.splice(toAdd.indexOf(deletedElInToAdd), 1);
                // В этом случае ужадение ещё не добавленного элемента бессмысленно
                // Заносим их в массив кандидатов на последующее удаление
                nothingToDelete.push(deletedElement);
            }
        });
        // Удаление из массива toDelete неактульных элементов
        nothingToDelete.forEach(element => {
            toDelete.splice(toDelete.indexOf(element), 1);
        });

        // Обработка массива toAdd
        toAdd.forEach(addedElement => {
            let editedElInToAdd = toEdit.find(
                (element) => {
                    return element.oldId === addedElement.playerid;
            });
            if (editedElInToAdd) {
                addedElement.playerid = editedElInToAdd.playerid;
                addedElement.jersey = editedElInToAdd.jersey;
                addedElement.fname = editedElInToAdd.fname;
                addedElement.sname = editedElInToAdd.sname;
                addedElement.position = editedElInToAdd.position;
                addedElement.birthday = editedElInToAdd.birthday;
                addedElement.weight = editedElInToAdd.weight;
                addedElement.height = editedElInToAdd.height;
                addedElement.birthcity = editedElInToAdd.birthcity;
                addedElement.birthstate = editedElInToAdd.birthstate;
                
                toEdit.splice(toEdit.indexOf(editedElInToAdd), 1);
            }
        });
    }


    window.makeApplyZone = makeApplyZone;
    window.deleteApplyZone = deleteApplyZone;
    window.makeEditable = makeEditable;
    window.makeNonEditable = makeNonEditable;
    window.enableAllButtons = enableAllButtons;
    window.disableAllButtons = disableAllButtons;
    window.globalListenerFunction = globalListenerFunction;
    window.buildNewEmptyLine = buildNewEmptyLine;
    window.makeApplyAddZone = makeApplyAddZone;
    window.applyEditing = applyEditing;
    window.cancelAdd = cancelAdd;
    window.makeTr = makeTr;
    window.synchroniseArrays = synchroniseArrays;
})();