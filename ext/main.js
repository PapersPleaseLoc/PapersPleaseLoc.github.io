$(document).ready(function()
{
var locVersion = 1;

function getContextElem(elem)
{
	var p = elem.parents('.context');
	return p;
}

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

var _ignoreLocalSaveLoad = null;
function ignoreLocalSaveLoad()
{
	// ignore local save/load during autocap to speed things up
	if (_ignoreLocalSaveLoad == null)
	{
		_ignoreLocalSaveLoad = getUrlVar("autocap") != "" || getUrlVar("nolocalsave") == "true";
	}
	return _ignoreLocalSaveLoad;
}

function quote(str)
{
	return "\"" + str.replace(/"/g, "\"\"") + "\"";
}

function isLocalHost()
{
	return (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "");
}

function download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	pom.click();
}

function getLanguageCode()
{
	return $.trim($("#text\\:language_code .t").html());
}

function notify(message, instant)
{
	if (instant == true)
		$("#notification").text(message).show();
	else
		$("#notification").text(message).fadeIn().delay(3000).fadeOut();
}

function setTextboxText(text)
{
	$("#textbox").val(text);
}

function getFontInfo() 
{
	fontInfo = {};
	fontInfo.faces = {};
	fontInfo.classes = [];

	for (var i=0; i<document.styleSheets.length; i++)
	{
		var styleSheet = document.styleSheets[i];
		var rules = styleSheet.rules || styleSheet.cssRules || [];
		for (var j=0; j<rules.length; j++)
		{
			var rule = rules[j];
			if (rule instanceof CSSFontFaceRule)
			{
				//console.log(rule.style.getPropertyValue("font-family"));
				fontInfo.faces[rule.style.getPropertyValue("font-family")] = rule;
			}
			else if (rule.selectorText.indexOf(".font") == 0 && rule.selectorText.indexOf(" ") < 0)
			{
				fontInfo.classes.push(rule.selectorText);
				//console.log(rule.selectorText);
			}
		}
	}

	return fontInfo;
}


function fixFonts() 
{
	//var fontInfo = getFontInfo();
	$('.context:not(.capture) .t').each(function() 
	{
		var fontFamily = $(this).css("font-family");
		$(this).css("font-family", "\'" + fontFamily + "\', \'fallback\'");
	});
}

function moveHelpSections()
{
	$(".help").each(function()
	{
		var id = $(this).attr("id");
		if (id == null) return;
		var sectionId = $(this).attr("id").split(":")[1];
		//console.log(sectionId);
		$(this).insertBefore($("." + sectionId));
	});
}

function makeEnKey(str)
{
	//str = str.toLowerCase();
	str = str.replace(/(?:\\n)|(?:<[^>]*>)|(?:&[^;]*;)/gi, "");
	str = str.replace(/[^A-Za-z0-9@]/gi, "");
	//console.log(str);
	//return str;
	return crc32(str);
}

function getDictKeys(dict)
{
	var keys = [];
	for (var key in dict) 
	{
		if (dict.hasOwnProperty(key))
			keys.push(key);
	}
	return keys;
}

function getUsedChars()
{
	var def = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¿«»ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿАаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯяÇĞİÖŞÜçğöşüĄĆĘŁŃÓŚŹŻąćęłńóśźżАаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя";
	var usedCharsDict = {};

	for (var c=0; c<def.length; c++)
		usedCharsDict[def[c]] = true;

	var textElems = getTextElems();
	for (var i=0; i<textElems.length; i++)
	{
		var textElem = textElems[i];
		if (textElem.contextElem.hasClass("capture")) continue;

		for (var j=0; j<textElem.text.length; j++)
		{
			var c = textElem.text.charAt(j);
			usedCharsDict[c] = true;
		}
	}

	if ("\n" in usedCharsDict) delete usedCharsDict["\n"];

	var usedChars = getDictKeys(usedCharsDict).sort().join("");
	//console.log(usedChars);

	return usedChars;
}

//-----------------------------------------------------------------------------------------------------------
// Crc32
//-----------------------------------------------------------------------------------------------------------

var makeCRCTable = function(){
	var c;
	var crcTable = [];
	for(var n =0; n < 256; n++){
		c = n;
		for(var k =0; k < 8; k++){
			c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
		}
		crcTable[n] = c;
	}
	return crcTable;
}

var crc32 = function(str) {
	var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
	var crc = 0 ^ (-1);

	for (var i = 0; i < str.length; i++ ) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
	}

	return (crc ^ (-1)) >>> 0;
};

//-----------------------------------------------------------------------------------------------------------
// Csv
//-----------------------------------------------------------------------------------------------------------

function leftPad(i)
{
	return (("" + i).length < 2 ? "0" : "") + i;
}

async function exportCsv()
{
	var csv = exportCsvStr();
	var now = new Date();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var dateStr = now.getFullYear() + leftPad(month) + leftPad(day) + "-";
	dateStr += leftPad(now.getHours()) + leftPad(now.getMinutes()) + leftPad(now.getSeconds());

	if (isLocalHost())
	{
		// use local file API
		const saveFileOptions = {
			suggestedName: getLanguageCode() + ".csv",
			types: [{
				description: 'CSV file',
				accept: {'text/plain': ['.csv']},
			}]
		};

		var fileHandle = await window.showSaveFilePicker(saveFileOptions);
		const writable = await fileHandle.createWritable();
		await writable.write(csv);
		await writable.close();
	}
	else
	{
		// download file
		download("PapersPleaseLoc-" + getLanguageCode() + "-" + dateStr + ".csv", csv);
		//download("UsedChars.txt", getUsedChars());
	}
}

