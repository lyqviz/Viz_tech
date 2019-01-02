console.log('hello world');
  //objects
  const person1 = {
  	name:'Yuqing',
  	age:25,
  	faculty: false,
  	department:{
  		name:'camd',
  		facultyCount: 20,
  	}
  };
 
  const department1 ={
  	name:'camd',
 	  facultyCount: 20
  }

  const person2 ={
  	department: department1
  }

//add a property
  person1.city = 'new york city'

//modify
  person1.age = 24;
  person1.faculty = !(person1.faculty);

// how many faculty numbers in CAMD
  console.log(person1.department.facultyCount);


// a simple array

  const arr1 = [3, 4, 5, 6, -9];

  console.log('simple array has a length of ' + arr1.length)

  arr1.push(10);

  //indices start  at 0, ends at length-1

  console.log(arr1[5]);




  const a = 9 > 7;
  if(a){
  	console.log('9 greater than 7 is true')
  }else{
  	console.log('9 greater than 7 is false')
  }


//loop
  for(let i=0; i < 10; i++){
  	console.log(i+1);
  }


 /* */


 console.log('----------')
 const arr2 = [67, 8913, -100];

 let sum =0;

 for(let i=0; i<arr2.length; i++){
 	sum += arr2[i];
 }
 console.log('sum of arr2 is ' + sum);

 console.log('----testing math.random()----')

 const sums = {
 	bucketQuartile1: 0,
 	bucketQuartile2: 0,
 	bucketQuartile3: 0,
 	bucketQuartile4: 0 
 };

 for(let i=0; i<1000; i++){
 	const num = Math.random();
 	if(num < 0.25){
 		sums.bucketQuartile1 += 1;
 	}else if (num < 0.5){
 		sums.bucketQuartile2 += 1;
 	}else if (num < 0.75){
 		sums.bucketQuartile3 += 1;
 	}else{
 		sums.bucketQuartile4 += 1;
 	}


console.log('the numbers in each bucket is:'
	+ sums.bucketQuartile1 + '/'
	+ sums.bucketQuartile2 + '/'
	+ sums.bucketQuartile3 + '/'
	+ sums.bucketQuartile4 + '/'
	);





 }

 
















