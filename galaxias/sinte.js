Tone.Transport.bpm.value=100;
Tone.Transport.latencyHint="interactive";

var suena=true;
var keys=false;
var volSynth=-24;
var arrNotas=[];
var escala=[0,2,4,5,7,9,11,12,14,16,17,19]
var sinte = new Tone.PolySynth(12,Tone.Synth);
sinte.set({
  "oscillator" : {"type" : "sawtooth"},
	"envelope" : {
		"attack" : 0.2,
		"decay": 1,
		"sustain":0.6,
		"release":5
}});
sinte.volume.value=volSynth;
sinte.toMaster();

rev=new  Tone.Freeverb ( 0.99,3000 )
sinte.connect(rev);
rev.toMaster();
//Tone.Transport.start()

tocanota=function(a,b){//note on
    if(!suena) {return}
    
    a=a.toString().substring(0,1);

    b=b.toString();

    b=b.substring(b.length-2,b.length);

    var n=Tone.Frequency(Number(escala[a])+58, "midi").toNote();

    var v=(Number(b)-28)/6;
    sinte.triggerAttackRelease(n,"4n",Tone.Transport.now()+0.001,v);
    console.log("a: "+a+" n:"+n+" vel:"+v)
    arrNotas.push(a)
}

paranota=function(a){//"note off"
  if(!suena) {return}
  var n=Tone.Frequency(a, "midi").toNote();
  arrNotas.splice(arrNotas.indexOf(a),1);
  sinte.triggerRelease([n])
}

volumen=(a,inf)=>{
  if(!inf){
    sinte.volume.value=-64+a/2;
  }else{
    if (a==64){return}
    let v=sinte.volume.value+(a-64)/10;
    if(v>0){v=0}else if(v<-60){v=-160}
      sinte.volume.value=v;
    
    console.log("vol sinte= "+sinte.volume.value)
  }
}
