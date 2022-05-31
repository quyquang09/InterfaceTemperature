
var h1=0, h2 = 0,h3=0, h_set=null; // Giờ
var m1=0, m2 = 0,m3=0, m_set=null; // Phút
var s1=0, s2 = 0,s3=0;				// Giây
var d_h,d_m; 				
var timeoutLamp1,timeoutLamp2,timeoutLamp3 ;

const statustLamp1=$('.switch-toggle1')
const statustLamp2 =$('.switch-toggle2')
const statustLamp3 =$('.switch-toggle3')
//Điều hoà
const statustHarmonic1 = $('#statust-harmonic1')
const statustHarmonic2 = $('#statust-harmonic2')
const ChooseDewHr1 = $('#harmonic-bedroom .dew')
const ChooseColdHr1 = $('#harmonic-bedroom .cold')
const ChooseWindHr1 = $('#harmonic-bedroom .wind')
const ChooseDriedHr1 = $('#harmonic-bedroom .dried')
const togglePlusHr1 =$('#harmonic-bedroom .icon-plus')
const toggleMinusHr1 = $('#harmonic-bedroom .icon-minus')
// Quạt
const statusFan1 = $('#statust-Fan1')
const statusFan2 = $('#statust-Fan2')
const chooseturnFan1 = $('#Fan-bedroom .turn')
const choosedewFan1 = $('#Fan-bedroom .dew')
const choosedriedFan1 = $('#Fan-bedroom .driedFan')
const speedFan1 = document.getElementsByName("Fan1-speed")
var valueSpeedFan1='';
const propeller =$('.imgOpenFan1')
// tivi
const btnNextProgram = $('#tivi-bedroom .next')
const btnPrevProgram = $('#tivi-bedroom .prev')
const btnHome = $('#tivi-bedroom .home')
const toggleePlusTv1 = $('#tivi-bedroom .icon-plus')
//Sensor
const toggleSsTemperature = $('#toggle-ssTemperature')
const toggleSsHumidity = $('#toggle-ssHumidity')

