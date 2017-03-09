	// seleciona o periodo de visualização (semana ou mes)
	d3.select('#date_select2').on('change', function() { 
	   var nd = new Date();
	   var now = new Date();
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
				nd = timeDim.bottom(1)[0].datetime;
			   }
          break;
         default:
               nd = timeDim.bottom(1)[0].datetime;
       }
        minDate = nd;
		maxDate = now;
		
		var dateChart = dc.lineChart("#date-chart2");
	dateChart
		//		.width(600)
		.height(220)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
//		.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 
		.on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 
		.dimension(timeDim)
		.group(status_tc,"critical")
		.stack(status_tl,"low")
		.stack(status_tm,"medium")
		.stack(status_tf,"full")
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Data")
		.brushOn(false)
		.yAxisLabel("Volume H2O") 
		.ordinalColors(['#ff0000','#00bfff','#1e90ff','#0000ff','#747474','#910091','#a65628'])
		.yAxis().ticks(10);


	var criticalDaysChart = dc.barChart("#critical-days-chart2");		
    criticalDaysChart
//      .width(300)
      .height(220)
	  .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
//	  .renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 
      .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 	  
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(10)
      .xAxisLabel('Data')
	  .brushOn(false)
      .ordinalColors(['#f40000','#ffff30','#009100','#009191','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Critical Events');
		
	    dc.renderAll();
    });		
	
	
	//var ci3Min = setInterval(renderData, 180000);
//function renderData() {
//		queue().defer(d3.json, "/api/data").await(makeGraphs2);
//}	
	
	
	//var cx3Min = setInterval(renderData, 180000);
//function renderData() {
//		queue().defer(d3.json, "/api/data").await(makeGraphs1);
//}		
	////////////////////////////////////
	//var gau3Min = setInterval(renderData, 180000);
//function renderData() {
//		queue().defer(d3.json, "/api/data").await(displayTotals);
//}		
	
	////////////////////////////
	
		//Define os menus e charts
	  selectField = dc.selectMenu('#menuselect2')
        .dimension(reservatorio)
        .group(reservatorioGroup); 
		
		
		
		/////////////////////////
		
			// seleciona o periodo de visualização (semana ou mes)
	d3.select('#date_select').on('change', function() { 
	   var nd = new Date();
	   var now = new Date();
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
				nd = timeDim.bottom(1)[0].datetime;
			   }
          break;
         default:
               nd = timeDim.bottom(1)[0].datetime;

	}
	
	minDate = nd;
	maxDate = now;
			   
		var dateChart = dc.lineChart("#date-chart");
	dateChart
		//		.width(600)
		.height(220)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
//		.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 
        .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 		
		.dimension(timeDim)
		.group(status_tc,"critical")
		.stack(status_tl,"low")
		.stack(status_tm,"medium")
		.stack(status_tf,"full")
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Data")
		.brushOn(false)
		.yAxisLabel("Volume H2O") 
		.ordinalColors(['#ff0000','#00bfff','#1e90ff','#0000ff','#747474','#910091','#a65628'])
		.yAxis().ticks(10);

	var criticalDaysChart = dc.barChart("#critical-days-chart");		
    criticalDaysChart
//      .width(300)
      .height(220)
      .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
//	  .renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 		
      .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(10)
      .xAxisLabel('Data')
	  .brushOn(false)
	  .ordinalColors(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Critical Events');
		
	    dc.renderAll();
    });	