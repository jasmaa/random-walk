
var canvas;
var context;

var sim;
var width = 10;
var numDots = 100;
var startPos = 5;

var done = [];
var data = [];

/**
 * Initiate simulation
 * @return {[type]} [description]
 */
function init(){
	clearInterval(sim);
	document.getElementById('done').innerHTML = "";
	
	canvas = document.getElementById('game');
	context = canvas.getContext("2d");

	// init data
	width = parseInt(document.getElementById('width').value);
	numDots = parseInt(document.getElementById('numDots').value);
	startPos = parseInt(document.getElementById('startPos').value);
	speed = parseInt(document.getElementById('speed').value);
	
	currPos = [];
	data = [];
	for(var i=0; i < numDots; i++){
		data.push({'x': startPos,'y': width / (numDots+1) * i});
		done.push(false);
	}
	
	document.getElementById('expected').innerHTML = (numDots - (startPos / width) * numDots);
	
	// set up chart
	var scatterChartData = {
		datasets: [{
			label: 'My First dataset',
			backgroundColor: "rgba(255,0,0,1)",
			data: data
		}],
	};
	
	window.myScatter = Chart.Scatter(context, {
		data: scatterChartData,
		options: {
			title: {
				display: false,
			},
			
			scales: {
				yAxes: [{
					display: false,
					ticks: {
						suggestedMin: 0,
						suggestedMax: width,
					}
				}],
				xAxes: [{
					display: true,
					ticks: {
						suggestedMin: 0,
						suggestedMax: width,
					}
				}]
			},
			legend: { 
				display: false 
			}
		}
	});
	
	// loop simulation
	sim = setInterval(update, 500 - 5*speed);
}

function update(){
	
	var left = 0;
	var right = 0;
	
	for(var i=0; i < data.length; i++){
		
		var pos = data[i];
		
		// update positions
		if(pos.x > 0 && pos.x < width){
			// move dot
			if(Math.random() > 0.5){
				pos.x++;
			}
			else{
				pos.x--;
			}
		}
		else{
			done[i] = true;
		}
		
		// tally sides
		if(pos.x == 0){
			left++;
		}
		else if(pos.x == width){
			right++;
		}
		
		if(left + right == numDots){
			document.getElementById('done').innerHTML = "DONE!";
			clearInterval(sim);
		}
	}
	
	
	document.getElementById('leftVal').innerHTML = left;
	document.getElementById('rightVal').innerHTML = right;
	
	// update chart
	window.myScatter.update();
}
