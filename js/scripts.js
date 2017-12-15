var LEADER = "Zitoune";
var LOOSER = "Rabbox";
var EXTERIEUR = "Kiki";
var PARTICIPANT1 = "Kissou";
var PARTICIPANT2 = "Fatal";

var CLICKVANNE = $('.clickVanne');
var SETNAME = $('.validName');
function setName() {
	if( $("#leader").val() !== "") {
		LEADER = $("#leader").val();
	}
	if( $("#looser").val() !== "") {
		LOOSER = $("#looser").val();
	}
	if ($("#exterieur").val() !== "") {
			EXTERIEUR = $("#exterieur").val();
	}
	if ($("#participant1").val() !== "") {
			PARTICIPANT1 = $("#participant1").val();
	}
	if ($("#participant2").val() !== "") {
			PARTICIPANT2 = $("#participant2").val();
	};
}

$(function() {
	console.log("DOM READY...");
	setName();
	CLICKVANNE.click( function(){
		CLICKVANNE.hide();
		loadCitations();
	});
	
	SETNAME.click( function() {
		setName();
	});
});

function loadCitations() {
	$.getJSON( "citations/citations.json", function( data ) {
		
		$('.container').empty();
		var nbvannes = data.length;
		var i = getRandomInt(0, nbvannes);
		var vanne = data[i].vanne;
		
		var j = 0;
		createBubble( vanne, j );
		if ( j === vanne.length ) {
			clearInterval();
		} else {
			j++;	
		}
		setInterval( function() {
			createBubble( vanne, j )
			j++;
			if ( j === vanne.length ) {
				setTimeout(function() { CLICKVANNE.show();}, 2000);
				clearInterval();
			}
		}, 2000);
		
	});
}

function createBubble( vanne, j ) {
	var bubble = "";
			
	if ( j%2 === 0 ) {
		bubble += "<div class='bubble'><p>" + replaceAllNames(vanne[j].texte) + "</p></div>";
	} else {
		bubble += "<div class='bubble bubble-alt green'><p>" + replaceAllNames(vanne[j].texte) + "</p></div>";
	}
	$('.container').append(bubble);
}

function replaceAllNames( texte ) {
	var res = texte.replace("#leader", LEADER);
	res = res.replace("#looser", LOOSER);
	res = res.replace("#exterieur", EXTERIEUR);
	res = res.replace("#participant1", PARTICIPANT1);
	res = res.replace("#participant2", PARTICIPANT2);
	return res;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}