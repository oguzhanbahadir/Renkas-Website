(function ($) {

	/**
	 * Updates the project list from filters
	 * @since 1.0.0
	 */
	$.attach('.b-projects-filters', function (i, element) {

		var parent = element.closest('.b-projects')

		var reg = parent.find('[name=reg]')
		var cat = parent.find('[name=cat]')
		var filters = parent.find('.b-projects-filters')

		var selectedReg = localStorage.getItem('b-project-filters-selected-reg')
		var selectedCat = localStorage.getItem('b-project-filters-selected-cat')

		var timeout = null

		var onRegChange = function () {

			cat.val('')
			cat.trigger('change.select2').trigger('select2:unselect')
			reg.trigger('change.select2').trigger('select2:unselect')

			selectedReg = reg.val()

			localStorage.setItem('b-project-filters-selected-cat', '')
			localStorage.setItem('b-project-filters-selected-reg', selectedReg)

			timeout = clearTimeout(timeout)
			timeout = setTimeout(function () {
				reload()
			}, 200)
		}

		var onCatChange = function () {

			reg.val('')
			reg.trigger('change.select2').trigger('select2:unselect')
			cat.trigger('change.select2').trigger('select2:unselect')

			selectedCat = cat.val()

			localStorage.setItem('b-project-filters-selected-reg', '')
			localStorage.setItem('b-project-filters-selected-cat', selectedCat)

			timeout = clearTimeout(timeout)
			timeout = setTimeout(function () {
				reload()
			}, 200)
		}

		var reload = function () {

			var url = filters.attr('data-url')
			if (cat.val() && cat.val() != 'none') url += '&cat=' + cat.val()
			if (reg.val() && reg.val() != 'none') url += '&reg=' + reg.val()

			filters.addClass('b-projects-filters--updating')

			$.get(url, function (html) {

				html.replace('<html>', '')
				html.replace('</html>', '')

				var dom = document.createElement('html')
				dom.innerHTML = html
				dom = $(dom)

				parent.find('.b-projects-items').replaceWith(dom.find('.b-projects-items'))
				parent.find('.b-projects-footer').replaceWith(dom.find('.b-projects-footer'))

				$.attach.refresh(parent)

				filters.removeClass('b-projects-filters--updating')
			})
		}

		var onGeolocalize = function (position) {

			if (element.hasClass('geolocalized') || selectedReg) {
				return
			}

			var url = filters.attr('data-url')
			url += '&lat=' + position.coords.latitude
			url += '&lng=' + position.coords.longitude

			filters.addClass('b-projects-filters--updating')

			$.get(url, function (html) {

				html.replace('<html>', '')
				html.replace('</html>', '')

				var dom = document.createElement('html')
				dom.innerHTML = html
				dom = $(dom)

				parent.find('.b-projects-items').replaceWith(dom.find('.b-projects-items'))
				parent.find('.b-projects-footer').replaceWith(dom.find('.b-projects-footer'))
				parent.find('.b-projects-filters').replaceWith(dom.find('.b-projects-filters'))

				$.attach.refresh(parent)

				filters.removeClass('b-projects-filters--updating')
			})
		}

		reg.on('change', onRegChange)
		cat.on('change', onCatChange)

		if (selectedCat) {
			cat.val(selectedCat)
			onCatChange()
		}

		if (selectedReg) {
			reg.val(selectedReg)
			onRegChange()
		}

		$.subscribe('geolocalize', onGeolocalize)
	})

	/**
	 * Loads more projects
	 * @since 1.0.0
	 */
	$.attach('.b-projects-more', function (i, element) {

		var parent = element.closest('.b-projects')
		var reg = parent.find('[name=reg]')
		var cat = parent.find('[name=cat]')
		var button = element.find('.button-action span')

		var url = button.attr('data-more')
		if (url == '') {
			return
		}

		var parent = element.closest('.b-projects')

		var append = function () {

			element.addClass('b-projects-more--fetching')

			if (cat.val() && cat.val() != 'none') url += '&cat=' + cat.val()
			if (reg.val() && reg.val() != 'none') url += '&reg=' + reg.val()

			$.get(url, function (html) {

				html.replace('<html>', '')
				html.replace('</html>', '')

				var dom = document.createElement('html')
				dom.innerHTML = html
				dom = $(dom)

				parent.find('.b-projects-items').append(dom.find('.b-projects-item'))
				parent.find('.b-projects-footer').replaceWith(dom.find('.b-projects-footer'))

				$.attach.refresh(parent)

				element.removeClass('b-projects-more--fetching')
			})
		}

		var onMoreClick = function (e) {
			append()
		}

		button.on('click', onMoreClick)
	})

	$.attach('body:not(.preview) .b-projects-item', function (i, element) {

		var index = element.index() % 3 + 1

		var min = 0.65 / index
		var max = 0.85

		var outer = element.find('.b-projects-item-background')
		var inner = element.find('.b-projects-item-background .image')

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

})(jQuery)