function exportCsvStr()
{
	var csv = '"CONTEXT (DO NOT MODIFY)","ENGLISH (DO NOT MODIFY)","LOCALIZED (EDIT THIS COLUMN)"\n';
	var textElems = getTextElems();
	for (var i=0; i<textElems.length; i++)
	{
		var textElem = textElems[i];
		var val = textElem.text;
		
		// for testing text changes in English
		//if (document.URL.indexOf("local") >= 0) 
		// if (val.indexOf("@") == 0) val = "@^" + val.substr(1);
		// else if (val == "en") { val = "en2"; }
		// else if (val == "S O R R Y") {}
		// else if (val.indexOf(".png") >= 0) {}
		// else if (val.indexOf("[NOTICE]") == 0) val = "[NOTICE]^" + val.substr("[NOTICE]".length);
		// else val = "^" + val;
		//}

		csv += quote(textElem.contextId) + "," + quote(textElem.text_en) + "," + quote(val) + "\n";
	}

	return csv;
}

function importCsvSync(str)
{
	var rows = str.csvToArray({ rSep:'\n', cSep: ',', trim:true });
	if (rows == null)
	{
		return { "error": "Invalid CSV file" };
	}

	var textElems = getTextElems(true);
	var textElemsDict = {};

	for (var t=0; t<textElems.length; t++)
	{
		var textElem = textElems[t];
		textElem.setFromCsv = false;
		var key = textElem.contextId + "//" + textElem.enKey;
		if (key in textElemsDict)
			textElemsDict[key].push(textElem);
		else
			textElemsDict[key] = [textElem];
	}

	var numRowsImported = 0;
	for (var i=0; i<rows.length; i++)
	{
		var row = rows[i];
		var rowEnKey = makeEnKey(row[1]);
		var key = row[0] + "//" + rowEnKey;
		if (key in textElemsDict)
		{
			matchingTextElems = textElemsDict[key];
			for (var t=0; t<matchingTextElems.length; t++)
			{
				var textElem = matchingTextElems[t];
				numRowsImported++;
				textElem.set(row[2]);
				textElem.setFromCsv = true;
			}
		}
	}

	// reset anything not in csv
	for (var t=0; t<textElems.length; t++)
	{
		if (!textElems[t].setFromCsv) textElems[t].set(textElems[t].text_en);
	}        

	//notify("Imported " + numRowsImported + " rows");

	isolateElems();
	selectedTextElem = null;
	$("#original_en").html("");
	setTextboxText("");
	validateTextElems(textElems);
	updateVarious();

	//if (doneFunc != null) doneFunc();
	return { "message": "Imported " + numRowsImported + " rows" };
}

function importCsv(str, doneFunc)
{
	notify("Importing...", true);
	window.setTimeout(function() 
	{
		var result = importCsvSync(str);
		if (result.error != null) notify(result.error);
		else if (result.message != null) notify(result.message);
		if (doneFunc != null) doneFunc();
	}, 1);
}

function findFirstTextElem(textElems, contextId)
{
	for (var t=0; t<textElems.length; t++)
	{
		if (textElems[t].contextId == contextId) return textElems[t];
	}
	return null;
}

function validateTextElems(textElems)
{
	errorMessages = [];
	try {
		if (findFirstTextElem(textElems, "text:env_typochars").text.indexOf(",") < 0)
		{
			errorMessages.push("Invalid env_typochars: Must have more than one character set.");
		}
	} catch (e)
	{
		console.log(e);
	}

	// make sure special elements are represented in the localization
	var regexes = [
		{ desc:"variable", regex:/(\$[\w-]+)/g }, // $ variables
		{ desc:"brackets", regex:/(\[[^\] ]+\])/g } // [*]
	];

	for (var r=0; r<regexes.length; r++)
	{
		var regex = regexes[r].regex;
		for (var t=0; t<textElems.length; t++)
		{
			var textElem = textElems[t];
			var matches = textElem.text_en.match(regex);
			if (matches == null) continue;
			for (var m=0; m<matches.length; m++)
			{
				if (textElem.text.indexOf(matches[m]) < 0)
					errorMessages.push(textElem.contextId + " \"" + textElem.text.substr(0,10) + "...\" is missing required " + regexes[r].desc + " usage: " + matches[m]);
			}
		}
	}

	// make sure inspector speech @ is preserved
	for (var t=0; t<textElems.length; t++)
	{
		var textElem = textElems[t];
		if (textElem.text_en.indexOf("@") == 0 && textElem.text.indexOf("@") != 0)
			errorMessages.push(textElem.contextId + " \"" + textElem.text.substr(0,10) + "...\" is missing leading '@'");
		if (textElem.text_en.indexOf("@") != 0 && textElem.text.indexOf("@") == 0)
			errorMessages.push(textElem.contextId + " \"" + textElem.text.substr(0,10) + "...\" has incorrect leading '@'");
	}

	// check endless_wrongcode
	var endlessWrongCodeTextElem = findFirstTextElem(textElems, "text:endless_wrongcode");
	if (endlessWrongCodeTextElem != null)
	{
		var match = endlessWrongCodeTextElem.text.match(/^[A-Z] [A-Z] [A-Z] [A-Z] [A-Z]$/);
		if (match == null)
			errorMessages.push("Invalid endless_wrongcode: \"" + endlessWrongCodeTextElem.text + "\"");
	}

	if (errorMessages.length == 0)
	{
		return true;
	}
	else {
		setTextboxText("!!! ERROR !!!\n\n" + errorMessages.join("\n\n"));
		return false;
	}
}

$('#file-open-button').on('change', function(e)
{
	var file = e.target.files[0];
	if (file == null) 
	{
		notify("File not loaded");
	}

	var reader = new FileReader();
	reader.onload = function(e) {
		importCsv(e.target.result);
	};
	reader.onerror = function(e) {
		notify("Failed to load file: " + e.target.error);
	}
	reader.readAsText(file);

	$(this).val(null);
});

