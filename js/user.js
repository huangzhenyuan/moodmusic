        window.onload=function(){
            //注册和登录表单分页
            var registerPagingMenu=document.getElementsByClassName("register-pagingMenu")[0];
            var entryPagingMenu=document.getElementsByClassName("entry-pagingMenu")[0];
            var register=document.getElementsByClassName("register")[0];
            var entry=document.getElementsByClassName("entry")[0];
            function show(e){
                var target=e.target;
                if(target==registerPagingMenu){
                    register.style.display="block";
                    registerPagingMenu.style.background="#0073e6";
                    entry.style.display="none";
                    entryPagingMenu.style.background="#1a8cff";
                }else{
                    register.style.display="none";
                    entryPagingMenu.style.background="#0073e6";
                    entry.style.display="block";
                    registerPagingMenu.style.background="#1a8cff";
                }
            }
            registerPagingMenu.addEventListener("click",show);
            entryPagingMenu.addEventListener("click",show);
            //注册表单验证
            var newUser=document.getElementsByClassName("new-user")[0];
            var newPwd=document.getElementsByClassName("new-pwd")[0];
            var registerMenu=document.getElementsByClassName("register-menu")[0];
            function notNull(){
                var newUserValue=newUser.value;
                var noSpaceUserValue=newUserValue.replace(/\s/g,""); 
                if(noSpaceUserValue!="" && newPwd.value!=""){
                    registerMenu.removeAttribute("disabled");
                }else{
                    registerMenu.setAttribute("disabled","disabled");
                };                                  
            };
            newUser.addEventListener("input",notNull);
            newPwd.addEventListener("input",notNull);
            register.onsubmit=function(){
                var newPwdValue=newPwd.value;
                function isValid(newPwdValue) { 
                    return /^\w+$/.test(newPwdValue); 
                };
                function isPureDigits(newPwdValue) { 
                    return /^\d+$/.test(newPwdValue);
                };
                if(isValid(newPwdValue)==true&&isPureDigits(newPwdValue)==false&&newPwdValue.length>=6){
                    if(typeof(Storage)!=="undefined"){
                        if(localStorage.getItem(newUser.value)!=null){
                            alert("该账号已经注册！")
                        }else{
                            // localStorage.clear();
                            localStorage.setItem(newUser.value,newPwdValue);
                            alert("注册成功！");
                            register.style.display="none";
                            entryPagingMenu.style.background="#0073e6";
                            entry.style.display="block";
                            registerPagingMenu.style.background="#1a8cff"; 
                        }                       
                    } else {
                        alert("抱歉!您的浏览器不支持注册本站账号，请升级浏览器或使用其它浏览器后注册");
                        return false;
                    }
                }else{
                    alert("密码由字母数字和下划线组成，不能为纯数字，至少6个");
                    return false;
                };
                return false;             
            };
            //登录表单认证
            var user=document.getElementsByClassName("user")[0];
            var pwd=document.getElementsByClassName("pwd")[0];
            var entryMenu=document.getElementsByClassName("entry-menu")[0];
            function notNullTwo(){
                var userValue=user.value;
                var noSpaceUserValue=userValue.replace(/\s/g,""); 
                if(noSpaceUserValue!="" && pwd.value!=""){
                    entryMenu.removeAttribute("disabled");
                }else{
                    entryMenu.setAttribute("disabled","disabled");
                };                                  
            };
            user.addEventListener("input",notNullTwo);
            pwd.addEventListener("input",notNullTwo);
            document.onkeyup = function (e) {
                var code = e.charCode || e.keyCode;
                if (code == 13) {
                    if(register.style.display!="none"){
                        newUser.focus();                   
                        if(newUser.value!=""){
                            newPwd.focus();
                        }else if(newPwd.value!=""){
                            newUser.focus();
                        };                           
                    }else{
                        user.focus();                   
                        if(user.value!=""){
                            pwd.focus();
                        }else if(pwd.value!=""){
                            user.focus();
                        };   
                    }          
                };
            };
            entry.onsubmit=function(){
                var userValue=user.value;
                var pwdValue=pwd.value;
                if(localStorage.getItem(userValue)==null){
                    alert("账号不存在或密码错误!");
                    return false;
                }else if(localStorage.getItem(userValue)!=pwdValue){
                    alert("账号不存在或密码错误!");
                    return false;
                }else{
                    alert("登录成功!");
                    window.location.href='index.html';
                }
                return false;
            }                            
        }