(function () {
    function makeApplyZone(number) {
        var table = document.getElementsByClassName('table-fill')[0];
        var applyZone = table.insertRow(number);
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

    window.makeApplyZone = makeApplyZone;
    window.deleteApplyZone = deleteApplyZone;
})();