async function loadCsvFromLocal()
{
	// use local file API
	const openFileOptions = {
		types: [{
			description: 'CSV file',
			accept: {'text/plain': ['.csv']},
		}]
	};
	let fileHandle;
	[fileHandle] = await window.showOpenFilePicker(openFileOptions);
	const file = await fileHandle.getFile();
	const contents = await file.text();
	importCsv(contents);
}

$('#import-csv').click(function(e)
{
	e.stopImmediatePropagation();
	e.preventDefault();

	if (isLocalHost())
	{
		loadCsvFromLocal();
	}
	else
	{
		$("#file-open-button").click();
	}
	return false;
});

// $("#show-non-vita-button").click(function(e)
// {
// 	e.stopImmediatePropagation();
// 	e.preventDefault();
// 	$("#show-non-vita-button").hide();//css("display", "none");
// 	$(".non-vita").show();//
	
// 	return false;
// });

//-----------------------------------------------------------------------------------------------------------
// TextElem
//-----------------------------------------------------------------------------------------------------------
function TextElem(elem, contextElem)
{
	if (contextElem != undefined)
		this.contextElem = contextElem;
	else
		this.contextElem = getContextElem(elem);

	this.contextId = this.contextElem.attr('id');
	this.elem = elem;
	this.text = $.trim(elem.html());
	this.text_en = elem.data("en");
	this.enKey = makeEnKey(this.text_en);
}

TextElem.prototype.set = function(str)
{
	str = $.trim(str);
	if (str == "" || str == undefined) str = this.text_en;
	this.text = str;
	this.elem.html(str);
	this.saveLocal();
}

TextElem.prototype.saveId = function()
{
	return crc32(this.contextId + "//" + this.text_en).toString();
}

var __storageCache = {};

TextElem.prototype.getStored = function()
{
	var sid = this.saveId();
	if (sid in __storageCache) return __storageCache[sid];
	var val = $.jStorage.get(sid, this.text_en);
	__storageCache[sid] = val;
	return val;
}

TextElem.prototype.setStored = function(val)
{
	var sid = this.saveId();
	if (!(sid in __storageCache) || __storageCache[sid] != val)
	{
		__storageCache[sid] = val;
		$.jStorage.set(sid, val);
	}
}

TextElem.prototype.saveLocal = function()
{
	if (ignoreLocalSaveLoad()) return;
	this.setStored(this.text);
}

TextElem.prototype.loadLocal = function()
{
	if (ignoreLocalSaveLoad()) return;
	this.text = this.getStored();
	if (this.text == null) this.text = this.text_en;
	this.elem.html(this.text);
}

function getTextElems(includeDuplicates)
{
	var textElems = [];

	$(".context").each(function()
	{
		var contextElem = $(this);
		var texts = {};
		$(".t", this).each(function()
		{
			var text = $.trim($(this).data("en"));
			if (text.length != 0 && (includeDuplicates || !(text in texts)))
			{
				if (!includeDuplicates) texts[text] = true;
				//str += contextId + ", " + quote(text) + ", " + quote(text) + "\n";
				textElems.push(new TextElem($(this), contextElem));
			}
		})
	})

	return textElems;
}

function prepareTextElems()
{
	$(".t").each(function()
	{
		$(this).data("en", $.trim($(this).html()));
		var textElem = new TextElem($(this));
		textElem.loadLocal();
	});
	$('.t').click(onClickTextElem);
}

var selectedTextElems = null;

