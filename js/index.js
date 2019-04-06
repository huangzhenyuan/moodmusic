window.onload=function(){
    var aud=document.getElementById("my-audio");
    var disjunctorMusic=document.getElementsByClassName("disjunctor-music")[0];
    var recommendMusic=document.getElementsByClassName("music")[0];
    var main=document.getElementsByClassName("main")[0];
    var backToTop=document.getElementsByClassName("back-to-top")[0];
    var winWidth = 0;
    var winHeight = 0;
    //根据显示屏大小控制歌词面板的显示    
	var dropdownButton=document.getElementsByClassName("dropdown-button")[0];
	var dropdownContent=document.getElementsByClassName("dropdown-content")[0];
	var dropdownButtonIcon=document.getElementsByClassName("dropdown-button-icon")[0];            
	function findDimensions(){     			
        winWidth=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
        winHeight=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
        var scrollFrame=document.getElementsByClassName("scroll-frame")[0];
		if(winWidth<=480){
            recommendMusic.style.width=main.offsetWidth+"px";
            dropdownContent.style.height=winHeight-175+"px";
            scrollFrame.style.height=winHeight-175+"px";
			dropdownContent.style.display="none";
            dropdownButton.style.display="none";
		}else{
            if(dropdownContent.style.display=="none"){
                recommendMusic.style.width=main.offsetWidth*0.8333+"px";
            }else{                
                recommendMusic.style.width=main.offsetWidth*0.5833+"px";
            }   
            if(winWidth>=481&&winHeight<=480){
                dropdownContent.style.height=140+"px";
                scrollFrame.style.height=140+"px";  
            }else{
                dropdownContent.style.height=390+"px";
                scrollFrame.style.height=390+"px";
            }        
        }
	}
    findDimensions();
    //控制面板控制歌词面板的显示
    var lyricsBtn=document.getElementsByClassName("lyrics-btn")[0];
    var musicMessage=document.getElementsByClassName("music-message");
    var musicBlock=document.getElementsByClassName("music-block");
    function up(){
	    if(dropdownContent.style.display=="none"){
            dropdownButton.style.display="block"; 
		    dropdownContent.style.display="block";
            if(winWidth>480){
                recommendMusic.style.width=main.offsetWidth*0.5833+"px";
                musicMenuControl();  
            }                      
	    }else{
		    dropdownContent.style.display="none";
		    dropdownButton.style.display="none";
            if(winWidth>480){
                recommendMusic.style.width=main.offsetWidth*0.8333+"px";
                musicMenuControl();   
            }								
	    }
    }
    lyricsBtn.addEventListener("click",up);
	dropdownButtonIcon.addEventListener("click",up);
    //心情菜单的位置
    var documentScrollTop;
    var menu=document.getElementsByClassName("menu")[0];
    function menuLocation(){
        documentScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(documentScrollTop>35){
            menu.style.top = documentScrollTop+"px";                    
        }else{
            menu.style.top =65+"px";
        }        
    }
    // menuLocation();
	//回到顶部按钮的显示
    function backToTopDisplay(){
        documentScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(documentScrollTop>35){
            if(winWidth>480){                       
                backToTop.style.display="block";
            }else{
                backToTop.style.display="none";
            }
            menu.style.top = documentScrollTop+"px";                    
        }else{
            menu.style.top =65+"px";
            backToTop.style.display="none";
        }
    }
    backToTopDisplay();
    //监控窗口滚动条位置
	window.onscroll = function(){
        menuLocation();                          
		backToTopDisplay();	
	};
    //歌曲封面图片控制
    var imgs=["img/1.jpg","img/2.jpg","img/3.jpg",
            "img/4.jpg","img/5.jpg","img/6.jpg",
            "img/7.jpg","img/8.jpg","img/9.jpg",
            "img/10.jpg","img/11.jpg","img/12.jpg"];
    function musicImgControl(){
        for(var i=musicMessage.length;i--;){
            musicMessage[i].style.backgroundImage="url("+imgs[i]+")";
        }
    }
    musicImgControl();
    //歌曲封面按钮大小的控制
    var bgImgBtn=document.getElementsByClassName("bg-img-btn");
    function musicMenuControl(){
        for(var i=0;i<bgImgBtn.length;i++){
            bgImgBtn[i].style.fontSize =musicMessage[i].offsetWidth/3+"px";               
        }
    };
    musicMenuControl();
    //控制面板歌曲信息和歌词面板歌词的显示
    var lyricsUrl=[];
    var lyricsContent=[];
    for(var c=0;c<music.lyrics.length;c++){
        lyricsUrl[c]=music.lyrics[c].url;
        lyricsContent[c]=music.lyrics[c].content;
    };
    aud.onplay=function(){
        var musicName=document.getElementsByClassName("music-name");
        var singerName=document.getElementsByClassName("singer-name");
        disjunctorMusic.className="disjunctor-music fa fa-pause";
        var transferredMeaning=decodeURIComponent(aud.currentSrc);
        var url=transferredMeaning.slice(transferredMeaning.indexOf("music/happy/")); 
        var urlPassage=transferredMeaning.slice(transferredMeaning.indexOf("music/happy/"),-4); 
        var musicMessage=urlPassage.split(/\/|-/g); 
        musicName[0].innerHTML=musicMessage[3];
        singerName[0].innerHTML=musicMessage[2];
        for(var d=0;d<lyricsUrl.length;d++){
            if(lyricsUrl[d]==url){                        
                var substance=document.getElementsByClassName("substance")[0];
                var scrollFrame=document.getElementsByClassName("scroll-frame")[0];
                scrollFrame.scrollTop=0;
                substance.innerHTML=lyricsContent[d].replace(/\n/g,"<br/><br/>");
            }
        }
    }
    aud.onpause=function(){
        disjunctorMusic.className="disjunctor-music fa fa-play"; 
    }
    //歌曲封面按钮切歌            
    var arr=[];
    var soundVolumeSmallerAndSmaller;
    for(var j=music.happy.length-1;j>=0;j--){
        arr[music.happy.length-1-j]=music.happy[j].url;
    };
    var soundVolumeMethod=function(t){
        function soundVolume(){                            
            if(aud.volume>0){
                aud.volume=aud.volume-0.1<=0?0:aud.volume-0.1;
            }else if(aud.volume==0){                               
                aud.pause();
            }
        }  
        soundVolumeSmallerAndSmaller=setInterval(function(){
            soundVolume()
        },t);                 
    };
    function bgImgBtnControl(e){
        var target=e.target;
        var n=0;
        if(target.className=="bg-img-btn fa fa-play"){
            clearInterval(soundVolumeSmallerAndSmaller);
            aud.volume=1.0;
            target.className="bg-img-btn fa fa-pause";
            target.style.color="rgb(255, 45, 45)";
            for(var j=0;j<bgImgBtn.length;j++){
                if(bgImgBtn[j]!=target){
                    bgImgBtn[j].className="bg-img-btn fa fa-play";
                    bgImgBtn[j].style.color="rgba(128, 128, 128,0.5)";
                }
            }
            for(var i=0;i<bgImgBtn.length;i++){
                if(bgImgBtn[i]==target){
                    n=i+1;
                }
            }
            aud.src=arr[arr.length-n];
            setTimeout(function(){
                aud.play();
            },30);            
        }else{
            target.className="bg-img-btn fa fa-play";
            target.style.color="rgba(128, 128, 128,0.5)";                    
            soundVolumeMethod(200);                       
        }                    
    }
    for(var i=0;i<bgImgBtn.length;i++){
        bgImgBtn[i].addEventListener("click",bgImgBtnControl);
    } 
    //监控窗口大小
    window.onresize=function(){
        setTimeout(function(){
            findDimensions();
            musicMenuControl();
            // overflowShowEllipsis();
            backToTopDisplay();
        },30);
    }
    //控制面板歌曲切换
    disjunctorMusic.onclick=function(){
        if(this.className=="disjunctor-music fa fa-play"){
        // if(aud.paused){
            clearInterval(soundVolumeSmallerAndSmaller);
            aud.volume=1.0;
            this.className="disjunctor-music fa fa-pause";
            if(aud.currentSrc==""){
                aud.src=arr[arr.length-1];
            }
            setTimeout(function(){
                aud.play();
            },30);
        }else{
            clearInterval(soundVolumeSmallerAndSmaller);
            this.className="disjunctor-music fa fa-play";
            for(var i=0;i<bgImgBtn.length;i++){
                bgImgBtn[i].className="bg-img-btn fa fa-play";
                bgImgBtn[i].style.color="rgba(128, 128, 128,0.5)";
            };
            soundVolumeMethod(200);
        }                 
    }
    var backwardMusic=document.getElementsByClassName("backward-music")[0];
    var forwardMusic=document.getElementsByClassName("forward-music")[0];
    function CutSong(e){
        if(aud.currentSrc!=""){
            clearInterval(soundVolumeSmallerAndSmaller);
            aud.volume=1.0;
            var transferredMeaning=decodeURIComponent(aud.currentSrc);
            var url=transferredMeaning.slice(transferredMeaning.indexOf("music/happy/"));
            var i=arr.indexOf(url);
            var musicSequence=arr.length-i;
            aud.pause();
            if(e.target==backwardMusic){
                if(musicSequence==1){
                    aud.src=arr[0];
                }else{
                    aud.src=arr[arr.length-musicSequence+1];
                }
            }else{
                if(musicSequence==arr.length){
                    aud.src=arr[arr.length-1]
                }else{
                    aud.src=arr[arr.length-musicSequence-1]
                }
            }
            for(var j=0;j<bgImgBtn.length;j++){
                bgImgBtn[j].className="bg-img-btn fa fa-play";
                bgImgBtn[j].style.color="rgba(128, 128, 128,0.5)";
                        
            }
            setTimeout(function(){
                aud.play();
            },30);
        }
    }
    backwardMusic.addEventListener("click",CutSong);
    forwardMusic.addEventListener("click",CutSong);

    //歌曲轮播            
    aud.onended=function(){
        var transferredMeaning=decodeURIComponent(aud.currentSrc);
        var url=transferredMeaning.slice(transferredMeaning.indexOf("music/happy/")); 
        var i=arr.indexOf(url);
        var musicSequence=arr.length-i;
        if(musicSequence==arr.length){
            aud.src=arr[arr.length-1]
        }else{
            aud.src=arr[arr.length-musicSequence-1]
        }                
        setTimeout(function(){
            aud.play();
        },30);
        for(var i=0;i<bgImgBtn.length;i++){
            bgImgBtn[i].className="bg-img-btn fa fa-play";
            bgImgBtn[i].style.color="rgba(128, 128, 128,0.5)";
        }
    };

    //控制面板进度条

}