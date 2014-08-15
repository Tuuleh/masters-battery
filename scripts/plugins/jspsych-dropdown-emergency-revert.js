/**
 * jspsych-survey-dropdown
 * a jspsych plugin for selecting items on a dropdown list or menu 
 *
 * Tuuli Pöllänen (July 2014)
 * 
 * parameters:
 *      dropdown_title: a string corresponding to the title of the dropdown question
        options: an array of strings corresponding to the items on the first dropdown menu.
        submenu_options: an array of arrays of strings corresponding to the dropdown options of the submenus, conditional 
        to the item chosen on the first dropdown. The length of this should equal to the number of options available to
        the first dropdown item. 
 *      data: optional data object
        last_item: boolean variable used to control whether submit button should be appended after the item created or not
 *
 */

 (function( $ ) {
    jsPsych['survey-dropdown'] = (function(){

        var plugin = {};

        plugin.create = function(params) {  
            var trials = [];
            for(var i = 0; i < 1; i++)
            {
                trials[i] = {};
                trials[i].type = 'survey-dropdown';
                // other information needed for the trial method can be added here
                trials[i].dropdown_title = params.dropdown_title;
                trials[i].options = params.options;
                trials[i].submenu_options = params.submenu_options;
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].submenu_options = (typeof params.submenu_options === 'undefined') ? [] : params.submenu_options;
                trials[i].last_item = (typeof params.last_item === 'undefined') ? false : params.last_item;
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
            }
            return trials;
        };

        plugin.trial = function(display_element, block, trial, part) {


            //construct items for one dropdown menu, append to the display object
            //changed div id to unique id containing trial.dropdown_title to avoid several items having the same id
            var first_menu_html_string = "<div id ='dropdown_item-"+trial.dropdown_title+"-header' style = 'display: block'><p>"+trial.dropdown_title+"</p>" +
            "<select name= '" + trial.dropdown_title +"' id ='"+trial.dropdown_title+"-main_menu' title= '' >"; //changed id to trial.dropdown_title to avoid colliding ids
            
            for (var i = 0; i < trial.options.length; i++) {
                var option_string = "<option value='" + trial.options[i] + "'>" + trial.options[i] + "</option>"
                first_menu_html_string += option_string;
            }

            first_menu_html_string += "</select>";

            //creates and object holding the trial data, where main_option and submenu_option will be overridden below
            

            for (var i = 0; i < trial.options.length; i++) {

                

                    //construct items for the rest of the dropdowns as well
                    var submenu_html_string = "<select name = '"+ trial.options[i] +"' id='"+trial.options[i] + "-" + trial.dropdown_title + "-selector' title='' class = 'selector'>"; //changed the id to trial.options[i] to prevent duplicate ids
                    var option_array = trial.submenu_options[i];

                    for (var j = 0; j < option_array.length; j++) {                        
                        var submenu_option_string = "<option value= '" + option_array[j] + "'>" + option_array[j] + "</option>"
                        submenu_html_string += submenu_option_string;
                    };

                    first_menu_html_string += (submenu_html_string + "</select>");
                    
                };

                first_menu_html_string += "</div>"
                display_element.append(first_menu_html_string);

                //script for showing and hiding dropdowns - code adapted from StackOverFlow 
                //http://stackoverflow.com/questions/15949327/conditional-dropdownlist-using-jquery-or-javascript-only

                var trial_data = {
                type: trial.type,
                trial_index: block.trial_idx,
                main_option: "main_option",
                submenu_option: "submenu_option"
                };


            $(document).ready(function() {

                //wrap this all in a function that will return main_option and submenu_option 
                //and execute while submit button hasn't been pushed?
                //make it a do while, in case someone is content with the default options and doesn't need to change anything

                var $topSelect = $('select[id *="' + trial.dropdown_title + '"]');
                var $nestedSelects = $("select[class=selector][id *= '" + trial.dropdown_title +"']");

                function showApplicableSelect() {
                    $nestedSelects.hide();
                    var $showable = $('select[name="' + $topSelect.val() + '"]');
                    var return_array = [$topSelect.val(), $showable.val()];
                    $showable.show();
                    return return_array;
                    };

                var results = showApplicableSelect();
                var main_selected = results[0]; // value of the selected the main option is the second item on the results array
                var submenu_selected = results[1]; // value of the selected submenu option is the third item on the results array

                $topSelect.change(showApplicableSelect);
                console.log(main_selected);
                console.log(submenu_selected);

                trial_data.main_option = main_selected;
                trial_data.submenu_option = submenu_selected;

                console.log("inside the data object, main option is " + trial_data.main_option + " and submenu option is " + trial_data.submenu_option);
 
            });


/*
PROBLEM: If trial_data object is defined within $(document).ready(function(){}); it is out of reach for block.writeData(...).
If trial_data object is defined before $(document).ready(function(){});, no changes to it remain for block.writeData(...).
QUESTION: where and how do I define variables that I can store in trial_data so that it can be passed to block.writeData(...)
without any problems on the way?
If I defined it within $(document).ready(function(){});, but at the start, it will store the first options from the menus
in the trial_data object, but these will not change when the user changes options.

block.writeData looks like this:

writeData: function(data_object) {
                    this.data[this.trial_idx] = data_object;
                    opts.on_data_update(data_object);
                },

a $.extend is called in parameters for writeData, merging items from trial_data and trial.data to an empty object

*/

            // this line merges together the trial_data object and the generic
            // data object (trial.data), and then stores them.
            
            
            block.writeData($.extend({}, trial_data, trial.data));


            // this method must be called at the end of the trial
            block.next();
            



        };

        return plugin;
    })();
}) (jQuery);