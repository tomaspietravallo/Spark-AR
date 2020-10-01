# Simple Picker UI

This script is designed for people with little or no experience in programming who still want to use the NativeUI Picker.

## How to use:

1. To use it just download the script called [picker.js](https://github.com/tomaspietravallo/Spark-AR/blob/master/SimplePickerUI/picker.js) and import it to your project.

2. Rename the textures you want to use for your picker's icons with the following pattern: `icon[0-9]`

Example icon names: `icon0`, `icon1`, `icon2` ... `icon999`. 

There's no limit to how many icons you can have, just keep adding numbers to the name.

⚠️ Remember to disable compression on the textures just like with the regular Native UI Picker Patch ⚠️

## Order of the icons:

The icons will get ordered in ascending order.

Eg: `icon0`, `icon1`, `icon2`, `icon3`, ... `icon99`

## Using other patterns instead of `icon[0-9]`
If you want to change the pattern used to load the icons you will have to change line 48 of the [picker.js](https://github.com/tomaspietravallo/Spark-AR/blob/master/SimplePickerUI/picker.js) script.

The patterns have to be in the format: `name*`, `*` means it will match any string that follows the name you choose.

Patterns are case sensitive.

Eg: 

`myIcon*`:
- ✅ `myIcon0`, `myIcon1`, `myIcon2`, ... `myIcon999`
- ❌ `MYICON0`, `mYIcon0`, `myicon0`, ...

## Donations ❤️:
If you found this useful or used it on a client's project, please consider donating a small amount as that helps me out and allows me to keep making small scripts like this one. This would be a one time donation with no hidden charges nor recurrent charges.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LEXFVQET96N2Y)
