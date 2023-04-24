$(document).ready(function() {

	$("#dropper").sortable();
	$("#dropper").disableSelection();

	$(".qitem").draggable({
		containment : "#container",
		helper : 'clone',
		revert : 'invalid'
	});

	$("#dropper, #sorter").droppable({
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