//-----------------------------------------------------------------------------------------------------------
// Customizable Images
//-----------------------------------------------------------------------------------------------------------
function prepareCustomizableImages()
{
	$(".customizableimagesource").each(function() {
		$(this).addClass("context");
		var src = $(this).find(".custom_img_src").first();
		var id = "image:" + src.html().replace(/^.*?\//ig, "");
		//console.log(id);
		$(this).attr("id", id);
	});

	$(".custom_img_src").each(function() {
		var src = $.trim($(this).html());
		var pointerClass = "custom_img_src__" + src.replace(/[.\/]*/ig, "_");
		$(this).data("pointerClass", pointerClass);
		$('img[src$="'+src+'"]').each(function() {
			$(this).addClass(pointerClass);
		});
	});
}

function updateCustomizableImages()
{
	$(".custom_img_src").each(function() {
		var src = $.trim($(this).html());
		var pointerClass = $(this).data("pointerClass");
		$("." + pointerClass).each(function() {
			$(this).attr("src", src);
		});
	});
}

//-----------------------------------------------------------------------------------------------------------
// Baked captures
//-----------------------------------------------------------------------------------------------------------
function getBakedCapturesRootUrl()
{
	var overrideElem = $("#baked-captures-url .t");
	if (!overrideElem.length) return null;

	var bakedUrlRoot = $.trim(overrideElem.html());
	if (bakedUrlRoot == "NONE") return null;

	if (!bakedUrlRoot.endsWith("/")) bakedUrlRoot += "/";
	return bakedUrlRoot;
}


function applyBakedCaptures()
{
	// undo any previously baked
	$(".capture.baked").remove();
	$(".baked-notice").remove();
	$(".baked-usurped").each(function() {
		var captureElem = $(this);
		captureElem.removeClass("baked-usurped");
		captureElem.addClass("capture");
		captureElem.show();
	});

	// get baked-captures-url
	var bakedUrlRoot = getBakedCapturesRootUrl();
	if (bakedUrlRoot != null)
	{
		// apply - NOTE this checks all image urls and takes time. Wait for $.active == 0
		$(".dir").each(function()
		{
			var dir = $(this).data("dir") + "/";
			if (dir == "./") dir = "";
			$(".capture", $(this)).each(function() {
				var captureElem = $(this);
				var captureId = captureElem.attr("id");
				var imageUrl = bakedUrlRoot + dir + captureId + ".png";
				$.get(imageUrl).done(function() 
				{
					captureElem.removeClass("capture");
					captureElem.addClass("baked-usurped");
					captureElem.hide();
					captureElem.after(
						"<div class='baked-notice'>" + imageUrl + "</div>" +
						"<img class='capture baked' id='" + captureId + "' src=\'" + imageUrl + "' style='display:block'>"
					);
				}).fail(function() {
				});
			})
		});
	}
}

var bakedDataFiles = {};
function loadBakedDataFiles()
{
	bakedDataFiles = {};

	var bakedUrlRoot = getBakedCapturesRootUrl();
	if (bakedUrlRoot != null)
	{
		var fontsXmlUrl = bakedUrlRoot + "data/Fonts.xml";
		$.get(fontsXmlUrl, function(data) 
		{
			//Fonts.xml
			bakedDataFiles["data/Fonts.xml"] = { contents: data };
			const doc = new DOMParser().parseFromString(data, "application/xml");
			doc.querySelectorAll('font').forEach(function(node) {
				var fontFile = node.getAttribute("file");
				var fontFntPath = "fonts/" + fontFile + ".fnt";
				var fontPngPath = "fonts/" + fontFile + ".png";
				bakedDataFiles[fontFntPath] = { dataType:"url", contents:bakedUrlRoot + fontFntPath };
				bakedDataFiles[fontPngPath] = { dataType:"url", contents:bakedUrlRoot + fontPngPath };
			});
		}, "text");
	}
}

//-----------------------------------------------------------------------------------------------------------
// Zoom
//-----------------------------------------------------------------------------------------------------------
var zoom = 1;
function zoomIn(zoom_)
{
	zoom_ = (typeof zoom_ === 'undefined') ? 2 : zoom_;

	var scrollTop = $("body").scrollTop();

	zoom = zoom_;
	
	$('body').css("zoom", (zoom).toString());
	$('.uibase').css("zoom", (1.0/zoom).toString());
	$('#zoom-in').hide();
	$('#zoom-out').show();
	$("body").scrollTop(scrollTop*zoom);
}

function zoomOut()
{
	var scrollTop = $("body").scrollTop();

	$('body').css("zoom", "1");
	$('.uibase').css("zoom", "1");
	$('#zoom-in').show();
	$('#zoom-out').hide();

	$("body").scrollTop(scrollTop/zoom);

	zoom = 1;
}

//-----------------------------------------------------------------------------------------------------------
var entityMap = 
{
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	//'"': '&quot;',
	//"'": '&#39;',
	//"/": '&#x2F;'
};

function escapeHtml(string) 
{
	//return String(string).replace(/[&<>"'\/]/g, function (s) {
	return String(string).replace(/[&<>]/g, function (s) {
		return entityMap[s];
	});
}

function updateVarious()
{
	updateBulletins();
	updateCustomizableImages();
	updateStyleTweaks();
	updateFontOverride();
	applyBakedCaptures();
}

var fontStylesheetLink = null;
function updateFontOverride()
{
	var overrideElem = $(".font-override .t");
	if (!overrideElem.length) return;

	var url = $.trim(overrideElem.html());

	if (fontStylesheetLink == null) fontStylesheetLink = $('link[href="css/fonts.css"]');
	if (fontStylesheetLink.attr('href') != url)
		fontStylesheetLink.attr('href', url);
}

function updateStyleTweaks()
{
	$(".styletweak").each(function() {
		var sel = $(this).data("selector");
		var style = $(this).data("style");
		var val = $(this).children(".t").first().html();
		$(sel).css(style, val);
	});
}

function updateBulletins()
{
	$(".bulletins :has('.left')").each(function() {
		var left = $(this).children('.left');
		var right = $(this).next().children('.right');

		var bulletinType = (left.text().indexOf("[NOTICE]") >= 0) ? "bulletin_notice" : "bulletin_default";

		var def = $("#text\\:" + bulletinType + " .t").html().trim();
		var ba = def.split("$content");

		var textL = left.html();
		var textR = right.html();

		var hasBefore = left;
		var hasAfter = right;

		if (textR.length == 0)
		{
			hasAfter = left;
		}
		else if (textL.length == 0)
		{
			return;
		}

		hasBefore.attr("data-before", ba[0]);
		hasAfter.attr("data-after", ba[1]);
	});

	$(".ui .language-code-button").html(getLanguageCode());
}

//-----------------------------------------------------------------------------------------------------------
// Terms
//-----------------------------------------------------------------------------------------------------------
var terms = [];

function Term(line)
{
	this.id = line;
	this.regexes = line.split("/").map(function(s) { 
		s = $.trim(s);
		s = s.split(" ").join("((\\s*)|(<[^>]*>))");
		return new RegExp(s, "i"); 
	});
}

Term.prototype.existsIn = function(str)
{
	for (var i=0; i<this.regexes.length; i++)
	{
		if (this.regexes[i].test(str))
			return true;
	}
	return false;
}

$.ajax({
	url : "terms.txt",
	dataType: "text",
	success : function(data) 
	{
		terms = data.split("\n").filter(function(line) { return $.trim(line).length != 0 && line.indexOf(";") != 0; }).map(function(line) { return new Term(line); });
	}
});

//-----------------------------------------------------------------------------------------------------------
// Gendering
//-----------------------------------------------------------------------------------------------------------
function k_combinations(set, k) {
	// https://gist.github.com/axelpale/3118596
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}
	
	if (k == set.length) {
		return [set];
	}
	
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	// Assert {1 < k < set.length}
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function makeGenderedMessage(message, members)
{
	// manually duplicated from haxe game code
	var memberNames = members.map(function(m) { return m.messageName; });

	// apply individual genders
	for (var i=0; i<members.length; i++)
	{
		message = message.replace(new RegExp('\\$' + i, "ig"), members[i].name);
		message = message.replace(new RegExp('\\[m' + i + '\\](.*?)\\[/m' + i + '\\]', "ig"), members[i].male ? "$1" : "");
		message = message.replace(new RegExp('\\[f' + i + '\\](.*?)\\[/f' + i + '\\]', "ig"), !members[i].male ? "$1" : "");
	}

	// apply group gender
	var allM = true; var allF = true;
	for (var i=0; i<members.length; i++)
	{
		if (members[i].male) allF = false;
		if (!members[i].male) allM = false;
	}
	message = message.replace(new RegExp('\\[m](.*?)\\[/m]', "ig"), allM ? "$1" : "");
	message = message.replace(new RegExp('\\[f](.*?)\\[/f]', "ig"), allF ? "$1" : "");
	message = message.replace(new RegExp('\\[x](.*?)\\[/x]', "ig"), (!allM && !allF) ? "$1" : "");

	return message;
}

function showGenderingPreview(show)
{
	if (show) 
	{
		$(".genderpopup").show();
	}
	else 
	{
		$(".genderpopup").hide();
		showGenderingHelp(false);
	}
}

function showGenderingHelp(show)
{
	if (show)
	{
		$(".genderpopup .explanation").show();
		$(".genderpopup").height("34em");
	}
	else
	{
		$(".genderpopup .explanation").hide();
		$(".genderpopup").height("15em");
	}
}
function toggleGenderingHelp()
{
	showGenderingHelp(!$(".genderpopup .explanation").is(':visible'));
}

function updateGenderingPreview(textElem)
{
	// show gendering results (this is the same priority as the game)
	var familyMembers = [ 
		{ name:$("#text\\:family_son_message .t").html(), male:true },
		{ name:$("#text\\:family_wife_message .t").html(), male:false },
		{ name:$("#text\\:family_niece_message .t").html(), male:false },
		{ name:$("#text\\:family_uncle_message .t").html(), male:true },
		{ name:$("#text\\:family_mil_message .t").html(), male:false }
	];

	var numMembers = 0;
	if (textElem.text_en.indexOf("$5") >= 0) numMembers = 6;
	else if (textElem.text_en.indexOf("$4") >= 0) numMembers = 5;
	else if (textElem.text_en.indexOf("$3") >= 0) numMembers = 4;
	else if (textElem.text_en.indexOf("$2") >= 0) numMembers = 3;
	else if (textElem.text_en.indexOf("$1") >= 0) numMembers = 2;
	else if (textElem.text_en.indexOf("$0") >= 0) numMembers = 1;

	var previewLines = [];
	var combinations = k_combinations(familyMembers, numMembers);
	//console.log(combinations);
	for (var i=0; i<combinations.length; i++)
	{
		previewLines.push(makeGenderedMessage(textElem.text, combinations[i]));
	}

	$("#genderpreview").html(previewLines.join("<br>"));
}

//-----------------------------------------------------------------------------------------------------------
// Events
//-----------------------------------------------------------------------------------------------------------
$('#show-localizable').click(function(e)
{
	$('.t').addClass('highlight');
	window.setTimeout(function(){ $('.t').removeClass('highlight'); }, 1000);
	e.preventDefault(); return false;
});

$('#show-unlocalized').click(function(e)
{
	var elemsToIsolate = [];
	$('.t').each(function() {
		if ($(this).html() == $(this).data('en'))
		{
			elemsToIsolate.push($(this));
		}
	})
	isolateElems(elemsToIsolate, $(this));
	//$('.t').addClass('highlight');
	//window.setTimeout(function(){ $('.t').removeClass('highlight'); }, 1000);
	e.preventDefault(); return false;
});

function fixGenderSwitches(str)
{
	if (str == null) return null;
	str = str.replace(/<m>/ig, "[m]");
	str = str.replace(/<\/m>/ig, "[/m]");
	str = str.replace(/<f>/ig, "[f]");
	str = str.replace(/<\/f>/ig, "[/f]");
	return str;
}

$("#export-csv").click(function(e)
{
	exportCsv();
});

$('#textbox').bind('input propertychange', function() 
{
	if (selectedTextElems == null)
		return;

	for (var i=0; i<selectedTextElems.length; i++)
		selectedTextElems[i].set($('#textbox').val());

	updateGenderingPreview(selectedTextElems[0]);
	updateVarious();

	//console.log(selectedTextElems);
	//validateTextElems(selectedTextElems);
});

$("#reset-all").click(function()
{
	if (confirm("Reset all text to English? This can't be undone."))
	{
		isolateElems();
		var textElems = getTextElems();
		for (var i=0; i<textElems.length; i++)
		{
			textElems[i].set(textElems[i].text_en);
		}
		$(".ui .language-code-button").html(getLanguageCode());
	}
});

function isolateElems(elems, button)
{
	var buttonIsSelected = button != null && button.hasClass("term-selected");
	$("*").removeClass("term-selected");

	if (elems == null || buttonIsSelected)  
	{  
		$(".t, .marktxt").css("opacity", "1");
		$(".help, .context, .styletweak, .inlinehelp, .customizableimagesource").show();
	}
	else
	{
		$(".t, .marktxt").css("opacity", "0.25");
		$(".help, .context, .styletweak, .inlinehelp, .customizableimagesource").hide();

		for (var e=0; e<elems.length; e++)
		{
			var p = elems[e];
			while (true)
			{
				p.show();
				p.css("opacity", "1");
				if (p.hasClass("context")) break;
				p = p.parent();
			}
		}

		button.addClass("term-selected");
	}
}

function onClickTerm()
{
	if ($(this).hasClass("term-selected"))
	{
		isolateElems(null, $(this));
	}
	else
	{
		elemsToIsolate = [];
		var term = $(this).data("term");
		$(".t").each(function() {
			if (term.existsIn($(this).data("en")))
			{
				elemsToIsolate.push($(this));
			}
		});
		isolateElems(elemsToIsolate, $(this));
		$(this).addClass("term-selected");
	}
}

function onClickTextElem(e)
{
	var selectedTextElem = new TextElem($(this));

	selectedTextElems = [selectedTextElem];
	selectedTextElem.contextElem.find(".t").each(function(){
		if ($(this).data("en") == selectedTextElem.text_en && $(this)[0] != selectedTextElem.elem[0])
			selectedTextElems.push(new TextElem($(this)));
	});

	if ($(this).hasClass("gendered"))
	{
		showGenderingPreview(true);
		updateGenderingPreview(selectedTextElem);
	}
	else
	{
		showGenderingPreview(false);
	}

	$("#original_en").html(escapeHtml(selectedTextElem.text_en));
	$(".ui textarea").val(selectedTextElem.text);

	$(".ui .term").not(".term-selected").remove();

	var hasTerm = false;
	for (var i=0; i<terms.length; i++)
	{
		var term = terms[i];
		if (term.existsIn(selectedTextElem.text_en)) 
		{
			if ($(".ui .term").filter(function() { return $(this).text() == term.id; }).length == 0)
			{
				$("#terms").append( $("<div/>").addClass("term").text(term.id).data("term", term).click(onClickTerm) );
			}
			hasTerm = true;
		}
	}
	$("#terms").css("display", (hasTerm || $(".term-selected").length != 0) ? "block" : "none");
}

// $("#zoom-in").click(function(e) { zoomIn(); e.preventDefault(); return false; });
// $("#zoom-out").click(function(e) { zoomOut(); e.preventDefault(); return false; });

$(".genderpopup .closebutton").click(function(e) { showGenderingPreview(false); e.preventDefault(); return false; });
$(".genderpopup .helpbutton").click(function(e) { toggleGenderingHelp(false); e.preventDefault(); return false; });

$(".ui .language-code-button").click(function() {
	var elem = $("#text\\:language_code .t");
	onClickTextElem.call(elem);
	// //document.documentElement.scrollTop = elem.offset().top;
	// zoomOut();
	// //$("body,html,document").scrollTop(elem.offset().top-50);
	// console.log(elem.offset().top);
	// $("body,html,document").scrollTop(elem.offset().top-50);
	// zoomIn();

	elem.get(0).scrollIntoView();

	elem.addClass('highlight-red');
	window.setTimeout(function(){ elem.removeClass('highlight-red'); }, 1000);
});

//-----------------------------------------------------------------------------------------------------------
// Capture API
//-----------------------------------------------------------------------------------------------------------
function getFontSpecs()
{
	fontSizes = {};

	var fontSpecs = [
		{ id:"tiny", file:"minikylie_u_regular_8", size:0 },
		{ id:"small_tight", file:"atarismall_u_regular_8", size:0 },
		{ id:"small_harsh", file:"5mikropix_regular_8", size:0 },
		{ id:"regular", file:"bmmini_u_regular_8", size:0 },
		{ id:"regular_short", file:"04b03_u_regular_8", size:0 },
		{ id:"title_tall", file:"pixelplay_regular_16", size:0 },
		{ id:"title_news", file:"motorolascreentype_u_regular_16", size:0 },
		{ id:"title_thick", file:"chixa_demibold_14", size:0 },
		{ id:"ui_regular", file:"notnokia_u_regular_8", size:0 },
		{ id:"large", file:"resource_u_regular_8", size:0 },
	];

	// find sizes from styles in fonts.css
	const tempElem = document.body.appendChild(document.createElement("div"));
	fontSpecs.forEach(fontSpec =>
	{
		const cssId = "font-" + fontSpec.id;
		tempElem.classList.add(cssId);
		const style = tempElem.currentStyle || window.getComputedStyle(tempElem, null);
		fontSpec.size = parseInt(style["font-size"]);
		tempElem.classList.remove(cssId);
	});
	document.body.removeChild(tempElem);

	// console.log(fontSpecs);
	return fontSpecs;
}

//-----------------------------------------------------------------------------------------------------------
function createMeasuringContext(font, threshold)
{
	// context.measureText is inconsistent on Windows/Mac (maybe due to text antialiasing) 
	// so use this custom thresholding version instead.
	canvas = document.createElement('canvas');
	canvas.width = 200;
	canvas.height = 200;

	var context = canvas.getContext('2d');
	context.font = font;
	context.textAlign = 'left';
	context.textBaseline = 'alphabetic';
	
	const originX = Math.floor(canvas.width/2);
	const originY = Math.floor(canvas.height/2);

	var result = 
	{
		measureText: function(letter)
		{
			// var measured = context.measureText(letter);
			// measured.letter = letter;
			// return measured;
			context.fillStyle = "#000";
			context.fillRect(0, 0, canvas.width, canvas.height);

			context.fillStyle = "#fff";
			context.fillText(letter, originX, originY);

			const image = context.getImageData(0, 0, canvas.width, canvas.height);
			var x0 = 1000;
			var x1 = 0;
			var y0 = 1000;
			var y1 = 0;
			for (var y=0; y<image.height; y++)
			{
				for (var x=0; x<image.width; x++)
				{
					if (image.data[(y*image.width + x) * 4 + 0] > threshold)
					{
						x0 = Math.min(x0, x);
						x1 = Math.max(x1, x+1);
						y0 = Math.min(y0, y);
						y1 = Math.max(y1, y+1);
					}
				}
			}

			if (x1 < x0 || y1 < y0) 
			{
				// no pixels drawn, fall back to measureText()
				var measured = context.measureText(letter);
				const metrics = {
					letter: letter,
					actualBoundingBoxLeft: 0,
					actualBoundingBoxRight: measured.width-1,
					actualBoundingBoxAscent: 0,
					actualBoundingBoxDescent: 0
				};
				return metrics;
			}
			else
			{
				const metrics = {
					letter: letter,
					actualBoundingBoxAscent: Math.max(0, originY - y0),
					actualBoundingBoxDescent: Math.max(0, y1 - originY),
					actualBoundingBoxLeft: originX - x0,
					actualBoundingBoxRight: x1 - originX
				}
				// console.log(`${letter}: ${JSON.stringify(metrics)}`);
				return metrics;
			}
		}
	}

	return result;
}

//-----------------------------------------------------------------------------------------------------------
function createBitmapFont(familyName, fontSize, gameFace)
{
	const kRowSpacing = 1;
	const kImageWidth = 512;
	const kImagePadding = 1;
	const kGlyphSpacing = 1;
	const kThreshold = 200;

	var font = fontSize + "px " + familyName;

	const letters = getUsedChars();

	var measurer = createMeasuringContext(font, kThreshold);
	var letterMetrics = [...letters].map( letter => measurer.measureText(letter) );

	// build list of all glyphs
	var ascentMax = 0;
	var descentMax = 0;
	var glyphs = [];

	letterMetrics.forEach(metrics => 
	{
		ascentMax = Math.max(ascentMax, metrics.actualBoundingBoxAscent);
		descentMax = Math.max(descentMax, metrics.actualBoundingBoxDescent);

		const glyph = { 
			letter: metrics.letter, 
			metrics: metrics, 
			w: Math.ceil(metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight)
		};
		glyphs.push(glyph);
	});

	// lay out all glyphs into rows	
	const rowHeight = ascentMax + descentMax + kRowSpacing;
	var rows = []
	var rowIndex = 0
	var rowWidth = 0
	glyphs.forEach(glyph => 
	{
		if ((rowWidth + glyph.w) > (kImageWidth-2*kImagePadding))
		{
			rowIndex += 1;
			rowWidth = 0;
		}
		if (rowIndex >= rows.length)
		{
			rows.push({glyphs:[]});
		}
		rowWidth += glyph.w + 1;
		rows[rowIndex].glyphs.push(glyph);
	});

	// use canvas to render font atlas
	const div = document.createElement('div');
	document.body.appendChild(div);

	const p = document.createElement('p');
	p.textContent = familyName;
	div.appendChild(p);

	const canvas = document.createElement('canvas');
	canvas.width  = kImageWidth;
	canvas.height = rowHeight * rows.length + 2 * kImagePadding;
	
	div.appendChild(canvas);
	
	const context = canvas.getContext('2d');
	// context.fillStyle = "#000";
	context.fillStyle = "rgba(0, 0, 0, 0.0)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = font;
	context.textBaseline = 'alphabetic';
	context.textAlign = 'left';
	context.fillStyle = '#fff';

	function escape(s) {
		let lookup = {
			'&': "&amp;",
			'"': "&quot;",
			'<': "&lt;",
			'>': "&gt;"
		};
		return s.replace( /[&"<>]/g, c => lookup[c] );
	}

	charPositions = [];
	rows.forEach((row, rowIndex) => 
	{
		const rowBaselineY = kImagePadding + rowIndex * rowHeight + ascentMax;
		var glyphX = kImagePadding;
		row.glyphs.forEach(glyph =>
		{
			context.beginPath();
			context.fillText(glyph.letter, glyphX + glyph.metrics.actualBoundingBoxLeft , rowBaselineY);

			charPositions.push({
				id: glyph.letter.charCodeAt(0),
				letter: escape(glyph.letter == " " ? "space" : glyph.letter),
				x: glyphX,
				y: rowBaselineY - glyph.metrics.actualBoundingBoxAscent,
				width: glyph.w,
				height: glyph.metrics.actualBoundingBoxAscent + glyph.metrics.actualBoundingBoxDescent,
				xoffset: -glyph.metrics.actualBoundingBoxLeft,
				yoffset: ascentMax - glyph.metrics.actualBoundingBoxAscent,
				// determinted empirically by comparing canvas metrics with old bitmap font app
				xadvance: glyph.w + 1 - 2 * glyph.metrics.actualBoundingBoxLeft,
			});

			glyphX += glyph.w + kGlyphSpacing;
		});
	});

	// apply threshold
	const image = context.getImageData(0, 0, canvas.width, canvas.height);
	for (var i=0; i<image.data.length/4; i++)
	{
		if (image.data[i*4] > kThreshold)
		{
			image.data[i*4+0] = 255;
			image.data[i*4+1] = 255;
			image.data[i*4+2] = 255;
			image.data[i*4+3] = 255;
		}
		else
		{
			image.data[i*4+0] = 0;
			image.data[i*4+1] = 0;
			image.data[i*4+2] = 0;
			image.data[i*4+3] = 0;
		}
	}
	context.putImageData(image, 0, 0);

	// debug show each glyph's bounding box
	// context.fillStyle = "rgba(255, 0, 0, 0.5)";
	// charPositions.forEach(m => {
	// 	context.beginPath();
	// 	context.rect(m.x, m.y, m.width, m.height);
	// 	context.fill();
	// });
	
	// generate .fnt xml file describing character positions in atlas
	fntXmlLines = [
		"<font>",
		` <info size="${fontSize}" face="${gameFace}"/>`, // ignored by game
		` <common lineHeight="${fontSize}"/>`, // ignored by game
		` <pages><page id="0" file="${gameFace}.png"/></pages>`,
		` <chars count="${glyphs.length}">`
	];
	charPositions.forEach(s => 
	{
		//   <char width="0" page="0" x="1" y="6" xoffset="0" chnl="0" letter="space" height="0" yoffset="9" xadvance="2" id="32"/>
		fntXmlLines.push(
			`  <char width="${s.width}" page="0" x="${s.x}" y="${s.y}" xoffset="${s.xoffset}" chnl="0" letter="${s.letter}" height="${s.height}" yoffset="${s.yoffset}" xadvance="${s.xadvance}" id="${s.id}"/>`
		);
	});
	fntXmlLines.push(" </chars>");
	fntXmlLines.push(" <kernings count=\"0\"/>");
	fntXmlLines.push("</font>");
	
	const fntXml = fntXmlLines.join("\n");
	
	document.body.removeChild(div);

	return { fntXml:fntXml, pngDataURL:canvas.toDataURL("image/png") };
}

//-----------------------------------------------------------------------------------------------------------
function generateDataFiles(includeFonts)
{
	var dataFiles = [];

	// Text.xml
	var textXml = document.createElement("data");
	$(".texts .context").each(function(){
		var id = $(this).attr("id").split(":")[1];
		var node = document.createElement("item");
		node.setAttribute("id", id);
		textXml.appendChild(node);
		
		var t = document.createElement("t");

		var text = $(this).find(".t").html();
		text = escapeHtml(fixGenderSwitches(text));
		//text = text.replace(/<br[^>]*>/ig, "\n");
		t.innerHTML = text;
		node.appendChild(t);
	})
	dataFiles.push({
		'filename': 'data/Text.xml',
		'contents': textXml.outerHTML.replace(/<\/item>/ig, "</item>\n")
	});

	// Loc.csv
	var locCsv = '"CONTEXT", "ID", "TEXT"\n';
	var textElems = getTextElems();
	for (var i=0; i<textElems.length; i++)
	{
		var textElem = textElems[i];
		locCsv += quote(textElem.contextId) + "," + quote(textElem.text_en) + "," + quote(fixGenderSwitches(textElem.text)) + "\n";
	}
	dataFiles.push({
		'filename': 'data/Loc.csv',
		'contents': locCsv
	});
	dataFiles.push({
		'filename': 'data/LocVersion.txt',
		'contents': locVersion.toString()
	});

	// UsedChars.txt
	var usedChars = getUsedChars();
	dataFiles.push({
		'filename': 'data/UsedChars.txt',
		'contents': usedChars
	});

	for (const [key, value] of Object.entries(bakedDataFiles)) 
	{
		dataFiles.push({'filename': key, 'dataType': value.dataType, 'contents': value.contents});
	}

	if (includeFonts)
	{
		// fonts
		const fontSpecs = getFontSpecs();
		fontSpecs.forEach(fontSpec => 
		{
			const bitmapFont = createBitmapFont(fontSpec.id, fontSpec.size, fontSpec.file);		 
			dataFiles.push({filename:`fonts/${fontSpec.file}.fnt`, contents:bitmapFont.fntXml});
			dataFiles.push({filename:`fonts/${fontSpec.file}.png`, dataType:'dataURL', contents:bitmapFont.pngDataURL});
		});
	}

	return dataFiles;
}

//-----------------------------------------------------------------------------------------------------------
function getImageQuantizeRects(captureElem)
{
	var pals = []
	captureElem.find(".quantize").each(function() 
	{
		// quantize
		var quantizeElem = $(this);
		var colors = $.trim((quantizeElem).data("pal")).split(" ");
		for (var p=0; p<colors.length; p++)
		{
			var color = parseInt(colors[p]);
			colors[p] = [
				(color>>16) & 0xff,
				(color>>8) & 0xff,
				(color) & 0xff
			];
		}
		var pos = quantizeElem.position();
		var rect = { x:pos.left, y:pos.top, width:quantizeElem.width(), height:quantizeElem.height() };
		pals.push({ colors:colors, rect:rect });
	});
	return pals;
}

//-----------------------------------------------------------------------------------------------------------
$.capture = {
	load: function(locCsv)
	{
		var result = importCsvSync(locCsv);
		if (result.error)
		{
			return { 'error': result.error };
		}
		else 
		{
			loadBakedDataFiles();
			return result;
		}
	},
	begin: function(scale, includeFonts)
	{
		var images = []
		$(".dir").each(function()
		{
			var dir = $(this).data("dir") + "/";
			if (dir == "./") dir = "";
			$(".capture", $(this)).each(function(){
				var captureElem = $(this);
				images.push(
				{ 
					id: captureElem.attr("id"),
					filename: dir + captureElem.attr("id") + ".png",
					w: captureElem.width(),
					h: captureElem.height(),
					quantizeRects: getImageQuantizeRects(captureElem),
					wantAutoCrop: captureElem.hasClass("capture-fix-autocrop"),
					baked: captureElem.hasClass("baked")
				});
			})
		});

		zoomIn(scale);
		$(".transparent").css("color", "#ff00ff");
		markLib.beforeCapture();
		$("body, html, head, .capture").css("margin", 0);
		$("body, html, head, .capture").css("padding", 0);
		$("body").css("background-color", "#ff00ff");

		return { 'images': images, 'dataFiles': generateDataFiles(includeFonts), 'lang': getLanguageCode() };
	},
	isolate: function(id)
	{
		var elem = $("#" + id + ".capture");
		elem.detach().prependTo("body");
		elem.parents().show();
		elem.show();
		elem.siblings().hide()
		elem.parents().siblings().hide()
	},
}

//-----------------------------------------------------------------------------------------------------------
fixFonts();
moveHelpSections();
prepareCustomizableImages();
prepareTextElems();
updateVarious();
zoomIn();

// createBitmapFont("title_tall", 16, "pixelplay");

//-----------------------------------------------------------------------------------------------------------
$(window).load(function()
{
	$("#loading").hide();
	$("#content").show();

	$.capture.isLoaded = true;
});

});
