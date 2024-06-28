
02.09.17: Der sphereWorldStand ist endlich repariert _ Mehr noch ..es gibt jetzt einen shpere  Folder mit beliebig vielen SPHÄREN
NEU:
function getRandomNumberBetween(selectNr, randomLimit){

	
var arr = [];
	while(arr.length < selectNr){
		
var randomnumber = Math.ceil(Math.random()*randomLimit)
		
if(arr.indexOf(randomnumber) > -1) continue;
		
arr[arr.length] = randomnumber;
	}	
	
return arr;
}

DAMIT bekommen wir eine Zufalls aus N-Zahlen...das ermöglicht in jedem Load andere Welten zu laden 

NEU:

//***********************
			
var ANZAHL_WELTEN=8;
			
//***********************

