// Josh de Leeuw
// Updated October 2013
//
// This plugin is for presenting a single image and collecting a key response.
// It can be used for categorizing images (without feedback), collecting yes/no responses, etc...
//
//  parameters
//      stimuli: array of stimuli to present. elements of the array can be either paths to images
//                  or HTML strings
//      choices: array of key codes that represent valid responses. other key codes will be ignored
//      continue_after_response: when true, the trial will end as soon as the user gives a response.
//                  if false, then the trial will continue until timing_response is reached
//      timing_stim: how long to show the stimulus for. -1 will show indefinitely.
//      timing_response: how long to wait for a response. this timer starts at the same time as the
//                  timer for the stimulus presentation. if the timer is reached without a response
//                  given, then the user's response will be recorded as a "-1" for the trial, and the
//                  trial will end.
//      timing_post_trial: how long to show a blank screen after the trial ends.
//      is_html: must set to true when using HTML strings as the stimuli.
//      prompt: optional HTML string to display with the stimulus.
//      data: the optional data object


(function($) {
    jsPsych["single-stim"] = (function() {

        var plugin = {};

        plugin.create = function(params) {
            
            params = jsPsych.pluginAPI.enforceArray(params, ['stimuli', 'choices', 'data']);
            
            var trials = []
            for (var i = 0; i < params.stimuli.length; i++) {
                trials[i] = {};
                trials[i].type = "single-stim";
                trials[i].a_path = params.stimuli[i];
                trials[i].choices = params.choices;
                // option to show image for fixed time interval, ignoring key responses
                // true = image will keep displaying after response
                // false = trial will immediately advance when response is recorded
                
                trials[i].moves = (typeof params.moves === 'undefined') ? undefined: params.moves[i];
                trials[i].continue_after_response = (typeof params.continue_after_response === 'undefined') ? true : params.continue_after_response;
                // timing parameters
                trials[i].timing_stim = params.timing_stim || -1; // if -1, then show indefinitely
                trials[i].timing_response = params.timing_response || -1; // if -1, then wait for response forever
                trials[i].timing_post_trial = (typeof params.timing_post_trial === 'undefined') ? 1000 : params.timing_post_trial;
                // optional parameters
                trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
                trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
            }
            return trials;
        };



        plugin.trial = function(display_element, block, trial, part) {
            
            // if any trial variables are functions
            // this evaluates the function and replaces
            // it with the output of the function
            trial = jsPsych.pluginAPI.normalizeTrialVariables(trial);

            var trial_complete = false;

            if (!trial.is_html) {
                display_element.append($('<img>', {
                    src: trial.a_path,
                    id: 'jspsych-single-stim-stimulus'
                }));
            }
            else {
                display_element.append($('<div>', {
                    html: trial.a_path,
                    id: 'jspsych-single-stim-stimulus'
                }));
            }

            //show prompt here
            if (trial.prompt !== "") {
                display_element.append(trial.prompt);
            }

            var end_trial = function(info) {
                trial_complete = true;
                var trial_data = {
                    "trial_type": "single-stim",
                    "trial_index": block.trial_idx,
                    "rt": info.rt,
                    "stimulus": trial.a_path,
                    "key_press": info.key
                };
                
                //if correct_key is defined in the data object for the trial:
                if (trial.data.correct_key != undefined) {
                    trial_data.correct = false;
                    if (trial.data.correct_key == info.key) {
                        trial_data.correct = true;
                    }
                    //if you have an experiment where you have to keep count on by how much
                    //the response was incorrect (e.g. Tower of London)
                    if (trial.moves != undefined) {
                        trial_data["missed_by"] = Math.abs(info.key-trial.data.correct_key); //trial.correct_key is string
                    }
                }

                block.writeData($.extend({}, trial_data, trial.data));
                
                display_element.html('');
                if (trial.timing_post_trial > 0) {
                    setTimeout(function() {
                        block.next();
                    }, trial.timing_post_trial);
                }
                else {
                    block.next();
                }
            };

            var after_response = function(info) {
                
                // after a valid response, the stimulus will have the CSS class 'responded'
                // which can be used to provide visual feedback that a response was recorded
                $("#jspsych-single-stim-stimulus").addClass('responded');

                if (trial.continue_after_response) {
                    // response triggers the next trial in this case.
                    // if hide_image_after_response is true, then next
                    // trial should be triggered by timeout function below.
                    end_trial(info);
                }
            };
        

            jsPsych.pluginAPI.getKeyboardResponse(after_response, trial.choices);
            
            // hide image if timing is set
            if (trial.timing_stim > 0) {
                setTimeout(function() {
                    if (!trial_complete) {
                        $('#jspsych-single-stim-stimulus').css('visibility', 'hidden');
                    }
                }, trial.timing_stim);
            }

            // end trial if time limit is set
            if (trial.timing_response > 0) {
                setTimeout(function() {
                    if (!trial_complete) {
                        end_trial({rt: -1, key: -1});
                    }
                }, trial.timing_response);
            }

        };


        return plugin;
    })();
})(jQuery);