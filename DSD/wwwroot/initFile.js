(async function () {
    await recieveData();
    let body = document.getElementsByTagName('body')[0];
    body.addEventListener('click', globalListenerFunction);
    let table = document.getElementsByClassName('table-fill')[0];
    for (let index = 0; index < data.length; index++) {
        makeTr(data[index], table, index + 1);
    }
})();