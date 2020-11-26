# Raymarching 1.0.102

This project contains the code to Raymarch a scene in Spark SL. It contains:
- Normals
- Basic SDF Shapes and functions
- Soft shadows
- 2 point lights
- Example scene
- And more

The scene to be rendered is under `SDF::scene()`. Lights are in the `render()` function, this may be changed to work with the standard Spark AR Studio lights in the future.

The amount of rays can be changed but remember quality and performance are a tradeoff.

Feel free to add your own functions or SDF primitives.

> Part of the code were inspired by or taken from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
