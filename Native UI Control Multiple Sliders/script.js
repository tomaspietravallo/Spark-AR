// Modules required
const NativeUI = require("NativeUI");
const Textures = require("Textures");
const Patches = require("Patches");
const Persistence = require("Persistence");
const Diagnostics = require("Diagnostics");
const TG = require("TouchGestures");
const R = require('Reactive');
const Instruction = require('Instruction');
const Time = require("Time");
const Materials = require("Materials");
const Camera = require("CameraInfo");

// NUI picker, slider & userScope
const picker = NativeUI.picker;
const slider = NativeUI.slider; 
const userScope = Persistence.userScope;

let amountOfCustoms = 0
let customPresets = [];
let defaults = { "15": [0,0,0,1,0,0,0,0,0], "16":[0.7,-0.7,0,0.05,0,0,0.8,0.8,0.7], "17":[0.6,-0.2,0,0,0,0,0,0,0]};
let settings = [0,0,0,0,0,0,0,0,0]; // current settings - the ones you chage with sliders and gets sent to the patch editor
let settingsObj = {}; // settings saved by the user
let instruc0 = false; // instructions
let instruc1 = false;

let neutral = 0; // defines the position of the middle /neutral button
let fromNeutral = 0; // what's the value from the neutral?. If positive it's to the right and negative to the left
let realIndex = 0; // theres a difference between say -2 in fromNeutral but and object containg {["3"],["4"],["5"]} the value for 2 would appear, when it should be 4, so this value is the value in the object/array that represents the item selected in NUI.picker
let elementValue = 0;
let sliderV = 0; // used to access the slider value from outside slider.monitor

let veryStrangeThingICantFigureOut = false // a special case that ocurrs because of the picker index not changing the first time (when defaults are removed) ¯\_(ツ)_/¯, this is part of an if check that handles it

const indexer = function(){
    let localIndex = Math.abs((index - neutral) + 1);
    //stack overflow | https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    var sortable = [];
    for (var elem in settingsObj){
        sortable.push([elem, settingsObj[elem]]);
    };
    var objSorted = {};
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    });
    settingsObj = objSorted;
    // end stack overflow
    realIndex = parseInt(sortable[localIndex][0]);
}
const resetSliderBasedOnValue = function() { // sets the slider value based on what's selected
    if(fromNeutral >= 1){
        elementValue = (settings)[fromNeutral - 1]
        if(elementValue === 0){ // stop a divide by 0 error
            elementValue = 0.5;
        }else{
            elementValue = (( elementValue / 2 ) + 0.5);
        };
    }else if(fromNeutral <= -1){
        elementValue = 1;
    }
    slider.value = elementValue;
};
const update = function(toWhichIndex){
    // stack overflow | https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    // note: it's mostly handled as obj and not array in the code because it was easier to deal for me (had some issues i can't remember - this is being written almost two weeks after I finished the code)
    var sortable = [];
    for (var elem in settingsObj){
        sortable.push([elem, settingsObj[elem]]);
    }
    sortable.sort(function(a, b){
        return b[0] - a[0];
    });
    var objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    })
    settingsObj = objSorted
    // end stack overflow

    userScope.set("settings", {value: JSON.stringify(settingsObj)}); // stringifing and then parsing the object removes a reference to values that messes the whole code, e.g. change value a, then change b, but a is also modifies to the value of b
    
    if((veryStrangeThingICantFigureOut === false) && (toWhichIndex == Object.keys(defaults).length)){
        veryStrangeThingICantFigureOut = !veryStrangeThingICantFigureOut
        toWhichIndex = 1; // this essencially overides the faulty value, this value arrises from the picker value not chaging when the defaults are removed and hense messing up somethings
        // I tried a lot of things and yeah this is the best to handle it can come up with
    }
    
    pickerConfigAndMore(toWhichIndex);
};

