//how does construction cost per square foot differ across the 5 boroughs?
//Data import and parse
const data = d3.csv('../../data/nyc_permits.csv', parse);
const m = {t:50, r:50, b:50, l:150};

const W = d3.select('.plot').node().clientWidth;
const H = d3.select('.plot').node().clientHeight;	
const w = W - m.l - m.r;
const h = H - m.t - m.b;
console.log(W)
console.log(H)

const scalePerSqft = d3.scaleLog().range([h, 0]);
const scaleBorough = d3.scaleOrdinal();

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
	console.log(rows);
	console.log(rows.length);

	const permitsByBorough = d3.nest()
	  .key(function(d){return d.borough})
	  .entries(rows);

	 permitsByBorough.forEach(function(borough){
	 	console.log(borough);
	 });

   rows.forEach(function(d){
    console.log(d.cost_per_sqft);
   });

  const boroughs = d3.nest()
    .key(function(d){ return d.borough })
    .entries(rows)
    .map(function(d){ return d.key });
  console.log(boroughs);

  const perSqftMin = d3.min(rows, function(d){ return d.cost_per_sqft });
  const perSqftMax = d3.max(rows, function(d){ return d.cost_per_sqft });
  console.log(perSqftMin, perSqftMax);

  scalePerSqft.domain([1, perSqftMax]);
  scaleBorough.domain(boroughs).range(d3.range(boroughs.length).map(function(d){
    return (w-100)/(boroughs.length-1)*d + 50;
  }));


   const rows_filtered = rows.filter(function(d){
    return scalePerSqft(d.cost_per_sqft) !== Infinity;
   });

   console.log(rows_filtered)


   const svg = d3.select("#plot-1")
     .append("svg")
     .attr("height", H)
     .attr("width", W)
     .append("g")
     .attr("transform", `translate(${m.l}, ${m.t})`)

// Create your scales
  /* const boroughnames = ['Staten Island','Bronx','Manhattan','Brooklyn','Queens'];
  
   const xPositionScale = d3.scalePoint()
     .domain(boroughnames)
     .range([0, w])

   const yPositionScale = d3.scaleLinear()
     .domain([0,148674282])
     .range([h, 0])


   console.group('Scale');
   console.log(yPositionScale.domain());
   console.log(yPositionScale.range());
   console.groupEnd();

   const xAxis = d3.axisBottom(xPositionScale)
     .tickValues(boroughnames)

   svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis); 

   const yAxis = d3.axisLeft(yPositionScale)

   svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis); */

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
      

  draw(plot, rows_filtered, scaleBorough, scalePerSqft);

});

function draw(selection, data, sX, sY){

   selection.selectAll('circle')
     .data(data)
     .enter()
     .append('circle')
     .attr('cx', function(d){ return sX(d.borough)})
     .attr('cy', function(d){ 
        // console.log(d.cost_per_sqft,"  ",sY(d.cost_per_sqft));
      return sY(d.cost_per_sqft)})
     .attr('r',3)
     .style('fill-opacity',0.2)
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