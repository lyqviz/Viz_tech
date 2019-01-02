//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse); //JS Promise
const m = {t:50, r:50, b:50, l:50};

const depthScale = d3.scaleOrdinal()
	.domain([0,1,2,3])
	.range([null, 'red', '#03afeb', 'yellow']);

const tooltip = d3.select('.container')
	.append('div')
	.attr('class','tooltip')
	.style('position', 'absolute')
	.style('width', '180px')
	.style('min-height', '50px')
	.style('background', '#333')
	.style('color', 'white')
	.style('padding', '15px')
	.style('opacity', 0);
tooltip.append('p').attr('class', 'key');
tooltip.append('p').attr('class', 'value')

function enableTooltip(selection){
	selection
		.on('mouseenter', function(d){
			const xy = d3.mouse(d3.select('.container').node());
			tooltip
				.style('left', xy[0]+'px')
				.style('top', xy[1] + 20 +'px')
				.transition()
				.style('opacity', 1);
			tooltip
				.select('.key')
				.html(d.data.name);
			tooltip
				.select('.value')
				.html(d.value);
		})
		.on('mouseleave', function(d){
			tooltip
				.style('opacity',0);
		});
}

data.then(function(rows){

	console.log(rows);

	const permitsByBorough = d3.nest()
	  .key(function(d){return d.job_type})
	  .key(function(d){return d.borough})
	  .entries(rows) //permitsByBorough is an array

//permitsByBorough
	const rootNode = d3.hierarchy({
		key: 'root',
		values: permitsByBorough
	}, function(d){ return d.values});

  const rootNodeByCost = rootNode.sum(function(d){ return d.cost_estimate});
  const rootNodeByCount = rootNode.count();

  const partitionDiv = d3.select('#partition').node();
  const W = partitionDiv.clientWidth;
	const H = partitionDiv.clientHeight;
	const w = W - m.l - m.r;
	const h = H - m.t - m.b;

  const plot = d3.select('#partition')
    .append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('class','nodes')
		.attr('transform', `translate(${m.l}, ${m.t})`);

  const partition = d3.partition()
    .size([w,h]);

  const dataTransformed = partition(rootNode);
  console.log(dataTransformed.descendants());

  draw(dataTransformed, plot);

  d3.select('#cost_vs_sqft').on('click'), function(){
  	rootNode.sum(function(d){return d.cost_estimate});
  	const dataTransformed = partition(rootNode);
    draw(dataTransformed, plot)
  }

  d3.select('#per-sqft-vs-borough').on('click'), function(){
    draw()
  }

});

function draw(data, plot){

  
	const rectNodes = plot.selectAll('.node')
	  .data(data.descendants().filter(function(d){return d.depth < 3}));

	
	  //.filter(d => d.depth < 3)
	const rectNodesEnter = rectNodes.enter()
	  .append('rect')
	  .attr('x', function(d){return d.x0})
	  .attr('y', function(d){return d.y0})
    .attr('width', function(d){ return d.x1 - d.x0 })
    .attr('height', function(d){ return d.y1 - d.y0 })
    .style('fill', function(d){
    	switch(d.depth){
    		case 1: return 'red';
    		case 2: return 'blue';
    		case 3: return 'green'
    	}
    })
    .style('stroke', 'black')
    .style('stroke-width', '1px');

  plot.selectAll('text')
	  .data(data.descendants().filter(function(d){return d.depth < 3}))
	  //.filter(d => d.depth < 3)
	  .enter()
	  .append('text')
	  .text(function(d){return d.data.key})
	  .attr('x', function(d){ return (d.x0+d.x0)/2})
    .attr('y', function(d){ return (d.y1+d.y0)/2})
    .attr('text-anchor', 'middle')

}


function renderPartition(rootNode, rootDOM){

  const W = rootDOM.clientWidth;
	const H = rootDOM.clientHeight;
	const w = W - m.l - m.r;
	const h = H - m.t - m.b;

	const plot = d3.select(rootDOM)
	  .append('svg')
		.attr('width', W)
		.attr('height', H)
		.append('g')
		.attr('transform', `translate(${m.l}, ${m.t})`);

	console.group('Partition');

  const partitionTransform
    = d3.partition().size([w,h])

  const partitionTransformed = partitionTransform(rootNode);
  const nodesData = partitionTransformed.descendants();
  const linksData = partitionTransformed.links();

  const nodes = plot.selectAll('.node')
    .data(nodesData);

  const nodesEnter = nodes.enter()
    .append('g')
    .attr('class', 'node')
    .on('mouseenter', function(d){
    	console.log(d.data.permit_type, d.value);
    	d3.select(this)
    	  .select('rect')
    	  .style('fill-opacity', .5)
    })
    .on('mouseleave', function(d){
    	d3.select(this)
    	  .select('rect')
    	  .style('fill-opacity', .5)
    });

  nodesEnter.append('rect');
  nodesEnter.append('text');

  nodesEnter.merge(nodes)
    .attr('transform', function(d){
    	return `translate(${d.x0}, ${d.y0})`;
    });

  nodesEnter.merge(nodes)
    .select('rect')
    .attr('width', function(d){ return d.x1 - d.x0 })
    .attr('height', function(d){ return d.y1 - d.y0 })
    .style('fill', function(d){
    	return depthScale(d.depth);
    });

  nodesEnter.merge(nodes)
    .filter(function(d){ return d.depth < 2 })
    .select('text')
    .text(function(d){
    	return `${d.data.name}: ${d.value}`
    })
    .attr('x', function(d){ return (d.x1-d.x0)/2})
    .attr('y', function(d){ return (d.y1-d.y0)/2})
    .attr('text-anchor', 'middle')

  console.log(partitionTransformed);

	console.groupEnd();
}


function projectVsCountChart(data){

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

	nodesenter.append('rect');


	nodes.merge(nodesenter)
	  .select('rect')
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
		cost_per_sqft: +d.square_footage > 0 ? (+d.cost_estimate /+d.square_footage):0
	}
}