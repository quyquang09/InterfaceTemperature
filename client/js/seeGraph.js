
const selectMode = $('#select-mode');
var databaseSensor= [];
displayNone =function(mess) {
    $$('.extra-mode div').forEach(element => {
        element.classList.add('display-none');
    });
    if(mess===true){
        $('.mess').innerHTML ="Vui lòng lựa chọn chế độ hiển thị !!!"; 
    }else {
        $('.mess').innerHTML="";
    }
}
checkValueInput = function(select) {
    var value = $(`input[name=${select}]`).value;
   if(value==='') {
       return false;
   }
   else {
       return value;
   }
}

checkInput =function() {
    var value;
    if(selectMode.value ==='') {
        displayNone(true);
        value =false;
    }
    else if(selectMode.value ==='day'){
        displayNone(false);
        value = checkValueInput('day');
        $('#day').classList.remove('display-none')
    }
    else if(selectMode.value ==='month'){
        displayNone(false);
        value = checkValueInput('month');
        $('#month').classList.remove('display-none')
    }
    else if(selectMode.value ==='elective') {
        displayNone(false);
        value = checkValueInput('elective');
        $('#elective').classList.remove('display-none')
    }
    return value;
}
$('#select-mode').onchange=function(){
    checkInput();
}
$('.see-submit').onclick=function() {
    var valueInput= checkInput();
    if(valueInput===false){

    }else{
       var data = filterValue(valueInput,selectMode.value);
       var dataDraw =convertArrValue(data,selectMode.value);
       //Xử lí khi ngày/ Tháng không có dữ liệu
       if(dataDraw[1].length === 0 || dataDraw[1].length ===0){
           $('.charting-notice').innerHTML = `Không có dữ liệu cho ${selectMode.value} này !
            <br/>Vui lòng chọn ${selectMode.value} khác...`
            $('#container').classList.add('display-none')
       }
       else {
            $('#container').classList.remove('display-none')
            $('.charting-notice').innerHTML ="";
            drawChart(dataDraw,valueInput);
       }
    }
}
function filterValue(valueInput,type) {
    var newDatabaseSensor
    switch (type) {
        case 'day':
            newDatabaseSensor= databaseSensor.filter(function(e) {
                return e.date=== valueInput;
            });
            break;
        case 'month':
            newDatabaseSensor= databaseSensor.filter(function(e) {
                const monthYear = e.date.split("-")[0]+'-'+e.date.split("-")[1];
                console.log(monthYear)
                return monthYear=== valueInput;
            });
            
            break;
    }
    return newDatabaseSensor;
}

function convertArrValue(data,mode) {   
    var valueTemperaturs =[];
    var valueHumiditys = [];
    var times = [];
    var dates =[] ;
    if(data !==undefined) {
        for (const i in data) {
            valueTemperaturs.push(parseFloat(data[i].nhietdo));
            valueHumiditys.push(parseFloat(data[i].doam));
            
            if(mode ==='day'){
                dates = data[0].date;
                times.push(data[i].time.slice(0,5));
            }
            if(mode ==='month'){
                var day = data[i].date.split('-')[2]
                times.push('Ngày '+day+"_" +data[i].time.slice(0,5))  ;
            }
        }
    }
    return [dates,times,valueTemperaturs,valueHumiditys]
}
function drawChart(dataDraw,subtitle){
    var date = dataDraw[0];
    var time = dataDraw[1];
    var categories = dataDraw[1];
    var valueTemperatur = dataDraw[2];
    var valueHumidity = dataDraw[3];
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ Nhiệt độ / Độ ẩm',
            style: {
                fontSize: '18px',
                fontFamily: "Times New Roman",
                color: '#32CD32'
            }
        },
        subtitle: {
            text: subtitle,
            style: {
                fontSize: '14px',
                fontFamily: "Times New Roman",
                color: '#00FF00'
            }
        },
        xAxis: {
            categories: categories,
            crosshair: false,
            labels: {
                rotation: 0,
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif',
                    color: '#FFA500'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Giá trị'
            }
        },
        tooltip: { 
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>' ,
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
        {
            name: 'Nhiệt độ °C',
            data:valueTemperatur
    
        }, {
            name: 'Độ Ẩm %',
            data: valueHumidity
    
        },]
    });
}

fetch(BASE_URL+'api/getvalueSensor.php')
        .then(res => res.json())
        .then(data => {
            for (const i in data.valueSensor) 
            {
                databaseSensor.push(data.valueSensor[i]);
            }
        })

