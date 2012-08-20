<style type="text/css" media="screen">

	.challenge-creator li {
		margin-bottom: 15px;
	}
	
	fieldset > legend {
		margin-bottom: 10px;
	}
	
	.dates h6, .dates span {
		float: left;
		margin-right: 10px;
	}
	
	hr {
		margin: 5px auto;
	}
</style>

<h2>Create a Fitness Challenge</h2>
<ol class="challenge-creator">
	<li class="name">
		<form class="form-horizontal">
			<fieldset>
				<legend>Details</legend>
				<div class="control-group">
					<label for="challenge-name" class="control-label">Name</label>
					<div class="controls">
						<input type="text" id="challenge-name" />
					</div>
				</div>
				<div class="control-group">
					<label for="challenge-start" class="control-label">Start Date</label>
					<div class="controls">
						<input type="date" id="challenge-start"/>
					</div>
				</div>
				<div class="control-group">
					<label for="challenge-end" class="control-label">End Date</label>
					<div class="controls">
						<input type="date" id="challenge-end"/>
					</div>
				</div>
				<div class="control-group">
					<label for="challenge-description" class="control-label">Description</label>
					<div class="controls">
						<textarea id="challenge-description"></textarea>
					</div>
				</div>
			</fieldset>
		</form>
	</li>
	<li class="activities">
		<!-- <span class="help-block">Choose from a list of activities that participants will engage in.</span> -->
		<form class="form-horizontal">
			<fieldset>
				<legend>Select Activities</legend>
				<table class="table table-striped">
				  <thead>
				    <tr>
				      <th>Action</th>					
				      <th>Points</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>Step</td>					
				      <td>10</td>
				    </tr>
				    <tr>
				      <td>Login</td>
				      <td>200</td>
				    </tr>
				    <tr>
				      <td>Pound Lost</td>
				      <td>10</td>
				    </tr>
				  </tbody>
				</table>
			</fieldset>
			<div class="well">
				<span>Participants will be awarded </span>
				<input type="text" class="span1"/>
				<span>points per </span>
				<select name="action-selector" class="input-medium">
					<option value="">Action</option>
					<option value="walking">Step</option>
					<option value="login">Login</option>
					<option value="weightloss">Pound Lost</option>
				</select>
				<a href="#" class="btn btn-success">Add Activity</a>
				<a href="#" class="btn">Reset</a>
			</div>
		</form>
	</li>
	<li class="maximums">
		<!-- <span class="help-block">Set daily, weekly, and monthly point maximums here.</span> -->
		<form class="form-horizontal">
			<fieldset>
				<legend>Scoring Rules</legend>
				<table class="table table-striped">
				  <thead>
				    <tr>
				      <th>Activity</th>
				      <th>Max Points</th>
				      <th>Time Period</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>Walking</td>
				      <td>1000</td>
				      <td>Day</td>
				    </tr>
				    <tr>
				      <td>Logging In</td>
				      <td>200</td>
				      <td>Day</td>
				    </tr>
				    <tr>
				      <td>Weight Loss</td>
				      <td>24000</td>
				      <td>Month</td>
				    </tr>
				  </tbody>
				</table>
				<div class="well">
					<span>Participants </span>
					<select name="min-max">
						<option value="maximum">may gain a maximum</option>
						<option value="minimum">must gain a minimum</option>
					</select>
					<span> of</span>
					<input type="text" class="span1"/>
					<span>points for </span>
					<select name="activity-selector" class="input-small">
						<option value="" selected>Action</option>
						<option value="walking">Step</option>
						<option value="login">Login</option>
						<option value="weightloss">Pound Lost</option>
					</select>
					<span>in a </span>
					<select name="duration-selector" class="input-medium">
						<option value="">Time Period</option>
						<option value="day">Day</option>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</select>
					<a href="#" class="btn btn-success">Add Rule</a>
					<a href="#" class="btn">Reset</a>
				</div>
			</fieldset>
		</form>
	</li>
	<li class="bonuses">
		<!-- <span class="help-block">Control how participants earn bonus points for completing specific activities.</span> -->
		<form class="form-horizontal">
			<fieldset>
				<legend>Set Bonuses</legend>
				<table class="table table-striped">
				  <thead>
				    <tr>
				      <th>Activity</th>
				      <th>Threshold</th>
				      <th>Time Period</th>
							<th>Bonus</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>Walking</td>
				      <td>1000</td>
				      <td>Day</td>
							<td>500</td>
				    </tr>
				    <tr>
				      <td>Weight Loss</td>
				      <td>8000</td>
				      <td>Week</td>
							<td>600</td>
				    </tr>
				  </tbody>
				</table>
				<div class="well">
					<span>When a participant earns </span>
					<input type="text" class="span1"/>
					<span>points for </span>
					<select name="activity-selector" class="input-medium">
						<option value="" selected>Action</option>
						<option value="walking">Steps</option>
						<option value="login">Logins</option>
						<option value="weightloss">Weight Lost</option>
						<option value="overall">Overall</option>
					</select>
					<span>in a </span>
					<select name="duration-selector" class="input-medium">
						<option value="">Time Period</option>
						<option value="day">Day</option>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</select>
					<span>then they earn </span>
					<input type="text" class="span1"/>
					<span>bonus points.</span>
					<a href="#" class="btn btn-success">Add Rule</a>
					<a href="#" class="btn">Reset</a>
				</div>
			</fieldset>
		</form>
	</li>
	<li class="summary">
		<fieldset>
			<legend>Summary</legend>
		</fieldset>
		<div class="well">
			<h3 class="challenge-name">Awesome Challenge</h3>
			<div class="dates">
				<h6 class="from">September 1, 2012</h6> <span>to</span> <h6 class="to">November 1, 2012</h6>
			</div>
			<br />
			<em class="challenge-description clearfix">Built for the spartan warriors, this challenge tests mental, physical and emotional endurance.</em>
			<br>
			<br />
			
			<h4>Activities</h4>
			<hr />
			
			<blockquote>
				Participants compete for points on: <span class="label label-info">Steps</span>,
				<span class="label label-info">Pounds Lost</span>, and
				<span class="label label-info">Logins</span>.
			</blockquote>
			
			<h4>Scoring</h4>
			<hr />
			
			<blockquote>
				<ol>
					<li> 
						<span class="label label-info">100</span> points per <span class="label label-warning">step</span> ( up to a maximum of <span class="label label-info">600</span> points per <span class="label label-important">Day</span>, <span class="label label-info">6000</span> points per <span class="label label-important">Week</span>, or <span class="label label-info">24000</span> points per <span class="label label-important">Month</span> )
					</li>
					<li>
						<span class="label label-info">100</span> points per <span class="label label-warning">login</span> ( up to a maximum of <span class="label label-info">200</span> points per <span class="label label-important">Day</span>, or <span class="label label-info">12000</span> points per <span class="label label-important">Month</span> )
					</li>
					<li>
						<span class="label label-info">250</span> points per <span class="label label-warning">pound lost</span>
					</li>
				</ol>
			</blockquote>
			
			<h4>Bonus Points</h4>
			<hr />
			
			<blockquote>
				<ol>
					<li><span class="label label-info">500</span> bonus points awarded for participants who score more than <span class="label label-info">1000</span> points for <span class="label label-warning">Steps</span> in a <span class="label label-info">Day</span>.</li>
					<li><span class="label label-info">600</span> bonus points awarded for participants who score more than <span class="label label-info">8000</span> points for <span class="label label-warning">Pounds Lost</span> in a <span class="label label-info">Week</span>.</li>
				</ol>
			</blockquote>
			
		</div>
	</li>
</ol>