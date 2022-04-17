(function ($) {

	$.attach('body:not(.preview) .b-cta', function (i, element) {

		var min = 0.65
		var max = 0.85

		var outer = element.find('.b-cta-background')
		var inner = element.find('.b-cta-background .image')

		var getOuterScale = function (p) {
			return p * (max - min) + min
		}

		var getInnerScale = function (p) {
			return 1 / getOuterScale(p)
		}

		var onProgressOnScreen = function (e, progress) {
			outer.css('transition', 'none')
			inner.css('transition', 'none')
			outer.css('transform', 'scale(' + getOuterScale(progress) + ')')
			inner.css('transform', 'scale(' + getInnerScale(progress) + ')')
		}

		var onVisibleOnScreen = function (e, visible) {

			outer.css('transition', '')
			inner.css('transition', '')
			outer.css('transform', '')
			inner.css('transform', '')

			element.off('progressonscreen', onProgressOnScreen)
			element.off('visibleonscreen', onVisibleOnScreen)
		}

		element.on('progressonscreen', onProgressOnScreen)
		element.on('visibleonscreen', onVisibleOnScreen)
	})

})(jQuery);