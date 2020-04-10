const Scene = require('Scene');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Time = require("Time");
const Patches = require("Patches");
const Persistence = require("Persistence");

const picker = NativeUI.picker;
const userScope = Persistence.userScope;
let timer = Time.setTimeout(()=>{userScope.remove("index")}, 12000);

function visible(){ // Not sure what the chances of it not showing are but hey instagram wants error handling so...
    try {
        picker.visible = true; 
    } catch (error) {
        Time.setTimeout(visible(), 100); // I've checked (Diagnostics.log) this to make sure that under normal conditions this doesn't suddenly start a recursive loop
    }
}

Promise.all([

    // Finds textures (picker logos)
    Textures.findFirst('LOGO0'), // Change the names here for the ones of your logos/ button images as they appear in SparkAR. Add or remove as you need (always end the line with a comma) | Remember computers count from 0
    Textures.findFirst('LOGO1'), // This would be result[1] | Remember computers count from 0 so the line above is result[0]
    Textures.findFirst('LOGO2'), // This would be result[2]
    Textures.findFirst('LOGO3'), // This would be result[3]
    Textures.findFirst('LOGO4'), // etc
    Textures.findFirst('LOGO5'),
    Textures.findFirst('LOGO6'),
    Textures.findFirst('LOGO7'),
    Textures.findFirst('LOGO8'),
    Textures.findFirst('LOGO9'),
    Textures.findFirst('LOGO10'),

]).then((result)=>{ // Once it finds the textures it configures the picker
    picker.configure({
        selectedIndex: 0,
        items: [
            {image_texture: result[0]}, // These are the picker bottons. Add or remove as you need (always end the line with a comma) | Remember computers count from 0
            {image_texture: result[1]}, // result[1] is the texture you found above (line 25)
            {image_texture: result[2]}, // result[2] is the texture you found above (line 26)
            {image_texture: result[3]}, // you get the idea 
            {image_texture: result[4]},
            {image_texture: result[5]},
            {image_texture: result[6]},
            {image_texture: result[7]},
            {image_texture: result[8]},
            {image_texture: result[9]},
            {image_texture: result[10]},
        ]
    });
    userScope.get("index").then((val)=>{ // "index" is the Persistence key, you add them in Capabilities -> +Persistence
        picker.selectedIndex = val.value;
    }).catch(()=>{
        picker.selectedIndex = 0; // this is the default value if none is found in memory
    })
})

// Monitors & sends the value to the patch editor
picker.selectedIndex.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    Patches.inputs.setScalar("scriptToEditorVar", val.newValue); // "scriptToEditorVar" is the name of your "From Script" variable (it has to be a Number Variable, unless you change the setScalar part)
    userScope.set("index", { value: (val.newValue) }) // sets the value of the key
    timer.unsubscribe() // clears the last timeout
    timer = Time.setTimeout(()=>{userScope.remove("index")}, 12000); // 12000 is the amount of time the index is storred in memory in ms| 12000ms = 12s
})
// Makes it visible (calls a try/catch block that makes sure it's set to visible = true)
visible();
