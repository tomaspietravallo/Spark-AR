const Scene = require('Scene');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Time = require("Time");
const Patches = require("Patches");
const Persistence = require("Persistence");

const picker = NativeUI.picker;

function visible(){
    try {
        picker.visible = true; 
    } catch (error) {
        Time.setTimeout(visible(), 100); 
    }
}

Promise.all([

    Textures.findFirst('LOGO0'), 
    Textures.findFirst('LOGO1'), 
    Textures.findFirst('LOGO2'), 
    Textures.findFirst('LOGO3'),
    Textures.findFirst('LOGO4'),

]).then((result)=>{ 
    picker.configure({
        selectedIndex: 0,
        items: [
            {image_texture: result[0]}, 
            {image_texture: result[1]}, 
            {image_texture: result[2]}, 
            {image_texture: result[3]},
            {image_texture: result[4]},
        ]
    });
    picker.selectedIndex = Math.round(Math.random()*4);
})

picker.selectedIndex.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    Patches.inputs.setScalar("scriptToEditorVar", val.newValue);
})

visible();
