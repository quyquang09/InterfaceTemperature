
const btnMenu = $('#btn-menu')
const Nav = $('#Nav')
const navs =$('.nav>li')
const subnavs = $('.subnav>li')


app = {
    isCloseMenu:false,
    handlEvent: function() {
        //Xử lí sự kiện đóng mở menu
       app.isCloseMenu = btnMenu.offsetLeft === 20;
       btnMenu.click (function() {
            const navHeading =$('.Nav-heading');
            if(app.isCloseMenu) {
                Nav.width(48); 
                $('.logo-heading').text('Ninja School--!');
                navHeading.toggleClass("display-none");
                app.isCloseMenu =false;
            }else {
                Nav.width(220); 
                $('.logo-heading').innerText ='';
                navHeading.toggleClass("display-none");
                app.isCloseMenu=true;
                for(var i=0;i<navs.length;i++){
                    if($(`.subnav${i}.open`)!==null){
                        $(`.subnav${i}.open`).removeClass("open")
                    }
                }
            }
        }) 
            
        //Xử lí sự kiện chọn Menu
        navs.click(function(element) {
            var currentClickMenuC1 =element.target.closest('.menu-c1');
            var currentClickMenuC2 =element.target.closest('.subnav li');
            //Click vào các menu cấp 1
                if(currentClickMenuC1){
                    if(app.isCloseMenu===true){
                        navs.removeClass("active boder-right");
                        $(this).addClass("active boder-right");
                        if($(this).find('.subnav')){
                            $(this).find('.subnav').toggleClass('open')
                        } 
                        
                    }
                }
            //    else if(currentClickMenuC2){
            //         subnavs.removeClass("subnav-active")
            //         $(this).find('.subnav li').addClass("subnav-active")
            //         console.log($(this))
            //     }
            //     else{
            //         return;
            //     }
            
        })
    },
    Start : function() {
        var username = sessionStorage.getItem("username")
        var status  = sessionStorage.getItem("status")
        if(username !== null || status ===1) {
            $('.account').html(`${username}`)
        }
        else{
            $('.account').html('<a class="btn-login" href="login.html">Đăng nhập</a>')
        }
        app.handlEvent();
    }
}

app.Start();