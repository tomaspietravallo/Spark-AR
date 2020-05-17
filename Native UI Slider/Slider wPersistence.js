const NativeUI = require('NativeUI')
const Persistence = require('Persistence')
const Time = require("Time")
const Patches = require('Patches')

const slider = NativeUI.slider
const userScope = Persistence.userScope

let timer = Time.setTimeout(()=>{userScope.remove('slider')}, 12000);

userScope.get('slider').then((val)=>{
    slider.value = val.value
    slider.visible = true
}).catch(()=>{
    slider.value = 1
    slider.visible = true
})

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    userScope.set('slider', {value: val.newValue})
    Patches.inputs.setScalar('slider', val.newValue)
    timer.unsubscribe();
    timer = Time.setTimeout(()=>{userScope.remove('slider')}, 12000);
})
