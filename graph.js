var canvas = document.getElementById('myCanvas'),
c= canvas.getContext('2d'),
n=100,

//define the math window
xMin=-10,
xMax=10,
yMin=-10,
yMax=10,
math = mathjs(),
            expr = '',
            scope = {x: 0,
			t:0
			},
            tree,

			time=0,
			timeIncrement=0.1;


		canvas.style.left = "35%";
        canvas.style.top = "25%";
        canvas.style.position = "absolute";
	//main program	
initExprFromHash();
drawCurve();
initTextField();
startAnimation();

window.addEventListener('hashchange', initExprFromHash);		
			
function setExpr(newExpr){
	expr=newExpr;
	  tree = math.parse(expr, scope)
}

function initExprFromHash(){
	var hash =getHashValue();
	var pos=$('#inputField').caret();
	if(hash)
		setExpr(hash);
		else
		{
			setExpr('sin(x+t)*x');
            setHashFromExpr();
        }
		 $('#inputField').val(expr);
		 $('#inputField').caret(pos);
		  
}

function setHashFromExpr(){
	setHashValue(expr);
}

function drawCurve(){

var i,xPixel,yPixel,
percentX,percentY,
mathX,mathY;
      //clear canvas
	  c.clearRect(0,0,canvas.width,canvas.height);
c.beginPath();
for(i=0;i<n;i++)
		{
		percentX= i/(n-1);
		mathX =percentX*(xMax-xMin)+xMin;

		mathY=elvaluateMathExpr(mathX);

		percentY=(mathY -yMin) /(yMax-yMin);

		percentY=1-percentY;

		xPixel=percentX*canvas.width;
		yPixel=percentY*canvas.height;
		c.lineTo(xPixel,yPixel);
		}
		c.stroke();
}

	function elvaluateMathExpr(mathX){
		scope.x=mathX;
		scope.t=time;
		return tree.eval();
	}

function initTextField(){  
    var input = $('#inputField');
      // Set the initial expression value programmatically using jQuery.
      input.val(expr);
      // Listen for changes using jQuery.
      input.keyup(function (event) {
		  setExpr(input.val());
		  setHashFromExpr();
      });
	  }

	  function startAnimation(){

		 (function animloop(){
  requestAnimationFrame(animloop);
  render();
})();
	  }
function render(){
			 time+=timeIncrement;
			 drawCurve();
		  }

function getHashValue(){
        return location.hash.substr(1);
      }

      function setHashValue(value){
        return location.hash = value;
      }