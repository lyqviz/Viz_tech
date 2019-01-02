console.log('4-1');

console.log(d3)
//Selection exercise

d3.selectAll('.container')
  .style('height','700px')
  .style('border','1px solid black')
  .style('margin', '20px');

const blocks = d3.selectAll('.container')
       .select('.block');

//from selection to node(s)
console.log(blocks.nodes());
console.log(blocks.node());


//reading the width and height of an element
const node = blocks.node();
console.log(node.clientWidth);
console.log(node.clientHeight);

blocks
  .style('width','400px')
  .style('height','300px')
  //.style('background','yellow')
  .attr('class', 'block-yellow block')
  .classed('block', true)

/*d3.select('.container')*/

//appending elements 

const newSelection = blocks //selection
  .append('div')
  .classed('block-child', true)
  .style('width', '50%')
  .style('height','50%')
  .style('background','red')


//In #container-4, draw a chromatic scale
//d3.selectAll('.container')
  //.each(function(){
    //'this' function takes one element from the selection at a time, and do sth with it
   //d3.select(this).style('background','purple')
  //})
const NUM_OF_INCREMENT = 200;

for(let index = 0; index < NUM_OF_INCREMENT; index+=1){
  d3.select('#container-4')
    .append('div');
}

d3.select('#container-4')
  .selectAll('div')
  .each(function(d,index){
    const R = 255;
    const G = index/NUM_OF_INCREMENT * 255;
    const B = index/NUM_OF_INCREMENT * 255;

    d3.select(this)
      .style('height', '100%')
      .style('width', 100/NUM_OF_INCREMENT + '%')
      .style('float', 'left')
      .style('background', 'rgb(' + R + ',' + G + ',' + B + ')')
  })


//In #container-5, experiment with drawing <svg> elements
//circle, rect, line, text, <g>
const plot = d3.select('#container-5')
  .append('svg')
  .attr('width',900)
  .attr('height',700)

plot.append('circle')
  .attr('cx',200)
  .attr('cy',300)
  .attr('r', 200)
  .style('fill','blue')
  .style('stroke','black')
  .style('stroke-width', '2px')

plot.append('circle')
  .attr('cx',200)
  .attr('cy',300)
  .attr('r', 20)
  .style('fill','white')

plot.append('line')
  .attr('x1',0)
  .attr('y1',0)
  .attr('x2',900)
  .attr('y2',700)
  .style('stroke-width','2px')
  .style('stroke','purple')

const group = plot.append('g')
  .attr('class','group')

group
  .append('rect')
  .attr('x',0)
  .attr('y',0)
  .attr('width',300)
  .attr('height',100)

group
  .append('rect')
  .attr('x',0)
  .attr('y',0)
  .attr('width',100)
  .attr('height',100)
  .style('fill','yellow')

group
  .attr('transform', 'rotate(45)')

//translate(50,400)

//make another .container

const containerDiv = d3.select('main')
  .append('div')
  .attr('class','container')
  .style('height','600px')
 // .style('background','blue')

const width = containerDiv.node().clientWidth;
const height = containerDiv.node().clientHeight;

const plot1 = containerDiv.append('svg')
  .attr('width',width)
  .attr('height',height)

for(let x = 0; x < width; x += 50){
  plot1.append('line')
     .attr('x1',x)
     .attr('y1',0)
     .attr('x2',x)
     .attr('y2',height)
     .style('stroke-width','1px')
     .style('stroke','rgba(0,0,0,0.5)')
}













