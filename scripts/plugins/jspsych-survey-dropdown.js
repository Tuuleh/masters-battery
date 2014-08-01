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
            
            if (trial.submenu_options.length == 0) {
                first_menu_html_string += "</div>"
                display_element.append(first_menu_html_string);
                console.log("no submenus");
                //append data gained from the single dropdown menu to the data object
            }
            
            else {

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
                console.log(first_menu_html_string);

                $(document).ready(function() {
                    var $topSelect = $('select[id *="'+trial.dropdown_title+'"]');
                    var $nestedSelects = $("select[class=selector][id *= '"+trial.dropdown_title +"']");

                    showApplicableSelect();
                    $topSelect.change(showApplicableSelect);

                    function showApplicableSelect() {
                        $nestedSelects.hide();
                        $('select[name="' + $topSelect.val() + '"]').show();
                    };

                });

            };

            //append data from the chosen dropdown selectors to the data objectn
            
            // data saving
            // this is technically optional, but virtually every plugin will
            // need to do it. it is good practice to include the type and 
            // trial_index fields for all plugins.
            var trial_data = {
                type: trial.type,
                trial_index: block.trial_idx

                // other values to save go here
            };
            // this line merges together the trial_data object and the generic
            // data object (trial.data), and then stores them.
            block.writeData($.extend({}, trial_data, trial.data));

            // this method must be called at the end of the trial
            block.next();
            
        };

        return plugin;
    })();
}) (jQuery);