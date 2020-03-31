/* Si no necesitas cambiaar la opaacidad de un material y solo queres tener el valor del slider en el patch editor, elimina las lineas 11, 17, 23, 26 & 33*/
/* Si no necesitas el valor en el patch editor y solo queres cambiar la opacidad de un material, elimina las lineas 6, 22, 26 & 32*/
/* Si no queres cambiar nada y usar el codigo como esta, crea una variable "from script" llamada scriptToEditorVar (number) (No necesitas hacerlo si seguis la linea 2) - arrastralo al patch editor - y crea un material llamado material0 (No necesitas hacerlo si seguis la linea 1)*/

const NativeUI = require("NativeUI");
const Patches = require("Patches");
const Persistence = require("Persistence");
const Reactive = require("Reactive");
const Time = require("Time");
const CameraInfo = require("CameraInfo");
const Materials = require("Materials");

const slider = NativeUI.slider;
let sliderValue = 0.5; // Este es el valor por defecto del slider

const userScope = Persistence.userScope;
const yourMaterial = Materials.get("material0") // cambia material0 por el nombre de tu material

userScope.get("sliderValue").then((result)=>{ // Cambia sliderValue (el token) por tu token autorizado (ponelo entre comillas), podes agregar tokens en capabilities -> Persistence
    sliderValue = result.value;
    slider.value = sliderValue;
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // Cmabia la variable scriptToEditorVar por el nombre de tu variable "from script" (number) (entre comillas), si lo configuras correctamente y te da error, arrastra la variable al patch editor, eso suele arreglarlo
    yourMaterial.opacity = sliderValue; // cambia la opacidad del material por el guardado en la memoria
}).catch(()=>{
    slider.value = sliderValue;
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // configura el slider al valor por defecto si no hay un valor anterior guardado en la memoria
    yourMaterial.opacity = sliderValue; // cambia la opacidad del material a la por defecto si no hay un valor anterior guardado en la memoria
});

slider.value.monitor({fireOnInitialValue: true}).subscribe((val)=>{
    sliderValue = Reactive.expSmooth(val.newValue, 200); // Actualiza y suaviza el valor, podes cambiar el 200ms pero por lo general 200ms funciona bien para la mayoria de cosas
    Patches.setScalarValue("scriptToEditorVar", sliderValue); // Cambia scriptToEditorVar por el nombre de tu variable "from script" (number) (entre comillas), si lo configuras correctamente y te da error, arrastra la variable al patch editor, eso suele arreglarlo
    yourMaterial.opacity = sliderValue; // cambia la opacidad de un material - material0 en este caso
    userScope.set("sliderValue", {value: sliderValue}); // guarda el valor en la memoria - solo cambia "sliderValue" (entre comillas) por tu token, el sliderValue sin comillas no loo cambies
    Time.setTimeout(function(){userScope.remove("sliderValue")}, 10000); // Cambia el token de ejemplo por tu token, y el valor en ms que se guarda en la memoria | 10000ms = el valor se guarda por 10s
})

/* El codigo de abajo hace el slider invisible cuando se graba un video, si querres que siga siento visible, cambialo a slider.visible = true; */

if(CameraInfo.isRecordingVideo){
    slider.visible = false;
};

/* El codigo de abajo hace el slider visible, yo no lo cambiaria */

function init(){
    slider.visible = true;
};
init()