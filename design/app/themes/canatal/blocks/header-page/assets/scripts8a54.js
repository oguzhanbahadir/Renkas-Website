(function ($) {

	$.attach('.b-header-page', function (i, element) {

		var relative = element.closest('.main-layout')

		var image = element.find('.b-header-page-image')
		var content = element.find('.b-header-page-content')

		var min = 0
		var max = 0

		var extent = window.innerHeight

		var update = function () {

			var bounds = element.bounds(relative)

			if (bounds.height >= extent) {

				var rect = image.bounds(relative)

				min = bounds.top
				max = bounds.top + bounds.height - rect.height - parseInt(image.css('bottom'))

			} else {

				min = 0
				max = 0

			}
		}

		var render = function () {

			var t = 0

			var scroll = $(window).scrollTop()

			if (scroll >= min &&
				scroll <= max) {

				t = scroll - min

			} else if (scroll < min) {

				t = 0

			} else if (scroll > max) {

				t = max - min

			}

			image.css('transform', 'translateY(' + t + 'px)')
		}

		var getMaxHeight = function () {
			return parseInt(element.css('max-height')) /* + parseFloat(image.css('bottom')) */
		}

		var onResize = function () {

			extent = window.innerHeight

			element.toggleClass('b-header-page--expand', content.scrollHeight() > getMaxHeight())

			update()
			render()
		}

		var onScroll = function () {
			render()
		}

		$(window).on('scroll', onScroll)
		$(window).on('resize', onResize)
		$(window).on('load', onResize)

		onResize()
	})

})(jQuery);