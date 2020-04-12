# Native UI Slider
To use the files, create a script in Spark AR (Add Assets button) and copy paste the contents of the file you choose to it, or download the file and drag it into spark.

## Simple Sliders
These are sliders that aren't integrated with the persistence capability, so the value isn't stored and used to set the slider the next time.

## Sliders with Persistence
As the name says these sliders are integrated with the Persistence capability.

## Why the two groups?
The sliders are divided in these two groups because sometimes as of 11/04/2020 - v85 - different things may collide in ways that when the slider uses Persistence, those things break in ways whose cause I haven't figured out. If adding a slider with persistence breaks something you can't figure out how to solve, consider using the alternative version.

## Common problems:
* Remember to add the slider capability, to do this go to capabilites, add NativeUI then tick the "Slider" checkbox.
* For sliders with Persistence, remember to whitelist the key, to do this go to capabilites, add Persistence and add the key in the box, do so without any quotes or similar, if you've already added a key, you just leave a space in-between.
