//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
const m = {t:50, r:50, b:50, l:50};
const w = d3.select('.plot').node().clientWidth - m.l - m.r;
const h = d3.select('.plot').node().clientHeight - m.t - m.b;

//Scales
const scaleCost = d3.scaleLog().range([h, 0]);
const scaleSqft = d3.scaleLog().range([0, w]);
const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBorough = d3.scaleOrdinal();
const scaleSize = d3.scaleSqrt().range([0,30]);

//Append <svg>
const plot = d3.select('.plot')
	.append('svg')
	.attr('width', w + m.l + m.r)
	.attr('height', h + m.t + m.b)
	.append('g')
	.attr('transform', `translate(${m.l}, ${m.t})`);
plot.append('g')
	.attr('class', 'axis-y');
plot.append('g')
	.attr('class', 'axis-x')
	.attr('transform', `translate(0, ${h})`);

data.then(function(rows){
	//Data discovery
	//Range of cost_estimate
	const costMin = d3.min(rows, function(d){ return d.cost_estimate });
	const costMax = d3.max(rows, function(d){ return d.cost_estimate });
	console.log(costMin, costMax);
	//Range of square_footage
	const sqftMin = d3.min(rows, function(d){ return d.square_footage });
	const sqftMax = d3.max(rows, function(d){ return d.square_footage });
	console.log(sqftMin, sqftMax);
	//Range of cost_per_sqft
	const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
	const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
	console.log(perSqftMin, perSqftMax);
	//The boroughs
	const boroughs = d3.nest()
		.key(function(d){ return d.borough })
		.entries(rows)
		.map(function(d){ return d.key });
	console.log(boroughs);

	//Use the data gathered during discovery to set the scales appropriately
	scaleCost.domain([1, costMax]);
	scaleSqft.domain([1, sqftMax]);
	scalePerSqft.domain([1, perSqftMax]);
	scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){
		return (w-100)/(boroughs.length-1)*d + 50;
	}));
	scaleSize.domain([0, costMax]);

   //const rows_filtered = rows.filter(function(d){
    //return scalePerSqft(d.cost_per_sqft) !== Infinity,
      //     scaleCost(d.cost_estimate) !== Infinity,
        //   scaleCost(d.cost_estimate) !== Infinity;
   //});

   /*const rows_filtered_2 = rows.filter(function(d){
    return scaleCost(d.cost_estimate) !== Infinity;
   });

   const rows_filtered_3 = rows.filter(function(d){
    return scaleCost(d.cost_estimate) !== Infinity;
   });*/

   console.log(rows)

	//Plot per sqft cost vs. borough
	perSqftChart(rows);

	//Plot cost vs. sqft
	costVsSqftChart(rows);

	//costVsSqftChart(rows.slice(0,1000));

	//PART 2: toggle between the two plots
	d3.select('#cost-vs-sqft')
		.on('click', function(){
			d3.event.preventDefault();
			/* YOUR CODE HERE*/
      costVsSqftChart(rows);
		});

	d3.select('#per-sqft-vs-borough')
		.on('click', function(){
			d3.event.preventDefault();
			/* YOUR CODE HERE*/
			perSqftChart(rows);
		})

});

function perSqftChart(data){

  //update selection 
	const nodes = plot.selectAll('.node')//dom selection of 0
		.data(data)//data array of data points
	/*
 	 * Complete this function
	 * YOUR CODE HERE*/

	//to make up for deficit


	const nodesenter = nodes.enter()
	  .append('g')
	  .attr('class','node');

	nodesenter.append('circle');

	//nodes.merge(nodesenter)
	  //.transition()
	  //.duration(2000)
	 // .attr('transform', `translate(${m.l}, ${m.t})`);
	  //.attr('transform', function(d){
	  	//return `translate(${(w-100)/(boroughs.length-1)*d + 50}, ${h})`
	//});

	nodes.merge(nodesenter)
	  .select('circle')
	  .transition()
	  .duration(2000)
	  .attr('cx', function(d){ return scaleBorough(d.borough)})
    .attr('cy', function(d){ return scalePerSqft(d.cost_per_sqft)})
	  .attr('r', 3)
	  .style('fill-opacity',0.2);

	const nodesexit = nodes.exit()
	  .remove();
	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft()
		.scale(scalePerSqft)
		.tickSize(-w);
	const axisX = d3.axisBottom()
		.scale(scaleBorough);

	plot.select('.axis-y')
		.transition()
		.call(axisY)
		.selectAll('line')
		.style('stroke-opacity', 0.1);
	plot.select('.axis-x')
		.transition()
		.call(axisX);
}

function costVsSqftChart(data){

	const nodes = plot.selectAll('.node')
		.data(data)
	/*
 	 * Complete this function
	 * YOUR CODE HERE*/
	 const nodesEnter = nodes.enter()
	  .append('g')
	  .attr('class','node');

	 nodesEnter
	  .append('circle');

	 //nodes.merge(nodesEnter)
	  //.transition()
	  //.duration(2000)


	 nodes.merge(nodesEnter)
	  .select('circle')
	  .transition()
	  .duration(2000)
    .attr('cx', function(d){ return scaleSqft(d.square_footage)})
    .attr('cy', function(d){ return scaleCost(d.cost_estimate)})
	  .attr('r', 3)
	  .style('fill-opacity',0.2);

   const nodesExit = nodes.exit()
    .remove();
	 

	//Draw axes
	//This part is already complete, but please go through it to see if you understand it
	const axisY = d3.axisLeft()
		.scale(scaleCost)
		.tickSize(-w);
	const axisX = d3.axisBottom()
		.scale(scaleSqft);

	plot.select('.axis-y')
		.transition()
		.call(axisY)
		.selectAll('line')
		.style('stroke-opacity', 0.1);
	plot.select('.axis-x')
		.transition()
		.call(axisX);
}

function parse(d){
	return {
		applicant_business_name:d.applicant_business_name,
		borough:d.borough,
		community_board:d.community_board,
		cost_estimate:+d.cost_estimate, //convert string to number
		enlargement:d.enlargement_flag_yes_no === "true"?true:false, //convert string to boolean
		address: `${d.job_location_house_number} ${d.job_location_street_name}`,
		job_number:+d.job_number,
		job_type:d.job_type,
		job_type2:d.job_type2,
		permit_type:d.permit_type,
		permit_issuance_date:new Date(d.permit_issuance_date),
		square_footage:+d.square_footage,
		cost_per_sqft: +d.square_footage > 0?(+d.cost_estimate / +d.square_footage):0
	}
}