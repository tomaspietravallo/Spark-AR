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
    Textures.findFirst('LOGO5'),
    Textures.findFirst('LOGO6'),
    Textures.findFirst('LOGO7'),
    Textures.findFirst('LOGO8'),
    Textures.findFirst('LOGO9'),
    Textures.findFirst('LOGO10'),

]).then((result)=>{ 
    picker.configure({
        selectedIndex: 0,
        items: [
            {image_texture: result[0]}, 
            {image_texture: result[1]}, 
            {image_texture: result[2]}, 
            {image_texture: result[3]}, 
            {image_texture: result[4]},
            {image_texture: result[5]},
            {image_texture: result[6]},
            {image_texture: result[7]},
            {image_texture: result[8]},
            {image_texture: result[9]},
            {image_texture: result[10]},
        ]
    });
    userScope.get("index").then((val)=>{ 
        picker.selectedIndex = val.value;
    }).catch(()=>{
        picker.selectedIndex = 0;
    })
})

picker.selectedIndex.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    Patches.inputs.setScalar("scriptToEditorVar", val.newValue); 
    userScope.set("index", { value: (val.newValue) }) 
    timer.unsubscribe() 
    timer = Time.setTimeout(()=>{userScope.remove("index")}, 12000); 
})

visible();
