(function($) {

    window.JUKSY = {
        apiUri: 'https://www.juksy.com/api'
    };

    var init = function() {
        // android version under 4.4 FB APP can't use css fadeout
        function getAndroidVersion(ua) {
            ua = (ua || navigator.userAgent).toLowerCase();
            var match = ua.match(/android\s([0-9\.]*)/);
            return match ? match[1] : false;
        };
        var $android = parseFloat(getAndroidVersion());
        if ($android < 4.4) {
            alert('Android 4.3 以下手機，請使用Chrome瀏覽器閱讀');
        }

        // Configure webfont
        window.WebFontConfig = {
            google: {
                families: ['Roboto+Condensed:400,400italic,700,700italic:latin']
            }
        };

        // Init Facebook
        window.fbAsyncInit = function() {
            FB.init({
                appId: '608477045879026',
                cookie: true, // enable cookies to allow the server to access 
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.6' // use version 2.6
            });
        };
    }

    // nav_01
    var nav_01 = function() {
        /*
        -------------------------------------
        open and close menu // didn't use toggleClass because FB APP can't work for android4.2
        -------------------------------------
        */
        var $window = $(window),
            $nav = $('.nav_01'),
            $body = $('body'),
            $openBtn = $nav.find('.mIcon .open'),
            $closeBtn = $nav.find('.mIcon .close'),
            $menuOpen = 'menuOpen',
            $noscroll = 'noscroll',
            lastScrollTop = 0,
            $scrollout = 'scrollout',
            $menuOut = true,
            $menuli = $nav.find('ul.menu >li'),
            $menuTimer;
        $openBtn.click(function() {
            $nav.addClass($menuOpen);
            $body.addClass($noscroll);
        });
        $closeBtn.click(function() {
            $nav.removeClass($menuOpen);
            $body.removeClass($noscroll);
        });
        /*
        -------------------------------------
        FB share, Line share
        -------------------------------------
        */
        $nav.find("ul.share li.fb, ul.share .title").click(function(e) {
            e.preventDefault();
            FB.ui({
                method: 'share',
                href: document.URL
            }, function(response) {});
        });
        $nav.find("ul.share li.line a.btn").attr("href", "http://line.naver.jp/R/msg/text/?" + document.title + "%0A" + document.URL);
        /*
        -------------------------------------
        nav move out while scrolling
        -------------------------------------
        */
        function navmove() {
            var st = $(this).scrollTop(),
                outTimer;
            clearTimeout(outTimer);
            if (st > lastScrollTop && $menuOut == true) {
                // downscroll code
                $nav.stop(true, true).addClass($scrollout);
                $menuOut = false;
            } else if (st == 0) {
                // top
                scrollOut();
            } else if (st < lastScrollTop && $menuOut == false) {
                // upscroll code
                outTimer = setTimeout(scrollOut, 10000);
            }
            lastScrollTop = st;

            function scrollOut() {
                clearTimeout(outTimer);
                $nav.stop(true, true).removeClass($scrollout);
                $menuOut = true;
            }
        }
        $window.scroll($.throttle(500, navmove));
        /*
        -------------------------------------
        hover menu li animation
        -------------------------------------
        */
        $menuli.hover(function() {
            clearTimeout($menuTimer);
            $menuli.not(this).stop(true, true).animate({ opacity: 0.5 }, 500);
            $(this).stop(true, true).animate({ opacity: 1 }, 500);
        }, function() {
            $menuTimer = setTimeout(menuHover, 300);
        });

        function menuHover() {
            $menuli.stop(true, true).animate({ opacity: 1 }, 500);
        }
        /*
        -------------------------------------
        page scroll
        -------------------------------------
        */
        $nav.find('ul.menu >li').not('notli').click(goPosition);
        $nav.find('ul.submenu >li').click(goPosition);

        function goPosition() {
            var nowIndex = $(this).index(),
                $submenu = $(this).parent('ul.submenu').length,
                scrollPosition;
            if ($submenu == 0 && nowIndex == 4) {
                return;
            } else if ($submenu > 0) { nowIndex += 3; }
            scrollPosition = $('[data-menu="true"]').eq(nowIndex).offset().top;
            $closeBtn.trigger('click');
            $('html,body').animate({ scrollTop: scrollPosition }, 1000);
        }
    }

    // header_01
    var header_01 = function() {
        /*
        -------------------------------------
        Count img height
        -------------------------------------
        */
        var $header01 = $('.header_01');
        $header01.each(function() {
            var $visualBg = $(this).find('.visualBg'),
                $windowH = $(window).height()*0.9;
            $visualBg.height($windowH);
        });
    }

    // layout_03
    var layout_03 = function() {
        // Count img height
        var $layout03 = $('.layout_03');
        $layout03.each(function() {
            var $img = $(this).find('.article li:nth-child(even) a.img'),
                $imgBig = $(this).find('.article li:nth-child(odd) a.img');
            $img.each(function() {
                $(this).height($(this).width());
            });
            $imgBig.each(function() {
                $(this).height($(this).width() / 1.9);
            });
        });
    }

    // layout_05
    var layout_05 = function() {
        // Count img height
        var $layout05 = $('.layout_05');
        $layout05.each(function() {
            var $img = $(this).find('ul.article li a.img');
            $img.each(function() {
                $(this).height($(this).width());
            });
        });
    }

    // layout_06
    var layout_06 = function() {
        // Count img height
        var $layout06 = $('.layout_06');
        $layout06.each(function() {
            var $img = $(this).find('.article li a.img');
            $img.each(function() {
                $(this).height($(this).width() / 1.9);
            });
        });
    }

    // gallery_02
    var gallery_02 = function() {
        var $gallery02 = $('.gallery_02'),
            $windowW = $(window).width();
        $gallery02.each(function() {
            var $iframe = $gallery02.find('.photo iframe'),
                mUrl = $iframe.data('msrc'),
                pcUrl = $iframe.data('pcsrc');
            if($windowW<1024) {
                $iframe.easyframe({
                    url: mUrl
                },function(){
                    iFrameResize();
                });
            }
            else {
                $iframe.easyframe({
                    url: pcUrl
                },function(){
                    iFrameResize();
                });
            }
        });
    }

    // fixedBtn
    var fixedBtn_01 = function() {
        // Back to top
        $('ul.fixedBtn_01 li.top').click(function() {
            $('html,body').animate({ scrollTop: 0 }, 1000);
        });
        // Open share menu
        $('ul.fixedBtn_01 li.share').mousedown(function(){
            $('.fixedBtnCover_01').addClass('show');
        });
        // Close share menu
        $('.fixedBtnCover_01 .coverWrap .backCover, .fixedBtnCover_01 .item .arrow').bind('mousedown touchstart', function () {
            $('.fixedBtnCover_01').removeClass('show');
        });
        // Share with LINE
        $('.fixedBtnCover_01 ul.share li.line .material_btn').click(function(e) {
            e.preventDefault();
            window.location.href = 'http://line.naver.jp/R/msg/text/?' + document.title + '%0A' + document.URL;
        });
        // Share with FB
        $('.fixedBtnCover_01 ul.share li.fb .material_btn').click(function(e) {
            e.preventDefault();
            FB.ui({
                method: 'share',
                href: document.URL
            }, function(response) {});
        });
        // Copy link
        var clipboard = new Clipboard('.fixedBtnCover_01 ul.share li.copy .material_btn', {
            text: function(trigger) {
                return document.URL;
            }
        });
        // Copy tip
        clipboard.on('success', function(e) {
            var tipTime;
            clearTimeout(tipTime);
            $('.fixedBtnCover_01 .coverWrap .copytip').addClass('show');
            tipTime = setTimeout(hide, 2000);
            function hide() {
                 $('.fixedBtnCover_01 .coverWrap .copytip').removeClass('show');
            }
        });
        /*
        -------------------------------------
        nav move out while scrolling
        -------------------------------------
        */
        var $window = $(window);

        function fixedBtnShow() {
            var st = $(this).scrollTop(),
                ft = $('#footer').offset().top - $window.height() - 300,
                $fixedBtn = $('.fixedBtn_01');
            if (st > ft) {
                $fixedBtn.addClass('show');
            } else if (st == 0) {
                $fixedBtn.removeClass('show');
            }
        }
        $window.scroll($.throttle(500, fixedBtnShow));
    }

    // render content first
    init();
    nav_01();
    header_01();
    layout_03();
    layout_05();
    layout_06();
    gallery_02();
    fixedBtn_01();

    // plugin fadeOut
    $(function() {
        $(document).on('fadeOut', function() {
            var $window = $(window),
                target = $('.fadeOut');

            function addAction() {
                var length = target.length;
                for (var i = 0; i < length; i++) {
                    if (target.eq(i).hasClass('action')) continue;
                    var in_position = target.eq(i).offset().top + 100;
                    var window_bottom_position = $window.scrollTop() + $window.height();
                    if (in_position < window_bottom_position) {
                        target.eq(i).addClass('action');
                    }
                }
            }
            addAction();
            $window.scroll($.throttle(250, addAction));
        });
        $(document).trigger('fadeOut');
    });

    // plugin img_lazyLoad
    $(function() {
        $(document).on('img_lazyLoad', function() {
            var $window = $(window),
                target = $('.imgLoading'),
                complete = 'complete';

            function addComplete() {
                var length = target.length;
                for (var i = 0; i < length; i++) {
                    if (target.eq(i).hasClass(complete)) continue;
                    var in_position = target.eq(i).offset().top + 100;
                    var window_bottom_position = $window.scrollTop() + $window.height() + 150;
                    if (in_position < window_bottom_position) {
                        var targeturl = target.eq(i).data('imgload');
                        target.eq(i).css('background-image', 'url(' + targeturl + ')');
                        target.eq(i).addClass(complete);
                    }
                }
            }
            addComplete();
            $window.scroll($.throttle(250, addComplete));
        });
        $(document).trigger('img_lazyLoad');
    });

    // plugin dotdotdot
    $(function() {
        $(document).on('dotdotdot', function() {
            $('[data-dotdotdot="true"]').dotdotdot({
                wrap: 'letter'
            });
        });
        $(document).trigger('dotdotdot');
    });

    // plugin layout_03 infinite scroll
    $(function() {
        var $layout = $('#layout_03_infinit').find('.layoutWrap'),
            moreBtn = '.moreBtn',
            countFrom = 0,
            countSize = 6,
            source,
            template,
            article;

        // add btn click listener
        var btnClick = function() {
            $layout.find(moreBtn).one('click', function() {
                $(this).remove();
                // get new data
                countFrom += countSize;
                layout_03_ajax(countFrom, countSize);
                // append article
                addArticle();
            });
        };

        // add article
        var addArticle = function() {
            $layout.append('<div class="articleWrap">' + article + '</div>');
            layout_03();
            $(document).trigger('fadeOut');
            $(document).trigger('img_lazyLoad');
            $(document).trigger('dotdotdot');
            btnClick();
        }

        // ajax
        var layout_03_ajax = function(ifrom, isize) {
            // clear article content
            article = '';
            var items = {
                from: ifrom,
                size: isize,
                tags: $layout.data('tags'),
                filter: $layout.data('filter')
            };
            $.ajax({
                url: JUKSY.apiUri + '/v1.0/search/articles',
                data: { tags: items.tags, filter: items.filter, from: items.from, size: items.size },
                type: 'GET',
                dataType: 'json',
                success: function(Jdata) {
                    console.log('AJAX layout_03 SUCCESS!!!');

                    // no data
                    if (!Jdata.length) return;

                    // has data
                    source = $("#entry-template-start").html();
                    template = Handlebars.compile(source);
                    article += template();
                    for (var n = 0; n < Jdata.length; n++) {
                        source = $("#entry-template" + n % 2).html();
                        template = Handlebars.compile(source);
                        article += template(Jdata[n]);
                    }
                    if (Jdata.length < items.size) {
                        article += "</ul>";
                    } else {
                        source = $("#entry-template-end").html();
                        template = Handlebars.compile(source);
                        article += template();
                    }
                    addArticle();
                },
                error: function() {
                    console.log('AJAX layout_03 ERROR!!!');
                }
            });
        }

        //init loading ajax
        layout_03_ajax(countFrom, countSize);
    });

    // plugin layout_06 auto loading
    $(function() {
        var $layout = $('.layout_06').find('.layoutWrap'),
            title = $layout.data('title'),
            countFrom = 0,
            countSize = 4,
            source,
            template,
            article;

        // add article
        var addArticle = function() {
            $layout.append(article);
            $layout.find('.detail').html(title);
            layout_06();
            $(document).trigger('fadeOut');
            $(document).trigger('img_lazyLoad');
            $(document).trigger('dotdotdot');
        }

        // ajax
        var layout_06_ajax = function(ifrom, isize) {
            // clear article content
            article = '';
            var items = {
                from: ifrom,
                size: isize,
                tags: $layout.data('tags'),
                filter: $layout.data('filter')
            };
            $.ajax({
                url: JUKSY.apiUri + '/v1.0/search/articles',
                data: { tags: items.tags, filter: items.filter, from: items.from, size: items.size },
                type: 'GET',
                dataType: 'json',
                success: function(Jdata) {
                    console.log('AJAX layout_06 SUCCESS!!!');

                    // no data
                    if (!Jdata.length) return;

                    // has data
                    source = $("#template-l06-start").html();
                    template = Handlebars.compile(source);
                    article += template();
                    for (var n = 0; n < Jdata.length; n++) {
                        source = $("#template-l06").html();
                        template = Handlebars.compile(source);
                        article += template(Jdata[n]);
                    }
                    source = $("#template-l06-end").html();
                    template = Handlebars.compile(source);
                    article += template();
                    addArticle();
                },
                error: function() {
                    console.log('AJAX layout_06 ERROR!!!');
                }
            });
        }

        //init loading ajax
        layout_06_ajax(countFrom, countSize);
    });

    // window resizing
    $(function() {
        var resizeId;
        $(window).resize(function() {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 500);
        });

        function doneResizing() {
            layout_03();
            layout_05();
            layout_06();
            $(document).trigger('dotdotdot');
        }
    });

})(jQuery);