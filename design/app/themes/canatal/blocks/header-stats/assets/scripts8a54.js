(function ($) {

	$.attach('body:not(.preview) .b-header-stats', function (i, element) {

		var outer = element.find('.b-header-stats-image')
		var inner = element.find('.b-header-stats-image .image')

		var edges = element.find('.b-header-stats-background')
		var frame = element.find('.container')

		var scaleMin = 1
		var scaleMax = 1

		var update = function () {

			var bounds = frame.bounds()
			var extent = edges.bounds()

			scaleMin = 1
			scaleMax = bounds.width / extent.width
		}

		var render = function () {

			var scroll = $(window).scrollTop()

			var min = 0
			var max = element.bounds().height / 2

			var p = 1 - (scroll / (max - min) + min)

			var outerScale = p * (scaleMax - scaleMin) + scaleMin
			var innerScale = 1 / outerScale

			outer.css('transition', 'none')
			inner.css('transition', 'none')
			outer.css('transform', 'scaleX(' + outerScale + ')')
			inner.css('transform', 'scaleX(' + innerScale + ')')
		}

		var onLoad = function () {
			update()
			render()
		}

		var onScroll = function () {
			render()
		}

		var onResize = function () {
			update()
			render()
		}

		$(window).on('load', onLoad)
		$(window).on('scroll', onScroll)
		$(window).on('resize', onResize)

		update()
		render()
	})

	$.attach('.b-header-stats-values-item-value', function (i, element) {

		var value = element.text()
		if (value == '') {
			console.error('Odometer data-value attribute is missing.')
			return
		}

		element.empty()

		var animator = element.odometer()

		$(document.body).on('ready', function () {
			animator.update(value)
		})
	})

})(jQuery);