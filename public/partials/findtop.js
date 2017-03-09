	var p1 = true;
	var p2 = true;
//	var tdlen= timeDim.top(Number.POSITIVE_INFINITY).length;
//   var j = Math.round(tdlen/10);
	var i = 1;
	do {
		if ( (timeDim.top(i)[i-1].poleid == 1 && p1 )) {
			lastVolume1 = timeDim.top(i)[i-1].total;
			console.log("LastVolume1 is:" + lastVolume1);		
			console.log("LastTime1 is: " + timeDim.top(i)[i-1].datetime);
			i = i + 1;
			p1 = false;

			} 
		else if ((timeDim.top(i)[i-1].poleid == 2 && p2)) {
			lastVolume2 = timeDim.top(i)[i-1].total;
			console.log("LastVolume2 is:" + lastVolume2);		
			console.log("LastTime2 is: " + timeDim.top(i)[i-1].datetime);
			i = i + 1;
			p2 = false;
			}
		}
		while (p1 ||  p2);