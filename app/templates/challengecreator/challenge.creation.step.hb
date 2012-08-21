<li>
	<form class="form-horizontal">
		<fieldset>
			<legend>{{ title }}</legend>
			<table class="table table-striped">
			  <thead>
			    <tr>
						{{#each headings}}
							<th>{{ this }}</th>
						{{/each}}
			    </tr>
			  </thead>
			  <tbody>
			  </tbody>
			</table>
		</fieldset>
		<div class="item-adder"></div>
	</form>
</li>