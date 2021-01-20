;(function(window,document,$,undefined){

    var designers = {
        init:   function(){
            var that=this;
                that.headerFn();
                that.sec01Fn();
                that.sec02Fn();

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
                    click: function(e){
                        var that = $(this);
                        e.preventDefault();
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
                    click: function(e){
                        var that = $(this);
                        e.preventDefault();
                        that.next().stop().slideToggle(600,'swing');
                    }
                });

                moMainBtn.on({
                    click: function(e){
                        var that = $(this);
                        e.preventDefault();
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
            var x = 0;
            var y = 0;
            var _s1Slide = $('#section1 .slide');
            var _s1SlideWrap = $('#section1 .slide-wrap');
            var _nextBtn = $('.next-btn');
            var _prevBtn = $('.prev-btn');
            var n = _s1Slide.length;
            var r = _s1SlideWrap.width()/2;
            var angle = 360/n;
            var deg = [];
            var setId = 0;

                function positionFn(){
                    for(var i=0;i<n;i++){
                        deg[i] = i*angle;
                        x = Math.cos(deg[i]*(Math.PI/180))*r+r;
                        y = Math.sin(deg[i]*(Math.PI/180))*r+r;
                        _s1Slide.eq(i).css({left:x,top:y});
                    }
                }
                setTimeout(positionFn,10);
                
                function slideMainFn(){
                    for(var i=0;i<n;i++){
                        x = Math.cos(deg[i]*(Math.PI/180))*r+r;
                        y = Math.sin(deg[i]*(Math.PI/180))*r+r;
                        _s1Slide.eq(i).stop().animate({left:x,top:y},200);
                    }
                }

                function autoPlayFn(){
                    setId = setInterval(nextFn,2000);
                }
                autoPlayFn();

                function nextFn(){
                    for(var i=0;i<n;i++){
                        deg[i] += angle;
                    }
                    slideMainFn();
                }

                function prevFn(){
                    for(var i=0;i<n;i++){
                        deg[i] -= angle;
                    }
                    slideMainFn();
                }

                _nextBtn.on({
                    click: function(){
                        nextFn();
                    },
                    mouseenter: function(){
                        clearInterval(setId);
                    },mouseleave: function(){
                        clearInterval(setId);
                        autoPlayFn();
                    }
                });

                _prevBtn.on({
                    click: function(){
                        prevFn();
                    },
                    mouseenter: function(){
                        clearInterval(setId);
                    },
                    mouseleave: function(){
                        clearInterval(setId);
                        autoPlayFn();
                    }
                });


                _s1Slide.each(function(idx){
                    $(this).on({
                        click: function(e){
                            e.preventDefault();
                            _s1SlideWrap.css({backgroundImage:'url(./img/designers/slide' + (idx) + '.jpg'});
                        }
                    });
                });
        },
        sec02Fn:    function(){
            var _win = $(window);
            var _winW = _win.innerWidth();
            var _sec2 = $('#section2');
            var _slide = $('#section2 .slide');
            var _slideWrap = $('#section2 .slide-wrap');
            var _pageBtn = $('#section2 .page-btn');
            var slideW = 555;
            var cnt = 0;
            var n = _slide.length-4;
            var setId = 0;
            var setId2 = 0;

                // function resizeFn(){
                //     _winW = _win.innerWidth();
                //     if( _winW > 1124 ){
                //         slideW = 555;
                //     }
                //     else if( _winW > 980 ){
                //         slideW = _winW;
                //     }

                //     _slide.css({width:slideW});
                //     _slideWrap.css({width:slideW*4});

                //     mainSlideFn();
                // }

                // setTimeout(resizeFn,100);

                // _win.resize(function(){
                //     resizeFn();
                // });

                autoInit();
                function autoInit(){
                    setId = setInterval(nextCntFn,4000);
                }

                function mainSlideFn(){
                    _slideWrap.stop().animate({left:-(100*cnt)+'%'},1000, function(){
                        if(cnt>n-1){cnt=0;}
                        if(cnt<0){cnt=n-1;}
                        _slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                    });
                    pageBtnFn(cnt);
                }

                setTimeout(pageBtnFn(0),100);
                function pageBtnFn(z){
                    z==n?z=0:z;
                    z==-1?z=n-1:z;
                    _pageBtn.removeClass('addPage');
                    _pageBtn.eq(z).addClass('addPage');
                }

                _pageBtn.each(function(idx){
                    $(this).on({
                        click: function(e){
                            e.preventDefault();
                            clearInterval(setId);
                            timeContFn();
                            cnt = idx;
                            mainSlideFn();
                        }
                    });
                });

                function nextCntFn(){
                    cnt++;
                    mainSlideFn();
                }

                function prevCntFn(){
                    cnt--;
                    mainSlideFn();
                }

                _slideWrap.swipe({
                    swipeLeft: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timeContFn();
                        if( !_slideWrap.is(':animated') ){
                            nextCntFn();
                        }
                    },
                    swipeRight: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timeContFn();
                        if( !_slideWrap.is(':animated') ){
                            prevCntFn();
                        }
                    }
                });

                function timeContFn(){
                    clearInterval(setId);
                    clearInterval(setId2);

                    var cnt2 = 0;
                    setId2 = setInterval(function(){
                        cnt2++;

                        if(cnt2>10){
                            nextCntFn();
                            autoInit();
                            clearInterval(setId2);
                        }
                    },1000);
                }
    
                    _win.scroll(function(){
                        var that = $(this);
                        if(that.scrollTop() >= 700){
                            _sec2.addClass('addScroll');
                        }
                        else{
                            _sec2.removeClass('addScroll');
                        }
                    });
        }
    };

    designers.init();



})(window,document,jQuery);