const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const puppeteer = require('puppeteer');
const minimist = require('minimist');
require('node-zip');

//---------------------------------------------------------------------------------------------------------------------
function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) 
{
	// https://stackoverflow.com/a/40686853
	const sep = path.sep;
	const initDir = path.isAbsolute(targetDir) ? sep : '';
	const baseDir = isRelativeToScript ? __dirname : '.';

	targetDir.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(baseDir, parentDir, childDir);
		try {
			fs.mkdirSync(curDir);
			//console.log(`Directory ${curDir} created!`);
		} catch (err) {
			if (err.code !== 'EEXIST') {
				throw err;
			}
			//console.log(`Directory ${curDir} already exists!`);
		}

		return curDir;
	}, initDir);
}

//---------------------------------------------------------------------------------------------------------------------
async function writeFileAsync(filename, contents)
{
	return new Promise(function(resolve, reject) {
		dir = path.dirname(filename);
		if (!fs.existsSync(dir)) mkDirByPathSync(dir);
		fs.writeFile(filename, contents, "utf8", function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}

//---------------------------------------------------------------------------------------------------------------------
async function fixImageAlpha(image) 
{
	// convert 0xff00ff -> transparent and 0x800080 -> shadow
	await image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, i) 
	{
		var r = this.bitmap.data[i+0];
		var g = this.bitmap.data[i+1];
		var b = this.bitmap.data[i+2];
		var a = this.bitmap.data[i+3];

		if (r == 255 && g == 0 && b == 255)
		{
			// fully transparent
			this.bitmap.data[i+3] = 0;
		}
		else if (r == 127 && g == 0 && b == 127)
		{
			// 50% black shadow
			this.bitmap.data[i+0] = 0;
			this.bitmap.data[i+1] = 0;
			this.bitmap.data[i+2] = 0;
			this.bitmap.data[i+3] = 127;
		}
	});
}

//---------------------------------------------------------------------------------------------------------------------
// http://stackoverflow.com/questions/15408522/rgb-to-xyz-and-lab-colours-conversion
function RGBtoLAB(rgb)
{
	// used for color quantization
    var xyz = RGBtoXYZ(rgb[0], rgb[1], rgb[2]);
    return XYZtoLAB(xyz[0], xyz[1], xyz[2]);
}

//---------------------------------------------------------------------------------------------------------------------
function RGBtoXYZ(R, G, B)
{
	// used for color quantization
    var_R = parseFloat( R / 255 )        //R from 0 to 255
    var_G = parseFloat( G / 255 )        //G from 0 to 255
    var_B = parseFloat( B / 255 )        //B from 0 to 255

    if ( var_R > 0.04045 ) var_R = Math.pow( ( var_R + 0.055 ) / 1.055, 2.4);
    else                   var_R = var_R / 12.92
    if ( var_G > 0.04045 ) var_G = Math.pow( ( var_G + 0.055 ) / 1.055, 2.4);
    else                   var_G = var_G / 12.92
    if ( var_B > 0.04045 ) var_B = Math.pow( ( var_B + 0.055 ) / 1.055, 2.4);
    else                   var_B = var_B / 12.92

    var_R = var_R * 100
    var_G = var_G * 100
    var_B = var_B * 100

    //Observer. = 2°, Illuminant = D65
    X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    return [X, Y, Z]
}

//---------------------------------------------------------------------------------------------------------------------
function XYZtoLAB(x, y, z)
{
	// used for color quantization
    var ref_X =  95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var_X = x / ref_X          //ref_X =  95.047   Observer= 2°, Illuminant= D65
    var_Y = y / ref_Y          //ref_Y = 100.000
    var_Z = z / ref_Z          //ref_Z = 108.883

    if ( var_X > 0.008856 ) var_X = Math.pow(var_X,  ( 1/3 ));
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, ( 1/3 ));
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
    if ( var_Z > 0.008856 ) var_Z = Math.pow(var_Z,  ( 1/3 ));
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

    CIE_L = ( 116 * var_Y ) - 16
    CIE_a = 500 * ( var_X - var_Y )
    CIE_b = 200 * ( var_Y - var_Z )

    return [CIE_L, CIE_a, CIE_b]
}

