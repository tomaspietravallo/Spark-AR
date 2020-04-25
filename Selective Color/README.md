# Selective Color
To use the files, just download them and drag them into Spark AR or use the 'Import from Computer' button

The patch asset uses Josh Beckwith's \([@positlabs](https://github.com/positlabs)\) [incredible LUT patch](https://github.com/positlabs/spark-lut-patch), please go and check his work, he makes incredible stuff

## How it works
### Inputs:
- 'PLUS RGBA': A modified LUT that modifies the saturation\* of a color positively, [e.g. with reds here](https://drive.google.com/drive/folders/1PtXGoqf4EKgfmRd6UnDEhmfiyMD6i-cJ?usp=sharing)
- 'MINUS RGBA': A modified LUT that modifies the saturation\* of a color negatively, [e.g. with reds here](https://drive.google.com/drive/folders/1PtXGoqf4EKgfmRd6UnDEhmfiyMD6i-cJ?usp=sharing)
- 'CAMERA TEXTURE': The camera texture RGBA or RGB (alpha is discarted so it doesn't matter)
- 'Slider Value': This value should range from -1 to +1 (you can use a 'From range' to transform the slider value)

\* I have only done this with saturation, but I assume lightness and hue should work, also, the luts are modifed to +70/65 and -100, because +100 can cause unwanted noise if you can see a sharp edge form in the LUT png.

### Outputs:
- 'Result': A RGBA signal that should be assigned to a flat material (Blend Mode: alpha), and that material assigned to its own rectangle

## The idea behind it
**I dont know anything about color theory or anything, I just thought way too much** With that said: 

The PLUS RGBA and MINUS RGBA are chosen depending on whether the value is greater or less than zero, after that the LUT is applied to the camera texture and IF the LUT causes a change in Hue, Saturation or Value (these are weighted)
that point of the image is added to the Alpha channel, and the modified camera texture is sent to the RGB part of the signal. The Alpha is multiplied by the absolute value of 'Slider Value' so that a small change in 'Slider Value' results in only a small change being shown

TL;DR: If the LUT (which should only modify one color) causes a change in x part of the image, that change will be shown in proportion to the 'Slider Value'

#### Why are there two versions?
Red & Blue have different effects compared to the other colors, the difference is only inside the LUT patch, the clamp values are changed slightly in a way that removes the effect. Why does that happen? I'm not sure, I have no idea to be honest, I'd guess there's some process or property of the LUT base .png, or the color space (no idea), that represents those colors differently
