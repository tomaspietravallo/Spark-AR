# Native UI Control Multiple Sliders
To use the files, create a script in Spark AR (Add Assets button) and copy paste the contents of the file you choose to it, or download the file and drag it into spark.

Please note all this does is send values to the patch editor, these can be used however you want, instead of editing the cameraTexture, it could say customize a character in a game

# Disclaimer
This is based off [@data-sapiens](https://github.com/data-sapiens) post on facebook: https://www.facebook.com/groups/SparkARcommunity/permalink/824354817976562/

[Please check his code here](https://github.com/data-sapiens/SparkAR-FilterSettings?fbclid=IwAR2FlS6evp3zYrk2L85jueupnGHBFlLvcMk48iSFpNO6_tQpIcsD9O27yNU) - \(he actually knows how to code\)

## Overview of the code
The code creates a NativeUI Picker and Slider, the slider value is saved in an array at an index dependent on the picker.selectedIndex, if the user taps the screen while editing the array is saved as an object and then storred with the persistence capability. All of the values from the array are constantly sent to patches.

If the object saved in the "settings" key (Persistence) has some settings saved those will be added to the Native UI Picker, to the left of whatever settings are (permanently) on the picker and these are separated by a blank/do nothing setting.

The result is a picker that changes dynamically based on what the user saves and a slider that also has to update dynamically based on the index.

Because of all of the changes that can be made to the picker and the settings that are saved the complexity increases greatly, and the code is a bit messier than I would have expected, though by no means I'm an expert with JS so there may be better ways to achieve this.

The code has comments on parts which it may not be obvios what x is doing

## Changing the code
If you what to add settings to be changed (aka have more picker buttons to use) you should add the icons to the Promise.all \(please note order matters\), the picker configuration where all of the rest are added, to connect those new values to patches you should increase the amount handled by sendToPatches\(\) and add the new indexes to each sendToPatches\(\) call \(Control + F it\).

If you what to have more "capacity" for saved states, you will have to add the icons to Promise.all (please note order matters), change the picker configuration, make sure to test a long the way to catch errors, and check that any if / for expression reling on a constant number (dependent or doing things based on those states) is changed accordingly

Please note changing the number of textures changes the index of the default icons and you will have to change the numbers on the `let defaults = {...} ` to the corresponding values for your default icons - notice they are called 3 separate times for 3 default configurations.

## Project Capabilities:
- Instructions: 'tap_to_advance' & 'touch_hold'
- Native UI: Picker and Slider
- Persistence: Whitelist 'settings'
- Touch Gestures: Tap and Long press gestures

