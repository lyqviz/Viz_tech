console.log('7-2');

/*Pay attention to the following:
1. Observe how button interactivity is implemented (line 37-)
*/
const popRanking1 = [
	{name: 'New York', population: 3437202},
	{name: 'Chicago', population: 1698575},
	{name: 'Philadelphia', population: 1293697},
	{name: 'St Louis', population: 575238}
];

const popRanking2 = [
	{name: 'New York', population: 8336697},
	{name: 'LA', population: 3857799},
	{name: 'Chicago', population: 2714856},
	{name: 'Houston', population: 2160821}
];

const scaleRadius = d3.scaleSqrt().domain([0, 1000000]).range([0,50]);

const margin = {t:50, r:200, b:50, l:200};
const W = d3.select('.chart').node().clientWidth;
const H = d3.select('.chart').node().clientHeight;
const w = W - margin.l - margin.r;
const h = H - margin.t - margin.b;

//chart-1: using for... loop
const plot1 = d3.select("#chart-1")
	.append('svg')
	.attr('width', W)
	.attr('height', H)
	.append('g')
	.attr('transform', `translate(${margin.l}, ${margin.t})`);

//button interactivity
d3.select('#year-1900').on('click', function(){
	d3.event.preventDefault();
	drawNodes(popRanking1);
	console.log('Show year 1900');
});

d3.select('#year-2000').on('click', function(){
	drawNodes(popRanking2);
	console.log('Show year 2000');
});


function drawNodes(data){
	const cityNodesUpdate = plot1.selectAll('.node') 
	 .data(data, function(d){ return d.name });

	const cityNodesEnter = cityNodesUpdate.enter()
	 .append('g')
	 .attr('class','node');

	cityNodesEnter
	 .append('circle');

	cityNodesEnter
	 .append('text');

  cityNodesUpdate.merge(cityNodesEnter)
   .transition()
   .duration(2000)
   .attr('transform', function(d, i){
  	return `translate(${w/3*i}, ${h/2})`
  });

  cityNodesUpdate.merge(cityNodesEnter)
   .select('circle')
   .transition()
   .duration(2000)
   .attr('r', function(d){ return scaleRadius(d.population)});

  cityNodesUpdate.merge(cityNodesEnter)
   .select('text')
   .text(function(d){ return d.name})
   .attr('text-anchor', 'middle');
  
//  cityNodesUpdate.merge(cityNodesEnter)
  // .select('text')
  // .text(function(d){ return d.population})
  // .attr('text-anchor', 'middle');

	const cityNodesExit = cityNodesUpdate.exit()
	 .remove();

}