const pickerConfigAndMore = function(toWhichIndex){
    customPresets = []
    Promise.all([ // get the images for the picker, numbers first, then the neutral and setting icons
        // Five logos for the custom presets
        Textures.findFirst("I"),
        Textures.findFirst("II"),
        Textures.findFirst("III"),
        Textures.findFirst("IV"),
        Textures.findFirst("V"),
        // Import logos for the adjustments
        Textures.findFirst("N"), // this is the neutral/blank/do nothing (you name it) icon || 5
        Textures.findFirst("EXP"), // n6
        Textures.findFirst("SAT"), //n7
        Textures.findFirst("TEMP"), //n8
        Textures.findFirst("RED"), //n9
        Textures.findFirst("YELLOW"), //n10
        Textures.findFirst("GREEN"), // n11
        Textures.findFirst("CYAN"), // n12
        Textures.findFirst("BLUE"), // n13
        Textures.findFirst("MAGENTA"), // n14
        Textures.findFirst("HASH"), // n15 these is the icon for the default configurations 
        Textures.findFirst("HASH"), // n16 
        Textures.findFirst("HASH"), // n17        
        //end import
    ]).then((result)=>{
        // Picker and stuff
        //buff
        const set = function(){
            userScope.get("settings").then((val)=>{
                if(val.value === '{}'){
                    neutral = 0
                } else{
                    amountOfCustoms = parseInt((Object.keys(JSON.parse(val.value)).pop()));
                    for (let index = 0; index <= amountOfCustoms; index++){
                        if (index in (JSON.parse(val.value))){
                            customPresets.push({image_texture: result[index]})
                        };
                    };
                    neutral = customPresets.length; // selected index
                    customPresets.reverse();
                    // The above is so the items show in a prettier fashion compaared to not doing so, they apear as III-II-I-N instead of I-II-II-N (N being the neutral/blank icon)
                    // makes sense if you visualize it from a UX point of view
                };
                
                customPresets.push({image_texture: result[5]}); // neutral marker

                let adjustmentsLogos = [ //from texture 6 to n - these are the adjustments 
                    {image_texture: result[6]},
                    {image_texture: result[7]},
                    {image_texture: result[8]},
                    {image_texture: result[9]},
                    {image_texture: result[10]},
                    {image_texture: result[11]},
                    {image_texture: result[12]},
                    {image_texture: result[13]},
                    {image_texture: result[14]},
                ];
                if(toWhichIndex === 'figureItOut'){
                    toWhichIndex = neutral;
                };
                let configuration = {
                    selectedIndex: toWhichIndex,
                    items: customPresets.concat(adjustmentsLogos)
                };
        
                picker.configure(configuration);
                picker.visible = true;
                
                return settingsObj = JSON.parse(val.value);
            }).catch(()=>{
                // if the user is "new" to the filter, these are the defaults shown to the left:
                userScope.set("settings", {value: JSON.stringify(defaults)});
                set(); // calls the function again, but now there are values for userScope "settings"
            });
        };
        set();
        if(picker.selectedIndex == neutral){ // makes sure that when its reset to 0 and isn't registered as a change it still returs 0 to patches
            slider.visible = false;
            sendToPatches(0,0,0,0,0,0,0,0,0);
        };
    });
};

pickerConfigAndMore('figureItOut'); // there's an if check that handles 'figureItOut' don't worry

// Monitor, add to settings and send to patches below

let index = 0;

// send to patch editor, theres an error if you dont do it through a function and it's easier to do this than to try to argue with spark ar
const sendToPatches = function(zero,one,two,three,four,five, six, seven, eight){
    Patches.inputs.setScalar("scriptToEditorVar0", zero);
    Patches.inputs.setScalar("scriptToEditorVar1", one);
    Patches.inputs.setScalar("scriptToEditorVar2", two);
    Patches.inputs.setScalar("scriptToEditorVar3", three);
    Patches.inputs.setScalar("scriptToEditorVar4", four);
    Patches.inputs.setScalar("scriptToEditorVar5", five); 
    Patches.inputs.setScalar("scriptToEditorVar6", six); 
    Patches.inputs.setScalar("scriptToEditorVar7", seven); 
    Patches.inputs.setScalar("scriptToEditorVar8", eight); 
};

