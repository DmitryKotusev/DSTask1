var isEdited = false;
var isAdded = false;

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

    function makeRecoverZone(number) {
        let table = document.getElementsByClassName('table-fill')[0];
        let applyZone = table.insertRow(number);
        applyZone.innerHTML =
            `<th colspan=12 class="app">
            <div class="applyAddEdit">
                <button class="buttonRecoverClass">Back</button>
            </div>
        </th>`
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
                alert('edit');
                editEventFunc(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonEditClass') !== null) {
                alert('edit');
                editEventFunc(event.target.closest('tr'));
                return;
            }

            if (event.target.className === 'buttonDeleteClass') {
                alert('delete');
                return;
            } else if (event.target.closest('.buttonDeleteClass') !== null) {
                alert('delete');
                return;
            }

            if (event.target.className === 'buttonApplyAllClass') {
                alert('applyAll');
                return;
            } else if (event.target.closest('.buttonApplyAllClass') !== null) {
                alert('applyAll');
                return;
            }

            if (event.target.className === 'buttonAddClass') {
                alert('add');
                addEventFunc();
                return;
            } else if (event.target.closest('.buttonAddClass') !== null) {
                alert('add');
                addEventFunc();
                return;
            }

            if (event.target.className === 'buttonRecoverClass') {
                alert('applyAdd');

                return;
            } else if (event.target.closest('.buttonRecoverClass') !== null) {
                alert('applyAdd');

                return;
            }
        }

        if (isEdited) {
            if (event.target.className === 'buttonApplyClass') {
                alert('apply');
                applyEditing(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonApplyClass') !== null) {
                alert('apply');
                applyEditing(event.target.closest('tr'));
                return;
            }
        }

        if (isAdded) {
            if (event.target.className === 'buttonApplyBackClass') {
                alert('applyBack');
                cancelAdd();
                return;
            } else if (event.target.closest('.buttonApplyBackClass') !== null) {
                alert('applyBack');
                cancelAdd();
                return;
            }

            if (event.target.className === 'buttonApplyAddClass') {
                alert('applyAdd');
                applyAdding(event.target.closest('tr'));
                return;
            } else if (event.target.closest('.buttonApplyAddClass') !== null) {
                alert('applyAdd');
                applyAdding(event.target.closest('tr'));
                return;
            }
        }
    }

    function editEventFunc(tr) {
        isEdited = true;
        disableAllButtons();
        let rowIndex = tr.rowIndex + 1;

        makeApplyZone(rowIndex);
        makeEditable(tr);
    }

    function deleteEventFunc(tr) {
        // Дописать
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
                        jersey: parseInt(divs[1].textContent, 10),
                        fname: divs[2].textContent,
                        sname: divs[3].textContent,
                        position: divs[4].textContent,
                        birthday: makeDate(divs[5].textContent),
                        weight: parseInt(divs[6].textContent, 10),
                        height: parseInt(divs[7].textContent, 10),
                        birthcity: divs[8].textContent,
                        birthstate: divs[9].textContent
                    }
                );
            } else {
                elemToEdit.playerid = divs[0].textContent,
                elemToEdit.jersey = parseInt(divs[1].textContent, 10),
                elemToEdit.fname = divs[2].textContent,
                elemToEdit.sname = divs[3].textContent,
                elemToEdit.position = divs[4].textContent,
                elemToEdit.birthday = makeDate(divs[5].textContent),
                elemToEdit.weight = parseInt(divs[6].textContent, 10),
                elemToEdit.height = parseInt(divs[7].textContent, 10),
                elemToEdit.birthcity = divs[8].textContent,
                elemToEdit.birthstate = divs[9].textContent
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
                    jersey: parseInt(divs[1].textContent, 10),
                    fname: divs[2].textContent,
                    sname: divs[3].textContent,
                    position: divs[4].textContent,
                    birthday: makeDate(divs[5].textContent),
                    weight: parseInt(divs[6].textContent, 10),
                    height: parseInt(divs[7].textContent, 10),
                    birthcity: divs[8].textContent,
                    birthstate: divs[9].textContent
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
})();