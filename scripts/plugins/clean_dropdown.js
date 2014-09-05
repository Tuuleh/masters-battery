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
                    element: 'item',
                    // other information needed for the trial method can be added here
                    items: params.items[i],
                    options: params.options[i],
                    //submenu_options: params.submenu_options[i],
                    number: i,
                    submenu_options: (typeof params.submenu_options === 'undefined') ? [] : params.submenu_options[i],
                    data: (typeof params.data === 'undefined') ? {} : params.data[i]
                });   
            }
            //push submit button to the end of the trial sequence
            trials.push({
                type: "survey-dropdown",
                element: "submit_button"
            });
            return trials;
        };

        //change this so that you can define several items simultaneously and so it runs for the length of items array
        plugin.trial = function(display_element, block, trial, part) {
            if (trial.element === "item") {
                display_element.append("<p>" + trial.items + "</p>");
                var $main_menu = $("<select class='main_menu' id='main_menu_" + trial.number + "' text='" + trial.items + "'/>");
                //adds options to the main select
                for(var val in trial.options) {
                    $("<option />", {value: val, text: trial.options[val]}).appendTo($main_menu);
                    //if at the last iteration of the options for the main select, close the select tag and append
                    //the main select to display element. 
                    if (val == (trial.options.length-1)) {
                        display_element.append($main_menu);
                        if (trial.submenu_options.length != undefined) {   //If submenu option array contains menus...
                            for (var i in trial.submenu_options) {         //loop through it.
                                if (trial.submenu_options[i].length > 0) { //And if the submenu array is not empty, create submenu and append it.
                                    var $submenu = $("<select class = 'submenu' id = 'submenu_" + i + "' parent_item='main_menu_" + trial.number +"'/>");
                                    for (var j in trial.submenu_options[i]) {
                                        var $submenu_option = $("<option />", {value: j, text: trial.submenu_options[i][j]})
                                        $submenu.append($submenu_option);
                                    }
                                    display_element.append($submenu);
                                }
                            }
                        }
                    }  
                }
            }
            else if (trial.element === "submit_button") {
                display_element.append($('<p>'));
                display_element.append($('<button>', {
                    'id': 'dropdown-submit',
                    'class': 'dropdown-submit',
                    'html': 'Submit Answers',
                }));
                $("#dropdown-submit").css('display','block');
            }

            //defaults as all submenus hidden
            $('select[class="submenu"]').hide();
            //show all items where id is submenu_ + main_menu's val
            $('select[id="submenu_' + $('select[class="main_menu"]').val() + '"]').show(); 
            //if a change happens in an item of class main_menu...
            $('select[class="main_menu"]').change(function(){
                //hide if class is submenu, parent item is id of $this, but id is not submenu_ + $(this).val()
                console.log($(this).val());
                console.log($(this).attr("id"));                
                var $hidden = $('select[class="submenu"][parent_item="'+$(this).attr("id")+'"][id!="submenu_' + $(this).val() + '"]')
                var $showable = $('select[class="submenu"][parent_item="'+$(this).attr("id")+'"][id="submenu_' + $(this).val() + '"]')
                $hidden.hide();
                //show if class is submenu, parent item is id of $this, and id is submenu_ + $(this).val()
                $showable.show();
            });
            block.next();

            //SUBMIT BUTTON-ON-CLICK ITERATE THROUGH DOM AND GET VALS INTO AN OBJECT AND EXTEND IT IN block.writeData.
        
            //APPEND A SUBMIT BUTTON HERE
            
            /*$("#dropdown-submit").click(function() {
                // create object to hold responses
                var dropdown_data = {};
                //for every main menu...
                $("div.jspsych-survey-likert-slider").each(function(index) {
                    var id = "Q" + index;
                    var mainmenu_val = $(this).val();
                    var submenu_val = $('select[class="submenu"][parent_item="'+$(this).attr("id")+'"][id="submenu_' + $(this).val() + '"]').val();
                    //val from submenu where id is "submenu'_+ $(this).val() + "'", or if no such exists, blank
                    var obje = {};
                    obje[id] = mainmenu_val;
                    $.extend(dropdown_data, obje);
                });
                // save data
                block.writeData($.extend({}, {
                    "trial_type": "dropdown",
                    "trial_index": block.trial_idx,
                }, dropdown_data, trial.data));

                display_element.html('');
                // next trial
                block.next();
            }); */

        };

        return plugin;
    })();

}) (jQuery);