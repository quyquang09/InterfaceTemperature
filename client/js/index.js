const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnMenu = $('#btn-menu')
const Nav = $('#Nav')
const navs =$$('.nav>li')
const subnavs = $$('.subnav>li')
app1 = {
    isCloseMenu:false,
    handlEvent: function() {
        //Xử lí sự kiện đóng mở menu
       app1.isCloseMenu = btnMenu.offsetLeft === 20;
        btnMenu.onclick = function() {
            const navHeading =$$('.Nav-heading');
            if(app1.isCloseMenu) {
                Nav.style.width ='220px'
                $('.logo-heading').innerText ='Nhóm 6--!';
                navHeading.forEach(function(element) {
                    element.classList.toggle("display-none");
                    });
                    app1.isCloseMenu =false;
            }else {
                Nav.style.width ='48px'
                $('.logo-heading').innerText ='';
                $('#wrapper-body').style.opacity =1.0;
               navHeading.forEach(function(element) {
                element.classList.toggle("display-none");
                });
                app1.isCloseMenu=true;
                for(var i=0;i<navs.length;i++){
                    if($(`.subnav${i}.open`)!==null){
                        $(`.subnav${i}.open`).classList.remove("open")
                    }
                }
            }
        }
        //Xử lí sự kiện chọn Menu
        Nav.onclick =function(element) {
            var currentClickMenuC1 =element.target.closest('.menu-c1');
            var currentClickMenuC2 =element.target.closest('.subnav li');

            //Click vào các menu cấp 1
                if(currentClickMenuC1){
                    if(currentClickMenuC2){
                        for(var i=0;i<subnavs.length;i++){
                            subnavs[i].classList.remove("subnav-active")
                        }
                        currentClickMenuC2.classList.add("subnav-active")
                    }else{
                        for(var i=0;i<navs.length;i++){
                            navs[i].classList.remove("active","boder-right")
                            if(app1.isCloseMenu===false){
                                if(currentClickMenuC1.contains($(`.subnav${i}`))){
                                    $(`.subnav${i}`).classList.toggle("open")
                                }
                            }
                        }  
                        currentClickMenuC1.classList.add("active","boder-right")
                    }
                }
                else{
                    return;
                }
            $('#wrapper-body')
        }
    },
    Start : function() {
        app1.handlEvent();
    }
}

app1.Start();