$(document).ready(function() {

	$("#qselected").sortable();
	$("#qselected").disableSelection();

	$(".qitem").draggable({
		containment : "#container",
		helper : 'clone',
		revert : 'invalid'
	});

	$("#qselected, #qlist").droppable({
		hoverClass : 'ui-state-highlight',
		drop : function(ev, ui) {
			$(ui.draggable).clone().appendTo(this);
			$(ui.draggable).remove();

			$(".qitem").draggable({
				containment : "#container",
				helper : 'clone',
				revert : 'invalid'
			});
		}
	});
});
