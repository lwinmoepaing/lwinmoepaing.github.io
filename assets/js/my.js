$(document).ready(function() {
	//========================================
	// Initial Call Functions
	//========================================
	marginFromFaceSVG();
	myHairAnimate();
	// jQuery.scrollSpeed(200, 1000);

	//========================================
	// When Window Scroll
	//========================================
	window.onscroll = function() {
		stickyNavBar();
	};

	//========================================
	// When Window Resize
	//========================================

	window.onresize = function() {
		// Svg from Background Magin
		marginFromFaceSVG();
	};

	//========================================
	// Sticky Nav Bar
	//========================================
	var pageY_Navbar = window.pageY_NavbarOffset;
	function stickyNavBar() {
		var navBar = $('#Navigation_Bar');
		var hasClass = $(navBar).hasClass('hide');
		if (pageY_Navbar < window.pageYOffset) {
			if (!hasClass) $(navBar).addClass('hide');
		} else {
			if (hasClass) $(navBar).removeClass('hide');
		}
		pageY_Navbar = window.pageYOffset;
	}

	//========================================
	// Menu Bar CLick
	//========================================

	$('#H-Menu_Bar').click(function() {
		alert('Comming Soon');
	});

	//========================================
	// My Face
	//========================================

	$('#My-Face').on('mouseenter', function() {
		myFaceScaleOn();
	});

	$('#My-Face').on('mouseleave', function() {
		myFaceScaleDown();
	});

	function myHairAnimate() {
		var allPolygons = $('#Hair > g > polygon');
		$(allPolygons).each(function(k, v) {
			var getRandom = random(20, 4);
			$(v).addClass('Hair-Animation--' + getRandom);
		});
	}

	function myFaceScaleOn() {
		var allFacePolygons = $('#Face_SKin > g > polygon');
		$(allFacePolygons).each(function(k, v) {
			var getRandom = random(60, 5);
			$(v).css({
				transform:
					'scale(1.0' +
					random(8) +
					') translateY(' +
					minusOrPlus() +
					getRandom +
					'px) translateX(' +
					minusOrPlus() +
					getRandom +
					'px)'
			});
		});
	}

	function myFaceScaleDown() {
		var allFacePolygons = $('#Face_SKin > g > polygon');
		$(allFacePolygons).each(function(k, v) {
			$(v).removeAttr('style');
		});
	}

	//=======================================
	// Margin Top From Images
	//========================================

	function marginFromFaceSVG() {
		var svgHeight = $('#My-Face').height();
		var offsetTop = $('#My-Face').offset().top;
		var navigateHeight = 60 / 1.3;
		// set Height Div
		$('#First-Slide-Offset-Top').height(svgHeight + offsetTop - navigateHeight);
	}

	//=======================================
	// Helper Functions
	//=======================================

	function random(max, min = 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function minusOrPlus() {
		var arr = [ '-', '+' ];
		return arr[random(arr.length - 1)];
	}
});
