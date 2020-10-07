const Patches = require('Patches');

(async function () {
  // Gets a scalar variable called 'num' 
  const p = await Patches.outputs.getScalar('num');
  // Output a string to a variable called 'txt'
  Patches.inputs.setString('txt', p.toString());
})();
