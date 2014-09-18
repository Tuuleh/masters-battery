$(document).ready(function() {
		var $topSelect = $('select[name="dropdownmain"]');
        var $nestedSelects = $('select[name!="dropdownmain"]');
        showApplicableSelect();
        $topSelect.change(showApplicableSelect);
        function showApplicableSelect() {
            $nestedSelects.hide();
            $('select[name="' + $topSelect.val() + '"]').show();
        }
});