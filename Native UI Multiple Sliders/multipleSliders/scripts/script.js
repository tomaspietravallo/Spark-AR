const NUI = require('NativeUI');
const Textures = require('Textures');
const Patches = require('Patches');
const Persistence = require('Persistence');
const Diagnostics = require('Diagnostics');

const Picker = {
  icons: null,
  sliderValue: 0.5,
  defaultSliderValue: 0.5,
  pickerIndex: 0,
  settings: {},
  persistenceKey: 'multipleSliders',

  init(assets = []) {
    Promise.all(assets).then((assets) => this.onLoad(assets));
  },
  onLoad(assets) {
    this.icons = assets[0];
    this.setUpPicker()
      .then(() => {
        return this.persistence();
      })
      .then(() => {
        return this.setUpSlider();
      })
      .then(() => {
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
      NUI.picker.configure({ selectedIndex: 0, items: iconsArray });
      NUI.picker.visible = true;
      resolve();
    });
  },
  setUpSlider() {
    return new Promise((resolve) => {
      if (this.settings[this.pickerIndex]) {
        NUI.slider.value = this.settings[this.pickerIndex];
      } else {
        NUI.slider.value = this.sliderValue;
      }

      NUI.slider.visible = true;
      NUI.slider.value
        .monitor({ fireOnInitialValue: false })
        .select('newValue')
        .subscribe((val) => {
          this.sliderValue = val;
          if (this.settings[this.pickerIndex]) {
            this.settings[this.pickerIndex] +=
              val - this.settings[this.pickerIndex];
          } else {
            this.settings[this.pickerIndex] = val;
          }

          this.pushToPatches();
        });
      resolve();
    });
  },
  monitorIndex() {
    NUI.picker.selectedIndex
      .monitor({ fireOnInitialValue: true })
      .select('newValue')
      .subscribe((index) => {
        if (this.settings.hasOwnProperty(index)) {
          NUI.slider.value = this.settings[index];
        } else {
          NUI.slider.value = this.defaultSliderValue;
        }
        this.pickerIndex = index;
      });
  },
  pushToPatches() {
    for (const key in this.settings) {
      Patches.inputs.setScalar(`setting${key}`, this.settings[key]);
    }
    try {
      Persistence.userScope.set(this.persistenceKey, { v: this.settings });
    } catch (error) {
      Diagnostics.log(
        `The key: "${this.persistenceKey}" is not whitelisted (case sensitive)`
      );
    }
  },
  persistence() {
    return new Promise((resolve) => {
      try {
        Persistence.userScope.get(this.persistenceKey).then((v) => {
          try {
            this.settings = v.v;
            Diagnostics.log(this.settings);
          } catch {
            Diagnostics.log('There were no settings saved');
          }
          this.pushToPatches();
        });
      } catch {
        Diagnostics.log(
          `The key: "${this.persistenceKey}" is not whitelisted (case sensitive)`
        );
      }
      resolve();
    });
  },
};
Picker.init([Textures.findUsingPattern('icon*')]);