picker.selectedIndex.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    index = val.newValue;
    fromNeutral = (index - neutral); // count starts from 0, if < 0 then error

    resetSliderBasedOnValue();
    const instr1 = function(){
        Instruction.bind(instruc1, 'touch_hold');
        if((parseInt(Object.keys(settingsObj).pop()) > 14) && val.newValue < neutral){ // this is one of the the instructions, it checks that one of the default settings is on the object and that it's selected | if a non default exists => defaults auto delete
        instruc1 = true;    
            Time.setTimeout(()=>{
                instruc1 = false
                instr1();
            }, 1000);
        }
    }
    instr1();
    if(val.newValue == neutral){
        slider.visible = false;
        sendToPatches(0,0,0,0,0,0,0,0,0);
    };
    if(val.newValue < neutral){
        slider.visible = true;
        indexer();
        sendToPatches((settingsObj[Math.abs( realIndex + 0 )][0]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][1]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][2]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][3]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][4]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][5]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][6]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][7]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][8]) * sliderV);
    };
    if (val.newValue > neutral){
        slider.visible = true;
        sendToPatches(settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], settings[7], settings[8]);
    };
});

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    sliderV = val.newValue;
    let amount = (val.newValue - 0.5) * 2;
    if (fromNeutral >= 1){
        if (amount === 0){
            settings[fromNeutral - 1] = 0;
        } else{
            settings[fromNeutral - 1] = (Math.floor(amount * 100) / 100);
            const instr = function(){
                if( (parseInt(Object.keys(settingsObj).pop()) > 14) && ( val.newValue >= 0.6 || val.newValue <= 0.4) ){ // this is the instruction
                    instruc0 = true;
                    Instruction.bind(instruc0, 'tap_to_advance');
                    instr();
                    Time.setTimeout(()=>{
                        instruc0 = false;
                        instr();
                    }, 1000);
                };
            };
        };
        sendToPatches(settings[0], settings[1], settings[2], settings[3], settings[4], settings[5], settings[6], settings[7], settings[8]);
    }else if(fromNeutral <= -1){
        indexer();
        sendToPatches((settingsObj[Math.abs( realIndex + 0 )][0]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][1]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][2]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][3]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][4]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][5]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][6]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][7]) * sliderV, (settingsObj[Math.abs( realIndex + 0 )][8]) * sliderV);
    };
});

TG.onTap().subscribe(()=>{
    // after neutral
    if (fromNeutral >= 1){
        for (const key in settingsObj) { // deletes any default setting if a custom one is created (if the limit of custom that can be made is to be raised, this should be changed along with some other things)
            if (parseInt(key) > 5) {
                delete settingsObj[key]
            };
        };
        let createdAtIndex = 0;
        for (let indexlocal = 0; indexlocal <= 5; indexlocal++) {
            if (indexlocal in settingsObj) {
                // do nothing
            }else{
                createdAtIndex = (neutral - indexlocal);
                settingsObj[indexlocal] = settings
                settingsObj = JSON.parse(JSON.stringify(settingsObj)); // this is to break the reference to the value, see update() for more details
                break
            };
        };
        // JSON
        Diagnostics.log(neutral) // errror on passing three as argument based on old neutral
        update(createdAtIndex);
    };
    instruc0 = false; // sets an instruction (tap_to_advance) to false so that it isn't shown anymore
});

TG.onLongPress().subscribe(()=>{
    // before neutral
    if(fromNeutral <= -1){
        indexer();
        delete settingsObj[realIndex];
        settingsObj = JSON.parse(JSON.stringify(settingsObj));
        instruc1 = false // sets an instruction to false so that it isn't shown anymore
        update(0);
    }else if(fromNeutral >= 1){
        settings[0] = 0; 
        settings[1] = 0;
        settings[2] = 0;
        settings[3] = 0;
        settings[4] = 0;
        settings[5] = 0;
        settings[6] = 0;
        settings[7] = 0;
        settings[8] = 0; // counts from 0
        sendToPatches(0,0,0,0,0,0,0,0,0)
        update('figureItOut');
    }
});

// what follows is a fail safe for some users that may not behave as expected (aka most users) that may be tempted to take a photo/video before "saving" and then become frustrated
// it can be deleted with no consequence other than what's mentioned above

Camera.isCapturingPhoto.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    if(val.oldValue == false && val.newValue == true){
        for (let index = 0; index <= (settings.length - 1); index++) {
            if (index in settingsObj) {
                // code
            }else{
                settingsObj[index] = settings;
                settingsObj = JSON.parse(JSON.stringify(settingsObj));
                // break below
                break
            };
        };
        // JSON
        update(0); 
    };
});
Camera.isRecordingVideo.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    if(val.oldValue == false && val.newValue == true){
        for (let index = 0; index <= (settings.length - 1); index++) {
            if (index in settingsObj) {
                // code
            }else{
                settingsObj[index] = settings;
                settingsObj = JSON.parse(JSON.stringify(settingsObj));
                // break below
                break
            };
        };
        // JSON
        update(0); 
    };
});
