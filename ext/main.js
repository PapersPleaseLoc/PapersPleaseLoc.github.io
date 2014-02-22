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

function exportCsv()
{
    var csv = exportCsvStr();
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var dateStr = now.getFullYear() + leftPad(month) + leftPad(day) + "-";
    dateStr += leftPad(now.getHours()) + leftPad(now.getMinutes()) + leftPad(now.getSeconds());
    download("PapersPleaseLoc-" + getLanguageCode() + "-" + dateStr + ".csv", csv);
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

function importCsv(str, doneFunc)
{
    notify("Importing...", true);

    window.setTimeout(function() {
        var rows = str.csvToArray({ rSep:'\n', cSep: ',', trim:true });
        if (rows == null)
        {
            notify("Invalid CSV file");
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

            //for (var t=0; t<textElems.length; t++)
            {
                //var textElem = textElems[t];
                //if (textElem.contextId == row[0] && textElem.enKey == rowEnKey)
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
        }

        // reset anything not in csv
        for (var t=0; t<textElems.length; t++)
        {
            if (!textElems[t].setFromCsv) textElems[t].set(textElems[t].text_en);
        }        

        notify("Imported " + numRowsImported + " rows");

        isolateElems();
        selectedTextElem = null;
        $("#original_en").html("");
        setTextboxText("");
        validateTextElems(textElems);
        updateVarious();

        if (doneFunc != null) doneFunc();
    }, 100);
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

$('#import-csv').click(function(e)
{
    e.stopImmediatePropagation();
    e.preventDefault();
    $("#file-open-button").click();
    return false;
});

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
// Zoom
//-----------------------------------------------------------------------------------------------------------
var zoom = 1;
function zoomIn()
{
    // var isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 
    // if (isChrome)
    // {
    //     // manually scale images using nearest-neighbor in Chrome since smoothing is always on
    //     $(".pageback").each(
    //         function() {
    //             var image = $(this)[0];
    //             if (image.tagName == "IMG")
    //             {

    //                 var canvas = document.createElement('canvas');
    //                 canvas.width = image.width*2;
    //                 canvas.height = image.height*2;
    //                 canvas.imageSmoothingEnabled = false;
    //                 context = canvas.getContext("2d");
    //                 context.webkitImageSmoothingEnabled = false;
    //                 context.mozImageSmoothingEnabled = false;
    //                 context.drawImage(image, 0, 0, image.width*2, image.height*2);

    //                 $(this).replaceWith(canvas);
    //                 $(canvas).css("zoom", "0.5");
    //                 $(canvas).addClass("pageback");
    //             }
    //         }
    //     );
    // }

    var scrollTop = $("body").scrollTop();

    $('body').css("zoom", "2");
    $('.uibase').css("zoom", "0.5");
    $('#zoom-in').hide();
    $('#zoom-out').show();

    $("body").scrollTop(scrollTop*2);

    zoom = 2;
}

function zoomOut()
{
    var scrollTop = $("body").scrollTop();

    $('body').css("zoom", "1");
    $('.uibase').css("zoom", "1");
    $('#zoom-in').show();
    $('#zoom-out').hide();

    $("body").scrollTop(scrollTop/2);

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

function installExtension(successCallback)
{
    if (document.getElementById('extension-is-installed-CaptureVisible'))
    {
        successCallback();
    }
    else
    {
        chrome.webstore.install(
            "https://chrome.google.com/webstore/detail/bgigfngpiapeiicnamikpicikekkjcpi", 
            successCallback, 
            function(detail) { notify("Failed to install Chrome extension: " + detail); }
        );
    }
}

function fixGenderSwitches(str)
{
    if (str == null) return null;
    str = str.replace(/<m>/ig, "[m]");
    str = str.replace(/<\/m>/ig, "[/m]");
    str = str.replace(/<f>/ig, "[f]");
    str = str.replace(/<\/f>/ig, "[/f]");
    return str;
}

function downloadPack(doneFunc)
{
    if (!validateTextElems(getTextElems()))
        return;

    zoomOut();
    $(".ui").hide();
    showGenderingPreview(false);
    $(".capturing").show();
    $("#notification").hide();

    $(".transparent").css("color", "#ff00ff");
    markLib.beforeCapture();

    $(".capturing_language_code").html(getLanguageCode());

    var elems = [];
    $(".capture").each(function() 
    {
        elems.push($(this));
    });

    var divCap = new DivCap(elems, function() 
    {
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

        var textXmlFormatted = textXml.outerHTML.replace(/<\/item>/ig, "</item>\n");
        divCap.addFileToZip("data", "Text.xml", textXmlFormatted);

        // Loc.csv
        var locCsv = '"CONTEXT", "ID", "TEXT"\n';
        var textElems = getTextElems();
        for (var i=0; i<textElems.length; i++)
        {
            var textElem = textElems[i];
            // if (
            //     textElem.contextId.indexOf("text:") == 0 || 
            //     textElem.contextId.indexOf("image:") == 0 || 
            //     textElem.contextElem.hasClass("capture")
            // ) continue;

            //locCsv += quote(textElem.contextId) + ",0x" + makeEnKey(textElem.text_en).toString(16) + "," + quote(fixGenderSwitches(textElem.text)) + "\n";
            locCsv += quote(textElem.contextId) + "," + quote(textElem.text_en) + "," + quote(fixGenderSwitches(textElem.text)) + "\n";
            //locCsv += quote(textElem.contextId) + ",0x" + makeEnKey(textElem.text_en).toString(16) + "," + quote(fixGenderSwitches(textElem.text)) + "," + quote(textElem.text_en) + "\n";
        }
        divCap.addFileToZip("data", "Loc.csv", locCsv);
        divCap.addFileToZip("data", "LocVersion.txt", "" + locVersion);

        // UsedChars.txt
        var usedChars = getUsedChars();
        divCap.addFileToZip("data", "UsedChars.txt", usedChars);

        divCap.downloadZip(getLanguageCode() + ".zip");

        $("#capturing_status").html("Done!");
        if (doneFunc != null) doneFunc();

    }, function() {
        // error Func
        $("body").css("background-color", "#ff3232");
        $(".capturing").hide();
        $(".capturing_error_cleartype").show();
        return;
    });
}

$("#download-pack").click(function(e) 
{
    installExtension(downloadPack);
    e.preventDefault();
    return false;
});

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

$("#zoom-in").click(function(e) { zoomIn(); e.preventDefault(); return false; });
$("#zoom-out").click(function(e) { zoomOut(); e.preventDefault(); return false; });

$(".genderpopup .closebutton").click(function(e) { showGenderingPreview(false); e.preventDefault(); return false; });
$(".genderpopup .helpbutton").click(function(e) { toggleGenderingHelp(false); e.preventDefault(); return false; });

$(".ui .language-code-button").click(function() {
    var elem = $("#text\\:language_code .t");
    onClickTextElem.call(elem);
    //document.documentElement.scrollTop = elem.offset().top;
    zoomOut();
    $("body,html,document").scrollTop(elem.offset().top-50);
    zoomIn();
    elem.addClass('highlight-red');
    window.setTimeout(function(){ elem.removeClass('highlight-red'); }, 1000);
});

function dumpCapturedImageNames()
{
    var captureImages = [];
    $(".dir").each(function()
    {
        dir = $(this).data("dir") + "/";
        if (dir == "./") dir = "";
        $(".capture", $(this)).each(function(){
            captureImages.push("\"" + dir + $(this).attr("id") + ".png\"");        
        })
    });
    console.log(captureImages.join(","));
}

//-----------------------------------------------------------------------------------------------------------
// Cloud
//-----------------------------------------------------------------------------------------------------------
function clickSyncTableCell()
{
    var selected = $(this);
    $(this).closest("tr").find("*").removeClass("selected");
    selected.addClass("selected");
}

$("#sync-selectallcloud").click(function(e) {
    $("#synctable .cloud").addClass("selected");
    $("#synctable .local").removeClass("selected");
    e.preventDefault(); return false;
});

$("#sync-selectalllocal").click(function(e) {
    $("#synctable .local").addClass("selected");
    $("#synctable .cloud").removeClass("selected");
    e.preventDefault(); return false;
});

function setCloudMode(className) 
{
    var classNames = [ "result", "waiting", "doing", "login" ];
    for (var i=0; i<classNames.length; i++)
    {
        var id = ".syncdiff ." + classNames[i];
        if (className == classNames[i]) $(id).show();
        else $(id).hide();
    }
}

var cloudResultOkFunc = null;
function setCloudResult(message, okFunc)
{
    $(".syncdiff .result .message").html(message);
    setCloudMode("result");
    cloudResultOkFunc = okFunc;
}

function getNonNullOrBlank(val)
{
    return val ? val : "";
}

function setCloudLogin()
{
    cloudResultOkFunc = null;
    $("#github-user").val(getNonNullOrBlank(sessionStorage.getItem("github-user")));
    $("#github-pass").val(getNonNullOrBlank(sessionStorage.getItem("github-pass")));
    $("#github-repo").val(getNonNullOrBlank(sessionStorage.getItem("github-repo")));
    setCloudMode("login");
}

function setCloudError(error)
{
    cloudResultOkFunc = null;
    setCloudResult("ERROR: " + error);
}

function setCloudWait()
{
    cloudResultOkFunc = null;
    setCloudMode("waiting");
}

function getCloudFilename()
{
    return getLanguageCode() + ".csv";
}

var cloudCurDiff = null;
var cloud = null;

function setCloudLoginOk(b) {
    if (b) sessionStorage.setItem("cloud-login-ok", "true");
    else sessionStorage.removeItem("cloud-login-ok");
}

function getCloudLoginOk() {
    return sessionStorage.getItem("cloud-login-ok") == "true";
}

function syncCloud()
{
    cloudResultOkFunc = null;
    setCloudWait();

    if (getLanguageCode() == "en" && (document.URL.indexOf("local") < 0))
    {
        setCloudError(
            "You must set <b>language_code</b> to the " +
            "<a href='http://www.loc.gov/standards/iso639-2/php/code_list.php'>ISO 639-1 or ISO 639-2 code</a> " +
            "for your language before syncing."
        );
        return;
    }

    cloud = new Cloud(
        sessionStorage.getItem("github-user"), 
        sessionStorage.getItem("github-pass"), 
        sessionStorage.getItem("github-repo")
    );

    setCloudLoginOk(false);

    cloud.init(
        function() 
        {
            setCloudLoginOk(true);

            $("#sync-url-page").attr("href", cloud.getUrl(getCloudFilename()));
            $("#sync-url-page span").html(getCloudFilename());
            $("#sync-relogin span").html(cloud.user + "/" + cloud.repoName);

            cloud.getDiff(getCloudFilename(), exportCsvStr(), function(diff) 
            {
                cloudCurDiff = diff;
                setCloudMode("doing");
            
                $("#sync-changed").html(diff.changed.length);
                $("#sync-added").html("" + diff.added.length);
                $("#sync-removed").html("" + diff.removed.length);

                var syncTable = $("#synctable");
                syncTable.empty();

                for (var i=0; i<diff.rows.length; i++)
                {
                    var diffRow = diff.rows[i];

                    if (!diffRow.changed && !diffRow.added && !diffRow.removed) continue;

                    var tableRow = $(document.createElement("tr"));
                    syncTable.append(tableRow);
                    tableRow.addClass("diffRow");
                    if (diffRow.changed) tableRow.addClass("changed");
                    if (diffRow.added) tableRow.addClass("added");
                    if (diffRow.removed) tableRow.addClass("removed");

                    tableRow.data("diffRow", diffRow);
                    tableRow.append($("<td class='synccontext'><div>" + (diffRow.beforeRow != null ? diffRow.beforeRow[0] : diffRow.afterRow[0]) + "</div></td>"));
                    tableRow.append($("<td class='cloud'><div>" + (diffRow.beforeRow != null ? diffRow.beforeRow[2] : "&nbsp;") + "</div></td>").click(clickSyncTableCell));
                    tableRow.append($("<td class='local'><div>" + (diffRow.afterRow != null ? diffRow.afterRow[2] : "&nbsp;") + "</div></td>").click(clickSyncTableCell));
                }
            }, function(error)
            {
                setCloudError(error);
            });

        }, 
        function(error) 
        {
            setCloudError(error);
        }
    );
}

$("#sync-cloud").click(function() 
{
    $(".syncdiff h1 span").html(getCloudFilename());
    $(".syncdiff").show();

    if (sessionStorage.getItem("github-user") == null || !getCloudLoginOk())
        setCloudLogin();
    else
        syncCloud();
});

$("#sync-loginbutton").click(function()
{
    sessionStorage.setItem("github-user", $("#github-user").val());
    sessionStorage.setItem("github-pass", $("#github-pass").val());
    sessionStorage.setItem("github-repo", $("#github-repo").val());
    syncCloud();
});

$("#sync-relogin").click(function(e)
{
    setCloudLogin();
    e.preventDefault();
    return false;
});

$("#sync-cancelbutton, #sync-cancelbutton2, #sync-cancelbutton3").click(function() 
{
    $(".syncdiff").hide();
    $("#synctable").empty();
    if (cloudResultOkFunc != null) cloudResultOkFunc();
});

$("#sync-syncbutton").click(function() 
{
    var ok = true;

    var kSelectedCloud = 'g';
    var kSelectedLocal = 'l';

    $("#synctable .diffRow").each(function() {
        var diffRow = $(this).data("diffRow");
        var selected = $(this).find(".selected");
        if (selected.length == 1) 
        {
            if (selected.first().hasClass("cloud")) 
                diffRow.selected = kSelectedCloud;
            else if (selected.first().hasClass("local")) 
                diffRow.selected = kSelectedLocal;
        }
        else
        {
            alert("You must choose which data to use by clicking either the CLOUD or LOCAL value for each row.")
            ok = false;
            return false;
        }
    });

    if (!ok) return;

    var rows = [];
    var numCloud = 0;
    var numLocal = 0;
    var numSame = 0;
    var numRemoved = 0;
    for (var i=0; i<cloudCurDiff.rows.length; i++)
    {
        var diffRow = cloudCurDiff.rows[i];
        var row = (diffRow.selected == kSelectedCloud) ? diffRow.beforeRow : diffRow.afterRow;
        if (row != null) 
        {
            if (diffRow.selected == kSelectedLocal) numLocal++;
            else if (diffRow.selected == kSelectedCloud) numCloud++;
            else numSame++;
            rows.push(row);
        }
        else
        {
            numRemoved++;
        }
    }

    if (numCloud == 0 && numLocal == 0 && numRemoved == 0)
    {
        setCloudResult("Nothing has changed!");
        return;
    }

    if (!window.confirm(
        "Sync the following changes?\n\n" + 
        numCloud + " rows from cloud\n" + 
        numLocal + " rows from local\n" + 
        numRemoved + " rows removed\n" +
        numSame + " rows unchanged."
    )) return;

    setCloudWait();
    window.setTimeout(function() 
    {
        // make sure the content hasn't changed while we were slowly selecting files
        var beforeContent = cloud.content(getCloudFilename());
        cloud.refreshContent(getCloudFilename(), 
            function(content)
            {
                if (content != beforeContent)
                {
                    setCloudError("Cloud data changed! Re-run cloud sync to try again.");
                    return;
                }
                else
                {
                    var csv = rows.map(function (r) { return r.map(function(s) { return quote(s); }); }).join("\n");

                    var urlMessage = "<p>You can visit <a href='" + cloud.getUrl(getCloudFilename()) + "'>this GitHub file</a> to view the data online.</p>"

                    if (beforeContent == csv)
                    {
                        // no need to publish, just import
                        setCloudResult("<p>Sync completed! (No publish necessary)</p>" + urlMessage, function() { importCsv(content); });
                    }
                    else
                    {
                        cloud.publish(getCloudFilename(), csv, 
                            function(content) 
                            {
                                setCloudResult("<p>Sync completed successfully!</p>" + urlMessage, function() { importCsv(content); });
                            },
                            function (error) 
                            {
                                setCloudError(error);
                            }
                        );
                    }
                }
            }, 
            function(error) 
            {
                setCloudError(error);
            }
        );
    }, 10);
});

//-----------------------------------------------------------------------------------------------------------

$(window).load(function()
{
    $("#loading").hide();
    $("#content").show();
});

if (document.URL.indexOf("local") >= 0) 
{
    dumpCapturedImageNames();
    //$("#download-pack").show();
}

fixFonts();
moveHelpSections();
prepareCustomizableImages();
prepareTextElems();
updateVarious();
zoomIn();

function downloadAllPacks()
{
    // ?autocap=en,fr,it,de,es,pt-BR,ru,ja
    var autoCap = getUrlVar("autocap");
    if (autoCap == "") return;
    
    var langs = autoCap.split(",");
    var lang = langs.shift();
    if (lang != null)
    {
        // first, get the latest content from the cloud
        var user = getUrlVar("user");
        var pass = getUrlVar("pass");
        var repo = getUrlVar("repo");
        var cloud = new Cloud(user, pass, repo);

        cloud.init(function() {
            cloud.refreshContent(lang + ".csv", function(content)
            {
                // import it into the page
                importCsv(content, function()
                {
                    // download the pack
                    downloadPack(function() 
                    {
                        // do the next language
                        if (langs.length == 0)
                            window.location.search = "";
                        else
                            window.location.search = 
                                "user=" + user + "&" + 
                                "pass=" + pass + "&" +
                                "repo=" + repo + "&" +
                                "autocap=" + langs.join(",")
                            ;
                    });
                });
            });
        });
    }
}

downloadAllPacks();

});
