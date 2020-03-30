/* If you dont need to change the opacity of a material and just want a value in the patch editor, delete lines 11, 17, 23, 26 & 33*/
/* If you dont need to get the value in patch editor and just change the opacity of a material, delete lines 6, 22, 26 & 32*/
/* If you dont want to change anything and use this code as is, set a from script variable called scriptToEditorVar (number) (not required if you do as said in line 2) - drag it to the patch editor - and create a material called material0 (not required if you do as said in line 1)*/

const NativeUI = require("NativeUI");
const Patches = require("Patches");
const Persistence = require("Persistence");
const Reactive = require("Reactive");
const Time = require("Time");
const CameraInfo = require("CameraInfo");
const Materials = require("Materials");

const slider = NativeUI.slider;
let sliderValue = 0.5; // this is the default value of the slider

const userScope = Persistence.userScope;
const yourMaterial = Materials.get("material0") // change material0 for your material

userScope.get("sliderValue").then((result)=>{ // Change sliderValue (the key) for your whitelisted key (between quotes), you can add keys in project capabilities -> +Persistence
    sliderValue = result.value;
    slider.value = sliderValue;
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // Change the scriptToEditorVar for the name of your script to editor (number) variable (between quotes), if you set the variable correctly and get an error, drag the scipt into the patch editor it usually solves it
    yourMaterial.opacity = sliderValue; // changes the opacity of the material to the stored value
}).catch(()=>{
    slider.value = sliderValue;
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // sets patch editor variable to default value in case there wasn't anything stored
    yourMaterial.opacity = sliderValue; // changes the opacity of the material to default value in case there wasn't anything stored
});

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    sliderValue = Reactive.expSmooth(val.newValue, 200); // Updates the value and smooths it, you can change the 200ms but I find that 200 works great
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // Change the scriptToEditorVar for the name of your script to editor (number) variable (between quotes), if you set the variable correctly and get an error, drag the scipt into the patch editor it usually solves it
    yourMaterial.opacity = sliderValue; // changes the opacity of a material - material0 in this case
    userScope.set("sliderValue", {value: sliderValue}); // stores the value - only change "sliderValue" for your key
    Time.setTimeout(function(){userScope.remove("sliderValue")}, 10000); // Change the e.g. key for yours, and the ms value if you want to | 10000ms = the value is stored for 10s
})

/* The code below makes the slider invisible when a video is being recorded, if you want it to still be visible, change it to slider.visible = true; */

if(CameraInfo.isRecordingVideo){
    slider.visible = false;
};

/* The code below sets the slider to visible, I wouldn't change it */

function init(){
    slider.visible = true;
};
init()
