<div class="well">
	<span>Participants </span>
	<select name="min-max" class="constraint">
		<option value="max">may gain a maximum</option>
		<option value="min">must gain a minimum</option>
	</select>
	<span> of</span>
	<input type="text" class="span1 points"/>
	<span>points for </span>
	<select name="activity-selector" class="input-small activity">
		<option value="" selected>Action</option>
		<option value="walking">Step</option>
		<option value="login">Login</option>
		<option value="weightloss">Pound Lost</option>
	</select>
	<span>in a </span>
	<select name="timeperiod-selector" class="input-medium time-period">
		<option value="">Time Period</option>
		<option value="day">Day</option>
		<option value="week">Week</option>
		<option value="month">Month</option>
	</select>
	<a href="#" class="btn btn-success">Add Rule</a>
	<a href="#" class="btn btn-reset">Reset</a>
</div>