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
            var first_menu_html_string = "<p>"+trial.dropdown_title+"</p>" +
            "<select name= '" + trial.dropdown_title +"' id ='' title= '' >";
            for (var i = 0; i < trial.options.length; i++) {
                var option_string = "<option value='" + trial.options[i] + "'>" + trial.options[i] + "</option>"
                first_menu_html_string += option_string;
            }
            first_menu_html_string += "</select>";
            


            if (trial.submenu_options.length == 0) {
                display_element.append(first_menu_html_string);
                console.log("no submenus");
                //append data gained from the single dropdown menu to the data object
            }
            
            else {

                //this thing is broken, fix eet
                for (var i = 0; i < trial.options.length; i++) {
                    /*submenu html string start defines the given submenu's html string so that it is named after the element it corresponds
                    to in the main menu, so the first one is trial.options[i].
                    Within this structure, we will have a for loop with var j that will iterate through the menu corresponding to that item. That menu is located in the
                    i:th array in the submenu_options array. On each iteration through the menu, stopping at j < trial.submenu_options[i].length we concatenate to the 
                    first menu html string the submenu option string containing the submenu option.
                    */
                    //prob: constantly overwriting submenu_html_string
                    var submenu_html_string = "<select name = '"+ trial.options[i] +"' id='' title='' >";
                    var option_array = trial.submenu_options[i];

                    for (var j = 0; j < option_array.length; j++) {
                        console.log("in the class loop now - submenu_html_string is " + submenu_html_string);
                        
                        var submenu_option_string = "<option value= '" + option_array[j] + "'>" + option_array[j] + "</option>"
                        submenu_html_string += submenu_option_string;


                    };

                    first_menu_html_string += (submenu_html_string + "</select>");
                    
                };

            display_element.append(first_menu_html_string);
            console.log(first_menu_html_string);
            };
                //construct items for the rest of the dropdowns as well
                //manage script for showing and hiding dropdowns
                //append data from the chosen dropdown selectors to the data object
            

            
/*
            //for (var i = 0; i < trials.length; i++) {
                // creates the div - the selector element that works as a button (must be defined in css)       
                var currentDropdown = $("<div id='jspsych-survey-dropdown-" + trial.dropdown +"', class='btn'><span class ='valueHolder'>" + trial.dropdown + "</span></div>");
                display_element.append(currentDropdown);

                var htmlString = "<div id='dropContainer-" + trial.dropdown + "', class='dropOption'>" + trial.dropdown + '</div>';

                for (var i = 0; i < trial.options.length; i++) {                        
                    htmlString += '<div class="dropOption">' + trial.options[i] + '</div>';
                }
                    htmlString += '</div>';
                    currentDropdown.append(htmlString);
                

            //for toggling and hiding dropdown lists upon click - doesnt work with more than one dropdown, fix it.
            //suspected problem - doesn't distinguish div elements from one another: tells a jquery object what to do, but
            //the effect needs to be limited to that particular div and its children
            //GIVE SEPARATE IDS FOR ALL DROPDOWN DIVS AND THEIR OPTIONS AND MODIFY THEIR APPEARANCE WITH CLASSES

            $("[id = jspsych-survey-dropdown]").on('click', function(event){
                //$("[id^=jander]")
                    var drop = $(this);
                    var target = $(event.target);
                    //correct this so it's precisely the dropcontainer div of $(this)
                    //make var containerNum = $(this) by extracting what the trial.question is from the id, and append that to dropContainer 
                    var container = $('#dropContainer');
                    
                        if(target.hasClass('valueHolder') || target.attr('id') === 'jspsych-survey-dropdown'){
                                container.show();
                        }else if(target.hasClass('dropOption')){
                                //selects the case from the list and hides the container -> use this to log the response
                                // except that it doesn't seem to be working the way I'd want it to...
                                drop.find('span.valueHolder').text(target.text());

                                container.hide();
                        }
    
            });
*/
            // data saving
            // this is technically optional, but virtually every plugin will
            // need to do it. it is good practice to include the type and 
            // trial_index fields for all plugins.
            var trial_data = {
                type: trial.type,
                trial_index: block.trial_idx,

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