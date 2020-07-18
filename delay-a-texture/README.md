# Delay-a-texture
Languages / Idiomas
- [English](#English)
- [Spanish \/ Español](#Spanish--espa%C3%B1ol)

---

## English

> Note: This is still more manual than I'd like it to be, it's not just changing one value. If a new update or scriting with render passes is released this will probably become obsolete. As of now this is sort of a tutorial.

Everything is contained within a patch group (\[UNGROUP_ME\].arp) that you will have to ungroup. That's because Spark AR would complain whenever I tried adding render passes containerized in their own separate groups or importing multiple ones at once

To delay a texture for an extended amount of time (more than 1 frame), you will have to chain multiple patches together as seen in the image below. You can `Ctrl+C` + `Ctrl+V` things.

From what I've seen every loop through the 'Delay Frame' delays the texture for about 1 to 2 frames. So every 15-30 patches you connect you will delay the texture for a second

![PatchesScreenshot](https://github.com/tomaspietravallo/Spark-AR/blob/master/delay-a-texture/Screen%20Shot%202020-07-14%20at%2000.08.59.png)

The 'input' & 'output' seen on the image is due to everything beeing contained inside a group. The delay frames themselves are not grouped separately, but rather all together inside a group. The input is an RGBA signal (most likely the camera's)

---- 

## Spanish / Español

> Observación: Esto sigue siendo más manual de lo que me gustaria, no es simplemente cambiar un valor. Si se lanza una nueva actualización o pases de renderizado desde codigo esto probablemente se vuelva obsoleto. Por ahora esto es una especie de tutorial.

Todo esta dentro de un grupo de patches (\[UNGROUP_ME\].arp) que vas tener que desagrupar. Esto es porque Spark AR daba error cada vez que intentaba agregar pases de renderizado en sus grupos individuales o importar multiples pases de renderizado de una.

Para atrasar una textura por un periodo prolongado (mas de 1 fotograma), es necesario encadenar multiples patches unos con otros como se puede ver en la imagen de abajo. Podes `Ctrl+C` + `Ctrl+V` los patches (copiar y pegar).

![PatchesScreenshot](https://github.com/tomaspietravallo/Spark-AR/blob/master/delay-a-texture/Screen%20Shot%202020-07-14%20at%2000.08.59.png)

Por lo que he visto cada vez que se pasa por un 'Delay Frame' se atrasa la textura por 1 o 2 fotogramas. Por lo que cada 15-30 patches que conectes en cadena vas a atrasar la textura por un segundo

El 'input' & 'output' que se ven en la imagen son porque todo esta dentro de un grupo. Los `delay frames` no estan agrupados de manera separada, sino que todos en el mismo grupo. El input (la entrada) es una señal RGBA (lo mas probable es que uses la de la camara)
