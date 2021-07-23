if (Number(process.version.slice(1).split('.')[0]) < 12) throw new Error('Node 12.0.0 or higher is required. Update Node on your system.');
import fs from 'fs';

// Base array
const myOutfits = [];

// The path where the models are
const path = './outfits/';

// Put what you want here, I only need a label
const textureStuff = {
	label: '.',
};

const output = 'output.json';

new Promise((resolve) => {
	// If has a dot in name, does not include.
	const baseFolder = fs.readdirSync(path).filter(file => !file.includes('.'));
	for (const [i, folder] of baseFolder.entries()) {
		console.log(i, folder, ':: Model');
		myOutfits.push([]);

		// Textures of the actual (i) outfit
		const textureFiles = fs.readdirSync(`${path + folder}`).filter(file => file.endsWith('.ytd'));
		for (const [j, file] of textureFiles.entries()) {
			console.log('	', j, file, '--> Texture');
			myOutfits[i].push(textureStuff);
		}
	}

	resolve(JSON.stringify({ ...myOutfits }));
}).then(
	// Log the outpu
	console.log('\nOutput -->', Object.assign({}, myOutfits)),
).catch(
	err => {
		console.log(err);
	},
).finally(
	fs.writeFileSync(output, JSON.stringify({ ...myOutfits })),
	console.log('[DONE] The file is now available in ./' + output),
);