console.log('Assignment 3');

/*
 * Question 1: no code necessary, 
 * but feel free to use this space as a Javascript sandbox to check your answers
 1. 14
 2. 1.5
 3. infinity
 4. true
 5. 0
 6. true
 7. 72
 8. '89'
 9. false
 10. a56b
 11.

 */

/*
 * Question 2: control structures 
 */
{
	//2.1 
	/* YOUR CODE HERE*/
  for(let i=10; i > 0; i--){
  	console.log(i);
  }

	//2.2
	/* YOUR CODE HERE*/

  for(let index = 0; index < 501; index += 1){
    //only log index if index is multiple of 100
    if (index % 100 === 0){
      console.log(index);
    }
  }


	//2.3
	const arr = [89, 23, 88, 54, 90, 0, 10];
	//Log out the content of this array using a for loop
	/* YOUR CODE HERE*/
	for(let i=0; i < arr.length; i++){
		console.log(arr[i]);
	}
}

/*
 * Question 3: no code necessary
 */

 function increment(v, n){
  //this function increments the v by n times

  for(let i = 0; i < n; i++){
    v += 1;
  }
  return v;
 }

let initialValue = 10;
let finalValue = increment(initialValue, 10);

console.log(initialValue);
console.log(finalValue);
/*console.log(n);*/




/*
 * Question 4: objects and arrays
 */

{
	//4.1
/* YOUR CODE HERE */

  var instructor1 = {
    name:'Ashley',
    department:'computer science',
    year: 10
  };

  var instructor2 = {
    name:'Ben',
    department:'design',
    year: 2
  };

  var instructor3 = {
    name:'Carol',
    department:'design',
    year: 3
  };

  var instructors = [instructor1, instructor2, instructor3]

  console.log(instructors)


	//4.2 
	/* COMPLETE THE FUNCTION */

  var avg = averageTenure(instructors);


  function averageTenure(instructors){
    
    var sum = 0;

    for(var i = 0; i < instructors.length; i++){
      sum += instructors[i].year;
    }

    avg = sum/instructors.length;

    return avg;
  }

  console.log(avg)
  

	//4.3
	/* YOUR CODE HERE */

	console.log(instructors.push({name:'Dan',
		                           department:'humanities',
		                           year:5
		                          })
		          )

	console.log(instructors)

  const updatedAvg = averageTenure(instructors);

  computerAvgTenure(instructors)


}

