(function ($) {

	$.attach('.b-header-site-highlight', function (i, element) {

		var index = 0
		var items = element.find('svg .graphic path')

		items
			.toggleClass('hidden', true)
			.eq(0)
			.toggleClass('hidden', false)

		var update = function () {

			var next = index + 1
			if (next > items.length - 1) {
				next = 0
			}

			var hide = items.eq(index)
			var show = items.eq(next)

			hide.toggleClass('hidden')
			show.toggleClass('hidden', false, 1500)

			setTimeout(update, 3000 + 1500)

			index = next
		}

		setTimeout(update, 3000)

	})

	$.attach('.b-header-site-slideshow', function (i, element) {

		var items = element.find('.b-header-site-slideshow-item')

		var cur = element.find('.b-header-site-slideshow-index-cur')
		var tot = element.find('.b-header-site-slideshow-index-tot')

		var curr = -1

		var update = function () {

			var next = curr + 1
			if (next > items.length - 1) {
				next = 0
			}

			var currItem = items.eq(curr)
			var nextItem = items.eq(next)

			nextItem.parent().append(nextItem)

			requestAnimationFrame(function () {
				nextItem.toggleClass('b-header-site-slideshow-item--current', true)
				currItem.toggleClass('b-header-site-slideshow-item--current', false, 750)
			})

			curr = next

			cur.text(curr + 1)
			tot.text(items.length)

			setTimeout(update, 6000)
		}

		update()

	})

})(jQuery);