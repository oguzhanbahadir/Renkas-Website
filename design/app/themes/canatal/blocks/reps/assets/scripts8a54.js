(function ($) {

	$.attach('body:not(.preview) .b-reps', function (i, element) {

		var items = element.find('.b-reps-item')

		var getTranslation = function (p, index) {
			return (index * index * index * 30) * (1 - p)
		}

		var onProgressOnScreen = function (e, progress) {
			items.each(function (i, element) {
				element = $(element)
				element.css('transition', 'none')
				element.css('transform', 'translateY(' + getTranslation(progress, i + 1) + 'px)')
			})
		}

		var onVisibleOnScreen = function (e, visible) {

			items.each(function (i, element) {
				element = $(element)
				element.css('transition', '')
				element.css('transform', '')
			})

			element.off('progressonscreen', onProgressOnScreen)
			element.off('visibleonscreen', onVisibleOnScreen)
		}

		element.on('progressonscreen', onProgressOnScreen)
		element.on('visibleonscreen', onVisibleOnScreen)
	})

})(jQuery);