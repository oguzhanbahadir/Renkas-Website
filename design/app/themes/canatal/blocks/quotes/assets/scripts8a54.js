(function ($) {

	$.attach('body:not(.preview) .b-quotes', function (i, element) {

		var layout = element.closest('.main-layout')

		var container = element.closest('.scroll-content')
		var offsetTop = 0
		var offsetBot = 0

		var done = false
		var dark = false

		var update = function () {

			var bounds = element.bounds(container)
			offsetTop = bounds.top
			offsetBot = bounds.top + bounds.height

			render()
		}

		var render = function () {

			var frame = window.innerHeight

			var enterLimit = frame * 0.9
			var leaveLimit = frame * 0.75

			var screenT = 0
			var screenB = frame
			var offsetT = offsetTop - $(window).scrollTop()
			var offsetB = offsetBot - $(window).scrollTop()

			var active = false

			if (offsetB > leaveLimit &&
				offsetT < enterLimit) {
				active = true
			}

			if (done == false) {

				if (active) {

					if (dark == false) {
						dark = true
						layout.addClass('main-layout--dark')
					}

				} else {

					if (dark) {
						dark = false
						done = true
						layout.removeClass('main-layout--dark')
					}

				}
			}
		}

		var onLoad = function () {
			update()
		}

		var onResize = $.throttle(update)
		var onScroll = $.throttle(render)

		$(window).on('load', onLoad)
		$(window).on('resize', onResize)
		$(window).on('scroll', onScroll)

		update()
		render()

	})

	$.attach('body:not(.preview) .b-quotes-action', function (i, element) {

		var min = 0.65
		var max = 0.85

		var outer = element.find('.b-quotes-action-image')
		var inner = element.find('.b-quotes-action-image .image')

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