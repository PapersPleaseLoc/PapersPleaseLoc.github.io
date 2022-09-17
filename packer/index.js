const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const playwright = require('playwright');
const minimist = require('minimist');
require('node-zip');

//---------------------------------------------------------------------------------------------------------------------
function guaranteeDirSync(targetDir)
{
	if (!fs.existsSync(targetDir))
	{
		fs.mkdirSync(targetDir, { recursive: true });
	}
}

//---------------------------------------------------------------------------------------------------------------------
async function writeUtf8FileAsync(filename, contents)
{
	return new Promise(function(resolve, reject) {
		guaranteeDirSync(path.dirname(filename));
		fs.writeFile(filename, contents, "utf8", function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}

//---------------------------------------------------------------------------------------------------------------------
async function writeBinaryFileAsync(filename, contents)
{
	return new Promise(function(resolve, reject) {
		guaranteeDirSync(path.dirname(filename));
		fs.writeFile(filename, contents, 'binary', function(err) {
			if (err) reject(err);
			else resolve();
		});
	});
}

//---------------------------------------------------------------------------------------------------------------------
async function loadBinaryAtUrl(page, url)
{
	// https://github.com/puppeteer/puppeteer/issues/3722
	async function getBinaryAsString() {
		return page.evaluate(url => {
			return new Promise(async resolve => {
				const reader = new FileReader();
				const response = await window.fetch(url).then((response) => {
					return (response.ok) ? response : null;
				});
				if (response != null)
				{
					const data = await response.blob();
					reader.readAsBinaryString(data);
					reader.onload = () => resolve(reader.result);
					reader.onerror = () => reject('Error occurred while reading binary string');
				}
				else
				{
					resolve(null);
				}
			});
		}, url);
	}
    const str = await getBinaryAsString();
    return (str != null) ? Buffer.from(str, 'binary') : null;
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

function scaleRect(rect, scale)
{
	return { x: rect.x*scale, y: rect.y*scale, width: rect.width*scale, height: rect.height*scale };
}

function downscale(image, step)
{
	var downscaledImage = new Jimp(image.bitmap.width/step, image.bitmap.height/step, (err, image) => {
		// this image is 256 x 256, every pixel is set to 0x00000000
	});

	for (var dy=0; dy<downscaledImage.bitmap.height; dy++)	
	{
		for (var dx=0; dx<downscaledImage.bitmap.width; dx++)
		{
			var colorCounts = {};
			var bestColor = 0;
			var bestColorCount = 0;
			for (var sy=dy*step; sy<(dy+1)*step; sy++)
			{
				for (var sx=dx*step; sx<(dx+1)*step; sx++)
				{
					var si = (sy * image.bitmap.width + sx) * 4;
					var r = image.bitmap.data[si+0];
					var g = image.bitmap.data[si+1];
					var b = image.bitmap.data[si+2];
					var a = image.bitmap.data[si+3];
					var p = (r<<24) | (g<<16) | (b<<8) | a;
					if (p in colorCounts) colorCounts[p] += 1;
					else colorCounts[p] = 1;
					if (colorCounts[p] > bestColorCount)
					{
						bestColor = p;
						bestColorCount = colorCounts[p];
					}
				}
			}
			var di = ((dy * downscaledImage.bitmap.width) + dx) * 4;
			downscaledImage.bitmap.data[di+0] = ((bestColor >> 24) & 0xff);
			downscaledImage.bitmap.data[di+1] = ((bestColor >> 16) & 0xff);
			downscaledImage.bitmap.data[di+2] = ((bestColor >>  8) & 0xff);
			downscaledImage.bitmap.data[di+3] = ((bestColor      ) & 0xff);
		}
	}
	return downscaledImage;
}

//---------------------------------------------------------------------------------------------------------------------
async function finalizeImage(filename, width, height, quantizeRects, wantAutoCrop)
{
	// load and shrink
	var image = await new Promise(function(resolve, reject)
	{
		Jimp.read(filename, function(err, img) 
		{
			if (err) reject(err);
			
			if (wantAutoCrop) 
			{
				autocropImage(img);
			}

			if (width != img.bitmap.width || height != img.bitmap.height)
			{
				// img = img.resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR);
			}

			resolve(img);
		});
	});

	// quantize areas if necessary
	for (var i=0; i<quantizeRects.length; i++)
	{
		const scaledRect = scaleRect(quantizeRects[i].rect, image.bitmap.width/width);
		await quantizeImage(image, scaledRect, quantizeRects[i].colors);
	}

	// convert 0xff00ff -> transparent and 0x800080 -> shadow
	await fixImageAlpha(image);

	if (width != image.width || height != image.height)
	{
		image = await downscale(image, image.bitmap.width / width);
	}

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
function addToZip(root, dir, zip)
{
	const filenames = fs.readdirSync(dir);
	
	for (var i=0; i<filenames.length; i++)
	{
		const filename = filenames[i];
		const fullpath = path.join(dir, filename);
		if (fs.statSync(fullpath).isDirectory())
		{
			addToZip(root, fullpath, zip);
		}
		else
		{
			var mappedDir = dir.replace(root, "").replace("\\", "/");
			if (mappedDir.startsWith("/")) mappedDir = mappedDir.substr(1);
			zip.folder(mappedDir).file(filename, fs.readFileSync(fullpath));
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------
function makeZip(dir, outputFilename)
{
	const zip = new JSZip();
	addToZip(dir, dir, zip);
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
async function capture(page, scale, makeFonts, dir, csv)
{
	console.log("Preparing page");

	// begin capture with the input Loc.csv
	const load = await page.evaluate(function(a) {
		return $.capture.load(a);
	}, csv);
	
	if (typeof load.error !== 'undefined') abortWithError(load.error);

	// wait for all image/resource requests for finish loading
	await page.context().requestsDone();

	const begin = await page.evaluate(await function(args) {
		return $.capture.begin(args.scale, args.makeFonts);
	}, {scale:scale, makeFonts:makeFonts});
	
	if (typeof begin.error !== 'undefined') abortWithError(begin.error);

	const images = begin.images;
	const dataFiles = begin.dataFiles;
	
	console.log("Language: " + begin.lang);
	console.log("Packing " + images.length + " images and " + dataFiles.length + " data files");

	// write out all data files
	for (var i=0; i<dataFiles.length; i++)
	{
		var dataFile = dataFiles[i];
		console.log(progress("Data   ", i, dataFiles.length) + " " + dataFile.filename);
		if (dataFile.dataType == "url")
		{
			var data = await loadBinaryAtUrl(page, dataFile.contents);
			if (data != null)
				await writeBinaryFileAsync(path.join(dir, dataFile.filename), data);
		}
		else if (dataFile.dataType == "dataURL")
		{
			const buffer = Buffer.from(dataFile.contents.split(",")[1], 'base64');
			await writeBinaryFileAsync(path.join(dir, dataFile.filename), buffer);
		}
		else
		{
			await writeUtf8FileAsync(path.join(dir, dataFile.filename), dataFile.contents);
		}
	}

	// write out all image files
	for (var i=0; i<images.length; i++)
	{
		const image = images[i];
		// if (image.id != "ApartmentClass") continue;
		//if (image.id != "BulletinPagesNote") continue;
		//if (image.id != "BulletinInnerTouchTut") continue;
		// if (image.id != "ApartmentClass" && !image.id.startsWith("AccessPermit")) continue;
		
		console.log(progress("Image", i, images.length) + " " + image.filename + " (" + image.w + "x" + image.h + ")" + (image.quantizeRects.length ? " PAL" : "") + (image.baked ? " BAKED" : ""));
		
		const filename = path.join(dir, image.filename);
		guaranteeDirSync(path.dirname(filename));

		// isolate element and capture page
		await page.evaluate(function(imageId) { 
			$.capture.isolate(imageId) 
		}, image.id);

		const options = {
			"path": filename,
			"clip": { "x":0, "y":0, "width":scale*image.w, "height":scale*image.h },
			"omitBackground": true,
		}
		
		await page.screenshot(options);

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

function attachRequestTracker(context)
{
	context.requestCount = 0;
	var requestTracker = {
		request: function() { context.requestCount++; },// console.log(`request (${page.requestCount})`); },
		requestfailed: function() { context.requestCount--; },//console.log(`requestfailed (${page.requestCount})`); },
		requestfinished: function() { context.requestCount--; },//console.log(`requestfinished (${page.requestCount})`); },
	};

	context.on('request', requestTracker.request);
    context.on('requestfailed', requestTracker.requestfailed);
    context.on('requestfinished', requestTracker.requestfinished);

	context.requestsDone = function()
	{
		return new Promise(function(resolve) {
			function f()
			{
				if (context.requestCount == 0) 
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
		string: [ "csv", "url", "out" ],
		boolean: [ "makeFonts" ],
		unknown: function(a) { console.error("Unknown argument: " + a); return false; }
	})
	
	if (args.csv == null || args.url == null || args.out == null) showUsage();
	if (!fs.existsSync(args.csv)) abortWithError("File not found: " + args.csv);

	const url = args.url;

	const browser = await playwright.webkit.launch();
	const context = await browser.newContext();

	context.on('requestfailed', request => {
        console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
    });
	context.on("pageerror", err => {
        console.log(`Page error: ${err.toString()}`);
    });

	attachRequestTracker(context);

	const page = await context.newPage();

	page.on('console', message => {
		const messageText = message.text();
		const messageType = message.type().substring(0, 3).toUpperCase();
		const messageUrl = message.location() ? message.location().url : "";

		if (message.type() == "error" && messageText.includes("404") && messageUrl.includes("/baked/"))
		{
			// ignore 404 errors on baked images
		}
		else if (messageUrl.length > 0)
		{
			console.log(`${messageType} ${messageText} (${messageUrl})`);
		}
		else
		{
			console.log(`${messageType} ${messageText}`);
		}
	});

	console.log("Opening page: " + url);
	const status = await page.goto(url);

	console.log("Loading csv from " + args.csv);
	const code = path.parse(args.csv).name
	
	const dir = path.join(args.out, "__tmp__" + code);
	if (fs.existsSync(dir))
	{
		fs.rmSync(dir, { recursive: true, force: true });
	}

	const csv = fs.readFileSync(args.csv, "utf8");
	
	const lang = await capture(page, 1, args.makeFonts, dir, csv);
	await browser.close();

	const zipFilename = path.join(args.out, lang + ".zip");
	console.log("Zipping: " + zipFilename);
	makeZip(dir, zipFilename);
	
	console.timeEnd(timerId);

})();
