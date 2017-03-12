angular.module('App').controller('RadialGaugeDemoCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
 
var presence = 0;
 
 queue()
	  .defer(d3.json, "/api/data1")
	  .await(renderGourmet);

var ci3Min = setInterval(renderG, 180000);
function renderG() {
		queue().defer(d3.json, "/api/data1").await(renderGourmet);
}	
	  
function renderGourmet(error,apiData1) {
	var gourmetData = apiData1;
	makeGadgets(gourmetData);
}


function makeGadgets(apiData1){
	
   //Get sensor Data
	var dataSet = apiData1;
	
    //  "datetime": "2/17/2017  9:00:00"
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
	});		
	
	//Cria Crossfilter
	var ndx = crossfilter(dataSet);
	
    // Cria as dimensões
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });
	// acha a quantidade de posts na table
//	var tdlen= timeDim.top(Number.POSITIVE_INFINITY).length;
//   console.log("length is:" + tdlen);

//acha os ultimos valores de temperatura humidade e presença	
	var inTemp = timeDim.top(1)[0].tempspace;
	var exTemp = timeDim.top(1)[0].tempext;
	var inHumi = timeDim.top(1)[0].humispace;
	var exHumi = timeDim.top(1)[0].humiext;
	presence = timeDim.top(1)[0].presencecnt;
	console.log("presence control value:" + presence);

	
// monta os gauges de temperatura e humidade
	 $scope.value_ti = inTemp;
	 $scope.value_te = exTemp;
        $scope.upperLimit_t = 60;
        $scope.lowerLimit_t= 0;
        $scope.unit_t = " oC";
        $scope.precision_t = 1;
        $scope.ranges_t = [
            {
                min: 0,
                max: 12,
                color: '#DEDEDE'
            },
            {
                min: 12,
                max: 24,
                color: '#8DCA2F'
            },
            {
                min: 23,
                max: 36,
                color: '#FDC702'
            },
            {
                min: 36,
                max: 48,
                color: '#FF7700'
            },
            {
                min: 48,
                max: 60,
                color: '#C50200'
            }
        ];
		
	 $scope.value_hi = inHumi;
	 $scope.value_he = exHumi;
        $scope.upperLimit_h = 100;
        $scope.lowerLimit_h= 5;
        $scope.unit_h = " %hum";
        $scope.precision_h = 1;
        $scope.ranges_h = [
            {
                min: 5,
                max: 20,
				color: '#C50200'
            },
            {
                min: 20,
                max: 40,
				color: '#FF7700'
            },
            {
                min: 40,
                max: 60,
                color: '#FDC702'
            },
            {
                min: 60,
                max: 80,
				color: '#8DCA2F'
            },
            {
                min: 80,
                max: 100,
				color: '#DEDEDE'
            }
        ];

    }

$(document).ready(function () {
	
$('#info').click(function (e) {
	if (presence >= 5) {
		e.preventDefault()
		$('#message').html('<div class="alert alert-success fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>Presença Detectada</div>');
	} else {
		e.preventDefault()
		$('#message').html('<div class="alert alert-danger fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>Espaço Vazio</div>');
	}
//     e.preventDefault()
//     $('#message').html('<div class="alert alert-info fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>This is a info message</div>');
})
	
//$('#success').click(function (e) {
//  e.preventDefault()
//  $('#message').html('<div class="alert alert-success fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>Presença Detectada</div>');
//})
//
//$('#danger').click(function (e) {
//  e.preventDefault()
//  $('#message').html('<div class="alert alert-danger fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>Espaço Vazio</div>');
//})

});

	
}]);   