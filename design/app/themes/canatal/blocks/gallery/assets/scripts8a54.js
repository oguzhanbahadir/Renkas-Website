(function ($) {

	$.attach('.b-gallery', function (i, element) {

		var container = element.find('.container')

		/**
		 * Temporary fix. For some reasons the content is shifted
		 * when the
		 */
		element.on('scroll', function (e) {
			e.target.scrollLeft = 0
		})

		// var onResize = function () {

		// 	var height = 0

		// 	var outer = element.find('.slider-outer')
		// 	var cells = element.find('.slider-slide-cell')

		// 	cells.each(function (i, element) {
		// 		element = $(element)
		// 		if (height < element.bounds().height) {
		// 			height = element.bounds().height
		// 		}
		// 	})

		// 	container.css('height', height)
		// }

		// $(window).on('resize', onResize)
		// $(window).on('load', onResize)

		// onResize()

	})

	$.attach('body:not(.preview) .b-gallery', function (i, element) {

		var items = element.find('.slider-slide:first-child .b-gallery-item')

		var getTranslation = function (p, index) {
			return (index * index * 30) * (1 - p)
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