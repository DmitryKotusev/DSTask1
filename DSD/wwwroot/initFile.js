let toEdit = [];
let toAdd = [];
let toDelete = [];
let data = [
    {
        playerid: '1',
        jersey: 12,
        fname: 'Mike',
        sname: 'Adamle',
        position: 'RW',
        birthday: new Date(1985, 8, 21),
        weight: 73,
        height: 197,
        birthcity: 'Stamford',
        birthstate: 'CT'
    },
    {
        playerid: '2',
        jersey: 9,
        fname: 'Nikita',
        sname: 'Koniev',
        position: 'DT',
        birthday: new Date(1997, 10, 30),
        weight: 86,
        height: 196,
        birthcity: 'Minsk',
        birthstate: 'RU'
    },
    {
        playerid: '3',
        jersey: 11,
        fname: 'Tom',
        sname: 'Adamle',
        position: 'RW',
        birthday: new Date(1990, 1, 25),
        weight: 85,
        height: 193,
        birthcity: 'Kiev',
        birthstate: 'UK'
    },
];

(function (params) {
    let body = document.getElementsByTagName('body')[0];
    body.addEventListener('click', globalListenerFunction);
    let table = document.getElementsByClassName('table-fill')[0];
    for (let index = 0; index < data.length; index++) {
        makeTr(data[index], table, index + 1);
    }
})();