//---------------------------------------------------------------------------------------------------------------------
async function quantizeImage(image, rect, colors)
{
	// quantize pixels in rect to available colors
	var palLab = [];
	for (var i=0; i<colors.length; i++)
	{
		palLab.push(RGBtoLAB(colors[i]));
	}
	await image.scan(rect.x, rect.y, rect.width, rect.height, function (x, y, i) 
	{
		var r = this.bitmap.data[i+0];
		var g = this.bitmap.data[i+1];
		var b = this.bitmap.data[i+2];
		var rgbLab = RGBtoLAB([r, g, b]);

		var minDist = 0xffffff;
		var minP = 0;
		for (var p=0; p<palLab.length; p++)
		{
			var dist = Math.sqrt(
				(palLab[p][0]-rgbLab[0])*(palLab[p][0]-rgbLab[0]) +
				(palLab[p][1]-rgbLab[1])*(palLab[p][1]-rgbLab[1]) +
				(palLab[p][2]-rgbLab[2])*(palLab[p][2]-rgbLab[2])
			);
			if (dist < minDist)
			{
				minDist = dist;
				minP = p;
			}
		}
		this.bitmap.data[i+0] = colors[minP][0];
		this.bitmap.data[i+1] = colors[minP][1];
		this.bitmap.data[i+2] = colors[minP][2];
	});
}

function autocropImage(image)
{
	//image.crop( x, y, w, h ); 
	var x0 = 10000;
	var x1 = -10000;
	var y0 = 10000;
	var y1 = -10000;

	image.scan(0,0,image.bitmap.width,image.bitmap.height, function (x, y, i) 
	{
		var a = this.bitmap.data[i+3];
		if (a > 1)
		{
			x0 = Math.min(x0, x);
			x1 = Math.max(x1, x);
			y0 = Math.min(y0, y);
			y1 = Math.max(y1, y);
		}
	});

	if (x1 > x0 && y1 > y0)
		image.crop(x0, y0, x1-x0+1, y1-y0+1);
}

//---------------------------------------------------------------------------------------------------------------------
async function finalizeImage(filename, width, height, quantizeRects, wantAutoCrop)
{
	// load and shrink
	const image = await new Promise (resolve => 
	{
		jimp.read(filename, function(err, img) 
		{
			if (err) reject(err);
			// img.resize(width, height, jimp.RESIZE_NEAREST_NEIGHBOR);

			if (wantAutoCrop) 
			{
				autocropImage(img);
			}

			resolve(img);
		});
	});

	// quantize areas if necessary
	for (var i=0; i<quantizeRects.length; i++)
	{
		await quantizeImage(image, quantizeRects[i].rect, quantizeRects[i].colors);
	}

	// convert 0xff00ff -> transparent and 0x800080 -> shadow
	await fixImageAlpha(image);

	// overwrite original file
	await image.write(filename);
}

//---------------------------------------------------------------------------------------------------------------------
function progress(name, i, count)
{
	var si = (i+1).toString();
	while (si.length < 3) si = " " + si;
	var sc = count.toString();
	//while (sc.length < 3) sc = " " + sc;
	return "[" + name +  " " + si + "/" + sc + "]";
}

