
var canvas;
var context;

var sim;
var width = 10;
var numDots = 100;
var startPos = 3;

var done = [];
var data = [];

/**
 * Initiate simulation
 * @return {[type]} [description]
 */
function init(){
	canvas = document.getElementById('game');
	context = canvas.getContext("2d");
	context.font = "80px Georgia";

	// init data
	currPos = [];
	data = [];
	for(var i=0; i < numDots; i++){
		data.push({'x': startPos,'y': width / (numDots+1) * i});
		done.push(false);
	}
	
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
				display: true,
				text: 'Random Walk'
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
	sim = setInterval(update, 500);
}

function update(){
	
	for(var i=0; i < data.length; i++){
		
		var pos = data[i];
		
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
	}
	
	// update chart
	window.myScatter.update();
}

// Start simulation
init();
