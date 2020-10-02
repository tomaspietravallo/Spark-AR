# Simple Picker UI

This script is designed for people with little or no experience in programming who still want to use the NativeUI Picker.

## How to use:

1. To use it just download the script called [picker.js](https://github.com/tomaspietravallo/Spark-AR/blob/master/SimplePickerUI/picker.js) and import it to your project.

2. Rename the textures you want to use for your picker's icons with the following pattern: `icon[0-9]`

3. Add the Picker capability. Go to Project > Edit Properties... > Capabilities > + NativeUI > + Picker.

4. Create a From Script variable called `index` (case sensitive) of the type `scalar` / `number`, select the script you imported and on the right side add the variable. Then drag the script to the patch editor (otherwise you'll see an error saying it doesn't exist)

![](https://lh3.googleusercontent.com/40ldvt2kBCbiU6bJdUKDwTGrfRIPV9ge2C8Z5ZPitYW6DXP_wIgGnUYLNL9ahw0_90UAFU5L8FSoWT9JSn1NcV3hlDV6H14A5LT9V88U3KBcj2-Cc_gp9LYPwrjHtS3cxxbI9u72IA=w2400)

Example icon names: `icon0`, `icon1`, `icon2` ... `icon999`. 

There's no limit to how many icons you can have, just keep adding numbers to the name.

⚠️ Remember to disable compression on the textures just like with the regular Native UI Picker Patch ⚠️

## More than 10 icons:

If you wish to have more than 10 icons - more than `icon9`. 

Use the pattern: `icon01`, `icon02`, `icon03`, ... `icon09`, `icon10`, `icon11` ...

For numbers up to 999, use the pattern `icon001`, `icon002`, `icon003`, ... `icon099`, ... `icon999`.

Always make sure the amount of digits on the name is the same, pad with `0`s at the front as necessary.

## Example Project:
You can see an example project here: [picker.arprojpkg](https://github.com/tomaspietravallo/Spark-AR/blob/master/SimplePickerUI/picker.arprojpkg)

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

## Credits:
Picker icons by [Josh Beckwith](https://www.instagram.com/positlabs/)

## Donations ❤️:
If you found this useful or used it on a client's project, please consider donating a small amount as that helps me out and allows me to keep making small scripts like this one. This would be a one time donation with no hidden charges nor recurrent charges.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LEXFVQET96N2Y)
