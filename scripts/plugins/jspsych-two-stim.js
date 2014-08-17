/*  jspsych-xab.js
 *	Josh de Leeuw
 *  updated Oct 2013
 *
 *  This plugin runs a single XAB trial, where X is an image presented in isolation, and A and B are choices, with A or B being equal to X. 
 *	The subject's goal is to identify whether A or B is identical to X.
 *
 *  parameters:
 *      stimuli: array of arrays. each interior array represents the stimuli for a single trial.
 *                  each interior array can be two or three elements. if two elements, then the plugin
 *                  will show the first one as the target (X). if three elements, then the first is X
 *                  the second is A and the third is B. the second is considered the target and the third
 *                  is the foil. this is useful if X and A are not identical, but A is still the correct
 *                  choice (e.g. a categorization experiment where the goal is to pick the item that is 
 *                  in the same category). stimuli can be paths to images, or html strings.
 *      left_key: key code for response associated with image on the left side of the screen.
 *      right_key: key code for right side
 *      timing_x: how long to display X for in ms
 *      timing_xab_gap: how long to show a blank screen in between X and AB in ms.
 *      timing_ab: how long to show the screen with AB in ms. -1 will display until a response is given.
 *      timing_post_trial: how long to show a blank screen after the trial is complete.
 *      is_html: must set to TRUE if the stimuli are HTML strings instead of images.
 *      prompt: an HTML string to display under the AB stimuli, e.g. to remind the subject which keys to use
 *      data: the optional data object
 *
 */

(function($) {
    jsPsych["two-stim"] = (function() {

        var plugin = {};

        plugin.create = function(params) {

            // the number of trials is determined by how many entries the params.stimuli array has
            var trials = new Array(params.stimuli.length);

            for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].type = "two-stim";
                trials[i].a_path = params.stimuli[i][0];
                trials[i].b_path = params.stimuli[i][1];
                trials[i].left_key = params.left_key || 81; // defaults to 'q'
                trials[i].right_key = params.right_key || 80; // defaults to 'p'
                // timing parameters
                trials[i].timing_ab = params.timing_ab || -1; // defaults to -1, meaning infinite time on AB. If a positive number is used, then AB will only be displayed for that length.
                trials[i].timing_post_trial = (typeof params.timing_post_trial === 'undefined') ? 1000 : params.timing_post_trial; // defaults to 1000msec.
                // optional parameters
                trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
                trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];

            }
            return trials;
        };

        var xab_trial_complete = false;

        plugin.trial = function(display_element, block, trial) {
            
            // if any trial variables are functions
            // this evaluates the function and replaces
            // it with the output of the function
            //trial = jsPsych.normalizeTrialVariables(trial);

                // randomize whether the target is on the left or the right
                var images = [trial.a_path, trial.b_path];
                var target_left = (Math.floor(Math.random() * 2) === 0); // 50% chance target is on left.
                if (!target_left) {
                    images = [trial.b_path, trial.a_path];
                }

                // show the options
                if (!trial.is_html) {
                    display_element.append($('<img>', {
                        "src": images[0],
                        "class": 'jspsych-two-stim-stimulus'
                    }));
                    display_element.append($('<img>', {
                        "src": images[1],
                        "class": 'jspsych-two-stim-stimulus'
                    }));

                }
                else {
                    display_element.append($('<div>', {
                        "class": 'jspsych-two-stim-stimulus',
                        html: images[0]
                    }));
                    display_element.append($('<div>', {
                        "class": 'jspsych-two-stim-stimulus',
                        html: images[1]
                    }));
                }

                if (trial.prompt !== "") {
                    display_element.append(trial.prompt);
                }

                // start measuring response time
                var startTime = (new Date()).getTime();

                // if timing_ab is > 0, then we hide the stimuli after timing_ab milliseconds
                if (trial.timing_ab > 0) {
                    setTimeout(function() {
                        if (!xab_trial_complete) {
                            $('.jspsych-two-stim-stimulus').css('visibility', 'hidden');
                        }
                    }, trial.timing_ab);
                }

                // create the function that triggers when a key is pressed.
                var resp_func = function(e) {
                    var flag = false; // true when a valid key is chosen
                    var correct = false; // true when the correct response is chosen
                    if (e.which == trial.left_key) // 'q' key by default
                    {
                        flag = true;
                        if (target_left) {
                            correct = true;
                        }
                    }
                    else if (e.which == trial.right_key) // 'p' key by default
                    {
                        flag = true;
                        if (!target_left) {
                            correct = true;
                        }
                    }
                    if (flag) {
                        var endTime = (new Date()).getTime();
                        var rt = (endTime - startTime);
                        // create object to store data from trial
                        var trial_data = {
                            "trial_type": "two-stim",
                            "trial_index": block.trial_idx,
                            "rt": rt,
                            "correct": correct,
                            "stimulus_x": trial.x_path,
                            "stimulus_a": trial.a_path,
                            "stimulus_b": trial.b_path,
                            "key_press": e.which
                        };

                        block.writeData($.extend({}, trial_data, trial.data));
                        $(document).unbind('keydown', resp_func); // remove response function from keys
                        display_element.html(''); // remove all
                        xab_trial_complete = true;
                        // move on to the next trial after timing_post_trial milliseconds
                        if(trial.timing_post_trial > 0) {
                            setTimeout(function() {
                                block.next();
                            }, trial.timing_post_trial);
                        } else {
                            block.next();
                        }
                    }
                };
                $(document).keydown(resp_func);
        };

        return plugin;
    })();
})(jQuery);
