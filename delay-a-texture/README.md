# Delay-a-texture

> Note: This is still more manual than I'd like it to be, it's not just changing one value. If a new update or scriting with render passes is released this will probably become obsolete. As of now this is sort of a tutorial

The things are contained within a patch group (\[UNGROUP_ME\].arp) that you will have to ungroup. That's because Spark AR would complain whenever I tried adding render passes containerized in their own separate groups

To delay a texture for an extended amount of time (more than 1 frame), you will have to chain multiple patches together as seen in the image below. You can `Ctrl+C` `Ctrl + V` things.

From what I've seen every loop through the 'Delay Frame' delays the texture, for about 1 to 2 frames. So every 15-30 patches you connect you will delay the texture for a second

![PatchesScreenshot](https://github.com/tomaspietravallo/Spark-AR/blob/master/delay-a-texture/Screen%20Shot%202020-07-14%20at%2000.08.59.png)

The 'input' & 'output' seen on the image is due to everything beeing contained inside a group. The delay frames themselves are not grouped separately, but rather all together inside a group
