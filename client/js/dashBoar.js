
const firebaseConfig = {
    apiKey: "AIzaSyCHonqCPDHSZcYTn_hqRrtUIQQ9-9NBc3A",
    authDomain: "mangcambien-235dc.firebaseapp.com",
    databaseURL: "https://mangcambien-235dc-default-rtdb.firebaseio.com",
    projectId: "mangcambien-235dc",
    storageBucket: "mangcambien-235dc.appspot.com",
    messagingSenderId: "978130290183",
    appId: "1:978130290183:web:680c2248cfec9a1743cca2",
    measurementId: "G-0E9XXCF8CG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var valueSstemp;
var valueSsHumidity;
const selectTimeInput = $('#select-time');
const saveCurrentValue = $('.save-currentValue');
const btnSaveAuto = $('.btn-save');
const btnEditInput = $('.btn-edit');
const btnStopSave = $('.btn-stop')

var timeInput = localStorage.getItem("timeInput")
var isInput  = localStorage.getItem("isInput")
var isStop  = localStorage.getItem("isStop")
$( document ).ready(function() {
    $('.btn-save').prop('disabled', isInput);
    selectTimeInput.prop('disabled', isInput);
    selectTimeInput.val(`${timeInput}`)
    if(isStop==='true') {
        btnStopSave.css('background','red')
    }
    else{
        btnStopSave.css('background','')
    }
});
    
//Gửi giá trị lên database
function sendValue() {
    $.post(BASE_URL +API_AUTHEN,
        {   'action': AUTHEN_SEND_SENSOR,
            'nhietdo' :valueSstemp,
            'doam':valueSsHumidity
        },function(data){
            var obj =JSON.parse(data)
            if(obj.status == 1){
                
            }
            else {
                alert(obj.msg)
            }
        })
}
//Bắt sự kiện lưu giá trị hiện tại
saveCurrentValue.click(function () {
    sendValue();
})
//Kiểm tra input time 
function checkInput() {
    if( selectTimeInput.val() === '0') {
        $('#error-message').html('Vui lòng chọn khoảng thời gian mỗi lần lưu');
        return null;
    }
    else {
        $('#error-message').html('');
        return  parseInt(selectTimeInput.val(),10);
    }
}
//Xử lí lưu giá trị tự động
//Xử lí sự kiện selecter input
selectTimeInput.change( function() {
    checkInput();
})

//Xử lí sụ kiện ấn lưu auto
btnSaveAuto.click (function(e) {
    var firebaseRef = firebase.database().ref('valueSensor').child('timesaved')
    var timeInput = checkInput();
   if(timeInput!==null){
    // var myInterval  = setInterval(sendValue,timeInput*60000);
    firebaseRef.set(timeInput);
    localStorage.setItem("timeInput",timeInput)
    localStorage.setItem("isInput",true)
    $('.btn-save').prop('disabled', true);
    selectTimeInput.prop('disabled', true);
    btnStopSave.css('background','')
    localStorage.setItem("isStop",false)
   }
})
//Xử lí sự kiện chỉnh sửa giá trị thời gian lưu
btnEditInput.click(function(){
    if($('.btn-save').prop('disabled')===true) {
        $('.btn-save').prop('disabled', false);
        selectTimeInput.prop('disabled', false);
        localStorage.setItem("isInput",false)
    }
})
//Xử lí sự kiện dừng lưu
btnStopSave.click(function() {
    var firebaseRef = firebase.database().ref('valueSensor').child('timesaved')
    firebaseRef.set(0);
    $('.btn-save').prop('disabled', false);
    selectTimeInput.prop('disabled', false);
    localStorage.removeItem('isInput');
    localStorage.setItem('timeInput','0');
    btnStopSave.css('background','red')
    localStorage.setItem("isStop",true)
})

 function getvalueSsTemperatue(){
    firebase.database().ref("valueSensor").child('temperature').on("value",snapshot=>{
        valueSstemp = snapshot.val();
        valueSstemp =Math.round(valueSstemp)
        $('.value-tempera').text(`${valueSstemp}°C  ${Math.round((valueSstemp*1.8+32))}°F`)
        $('.temperature .subwave').css('top',-valueSstemp*1.4+'%')
    }) 
}

 function getvalueSsHumidity(){
    firebase.database().ref("valueSensor").child('Humidity').on("value",snapshot=>{
        valueSsHumidity = snapshot.val();
        valueSsHumidity =Math.round(valueSsHumidity)
        $('.value-humidity').text(`${valueSsHumidity} %`)
        $('.humidity .subwave').css('top',-valueSsHumidity+'%')
    })
}

$(function() {
    getvalueSsHumidity();
    getvalueSsTemperatue();
});

