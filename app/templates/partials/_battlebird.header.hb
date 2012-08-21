<div class="row">
	<div class="span4">
		<img src="img/turkey.jpg" alt="Turkey">
	</div>
	<div class="span8">
		<h2><a href="#view">Battle the Bird</a></h2>
		<em>Ends 12/31/11</em>		
		<h3>Your <a href="#">team</a> is in 4th place.</h3>
	</div>
</div>

<ul class="nav nav-tabs">
	<li class="active"><a href="#leaders" data-toggle="tab">Leaders</a></li>
	<li><a href="#activity" data-toggle="tab">Activity</a></li>
	<li><a href="#details" data-toggle="tab">Details</a></li>
</ul>

<div class="tab-content">
	<div class="tab-pane active" id="leaders">
		{{> challenge.top.teams }}
		{{> challenge.top.individuals }}
	</div>
	<div class="tab-pane" id="activity">
		{{> challenge.activity }}
	</div>
	<div class="tab-pane" id="details">
		{{> challenge.details }}
	</div>		
</div>