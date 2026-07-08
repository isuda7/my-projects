var frontUI = function() {
	var me = this;
	me.desk = matchMedia("(min-width: 1280px)");
	me.tablet = matchMedia("(max-width: 1279px)");
	me.mobile = matchMedia("(max-width: 1023px)");
	me.body = $("body");
	me.scrollbarWidth = window.innerWidth - $("body").width(); //modal Background ScrollBar
	me.scrollTop;

	$(document).ready(function(){
		me.firstLoad();
		me.headerFixed();

		if(window.pageYOffset > $(".subvisual").innerHeight()*0.7){ 
			//$(".header").addClass("toFixed").addClass("noShadow");
			$(".subvisual").addClass("toFixed");
		}else {
			//$(".header").removeClass("toFixed noShadow");
			$(".subvisual").removeClass("toFixed");
		}
		
		if(me.desk.matches){
			if ($(".subvisual").length > 0){
				gsap.to(".subvisual .mask", {
				  scale: .7,
				  transformOrigin: "center center",
				  scrollTrigger: {
					trigger: "#svg",
				   // pin: "#svg",
					start: "top top",
					end: "bottom top",
					duration: 0.5,
					ease: "none",
					scrub: 1}
				});
			}
		}
	});

	$(".footer-inner .btn-gotop").click(function(){			
		if ($("body").attr("id") === "main"){
			fullpage_api.moveTo('page1', 0);			
		}else{
			window.scrollTo(0, 0);
		}
	});

	$(".footer .familysite ul li a").click(function(){
		var txtValLink = $(this).text();
		$(".footer .familysite .holder a").text(txtValLink);
		me.familySiteToggle();
	});

	$('.ui-datepicker-prev').prepend('이전 월로 이동');
	$('.ui-datepicker-next').prepend('다음 월로 이동');

	/* 
	$.datepicker.setDefaults($.datepicker.regional['kr']);
	$(".datebox input").datepicker({
		showOn: "both",
		changeMonth: true,
		changeYear: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: "yy.mm.dd",
		buttonImage: "../../images/icon_calendar.png",
		buttonText: "날짜 선택",
		buttonImageOnly: true,
		closeText: '닫기',
		currentText: '오늘',
		monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		dateFormat: 'yy-mm-dd',
		beforeShow: function(input) {
			$("#ui-datepicker-div").css("opacity", "1");
		}
	}); 
	*/

	$(window).resize(function(){		
		if(me.mobile.matches){
			isMobile = true;
		}else if(me.tablet.matches){
			isMobile = true;
		}else{
			isMobile = false;
		}
	});

	$(window).scroll(function() {
		me.headerFixed();
	});
	
	if(me.mobile.matches){
		isMobile = true;
	}else if(me.tablet.matches){
		isMobile = true;
	}else{
		isMobile = false;
	}
}

frontUI.prototype = {
	firstLoad: function(){
		setTimeout(function(){
			$("#wrap").animate({opacity:1});
		}, 200)
	},

	headerFixed: function(){
		var me = this;
		//var scrollTop = window.pageYOffset;
		var headerHeight = $(".header").innerHeight();
		var subVisual = $(".subvisual").innerHeight();
		
		if ($("body").attr("id") != "main"){

			if ($("body").is(".noSubvisual") === true){ /* page not in subvisual */
				//console.log('noSubvisual')
				if (!$(".header").is(".menuOpen")){
					if(window.pageYOffset > headerHeight/2){
							$(".header").addClass("toFixed");
					}else {
						$(".header").removeClass("toFixed");
					}
				}
			}
			
			if ($("body").is(".noSubvisual") === false){ /* page in subvisual  */
				if (!$(".header").is(".menuOpen")){
				if(window.pageYOffset > headerHeight/2){
						$(".header").addClass("toFixed");
					}else{
						$(".header").removeClass("toFixed");
					}
					if(window.pageYOffset > subVisual*0.3){					
						if (window.pageYOffset > (subVisual*0.7)) { $(".header").addClass("noShadow") }

						$(".subvisual").addClass("toFixed");
						//$(".btn-allmenu").addClass("closed");
					}else{
						$(".header").removeClass("noShadow");
						$(".subvisual").removeClass("toFixed");
					}
				}
			}			
		}
	},

	mobileToggle: function(Idx){
		var me = this;
		var mobileLnb = $(".allmenubox > ul > li:eq("+Idx+")");

		if(me.mobile.matches){
			if (!mobileLnb.is(".on")){
				mobileLnb.addClass("on");
				mobileLnb.find("ul").slideDown();
			}else{
				mobileLnb.removeClass("on");
				mobileLnb.find("ul").slideUp();
			}
		}else{
			return false;
		}
	},
		
	modalView: function(modalName) {
		var me = this;
		var modalEl = $("."+modalName);
		var parentModal;
		var transparentLayer;		

		$(".modalpop").addClass("active");
		$(".modalpop").find(".popupwrap.active").removeClass("active");
		modalEl.addClass("active");
		
		if($("body > .pop-transparents-layer").length == 0) {
			$("body").append("<div class='pop-transparents-layer'></div>");
		}
		transparentLayer = $("body > .pop-transparents-layer");
		
		$(document).on("keydown", function(e){
			if ( e.keyCode == 27 || e.which == 27 ) { //esc
				modalEl.find('.btn-popclose').trigger('click');
			}
		});
	},
	modalHide: function(modalName) {
		var me = this;

		$(".popupwrap."+modalName).removeClass("active");
		$(".modalpop").removeClass("active");
		setTimeout(function(){
			$("body > .pop-transparents-layer").remove();
		}, 300);
	},
	modalResize: function(){
		var me = this;
		var modalEl = $(".modalpop.active");
		var modalHeight = modalEl.children(".popupwrap").innerHeight();
		if(modalHeight > window.innerHeight){
			modalEl.css({alignItems:"flex-start"});
		}else {
			modalEl.css({alignItems:"center"});
		}
	},

	familySiteToggle: function(){
		if (!$(".footer .familysite").is(".on")){
			$(".footer .familysite").addClass("on");
			$(".footer .familysite").find("ul").slideDown(300, function(){
				$(this).addClass("on");
			});
		}else{
			$(".footer .familysite").removeClass("on");
			$(".footer .familysite").find("ul").removeClass("on").slideUp(300);
		}
	},

	allmenuToggle: function(){
		if (!$(".header").is(".menuOpen")){
			$(".header").addClass("menuOpen");
			$(".btn-allmenu").addClass("open");
		}else{
			$(".header").removeClass("menuOpen");
			$(".btn-allmenu").removeClass("open");
		}
	},

	tabCommon: function(tabName){
		$(".tabbox li.on input[type='radio']").prop("checked", false);
		$(".tabbox li").removeClass("on");
		$(".tabbox li."+tabName).addClass("on");
		$(".tabbox li."+tabName+" input[type='radio']").prop("checked", true);
		$(".tab-hiddencontents-group .tab-hiddencontents").removeClass("on");
		$(".tab-hiddencontents-group .tab-hiddencontents."+tabName).addClass("on");
	}
}

var front = new frontUI ();

