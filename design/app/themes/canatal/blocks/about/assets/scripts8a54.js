(function ($) {

	$.attach('body:not(.preview) .b-about', function (i, element) {

		var target = element.find('.b-about-main')

		var getTranslation = function (p) {
			return (1 - p) * 120
		}

		var onProgressOnScreen = function (e, progress) {
			target.css('transition', 'none')
			target.css('transform', 'translateX(-' + getTranslation(progress) + 'px)')
		}

		var onVisibleOnScreen = function (e, visible) {
			target.css('transition', '')
			target.css('transform', '')
			element.off('progressonscreen', onProgressOnScreen)
			element.off('visibleonscreen', onVisibleOnScreen)
		}

		element.on('progressonscreen', onProgressOnScreen)
		element.on('visibleonscreen', onVisibleOnScreen)
	})

})(jQuery);
