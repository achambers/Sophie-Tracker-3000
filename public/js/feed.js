$(function() {
	var feedType;

	$('#feedModal .feed-types button').click(function () {
		// Reset all button states
		$('#feedModal .feed-types button')
			.removeClass('btn-primary')
			.removeClass('btn-info')
			.addClass('btn-info');

		// Make this button primary
		$(this).removeClass('btn-info').addClass('btn-primary');

		if ($(this).data('value') == 'left' || $(this).data('value') == 'right') {
			$('#feedModal .time-options').removeClass('hide');
			$('#feedModal .bottle-options').addClass('hide');
		} else {
			$('#feedModal .bottle-options').removeClass('hide');
			$('#feedModal .time-options').addClass('hide');
		}

		feedType = $(this).data('value');

		return false;
	});

	$('#feedModal .time-options button, #feedModal .bottle-options button').click(function () {
		$.post('track/new', {
			type: 'Feed',
			subtype: feedType,
			value: $(this).data('value')
		}, function (response) {
			if (response.success && response.success == true) {
				$('#notification .event-type').html('Feed');
				$('#notification').css('top', -$('#notification').height() + 'px')
					.removeClass('hide')
					.animate({ top: '0px' })
					.delay(8000)
					.animate({ top: -$('#notification').height() + 'px' }, 400, function() {
						$('#notification').addClass('hide')
					});

				$('#feedModal').modal('hide');
			}
		});

		return false;
	});
});