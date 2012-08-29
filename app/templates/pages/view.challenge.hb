<div id="view">
	
	{{> battlebird.header }}
	
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
	
</div>