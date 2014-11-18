masters-battery
===============

By: Tuuli Pöllänen<br>


<p>This is a repository for a web application containing a psychological experiment I conducted for my master's thesis. The experiment consists of an informed consent, a survey for demographic information, two questionnaires, four cognitive tasks, and a finish-page for comments and feedback. If you want to see the experiment 'in action', you can visit leagueoflegends.web-psychometrics.com. </p>

<p>For a quick overview, the structure of the experiment is as follows:</p>

<ol>
    <li>Landing page - informed consent</li>
    <li>Demographic items</li>
    <li>Group Environment Questionnaire</li>
    <li>Nasa Task Load Index</li>
    <li>Eriksen Flanker task</li>
    <li>Two-dimensional mental rotation task</li>
    <li>Spatial Span task</li>
    <li>Tower of London</li>
    <li>Finish page </li>
</ol>

<h2>The experiment and its purpose</h2>

<p>The purpose of the experiment was to explore the role of cognitive skills in predicting players' performance in different play styles in League of Legends - an online multiplayer battle arena game. Additionally, I was interested in players' perceptions of their task load during game, and how team cohesion relates to performance in teams. </p>

<h3>Instruments and their implementation</h3>

<p>The experiment consists of two questionnaires and four cognitive tasks. Additionally, there is an informed consent, explaining the purpose and the structure of the study with general instructions, followed up by a survey of demographic items, such as player name, region, level, rankings, team name etc. After the cognitive tasks, there is a finishing page inquiring whether the participants would like to be contacted with the results of the study.</p>

<h4>The questionnaires</h4>
<p>The questionnaires were constructed using a modified Likert-plugin for JsPsych, in /public/scripts/plugins/jspsych-survey-likert-with-instructions.js

<h5>The Group Environment Questionnaire</h5>

<p>The Group Environment Questionnaire (GEQ) was chosen as a measure of group cohesion because it is well established with a long history of use in sports psychology and group research, with recent evidence suggesting adequate multilevel factorial validity (Fletcher & Whitton, 2014). An instrument from sports psychology was preferred over those from organizational psychology, as interviews with players indicated that the items meant for athletic teams were considered more relevant to their gameplay experience. The players' satisfaction with the instrument drove the decision of not developing a new instrument for the purpose, but rather attempting to repurpose GEQ. The items were modified slightly to match the context of virtual games (e.g. using the word "players" instead of "athletes"), and the modified items can be found in Appendix 1. The goodness-of-fit of a sports psychology inventory for the purpose of this study is something that should be taken into account in interpreting the results of this study. </p>

<p>GEQ is a general, rather than situation-specific measure of cohesion in sports teams. It consists of the following four sub-scales forming a four-factor model of cohesion (Brawley, Carron, & Widmeyer, 1987):
</p>

<ul>
    <li>Group Integration–Social (GI-S) conceptualizes a team member's assessment of the group's closeness, similarity and bonding as a social unit - for example, “members of our team do not stick together outside of practices and games”.</li>
    <li>Group Integration–Task (GI-T) conceptualizes the member's assessment of the group's closeness, similarity and bonding around the group's task - for example, “our team is united in trying to reach its goals for performance”.</li>
    <li>Individual Attractions to the Group–Social (ATG-S) conceptualizes to the member's notions of the social interactions and personal acceptance within the team, for example “some of my best friends are on this team”. </li>
    <li>Individual Attractions to the Group–Task (ATG-T) conceptualizes a member's feelings about personal involvement related to the group's common goals and productivity - for instance, “I do not like the style of play on this team”. </li>
</ul>

<h5>NASA-TLX</h5>

<p>The NASA Task Load Inventory (TLX) was selected as a well-established, short task load inventory with good metric characteristics (Hart & Staveland, 1988; Hart, 2006). The instrument originally consisted of two parts. In the first part, six sub-scales are presented on a single page, with the following description of each of the scale:</p>

<ol>    
    <li>Mental Demand: How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex?</li>
    <li>Physical Demand: How much physical activity was required? Was the task easy or demanding, slack or strenuous?</li>
    <li>Temporal Demand: How much time pressure did you feel due to the pace at which the tasks or task elements occurred? Was the pace slow or rapid?</li>
    <li>Performance: How successful were you in performing the task? How satisfied were you with your performance?</li>
    <li>Frustration: How irritated, stressed, and annoyed versus content, relaxed, and complacent did you feel during the task?</li>
    <li>Effort: How hard did you have to work (mentally and physically) to accomplish your level of performance?</li>
</ol>

<p>The items are rated on a 100-points range with 5-points increments. In the original version, the second part of the inventory creates individual weighing by importance for each of the six subscales by prompting the subjects to compare the categories pairwise based on their perceived importance for the task load. The estimated task loads are then weighed according to their importance. The version used for this study, however, consists of only the first part of the original test, without the pairwise comparisons. This modification was done to simplify the study design, with evidence indicating that this procedure (referred to as the Raw TLX) is as sensitive as the original instrument (Hart, 2006).</p>

<h4>The cognitive tasks</h4>

<h5>Eriksen flanker task</h5>
<h5>Two-dimensional mental rotation task</h5>
<h5>The Spatial Span task</h5>
<h5>The Tower of London</h5>

<h1>References</h1>
Carron, A. V., Widmeyer, W. N., & Brawley, L. R. (1985). The development of an instrument to assess cohesion in sport teams: The Group Environment Questionnaire. Journal of Sport Psychology, 7, 244-266.Carron, A. V., Widmeyer, W. N., & Brawley, L. R. (1985). The development of an instrument to assess cohesion in sport teams: The Group Environment Questionnaire. Journal of Sport Psychology, 7, 244-266.

Fletcher, R. B. & Whitton, S. M. (2014). The Group Environment Questionnaire: A Multilevel Confirmatory Factor Analysis.
Small Group Research, 45(1), 68-88. doi: 10.1177/1046496413511121

Hart, S. G. & Staveland, L. E. (1988). Development of NASA-TLX (Task Load Index): Results of empirical and theoretical research. In: Human Mental Workload (P. A. Hancock and N. Meshkati (Eds.)), 139-183. North-Holland: Elsevier Science. 

Hart, S. (2006). Nasa-Task Load Index (Nasa-TLX); 20 Years Later. Human Factors and Ergonomics Society Annual Meeting Proceedings, 50, 904-908.
