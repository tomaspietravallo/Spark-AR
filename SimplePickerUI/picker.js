// const Diagnostics = require('Diagnostics');
const NUI = require('NativeUI');
const Patches = require('Patches');
const Textures = require('Textures');

const Picker = {
  init(assets = []) {
    Promise.all(assets).then((assets) => this.onLoad(assets));
  },
  onLoad(assets) {
    this.icons = assets[0];
    if (this.icons.length <= 0) {
      throw `\nNo icon with the name provided was found. Remember it's case SENSITIVE.\n\nEg:\nicon1, icon2, icon3 are OK.\nIcon1, iCon2, icOn3 are NOT ok`;
    }
    this.setUpPicker().then(() => {
      this.monitorIndex();
    });
  },
  setUpPicker() {
    return new Promise((resolve) => {
      this.icons.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      let iconsArray = [];
      this.icons.forEach((element) => {
        iconsArray.push({ image_texture: element });
      });
      try {
        NUI.picker.configure({ selectedIndex: 0, items: iconsArray });
        NUI.picker.visible = true;
        resolve();
      } catch (error) {
        throw '\nAn error occured:\n\nGo to Project > Edit Properties... > Capabilities > + NativeUI > + Picker\n\nRemember to disable compression on the textures you choose as icons ;)';
      }
    });
  },
  monitorIndex() {
    NUI.picker.selectedIndex
      .monitor({ fireOnInitialValue: true })
      .select('newValue')
      .subscribe((val) => {
        // Please make sure to define a FromScript patch with that name in the patch editor. Select the script > +From Script Variable (scalar) called "index" (case SENSITIVE)
        Patches.inputs.setScalar('index', val);
      });
  },
};

Picker.init([Textures.findUsingPattern('icon*')]);
