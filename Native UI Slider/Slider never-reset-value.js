const NativeUI = require('NativeUI')
const Persistence = require('Persistence')
const Patches = require('Patches')

const slider = NativeUI.slider
const userScope = Persistence.userScope

userScope.get('slider').then((val)=>{
    slider.value = val.value
    slider.visible = true
}).catch(()=>{
    slider.value = 0.2
    slider.visible = true
})

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    userScope.set('slider', {value: val.newValue})
    Patches.inputs.setScalar('slider', val.newValue)
})

