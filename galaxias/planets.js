//planets

var starLoc=false;//lineas de mirilla
var velSpacial=60000;
var radioCircle=3;
var radioCircleFinal=24;
var gris=255;
var grisRandom=false;
var starLocThick=1;
var starLocMaxThick=300;
var ly=0;

var starLocColor="rgb(256,256,256)";
var radioVelo=false;//la key velociti influye en el radio del planeta
var horizon=alt/2;
let vertical=true;
let fadeTime=10000;
let contador= 0;
let leye=document.getElementById("dato")


function ponGalaxia(){/////////////////////////////////////////////    HERE
  contador++;
  var x=gala[contador][0]*6+amp/3;
  var y=gala[contador][1]*4+alt/3;
  ponEstrella(100,gala[contador][3],x,y);
  let g=gala[contador][3];
  ly=red2lyear(gala[contador][2])
  
 
  tocanota(g,g)
}

function ponEstrella(a,v,eq,ig){// es un circulo-planta-cuadrado-nave
  let vel;
  let x=eq -(amp/2)//Math.random()*360;
  let y=ig - (alt/2);

  let radius=radio+margen;
  let equis=x;//||(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  let igriega=y;//||(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang))+alt/2;

  vel=velSpacial;

  let radioVel=radioCircle;
  if(radioVelo){radioVel*v/10}
  if (grisRandom){gris=Math.round(Math.random()*256)}
  var c = new createjs.Shape();
  let b=v.toString();

  b=b.substring(b.length-2,b.length);
  gris=Math.round(127*(b-28)/3)+10;

  console.log("eee: "+b+ " gris: "+gris)
  
  let micolor="rgb("+gris+","+gris+","+gris+")";
  c.graphics.beginFill(micolor).drawCircle(2, 2, radioVel);
  c.x = eq
  c.y = ig;
  creaDestello(eq,ig+horizon)
  stage.addChild(c);

  var tamanyo=Math.random()*radioCircleFinal;
  createjs.Tween.get(c)
    .to({ x:equis*10,y:y*10,
    scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
   .call(handleComplete, [c]);
}

function creaDestello(x,y){
  if(!starLoc){return}
  var destello=new createjs.Shape();
  starLocColor=getRandomGris()

  if (vertical){
    destello.graphics.beginFill(starLocColor).drawRect(-starLocThick/2,-alt,starLocThick,alt*2);//vertical
    destello.x=x*Math.random()*2;destello.y=y;
  }else{
    destello.graphics.beginFill(starLocColor).drawRect(-2000,horizon/2,8000,starLocThick);//horizontal
    destello.x=x;destello.y=y*(Math.random()/8);
  }
  console.log("destell:"+x+" "+y)
  stage.addChild(destello);
  createjs.Tween.get(destello).to({alpha:0 }, fadeTime).call(handleComplete, [destello]);
}//mirilla

function velocidad(a,i){// velSpacial
  if(!i){//1-127
    velSpacial=a*a*8;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
  }else{// si es encoder
    let e=a-64;
    velSpacial+=e*60;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
    }
  console.log("velSp: "+velSpacial+" "+i);
}

function radioPlaneta(a,i){
  if(!i){
    radioCircle=a/4;
  }else{//encoder
    radioCircle+=a-64;
  }
  if (radioCircle<1){radioCircle=1}else if(radioCircle>32){radioCircle=32}//corrector
  console.log("radioPlantet:" +radioCircle)
}//radio planets

function distanciaPlaneta(a,i){//radio planets when near
  if(!i){
      radioCircleFinal=a*4;
    }else {
      radioCircleFinal+=(a-64);
    }
  if(radioCircleFinal<0){
     radioCircleFinal=0;
  }else if(radioCircleFinal>500){
      radioCircleFinal=500;
  }
  console.log("distanciaPlanteta:" +radioCircleFinal);
}

function luzPlaneta(a,i){
  if(!i){
    gris=a*2;
  }else if(gris>0&&gris<256){
      gris+=a-64;
  }
  console.log("#" +gris)
}

function luzPlanetaAlienSWITCH(d,v){
  if(d==0){return}
  if(grisRandom){grisRandom=false}else{grisRandom=true}
  console.log("luzPlanetaAlienSWITCH: "+grisRandom);
}

function locationSWITCH(d,v){
  if(d==0){return}
  if(starLoc){starLoc=false}else{starLoc=true}
    console.log("locationSWITCH: "+starLoc);
}

function clearButtonSWITCH(d,v){

    console.log("clear!");
    stage.removeAllChildren();

}

function starLocThickness(d,inf){
  if(!inf){
    starLocThick=Math.random()*d*10+1;
  }else{
    starLocThick+=d-64;
  }

    console.log("thickness:"+starLocThick)
}
function verticalitySWITCH(d,v){
  if(d==0){return}
  if (vertical){vertical=false}else{vertical=true}
}

function horizonHeight(d,inf){
  if(!inf){
    horizon=d/32*alt-2*alt;
  }else{
    horizon+=(d-64);
  }
  console.log("horizon: "+horizon)
}

function landFadeTime(d,inf){
  if(!inf){
    fadeTime=d*500;
  }else{
    fadeTime+=(d-64)*10;
  }
  console.log("fadeTime: "+fadeTime)
}

function dale(){
  initVisual();
  Tone.context.resume();
  intervalo=setInterval(ponGalaxia,500);
 document.body.removeChild(document.getElementById("pantalla"));
 let t=document.getElementById("texto");
 t.innerText= "Light years from Earth:"
}
