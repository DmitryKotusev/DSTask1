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
                return;
            } else if (event.target.closest('.buttonAddClass') !== null) {
                alert('add');
                return;
            }
        } else {
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
    }

    //Доделать
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
        // Дописать
    }

    function buildNewEmptyLine() {
        let table = document.getElementsByClassName('table-fill')[0];
        let applyZone = table.insertRow(table.length);
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
    }

    function applyEditing(tr) {
        let rowIndex = tr.rowIndex;
        let table = document.getElementsByClassName('table-fill')[0];
        makeNonEditable(tr.previousElementSibling);
        table.deleteRow(rowIndex);
        enableAllButtons();
        if (isEdited) {
            isEdited = false;
        } else {
            isAdded = false;
        }
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
})();