const toggleSetTimer =$('#save-timer')
const NavDevicce = $('#nav-control-device')
const toggleLamp =$('#toggle-lamp')
const toggleHarmonic =$('#toggle-harmonic')
const toggleFan = $('#toggle-fan')
const toggleTv = $('#toggle-tv')
const device = $$('#device')
const btnCloseMessage = $('.messageError button')
var codes
var delayInMilliseconds = 1000; //1 second
let s=0,m=0,h=0
var updates ={}
//Giá trị cảm biến
var valueSstemp =0;
var valueSsHumidity=0;
const app = {
 //Trạng thái đèn
 isStartusLamp1:true,
 isStartusLamp2:true,
 isStartusLamp3:true,
 
 //Trạng thái điều hoà
 isStartusHarmonic1:false,
 isStartusHarmonic2:true,
 // Trang thai quat
 isStartusFan1:false,
 duration1:0,
 tempharmonic: parseInt($('.valuetemp1').innerHTML),
 volumeTivi1: parseInt(document.getElementById('valueTivi1').innerHTML),
 currentProgram:1,

 // Xử lí các sự kiện của đèn
 handleEventLamp: function() {
     //Xử lí sự kiện chọn thiết bị đèn
     toggleLamp.onclick = function() {
         NavDevicce.childNodes.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className =""
             }
         })
         device.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className ="close"
             }
         })
         toggleLamp.classList.add('active-nav')
         device[0].classList.add('open')	
     },
     // Bắt sự kiện bật đèn phòng ngủ
     statustLamp1.addEventListener('click',function(){
        
         
         if(app.isStartusLamp1){
             $('.device-lamp img').src="../client/img/denon.png"
             $('#lamp-bedroom .status').lastChild.data= 'Đang Bật'
             app.isStartusLamp1 =false
             app.startTimeLamp1()
         }
         else {
             $('.device-lamp img').src="../client/img/denoff.png"
             $('#lamp-bedroom  span').lastChild.data= 'Đang Tắt'
             app.stopTimeLamp1();
             app.isStartusLamp1 =true
         }
     }),
     // Bắt sự kiện bật đèn phòng khách
     statustLamp2.addEventListener('click',function(){
         if(app.isStartusLamp2){
             app.startTimeLamp2()
             $('#lamp-guestRoom img').src="../client/img/denon.png"
             $('#lamp-guestRoom span').lastChild.data= 'Đang Bật'
             app.isStartusLamp2 =false
         }
         else {
             app.stopTimeLamp2();
             $('#lamp-guestRoom span').lastChild.data= 'Đang Tắt'
             $('#lamp-guestRoom img').src="../client/img/denoff.png"
             app.isStartusLamp2 =true
         }
     }),
     //Bắt sự kiện bật tắt đèn phòng bếp
     statustLamp3.addEventListener('click',function(){
         if(app.isStartusLamp3){
             app.startTimeLamp3()
             $('#Lamp-kitchen img').src="../client/img/denon.png"
             $('#Lamp-kitchen span').lastChild.data= 'Đang Bật'
             app.isStartusLamp3 =false
         }
         else {
             app.stopTimeLamp3()
             $('#Lamp-kitchen img').src="../client/img/denoff.png"
             $('#Lamp-kitchen span').lastChild.data= 'Đang Tắt'
             app.isStartusLamp3 =true
         }
     })
 },
 // Xử lí các sự kiện của điều hoà
 handleEventharmonic: function() {
     //Xử lí sự kiện chọn thiết bị điều hoà
     toggleHarmonic.onclick = function() {
         NavDevicce.childNodes.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className =""
             }
         })
         device.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className ="close"
             }
         })
         toggleHarmonic.classList.add('active-nav')
         device[1].classList.add('open')
     },
     // xử lí khi bật điều hoà phòng ngủ
     statustHarmonic1.addEventListener('click',function(){
         if(app.isStartusHarmonic1===false){
             app.settemperatureharmonic();
             $('.valuetemp1').classList.remove('close')
             app.isStartusHarmonic1 =true
             $('#harmonic-bedroom .img').src="../client/img/dieuhoaon.png"
         }
         else {
             app.isStartusHarmonic1 =false
             $('.valuetemp1').classList.add('close')
             $$('#harmonic-bedroom .active-btn').forEach(element =>{
                 element.classList.remove('active-btn')
             })
             $('#harmonic-bedroom .img').src="../client/img/dieuhoaoff.png"
         }
     }),
     // xử lí khi bật điều hoà phòng khách
     statustHarmonic2.addEventListener('click',function(){
         if(app.isStartusHarmonic2){
             app.isStartusHarmonic2 =false
         }
         else {
             app.isStartusHarmonic2 =true   
         }
     }),
     //Xử lí sự kiện bật tạo độ ẩm
     isChosseDew =true,
     ChooseDewHr1.onclick =function() {
         if(app.isStartusHarmonic1){
             if(isChosseDew ){	
                 isChosseDew =false;
                 $('#harmonic-bedroom .dew .icon-btn').classList.toggle('active-btn')
             }
             else if(isChosseDew===false ) {
                 isChosseDew =true;
                 $('#harmonic-bedroom .dew .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật điều hoà trước')
         }
     },
     //xử lí sự kiện bật làm lạnh nhanh
     isChosseCold =true,
     ChooseColdHr1.onclick =function() {
         if(app.isStartusHarmonic1){
             if(isChosseCold){	
                 isChosseCold =false;
                 $('#harmonic-bedroom .cold .icon-btn').classList.toggle('active-btn')
             }
             else {
                 isChosseCold =true;
                 $('#harmonic-bedroom .cold .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật điều hoà trước')
         }
     }
     //Xử lí sự kiện bật nút quạt
     isChosseWind =true,
     ChooseWindHr1.onclick =function() {
         if(app.isStartusHarmonic1){
             if(isChosseWind){	
                 updates['harmonic-bedroom/1/' + 'wind'] = 'On';
                 firebase.database().ref().update(updates);
                 isChosseWind =false;
                 $('#harmonic-bedroom .wind .icon-btn').classList.toggle('active-btn')
             }
             else {
                 updates['harmonic-bedroom/1/' + 'wind'] = 'Off';
                 firebase.database().ref().update(updates);
                 isChosseWind =true;
                 $('#harmonic-bedroom .wind .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật điều hoà trước')
         }
     }
     //Xử lí sự kiện bật nút Sưởi
     isChosseDried =true,
     ChooseDriedHr1.onclick =function() {
         if(app.isStartusHarmonic1){
             if(isChosseDried){	
                 updates['harmonic-bedroom/1/' + 'dried'] = 'On';
                 firebase.database().ref().update(updates);
                 isChosseDried =false;
                 $('#harmonic-bedroom .dried .icon-btn').classList.toggle('active-btn')
             }
             else {
                 updates['harmonic-bedroom/1/' + 'dried'] = 'Off';
                 firebase.database().ref().update(updates);
                 isChosseDried =true;
                 $('#harmonic-bedroom .dried .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật điều hoà trước')
         }
     }
     //Xử lí sự kiện bật nút Tăng nhiệt độ
     togglePlusHr1.onclick = function() {
         if(app.tempharmonic!==32){
             app.tempharmonic++;
             app.settemperatureharmonic();
             updates['harmonic-bedroom/1/' + 'temperature'] = ''+app.tempharmonic
             firebase.database().ref().update(updates);
         }
         else {
             app.tempharmonic =app.tempharmonic
         }
     }
     //Xử lí sự kiện bật nút giảm nhiệt độ 
     toggleMinusHr1.onclick = function() {
         if(app.tempharmonic>10){
             app.tempharmonic--;
             app.settemperatureharmonic();
             updates['harmonic-bedroom/1/' + 'temperature'] = ''+app.tempharmonic
             firebase.database().ref().update(updates);
         }
         else {
             app.tempharmonic =app.tempharmonic
         }
     }
 },
 // Xử lí các sự kiện của quạt
 handleEventFan: function() {
     //Xử lí sự kiện chọn thiết bị quạt
     toggleFan.onclick = function() {
         
         NavDevicce.childNodes.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className =""
             }
         })
         device.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className ="close"
             }
         })
         toggleFan.classList.add('active-nav')
         device[2].classList.add('open')
     }
     //Xử lí khi ấn bật quạt
     const FanAnimate1 = propeller.animate([
         {transform:'rotate(360deg)'}
     ],{
         duration: 100,
         iterations: Infinity
     })
     statusFan1.addEventListener('click',function(){
         app.getValueSpeedFan1()
         if(app.isStartusFan1===false){
             app.isStartusFan1 =true
             FanAnimate1.play();
             $('#imgOpenFan1').classList.remove('openFan')
             $('#imgFan1off').classList.add('openFan')
         }
         else {
             $('#imgFan1off').classList.remove('openFan')
             $('#imgOpenFan1').classList.add('openFan')
             app.isStartusFan1 =false
             FanAnimate1.pause();
             $$('#Fan-bedroom .active-btn').forEach(element =>{
                 element.classList.remove('active-btn')
             })
         }
     })
     // Xử lí sự kiện ấn xoay quạt
     isChosseTurnFan1 =false,
     chooseturnFan1.onclick = function() {
         if(app.isStartusFan1){
             if(isChosseTurnFan1===false){	
                 isChosseTurnFan1 =true;
                 $('#Fan-bedroom .turn .icon-btn').classList.toggle('active-btn')
             }
             else {
                 isChosseTurnFan1 =false;
                 $('#Fan-bedroom .turn .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật quạt trước !!!')
         }
     }

     //Xử lí khi ấn nút phun sương
     ischossedewFan1 =false,
     choosedewFan1.onclick = function() {
         if(app.isStartusFan1){
             if(ischossedewFan1===false){	
                 ischossedewFan1 =true;
                 $('#Fan-bedroom .dew .icon-btn').classList.toggle('active-btn')
             }
             else {
                 ischossedewFan1 =false;
                 $('#Fan-bedroom .dew .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật quạt trước !!!')
         }
     }
     //Xử lí sự kiện bật nút sưởi
     isChosseDriedFan1 =false,
     choosedriedFan1.onclick = function() {
         if(app.isStartusFan1){
             if(isChosseDriedFan1===false){	
                 isChosseDriedFan1 =true;
                 $('#Fan-bedroom .driedFan .icon-btn').classList.toggle('active-btn')
             }
             else {
                 isChosseDriedFan1 =false;
                 $('#Fan-bedroom .driedFan .icon-btn').classList.toggle('active-btn')
             }
         }
         else {
             app.MessageError('Vui lòng bật quạt trước !!!')
         }
     }
      
     $('.speed-body ').onclick =function() {
         app.getValueSpeedFan1()
         if(app.isStartusFan1 ===true){
             FanAnimate1.play();
         }
     }
     
 },
 //Xử lí các sự kiện cho tivi
 handleEventTivi: function() {
     //Xử lí sự kiện chọn thiết bị Tivi
     toggleTv.onclick = function() {
         NavDevicce.childNodes.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className =""
             }
         })
         device.forEach(element=>{
             if(element.className !=='undefined'){
                 element.className ="close"
             }
         })
         toggleTv.classList.add('active-nav')
         device[3].classList.add('open')
     }
     //Xử lí sự kiện on/off
     isstatusTivi1 =false,
     $('#tivi-bedroom .on-off').onclick =function() {
         if(isstatusTivi1===false){
             isstatusTivi1 =true
             $('#tivi-bedroom .on-off i').classList.add('active-btn')
             $('#tivi-bedroom img').src=`../client/img/vtv${app.currentProgram}.png`
             $('#tivi-bedroom .currentProgram').innerHTML =`VTV ${app.currentProgram}`
         }
         else {
             isstatusTivi1 =false
             $('#tivi-bedroom img').src=`../client/img/tivioff.png`
             $('#tivi-bedroom .currentProgram').innerHTML ="OFF"
             $$('#tivi-bedroom .active-btn').forEach(element =>{
                 element.classList.remove('active-btn')
             })
         }
     }
     // Xử lí sự kiện ấn nút next chương trình
     btnNextProgram.onclick =function () {
         if(isstatusTivi1){
             if(app.currentProgram <6){
                 app.currentProgram++;
                 $('#tivi-bedroom img').src=`../client/img/vtv${app.currentProgram}.png`
                 $('#tivi-bedroom .currentProgram').innerHTML =`VTV ${app.currentProgram}`
             }
             else {
                 app.currentProgram = 1
                 $('#tivi-bedroom img').src=`../client/img/vtv${app.currentProgram}.png`
                 $('#tivi-bedroom .currentProgram').innerHTML =`VTV ${app.currentProgram}`
             }
         }
         else {
             app.MessageError('Vui lòng bật Tivi trước !!!')
         }
     }
     //Xử lí sự kiện quay lại chương trình trước đó
     btnPrevProgram.onclick =function () {
         if(isstatusTivi1){
             if(app.currentProgram >1){
                 app.currentProgram--;
                 $('#tivi-bedroom img').src=`../client/img/vtv${app.currentProgram}.png`
                 $('#tivi-bedroom .currentProgram').innerHTML =`VTV ${app.currentProgram}`
             }
             else {
                 app.currentProgram = 6
                 $('#tivi-bedroom img').src=`../client/img/vtv${app.currentProgram}.png`
                 $('#tivi-bedroom .currentProgram').innerHTML =`VTV ${app.currentProgram}`
             }
         }
         else {
             app.MessageError('Vui lòng bật Tivi trước !!!')
         }
     }
     // Xử lí sự kiện ấn nút Home
     btnHome.onclick = function() {
         if(isstatusTivi1) {
             timeoutLamp2 = setTimeout(function(){
                 $('#tivi-bedroom .home i').classList.toggle('active-btn')
 
             }, 500);
             $('#tivi-bedroom .home i').classList.toggle('active-btn')
             $('#tivi-bedroom img').src=`../client/img/vtvHome.png`
             $('#tivi-bedroom .currentProgram').innerHTML =`Home`
         }
         else {
             app.MessageError('Vui lòng bật Tivi trước !!!')
         }
     }
     //Xử lí sự kiện bật nút Tăng âm lượng
     toggleePlusTv1.onclick = function() {
         if(app.volumeTivi1 < 100){
             app.volumeTivi1++;
             $('#tivi-bedroom .progress-bar').style.width = app.volumeTivi1+"%";
             document.getElementById('valueTivi1').innerHTML = app.volumeTivi1 +''
         }
         else {
             app.volumeTivi1 =app.volumeTivi1
         }
     }
 },

 handleEventSetTime: function() {
     //Bắt sự kiện đặt giờ
     toggleSetTimer.onclick =function() {
         h_set = parseInt($('.timer-val input:first-child').value);
         m_set = parseInt($('.timer-val input:nth-child(2)').value);
     }

 },
 startTimeLamp1: function() {
     if (s1 === 59){
         m1 += 1;
         s1 = 0;
     }
     if (m1 === 59){
         h1 += 1;
         m1 = 0;
     }
     /* HIỂN THỊ ĐỒNG HỒ*/
     document.getElementById('displayTime1').innerHTML = (h1 < 10 ? '0'+ h1 : h1) + ":" + (m1 < 10 ?  '0'+m1 : m1)  + ":" + (s1 < 10 ?  '0'+ s1 : s1);
     timeoutLamp1 = setTimeout(function(){
         s1++;
         app.startTimeLamp1()
     }, 1000);
 },
 stopTimeLamp1:function(){
     clearTimeout(timeoutLamp1)
 },
 startTimeLamp2: function() {
     if (s2 === 59){
         m2 += 1;
         s2 = 0;
     }
     if (m2 === 59){
         h2 += 1;
         m2 = 0;
     }
     /* HIỂN THỊ ĐỒNG HỒ*/
     document.getElementById('displayTime2').innerHTML = (h2 < 10 ? '0'+ h2 : h2) + ":" + (m2 < 10 ?  '0'+m2 : m2)  + ":" + (s2 < 10 ?  '0'+ s2 : s2);
     timeoutLamp2 = setTimeout(function(){
         s2++;
         app.startTimeLamp2()
     }, 1000);
     
 },
 stopTimeLamp2:function(){
     clearTimeout(timeoutLamp2)
 },
 startTimeLamp3: function() {
     
     ;
     if (s3 === 59){
         m3 += 1;
         s3 = 0;
     }
     if (m3 === 59){
         h3 += 1;
         m3 = 0;
     }
     /* HIỂN THỊ ĐỒNG HỒ*/
     document.getElementById('displayTime3').innerHTML = (h3 < 10 ? '0'+ h3 : h3) + ":" + (m3 < 10 ?  '0'+m3 : m3)  + ":" + (s3 < 10 ?  '0'+ s3 : s3);

     timeoutLamp3 = setTimeout(function(){
         s3++;
         app.startTimeLamp3()
     }, 1000);
     
 },
 stopTimeLamp3:function(){
     clearTimeout(timeoutLamp3)
 },

 MessageError: function(messerror) {
     $('.messageError h1').innerText = messerror
     $('.messageError').classList.remove('close')
 }
 ,
 settemperatureharmonic:function() {
         $('.control-temp .progress-bar').style.width = 3.125 *app.tempharmonic +'%';
         $('.valuetemp1').innerHTML = app.tempharmonic +'°C'
         if(app.tempharmonic <=17) {
             $('.control-temp .progress-bar').style.background = '#26c248'
         }
         if(app.tempharmonic >17 && app.tempharmonic <=21) {
             $('.control-temp .progress-bar').style.background = '#a0c226'
         }
         else if(app.tempharmonic >21 && app.tempharmonic <=26) {
             $('.control-temp .progress-bar').style.background = '#ece13a'
         }
         else if(app.tempharmonic >26 && app.tempharmonic <=32) {
             $('.control-temp .progress-bar').style.background = '#fd0000'
         }
 },
 getRealTime: function() {
         
         d_h=+new Date().getHours();
         d_m=+new Date().getMinutes();
         if(h_set==d_h &&m_set==d_m) {
                 statustLamp1.click();
                 app.isgetTime=false;
         }	
         
     time = setTimeout(function(){
         app.getRealTime()
     }, 60000);
 },
 getValueSpeedFan1: function() {
     speedFan1.forEach(element=>{
         if(element.checked===true){		
         valueSpeedFan1 = element.value;
         }
     })
 },

 Start: function() {
    //  this.handleControl();
    //  this.handleEventLogin();
     this.handleEventLamp();
     this.handleEventharmonic();
     this.handleEventFan();
     this.handleEventTivi();
     this.handleEventSetTime();
     this.getRealTime();
 }
}

app.Start();