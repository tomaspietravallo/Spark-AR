const Materials = require("Materials");
const NativeUI = require("NativeUI");
const slider = NativeUI.slider;

let material = Materials.findFirst("yourMaterial"); // change yourMaterial for your material's name | put it between quotes ""
slider.value = 1; // this is the default slider value
slider.visible = true;

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    material.then((result)=>{
        result.opacity = val.newValue // changes the selected material's opacity based on the slider value
    })
})
