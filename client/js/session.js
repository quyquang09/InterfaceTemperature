
window.onload = function() {
    var username = sessionStorage.getItem("username")
    var status  = sessionStorage.getItem("status")
    if(username !== null || status ===1) {
        $('.account').innerHTML = `${username}`
    }
    else{
        $('.account').innerHTML = '<a class="btn-login" href="login.html">Đăng nhập</a>'
    }
    return false;
}
// $(window).load(function() {
//     var username = sessionStorage.getItem("username")
//     var status  = sessionStorage.getItem("status")
//     if(username !== null || status ===1) {
//         $('.account').html(`${username}`)
//     }
//     else{
//         $('.account').html('<a class="btn-login" href="login.html">Đăng nhập</a>')
//     }
//     return false;
// })