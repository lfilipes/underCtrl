angular.module('App').controller('cisternaDashCtrl', function($scope,$resource){
   
   queue()
	  .defer(d3.json, "/api/data")
	  .await(renderData);
	  
function renderData(error,apiData) {
	var sensorData = apiData;
	makeGraphs2(sensorData);
}
	  

var firstD = new Date();


	d3.select('#date_select2').on('change', function() {
	   var now = new Date();
       var nd = new Date();
	   switch (this.value) {
          case "week":
		      {
				nd = d3.time.monday(now);  
			   }
          break;
          case "month":
              {
				nd = d3.time.month(now);  
			   }
          break;
		            case "all":
              {
				nd = firstD;
			   }
          break;
         default:
               nd = firstD;

	}
	
	var minDate = nd;
	var maxDate = now;
    queue()
	  .defer(d3.json, "/api/data")
	  .await(rD);
	  
    function rD(error,apiData) {
	    var sensorData = apiData;
	    makeGraphs2(sensorData,minDate,maxDate);
    }

    });	



	
function makeGraphs2(apiData,minDate,maxDate){
	
   //Get sensor Data
	var dataSet = apiData;
	
    //  "datetime": "2/17/2017  9:00:00"
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	var monthFormat = d3.time.format("%m");
	
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
		d.month = monthFormat(d.datetime);
		if (d.level4 == 1) {
			d.total = 100;
			} 
		else if (d.level3 == 1) {
			d.total = 90;
			}
		else if (d.level2 == 1) {
			d.total = 50;
			}
		else if (d.level1 == 1) {
			d.total = 20;
			}	
		 else {
			d.total = 10;
		}	
	});

		
	//Cria Crossfilter
	var ndx = crossfilter(dataSet);
	
    // Cria as dimensões
    var reservatorio = ndx.dimension(function(d) { return d.poleid; });	
 	reservatorio.filter(1);
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });

    //Define o toggle de reservatorios
	var reservatorioGroup = reservatorio.group();
	
	//Define o chart #1 de níveis sobrepostos 
	var status_tc = timeDim.group().reduceSum(function(d) { if (d.level1 == 1 && d.poleid == 1) {return 20;} else {return 10;}});
	var status_tl = timeDim.group().reduceSum(function(d) { if (d.level2 == 1 && d.poleid == 1) {return 30;} else {return 0;}});
	var status_tm = timeDim.group().reduceSum(function(d) { if (d.level3 == 1 && d.poleid == 1) {return 40;} else {return 0;}});
	var status_tf = timeDim.group().reduceSum(function(d) { if (d.level4 == 1 && d.poleid == 1) {return 10;} else {return 0;}});	
	
	//Define o bar chart de dias críticos
    var countCriticalDays = timeDim.group().reduce(
	function reduceAdd(p, v) {return (v.total == 10) ? p + 1 : p;},
	function reduceRemove(p, v) {return (v.total > 10) ? p - 1 : p;},
	function reduceInitial() {return 0;}
	);


//Define threshold values for data	
	firstD = timeDim.bottom(1)[0].datetime;
	var lastD = timeDim.top(1)[0].datetime;
	var minD, maxD = new Date();
	if (minDate == undefined)  {minD = firstD;} else {minD = minDate;};
	if (maxDate == undefined) {maxD = lastD;} else {maxD = maxDate;};

	console.log("minD:" + minD);
	console.log("maxD: " + maxD);	

	
	var dateChart = dc.lineChart("#date-chart2");
	dateChart
		//		.width(600)
		.height(260)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
        .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 
		.dimension(timeDim)
		.group(status_tc,"critical")
		.stack(status_tl,"low")
		.stack(status_tm,"medium")
		.stack(status_tf,"full")
		.renderArea(true)
		.x(d3.time.scale().domain([minD, maxD]))
		.elasticY(true)
		.elasticX(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Data")
		.brushOn(false)
		.yAxisLabel("Volume Cisterna") 
		.ordinalColors(['#ff0000','#00bfff','#1e90ff','#0000ff','#747474','#910091','#a65628'])
		.yAxis().ticks(10);


	var criticalDaysChart = dc.barChart("#critical-days-chart2");		
    criticalDaysChart
//      .width(300)
      .height(220)
	  .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
      .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 	  
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minD, maxD]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(10)
      .xAxisLabel('Data')
	  .brushOn(false)
      .ordinalColors(['#f40000','#ffff30','#009100','#009191','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Count');
		
    dc.renderAll();
	
   };	
   
});

