let test = [];
(function () {
    function recieveData() {
        return fetch('api/data', {

        }).then(response => {
            return response.json();
        }).then(data => {
            test = data;
        });
    }
	recieveData();
})();