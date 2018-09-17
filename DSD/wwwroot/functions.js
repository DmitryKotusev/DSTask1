var isOccupied = false;

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
        if (!isOccupied) {
            if (event.target.className === 'buttonEditClass') {
                alert('edit');
                return;
            } else if (event.target.closest('.buttonEditClass') !== null) {
                alert('edit');
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
                return;
            } else if (event.target.closest('.buttonApplyClass') !== null) {
                alert('apply');
                return;
            }
        }
    }

    //Доделать
    function editEventFunc(tr) {
        let rowIndex = tr.rowIndex;

        makeApplyZone(makeApplyZone);
    }

    window.makeApplyZone = makeApplyZone;
    window.deleteApplyZone = deleteApplyZone;
    window.makeEditable = makeEditable;
    window.makeNonEditable = makeNonEditable;
    window.enableAllButtons = enableAllButtons;
    window.disableAllButtons = disableAllButtons;
    window.globalListenerFunction = globalListenerFunction;
})();