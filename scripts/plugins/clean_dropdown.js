/**
 * jspsych-survey-dropdown
 * a jspsych plugin for selecting items on a dropdown list or menu 
 *
 * Tuuli Pöllänen (July 2014)
 * 
 * parameters:
 *      items: an array of strings corresponding to the title of the dropdown question
 *      options: an array of arrays of strings corresponding to the items on the dropdown menu.
 *      submenu_options: an array of arrays of arrays of strings corresponding to the dropdown options of the submenus, conditional 
 *      to the item chosen on the main dropdown menu. The length of this should equal to the number of options available to
 *      the main menu. 
 *      data: optional data object
 *
 */

 (function( $ ) {
    jsPsych['survey-dropdown'] = (function(){

        var plugin = {};

        plugin.create = function(params) {
            //this creates the trials array, which contains each individual trial (in the case of this plugin, only one trial)
            //and sets the necessary parameters for the trials  
            var trials = [];
            for(var i = 0; i < params.items.length; i++) {
                trials.push({
                    type: 'survey-dropdown',
                    // other information needed for the trial method can be added here
                    items: params.items[i],
                    options: params.options[i],
                    submenu_options: params.submenu_options[i],
                    number: i
                });
                trials.submenu_options = (typeof params.submenu_options === 'undefined') ? [] : params.submenu_options;
                trials.data = (typeof params.data === 'undefined') ? {} : params.data[i];
            }
            return trials;
        };

        //change this so that you can define several items simultaneously and so it runs for the length of items array
        plugin.trial = function(display_element, block, trial, part) {

            //do I really need separate div containers, or can I just use the display element?
            var $container = $("<div class='dropdown_item' style='display: block'/>");
            $container.append("<p>" + trial.items + "</p>");
            var $main_menu = $("<select class='main_menu' id='main_menu_" + trial.number + "' text='" + trial.items + "'/>");
            //will create a submenu and not append it anywhere if the submenu options array is empty

            console.log(trial.number);

            for(var val in trial.options) {
                $("<option />", {value: val, text: trial.options[val]}).appendTo($main_menu);
                console.log("submenu val", trial.submenu_options[val])
                if (trial.submenu_options[val].length > 0) {
            
                    var $submenu = $("<select class = 'submenu' id = 'submenu_" + val + "' text ='" + trial.submenu_options[val] + "' parent='"+trial.options[val]+"'/>");
                    for (var i in trial.submenu_options[val]) {                        
                        $("<option />", {value: i, text: trial.submenu_options[val][i]}).appendTo($submenu);
                    }
                    $main_menu.append($submenu);        
                }
                
            }

            $container.append($main_menu);
            display_element.append($container);


            /*var $container = 
            $container.append('<p>' + trial.items + '</p>');
            var $main_menu = $('<select id="' + trial.items.replace(" ", "") + '-main_menu" name="' + trial.items + '" />');

            for(var val in trial.options) {
                console.log("val is" + val);
                $("<option />", {value: val, text: trial.options[val]}).appendTo($main_menu);
                console.log("s is " + $main_menu);
                console.log("trial.options[val] is " + trial.options[val]);
            }

            $main_menu.appendTo($container); //appends select to div, then appends div to display element
            $container.appendTo(display_element);*/

        
            //This is how you monitor a select for change:
            $('.main_menu').change(function() {
                alert(this.value); 
                // or
                // $(this).val(); // the jQuery-fied way

                // This function get's called every time the value changes. It's as simple as updating the value in your data
                // json from here.

                block.writeData($.extend({}, {drek: this.value}, trial.data));

                // let's say this is the end here:
                block.next();
            })

            //construct items for the conditional menus
            /*call this inside the main menu loop if length of corresponding submenu array is more than 0
            for(var option in trial.options) {
                // Note: this could also be done in the first loop - but since the magnitude of elements will always be small, it doesn't matter much

                // You should realy rethink ids: store them wherever you construct this options objects. Also, id is an optional field.
                var id = trial.options[option].replace(" ", "") + " " + trial.items.replace(" ", "") + "-selector";
                var submenu = $('<select name="' + trial.options[option] + '" id="' + id + '" class="selector" />');

                for(var i in trial.submenu_options[option]) {
                    $("<option />", {value: i, text: trial.submenu_options[option][i]}).appendTo(submenu);
                }
                submenu.appendTo($container);

            }
            */

            //script for showing and hiding dropdowns - code adapted from StackOverFlow 
            //http://stackoverflow.com/questions/15949327/conditional-dropdownlist-using-jquery-or-javascript-only

            //make this a selector.change function 

            var $topSelect = $('select[id *="' + trial.items.replace(" ", "") + '"]');
            var $nestedSelects = $("select[class=selector][id *= '" + trial.items.replace(" ", "") +"']");

            //function that selects appropriate items for showing and returns the selected values in an array
            function showApplicableSelect() {
                //this is now broken with the changed top select val
                var $main_menuhowable = $('select[name="' + trial.options[$topSelect.val()] + '"]');
                $main_menuhowable.show();
                $nestedSelects.hide();
                };

            $topSelect.change(showApplicableSelect);



var trial_data = {
type: trial.type,
trial_index: block.trial_idx,
main_option: "main_option",
submenu_option: "submenu_option"
};

        };

        return plugin;
    })();

}) (jQuery);