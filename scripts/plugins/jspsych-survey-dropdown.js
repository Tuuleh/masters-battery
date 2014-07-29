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
             
            //for (var i = 0; i < trials.length; i++) {
                // creates the div - the selector element that works as a button (must be defined in css)       
                var currentDropdown = $("<div id='jspsych-survey-dropdown', class='btn'><span class ='valueHolder'>" + trial.questions + "</span></div>");
                display_element.append(currentDropdown);

                var htmlString = '<div id="dropContainer">'+'<div class="dropOption">' + trial.questions + '</div>';

                for (var i = 0; i < trial.options.length; i++) {                        
                    htmlString += '<div class="dropOption">' + trial.options[i] + '</div>';
                }
                    htmlString += '</div>';
                    currentDropdown.append(htmlString);
                

            //for toggling and hiding dropdown lists upon click - doesnt work with more than one dropdown, fix it.
            //suspected problem - doesn't distinguish div elements from one another: tells a jquery object what to do, but
            //the effect needs to be limited to that particular div and its children

            $('#jspsych-survey-dropdown').on('click', function(event){
                    var target = $(event.target);
                    var container = $('#dropContainer');
                    var drop = $('#jspsych-survey-dropdown');

                        if(target.hasClass('valueHolder') || target.attr('id') === 'jspsych-survey-dropdown'){
                                container.show();
                        }else if(target.hasClass('dropOption')){
                                //selects the case from the list and hides the container -> use this to log the response
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