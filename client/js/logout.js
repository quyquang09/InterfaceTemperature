
$('.log-out').click(function(e){
    //đoạn mã sẽ được thực thi khi sự kiện click() xảy ra
    var ss = confirm('bạn có muốn đăng xuất')
    if(ss===true){
        //$(location).attr('href','https://www.facebook.com');
        window.location.href ='login.html';
        //sessionStorage.removeItem('username');
        //sessionStorage.removeItem('status');
        sessionStorage.clear();
    }
})