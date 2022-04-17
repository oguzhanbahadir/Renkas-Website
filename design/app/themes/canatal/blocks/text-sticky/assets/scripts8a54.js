(function ($) {

	$.attach('.b-text-sticky', function (i, element) {

		var relative = element.closest('.main-layout')

		var min = 0
		var max = 0
		var z = 10

		var index = -1

		var trigger = 0
		var offsets = []

		var sticky = false

		var chunks = element.find('.b-text-sticky-item')
		var images = element.find('.b-text-sticky-image')
		var parent = element.find('.b-text-sticky-images')
		var side = element.find('.b-text-sticky-side-area')
		var main = element.find('.b-text-sticky-main-area')

		images.remove()

		var update = function () {

			var bounds = element.bounds(relative)

			var offset = side.bounds().height + parseFloat(main.css('margin-top'))

			min = bounds.top
			max = bounds.top + bounds.height - side.bounds().height - offset

			$.each(chunks, function (i, element) {
				offsets[i] = $(element).bounds(relative)
			})

			trigger = side.bounds().height / 4 * 3
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

			if (sticky) {
				side.css('transform', 'translateY(' + t + 'px)')
			} else {
				side.css('transform', '')
			}

			var after = 0

			for (var i = 0; i < offsets.length; i++) {
				var offset = offsets[i].top - scroll
				if (offset < trigger) {
					after = i
				}
			}

			if (after == index) {
				return
			}

			var prev = getPrev()
			var next = getNext(after)

			next.appendTo(parent)

			parent.children().each(function (i, element) {
				$(element).css('z-index', i + 10)
			})

			$.attach.refresh(next)

			index = after

			requestAnimationFrame(function () {

				prev.addClass('b-text-sticky-image--prev')
				next.addClass('b-text-sticky-image--curr').on('transitionend', function (e) {
					if ($(e.target).is(next)) {
						prev.remove()
					}
				})

			})
		}

		var onResize = function () {
			update()
			render()
		}

		var onScroll = function () {
			render()
		}

		var getPrev = function () {
			return parent.children().last()
		}

		var getNext = function (after) {
			return images.eq(after).clone()
		}

		var onVisibleOnScreen = function () {

			images.each(function (i, image) {

				image = $(image)

				var outer = image.find('.b-text-sticky-image-background')
				var inner = image.find('.b-text-sticky-image-background .image')
				outer.css('transform', '')
				inner.css('transform', '')

			})
		}

		$(window).on('scroll', onScroll)
		$(window).on('resize', onResize)
		$(window).on('load', onResize)

		$(window).on('mediaenter', function (e, media) {

			if (media == 'sm') {
				sticky = true
			}

		})

		$(window).on('medialeave', function (e, media) {

			if (media == 'sm') {
				sticky = false
			}

		})

		element.on('visibleonscreen', onVisibleOnScreen)

	})

	$.attach('body:not(.preview) .b-text-sticky', function (i, element) {

		var min = 0.65
		var max = 0.85

		var outer = element.find('.b-text-sticky-image-background')
		var inner = element.find('.b-text-sticky-image-background .image')

		var getOuterScale = function (p) {
			return p * (max - min) + min
		}

		var getInnerScale = function (p) {
			return 1 / getOuterScale(p)
		}

		var onProgressOnScreen = function (e, progress) {

			// images are cloned and removed
			outer = element.find('.b-text-sticky-image-background')
			inner = element.find('.b-text-sticky-image-background .image')

			outer.css('transition', 'none')
			inner.css('transition', 'none')
			outer.css('transform', 'scale(' + getOuterScale(progress) + ')')
			inner.css('transform', 'scale(' + getInnerScale(progress) + ')')
		}

		var onVisibleOnScreen = function (e, visible) {

			// images are cloned and removed
			outer = element.find('.b-text-sticky-image-background')
			inner = element.find('.b-text-sticky-image-background .image')

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