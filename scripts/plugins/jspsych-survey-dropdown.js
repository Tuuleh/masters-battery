/**
 * jspsych-survey-dropdown
 * a jspsych plugin for selecting items on a dropdown list or menu 
 *
 * Tuuli Pöllänen (July 2014)
 * 
 * parameters:
 *      questions: an array of strings corresponding to the "titles" of the dropdown items
 *      options: an array of arrays of strings corresponding to the options on the dropdown menu. 
            Each 'title' (question) gets a corresponding array of options.
 *      data: optional data object
 *
 */

(function( $ ) {
    jsPsych["survey-dropdown"] = (function(){

        var plugin = {};

        plugin.create = function(params) {
            var trials = [];
            for(var i = 0; i < params.questions.length; i++)
            {
                trials[i] = {};
                trials[i].type = "survey-dropdown";
                // other information needed for the trial method can be added here
                trials[i].questions = params.questions[i];
                trials[i].options = params.options[i];
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
            }
            return trials;
        };

        plugin.trial = function(display_element, block, trial, part) {

            // code for running the trial goes here
            /*...*/
            //function for creating the dropdown list and appending it to the selection button
            function createDropdown(drop, options_list){
                var htmlString = '<div id="dropContainer">';

                    for(var i = 0; i < options_list.length; i++){
                        var option = options_list[i];
                        htmlString += '<div class="dropOption">' + option + '</div>';
                    }

                    htmlString += '</div>';
                    drop.append(htmlString);
                }

            for (var i = 0; i < trial.questions.length; i++) {
                // creates the div - the selector element that works as a button        //where does this trial here point to?
                var currentDropdown = $("<div id='jspsych-survey-dropdown', class='dropdown-selector'><span class ='valueHolder'" + trial.questions[i] + "</span>")
                display_element.append(currentDropdown);
                createDropdown(currentDropdown, trial.options[i]);
                };

            //for toggling and hiding dropdown lists upon click
            $('#jspsych-survey-dropdown').on('click', function(event){
                    var container = $('#dropContainer');
                    var drop = $('#jspsych-survey-dropdown');
                    var target = $(event.target);

                    if(target.hasClass('valueHolder') || target.attr('id') === 'jspsych-survey-dropdown'){
                            container.show();
                    }else if(target.hasClass('dropOption')){
                            drop.find('span.valueHolder').text(target.text());
                            container.hide();
                    }
            });

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