function getDetails() {
    let xttp = new XMLHttpRequest();
    let city = document.getElementById("city").value;
    var dataList = []
    var date = [];
    var ch;

    let key = "07e5ee3702f491598157b15ceb669cb6"
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`

    xttp.open("get", url, false);
    xttp.onreadystatechange = function () {

        if (this.status == 200 && this.readyState == 4) {

            document.getElementById("table").innerHTML = '<canvas id = "myChart"></canvas>';
            var ctx = document.getElementById('myChart');

            let data = JSON.parse(xttp.responseText);
            // console.log(data);

            let { list, city: { country } } = data
            // console.log(list)

            for (let i = 0; i < list.length; i = i + 8) {
                let { dt_txt, main: { temp } } = list[i]
                dataList.push(temp);
                date.push((dt_txt.split(' '))[0])
            }

            let { main: { temp_max, temp_min } } = list[0]
            getData(city, country, temp_min, temp_max);

            ch = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: date,
                    datasets: [{
                        label: `Temperature`,
                        data: dataList,
                        borderWidth: 1,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        }
        if (this.status == 404) {
            document.getElementById("place").innerHTML = "city not found"
            document.getElementById('min').innerHTML = ""
            document.getElementById('max').innerHTML = ""
        }
    }
    xttp.send();

}


function getData(city, country, temp_min, temp_max) {
    document.getElementById('place').innerHTML = `<i class="material-icons">place</i>  ${city}, ${country}`
    document.getElementById('min').innerHTML = `Minimum Temp. is ${temp_min}`
    document.getElementById('max').innerHTML = `Maximum Temp. is ${temp_max}`
}