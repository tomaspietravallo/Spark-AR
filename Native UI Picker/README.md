# Native UI Picker (with Persistence)
To use the files, create a script in Spark AR (Add Assets button) and copy paste the contents of the file you choose to it, or download the file and drag it into spark.

If you don't really understand javascript or code as a whole (like when I started) I'd recommend using the version with comments, it has `// little things like this (comments)` that don't change the result but will tell you what you can change, what the result of doing so will be, and what you shouldn't.

If you know what you're doing feel free to use the version without comments (Picker.js) and change it as you wish.

## Common problems:
* Remember to add picker in the project capabilities - Add the NativeUI capability, then tick the "Picker" checkbox.
* Add the "index" key to whitelisted keys - Add the Persistence capability, then write "index" in the box (without quotes) then save changes, if you've already added a key, you just leave a space in-between.
* Disable compression in your logos/button textures, try to make them tiny in photoshop to save size, I tend to use 150x150px, otherwise your project size skyrockets, you can also use services like [TinyPng](https://tinypng.com), I've had images that weigh *bytes* instead of megabytes that way.