//---------------------------------------------------------------------------------------------------------------------
function addToZip(dir, dirNameMap, zip)
{
	const filenames = fs.readdirSync(dir);
	
	for (var i=0; i<filenames.length; i++)
	{
		const filename = filenames[i];
		const fullpath = path.join(dir, filename);
		if (fs.statSync(fullpath).isDirectory())
		{
			addToZip(fullpath, dirNameMap, zip);
		}
		else
		{
			var parts = dir.split(path.sep);
			for (var j=0; j<parts.length; j++)
			{
				parts[j] = (parts[j] in dirNameMap) ? dirNameMap[parts[j]] : parts[j];
			}
			var mappedDir = path.join.apply(null, parts);
			zip.folder(mappedDir).file(filename, fs.readFileSync(fullpath));
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------
function makeZip(dir, dirNameMap, outputFilename)
{
	const zip = new JSZip();
	addToZip(dir, dirNameMap, zip);
	var data = zip.generate( {base64:false} );
	fs.writeFileSync(outputFilename, data, 'binary');
}

//---------------------------------------------------------------------------------------------------------------------
function sleep(ms) 
{
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

//---------------------------------------------------------------------------------------------------------------------
async function capture(page, scale, dir, csv)
{
	console.log("Preparing page");

	// begin capture with the input Loc.csv
	const load = await page.evaluate(function(a) {
		return $.capture.load(a);
	}, csv);
	
	if (typeof load.error !== 'undefined') abortWithError(load.error);

	// wait for all image/resource requests for finish loading
	await page.requestsDone();

	const begin = await page.evaluate(function() {
		return $.capture.begin();
	});
	
	if (typeof begin.error !== 'undefined') abortWithError(begin.error);

	const images = begin.images;
	const dataFiles = begin.dataFiles;
	
	console.log("Language: " + begin.lang);
	console.log("Packing " + images.length + " images and " + dataFiles.length + " data files");

	// var elem = await page.$("#BulletinPagesNote");
	// await elem.screenshot({path: path.join(dir, "TEST.png")});

	// write out all data files
	for (var i=0; i<dataFiles.length; i++)
	{
		var dataFile = dataFiles[i];
		console.log(progress("Data   ", i, dataFiles.length) + " " + dataFile.filename);
		await writeFileAsync(path.join(dir, dataFile.filename), dataFile.contents);
	}

	// write out all image files
	for (var i=0; i<images.length; i++)
	{
		const image = images[i];
		//if (image.id != "BulletinPagesNote") continue;
		//if (image.id != "BulletinInnerTouchTut") continue;
		// if (!image.id.startsWith("AccessPermit")) continue;
		
		console.log(progress("Image", i, images.length) + " " + image.filename + " (" + image.w + "x" + image.h + ")" + (image.quantizeRects.length ? " PAL" : "") + (image.baked ? " BAKED" : ""));
		
		const filename = path.join(dir, image.filename);

		if (!fs.existsSync(path.dirname(filename))) mkDirByPathSync(path.dirname(filename));

		// isolate element and capture page
		await page.evaluate(function(imageId) { 
			$.capture.isolate(imageId) 
		}, image.id);

		const options = {
			"path": filename,
			"clip": { "x":0, "y":0, "width":scale*image.w, "height":scale*image.h },
			"omitBackground": true,
			"encoding": "binary"
		}
		
		await page.screenshot(options);

		// Capturing just the element doesn't work correctly, of course
		// var elem = await page.$("#" + image.id);
		// const options = {
		// 	"path": filename,
		// 	"omitBackground": true,
		// 	"encoding": "binary"
		// }
		// await elem.screenshot(options);

		await finalizeImage(filename, image.w, image.h, image.quantizeRects, image.wantAutoCrop);
	}

	return begin.lang;
}

//---------------------------------------------------------------------------------------------------------------------
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

//---------------------------------------------------------------------------------------------------------------------
function showUsage()
{
	console.log("Usage: node packer --csv <input Loc.csv file> --url <loc tool url> --out <output directory>");
	process.exit(1);
}

//---------------------------------------------------------------------------------------------------------------------
function abortWithError(err)
{
	console.error(err);
	process.exit(1);
}

function attachRequestTracker(page)
{
	page.requestCount = 0;
	var requestTracker = {
		request: function() { page.requestCount++; },// console.log(`request (${page.requestCount})`); },
		requestfailed: function() { page.requestCount--; },//console.log(`requestfailed (${page.requestCount})`); },
		requestfinished: function() { page.requestCount--; },//console.log(`requestfinished (${page.requestCount})`); },
	};

	page.on('request', requestTracker.request);
    page.on('requestfailed', requestTracker.requestfailed);
    page.on('requestfinished', requestTracker.requestfinished);

	page.requestsDone = function()
	{
		return new Promise(function(resolve) {
			function f()
			{
				if (page.requestCount == 0) 
					resolve();
				else 
					setTimeout(f, 10);
			}
			f();
		});
	}
}

//---------------------------------------------------------------------------------------------------------------------
// Main
//---------------------------------------------------------------------------------------------------------------------
(async function() 
{
	var timerId = "Finished in";
	console.time(timerId);

	var args = minimist(process.argv.slice(2), {
		"string": [ "csv", "url", "out" ],
		"unknown": function(a) { console.error("Unknown argument: " + a); return false; }
	})
	
	if (args.csv == null || args.url == null || args.out == null) showUsage();
	if (!fs.existsSync(args.csv)) abortWithError("File not found: " + args.csv);

	const url = args.url;

	const instance = await puppeteer.launch();
	const page = await instance.newPage();

	attachRequestTracker(page);

	// page.on('console', message => console.log(message));
	page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
    page.on('pageerror', ({ message }) => console.log(message));
	// page.on('response', response => console.log(`${response.status()} ${response.url()}`));
	page.on('requestfailed', request => console.log(`${request.failure().errorText} ${request.url()}`));

	console.log("Opening page: " + url);
	const status = await page.goto(url);

	console.log("Loading csv from " + args.csv);
	const code = path.parse(args.csv).name
	const dir = path.join(args.out, "__tmp__" + code);
	const csv = fs.readFileSync(args.csv, "utf8");
	
	const lang = await capture(page, 1, dir, csv);
	await instance.close();

	const zipFilename = path.join(args.out, lang + ".zip");

	// remap zip dir entries from tmp dir to lang code
	var dirNameMap = {};
	dirNameMap[dir] = lang;
	
	console.log("Zipping: " + zipFilename);
	makeZip(dir, dirNameMap, zipFilename);
	
	console.timeEnd(timerId);

})();

