;(function(window,document,$,undefined){

    var viccarbe = {
        init:   function(){
            var that=this;
                that.headerFn();
                that.sec01Fn();
                that.sec02Fn();
                that.sec03Fn();
                that.sec04Fn();
                that.sec05Fn();
                that.sec06Fn();
                that.sec07Fn();
                that.sec08Fn();
                that.sec09Fn();
                that.sec10Fn();
                that.sec11Fn();
        },
        headerFn:   function(){
            var smoothBtn = $('.smoothBtn');
            var mobileMenu = $('.mobileMenu');
            var mobileBtn = $('.mobileBtn');
            var win = $(window);
            var htmlBody = $('html,body');
            var header = $('#header');
            var goTop = $('.goTop');

            var mainBtn = $('.mainBtn');
            var moMainBtn = $('.moMainBtn');
            var langBtn = $('.lang-wrap');
            var searchBtn = $('.search-btn');
            var searchCloseBtn = $('.search-close-btn');
            var searchWrap = $('.h-search-wrap');
            var wheelE = $('.wheelE');

            var winW = win.innerWidth();
            var url = null;
            var t = 0;

                smoothBtn.on({
                    click: function(){
                        var that =$(this);

                        url = that.attr('href');
                        t=0;
                        mobileMenu.stop().animate({left:-150+'%'},0);
                        mobileBtn.removeClass('addClose');
                    }
                });

                win.scroll(function(){
                    if( win.scrollTop() >= 30 ){
                        goTop.addClass('addGoTop');
                    }
                    else{
                        goTop.removeClass('addGoTop');
                    }
                });

                win.resize(function(){
                    winW = win.innerWidth();
                    if( winW>1200 ){
                        t=0;
                        mobileBtn.removeClass('addClose');
                        mobileMenu.stop().animate({left:-150+'%'},400);
                    }
                });

                mobileBtn.on({
                    click: function(){
                        var that = $(this);
                        that.toggleClass('addClose');
                        if(t==0){
                            t=1;
                            mobileMenu.stop().animate({left:0},400);
                        }
                        else{
                            t=0;
                            mobileMenu.stop().animate({left:-150+'%'},400);
                        }
                    }
                });

                mainBtn.on({
                    click: function(){
                        var that = $(this);
                        that.next().stop().slideToggle(600,'swing');
                    }
                });

                moMainBtn.on({
                    click: function(){
                        var that = $(this);
                        that.next().stop().slideToggle(600,'swing');
                    }
                });

                langBtn.on({
                    click: function(e){
                        var that = $(this);
                        e.preventDefault();
                        that.next().stop().slideToggle(600,'swing');
                    }
                });

                searchBtn.on({
                    click: function(e){
                        e.preventDefault();
                        header.addClass('addO');
                        mobileBtn.removeClass('addClose');
                        searchWrap.stop().slideDown(600,'swing');
                    }
                });

                searchCloseBtn.on({
                    click: function(e){
                        e.preventDefault();
                        header.removeClass('addO');
                        mobileBtn.toggleClass('addClose');
                        searchWrap.stop().slideUp(600,'swing');
                        moMainBtn.next().stop().slideUp(600,'swing');
                    }
                });

                var _wheelDelta = null;
                var n = wheelE.length;

                    wheelE.each(function(idx){
                        var that = $(this);
                        that.on('mousewheel DOMMouseScroll', function(e){
                            e.preventDefault();
                            if(e.detail){
                                _wheelDelta = e.detail*-40;
                            }
                            else{
                                _wheelDelta = e.originalEvent.wheelDelta;
                            }
                                if(_wheelDelta < 0){
                                    header.addClass('addWheel');
                                    if(idx < n-1){
                                        if(idx == n-2){
                                            htmlBody.stop().animate({scrollTop:that.parent().next().offset().top},600);
                                        }
                                        else{
                                            htmlBody.stop().animate({scrollTop:that.next().offset().top},600);
                                        }
                                    }
                                }
                                else{
                                    header.removeClass('addWheel');
                                    if(idx > 0){
                                        if(idx == n-1){
                                            htmlBody.stop().animate({scrollTop:that.prev().find('.wheelE').last().offset().top},600);
                                        }
                                        else{
                                            htmlBody.stop().animate({scrollTop:that.prev().offset().top},600);
                                        }
                                    }
                                }
                        });
                    });
        },
        sec01Fn:     function(){
            var win = $(window);
            var htmlBody = $('html,body');
            var section01 = $('#section01');
            var section02 = $('#section02');
            var scrollBtn = $('#section01 .scroll-btn')
            var slide = $('#section01 .slide');
            var slideWrap = $('#section01 .slide-wrap');
            var pausePlayBtn = $('.pause-play-btn');
            var pageBtn = $('.pageBtn');

            var cnt = 0;
            var n = slide.length-2;
            var winW = win.width();
            var winH = win.height();
            var setId = 0;
            var setId2 = 0;
            
                function resizeFn(){
                    winW = win.width();
                    winH = win.height();
                        section01.css({height:winH});
                        slide.css({width:winW});
                }
                setTimeout(resizeFn,10);

                win.resize(function(){
                    resizeFn();
                });

                scrollBtn.on({
                    click: function(e){
                        e.preventDefault();
                        var headerH = $('#header').height();
                        var url = $(this).attr('href');
                        htmlBody.stop().animate({scrollTop:$(url).offset().top-headerH},600,'easeInOutExpo');
                    }
                });

                autoPlayInit();
                function autoPlayInit(){
                    setId = setInterval(nextCountFn,4000);
                }

                function mainFn(){
                    
                    slideWrap.stop().animate({left:-(100*cnt)+'%'},800, function(){
                        if(cnt>n-1){cnt=0;}
                        if(cnt<0){cnt=n-1;}
                        slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                    });
                    pageBtnFn(cnt);
                }
                
                setTimeout(pageBtnFn(0),100);
                function pageBtnFn(z){
                    z==n?z=0:z;
                    z==-1?z=n-1:z;
                    pageBtn.removeClass('addPage');
                    pageBtn.eq(z).addClass('addPage');
                }

                pageBtn.each(function(idx){
                    $(this).on({
                        click: function(e){
                            e.preventDefault();
                            clearInterval(setId);
                            timeContFn();
                            cnt = idx;
                            mainFn();
                        }
                    });
                });
                
                function nextCountFn(){
                    cnt++;
                    mainFn();
                }

                function prevCountFn(){
                    cnt--;
                    mainFn();
                }
                

                section01.swipe({
                    swipeLeft: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timeContFn();
                        if( !slideWrap.is(':animated')){
                            nextCountFn();
                        }
                    },
                    swipeRight: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timeContFn();
                        if( !slideWrap.is(':animated')){
                            prevCountFn();
                        }
                    }
                });

                function timeContFn(){
                    clearInterval(setId);
                    clearInterval(setId2);
                    pausePlayBtn.addClass('addPlay');

                    var cnt2 = 0;
                    setId2 = setInterval(function(){
                        cnt2++;

                        if(cnt2>10){
                            nextCountFn();
                            autoPlayInit();
                            clearInterval(setId2);
                            pausePlayBtn.removeClass('addPlay');
                        }
                    },1000);
                }


                pausePlayBtn.on({
                    click: function(){
                        var x = null;
                            x = $(this).hasClass('addPlay');
                            if(x==false){
                                clearInterval(setId);
                                clearInterval(setId2);
                                $(this).addClass('addPlay');
                            }
                            else if(x==true){
                                clearInterval(setId);
                                clearInterval(setId2);
                                autoPlayInit();
                                $(this).removeClass('addPlay');
                            }
                    }
                });
        },
        sec02Fn:     function(){
            var _win = $(window);
            var _sec02 = $('#section02');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= 50){
                        _sec02.addClass('addScroll');
                    }
                    else{
                        _sec02.removeClass('addScroll');
                    }
                });
        },
        sec03Fn:     function(){
            var _win = $(window);
            var _sec03 = $('#section03');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= 50){
                        _sec03.addClass('addScroll');
                    }
                    else{
                        _sec03.removeClass('addScroll');
                    }
                });
        },
        sec04Fn:     function(){
            var _win = $(window);
            var _sec02 = $('#section02');
            var _sec04 = $('#section04');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= _sec02.offset().top){
                        _sec04.addClass('addScroll');
                    }
                    if(that.scrollTop() < _sec02.offset().top){
                        _sec04.removeClass('addScroll');
                    }
                });
        },
        sec05Fn:     function(){
            var _win = $(window);
            var _sec04 = $('#section04');
            var _sec05 = $('#section05');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= _sec04.offset().top){
                        _sec05.addClass('addScroll');
                    }
                    if(that.scrollTop() < _sec04.offset().top){
                        _sec05.removeClass('addScroll');
                    }
                });
        },
        sec06Fn:     function(){

        },
        sec07Fn:     function(){
            var _win = $(window);
            var _sec05 = $('#section05');
            var _sec07 = $('#section07');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= _sec05.offset().top+50){
                        _sec07.addClass('addScroll');
                    }
                    if(that.scrollTop() < _sec05.offset().top+50){
                        _sec07.removeClass('addScroll');
                    }
                });
        },
        sec08Fn:     function(){
            var _win = $(window);
            var _sec06 = $('#section06');
            var _sec08 = $('#section08');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= _sec06.offset().top+30){
                        _sec08.addClass('addScroll');
                    }
                    if(that.scrollTop() < _sec06.offset().top+30){
                        _sec08.removeClass('addScroll');
                    }
                });
        },
        sec09Fn:     function(){
            var _win = $(window);
            var _sec08 = $('#section08');
            var _sec09 = $('#section09');

                _win.scroll(function(){
                    var that = $(this);
                    if(that.scrollTop() >= _sec08.offset().top){
                        _sec09.addClass('addScroll');
                    }
                    if(that.scrollTop() < _sec08.offset().top){
                        _sec09.removeClass('addScroll');
                    }
                });
        },
        sec10Fn:     function(){
            var _win = $(window);
            var imsi = null;
            var a = [4,5,6,0,1,2,3];
            var _slide = $('#section10 .slide');
            var _slideCon = $('#section10 .slide-container');
            var _nextBtn = $('#section10 .next-btn');
            var _prevBtn = $('#section10 .prev-btn');
            var _slideW = _slide.eq(3).innerWidth();

                setTimeout(resizeFn,100);
                function resizeFn(){
                    _slideW = _slide.eq(3).innerWidth();
                    slide3dMainFn();
                }

                _win.resize(function(){
                    resizeFn();
                });

                _slideCon.swipe({
                    swipeLeft: function(){
                        imsi = a.shift();
                        a.push(imsi);
                        slide3dMainFn();
                    },
                    swipeRight: function(){
                        imsi = a.pop();
                        a.unshift(imsi);
                        slide3dMainFn();
                    }
                });
                        
                _nextBtn.on({
                    click: function(){
                        imsi = a.shift();
                        a.push(imsi);
                        slide3dMainFn();
                    }
                });

                _prevBtn.on({
                    click: function(){
                        imsi = a.pop();
                        a.unshift(imsi);
                        slide3dMainFn();
                    }
                });

                function slide3dMainFn(){
                    
                    _slide.eq(a[0]).css({left:-183.3333+'%'}).fadeIn(1000, function(){
                        $(this).css({zIndex:1,transform:'perspective('+(_slideW*5)+'px) scale(.5) rotateY(0deg) translateZ(-'+(_slideW*0.5)+'px)', opacity:.5});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });

                    _slide.eq(a[1]).css({left:-150+'%', opacity:1}).fadeIn(1000, function(){
                        $(this).css({zIndex:2,transform:'perspective('+(_slideW*8.33333)+'px) scale(.7) rotateY(-50deg) translateZ(-'+(_slideW*0.33333)+'px)'});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });

                    _slide.eq(a[2]).css({left:-100+'%', opacity:1}).fadeIn(1000, function(){
                        $(this).css({zIndex:3,transform:'perspective('+(_slideW*10)+'px) scale(.9) rotateY(-70deg) translateZ(-'+(_slideW*0.166666)+'px)'});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });

                    _slide.eq(a[3]).css({left:0, opacity:1}).fadeIn(1000, function(){
                        $(this).css({zIndex:4,transform:'perspective('+(_slideW*6.66666)+'px) scale(1.1) rotateY(0deg) translateZ('+(_slideW*0.33333)+'px)'});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, 1)'});
                    });

                    _slide.eq(a[4]).css({left:100+'%', opacity:1}).fadeIn(1000, function(){
                        $(this).css({zIndex:3,transform:'perspective('+(_slideW*10)+'px) scale(.9) rotateY(70deg) translateZ(-'+(_slideW*0.16666)+'px)'});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });

                    _slide.eq(a[5]).css({left:150+'%', opacity:1}).fadeIn(1000, function(){
                        $(this).css({zIndex:2,transform:'perspective('+(_slideW*8.33333)+'px) scale(.7) rotateY(50deg) translateZ(-'+(_slideW*0.33333)+'px)'});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });

                    _slide.eq(a[6]).css({left:183.3333+'%'}).fadeIn(1000, function(){
                        $(this).css({zIndex:1,transform:'perspective('+(_slideW*5)+'px) scale(.5) rotateY(0deg) translateZ(-'+(_slideW*0.5)+'px)', opacity:.5});
                        $(this).find('img').css({outlineColor:'rgba(0,0,0, .2)'});
                    });
                }

        },
        sec11Fn:     function(){

        }
    };

    viccarbe.init();



})(window,document,jQuery);