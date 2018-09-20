(function () {
    function recieveData() {
        return fetch('api/data', {

        }).then(response => {
            return response.json();
        }).then(parsedData => {
            parsedData.forEach(element => {
                data.push({
                playerid: element.playerid,
                jersey: element.jersey,
                fname: element.fname,
                sname: element.sname,
                position: element.position,
                birthday: new Date(element.birthday.value),
                weight: element.weight,
                height: element.height,
                birthcity: element.birthcity,
                birthstate: element.birthstate,
                });
            });
        });
    }

    function sendData() {
        let formData = new FormData();
        formData.append('toAdd', JSON.stringify(toAdd));
        formData.append('toEdit', JSON.stringify(toEdit));
        formData.append('toDelete', JSON.stringify(toDelete));
        return fetch('api/data', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.status === 200) {
                location.reload();
                alert('Opearation successful');
            } else {
                location.reload();
                alert('Opearation failed');
            }
        });
    }

    window.recieveData = recieveData;
    window.sendData = sendData;
})();