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
                    //submenu_options: params.submenu_options[i],
                    number: i,
                    submenu_options: (typeof params.submenu_options === 'undefined') ? [] : params.submenu_options[i],
                    data: (typeof params.data === 'undefined') ? {} : params.data[i]
                });   
            }
            return trials;
        };

        //change this so that you can define several items simultaneously and so it runs for the length of items array
        plugin.trial = function(display_element, block, trial, part) {

            display_element.append("<p>" + trial.items + "</p>");
            var $main_menu = $("<select class='main_menu' id='main_menu_" + trial.number + "' text='" + trial.items + "'/>");

            for(var val in trial.options) {
                $("<option />", {value: val, text: trial.options[val]}).appendTo($main_menu);

                if (val == (trial.options.length-1)) {
                    $main_menu.append("</select>");
                    display_element.append($main_menu);

                    //constructs submenus if the length of the array containing the submenu options arrays is above 0
                    if (trial.submenu_options.length != undefined) {

                        for (var i in trial.submenu_options) {  

                            if (trial.submenu_options[i].length > 0) {
                                var $submenu = $("<select class = 'submenu' id = 'submenu_" + i + "' parent_item='main_menu_" + trial.number +"'/>");

                                for (var j in trial.submenu_options[i]) {
                                    console.log(trial.submenu_options[i].length);
                                    var $submenu_option = $("<option />", {value: j, text: trial.submenu_options[i][j]})
                                    $submenu.append($submenu_option);
                                }

                                $submenu.append("</select");
                                display_element.append($submenu);
                            }
                        }
                    }
                }  
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

        
            block.writeData($.extend({}, {drek: this.value}, trial.data));

                // let's say this is the end here:
            block.next();

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