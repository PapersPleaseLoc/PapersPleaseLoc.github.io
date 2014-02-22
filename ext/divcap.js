function DivCap(elems, doneFunc, errorFunc)
{
    this.elems = elems;
    //this.elems = elems.slice(0,4);
    this.zip = new JSZip();
    //this.dir = this.zip.folder("images");
    window.setTimeout(start.bind(this), 100);

    var clearTypeTestElem = $('#cleartypetest');//<div id="cleartypetest">CLEARTYPE TEST</div>');
    clearTypeTestElem.show();
    //this.elems[this.elems.length-1].after(clearTypeTestElem);
    this.elems.push(clearTypeTestElem);

    $("body").css("background-color", "#ff00ff");

    function start()
    {
        var elem = this.elems.pop();
        if (elem != null)
        {
            var self = this;
            $("body").scrollTop(elem.offset().top + -10);

            // tell extension to take a screenshot after a short delay
            window.setTimeout(function() {
                chrome.runtime.sendMessage(
                    "bgigfngpiapeiicnamikpicikekkjcpi",
                    {name: 'screenshot'}, 
                    handleChromeResponse.bind(self, elem)
                );
            }, 100);
        }
        else
        {
            doneFunc();
        }
    }

    function handleChromeResponse(elem, response)
    {
        var imageUri = response.screenshotUrl;
        var canvas = document.createElement('canvas');
        var img = new Image();
        var self = this;
        //console.log(self);

        img.onload = function() 
        {
            canvas.width = elem.outerWidth();
            canvas.height = elem.outerHeight();
            var offset = elem.offset();
            offset.left = Math.round(offset.left - $(window).scrollLeft());
            offset.top = Math.round(offset.top - $(window).scrollTop());
            var context = canvas.getContext("2d");

            context.drawImage(img, -offset.left, -offset.top, img.width, img.height);

            if (elem.attr("id") == "cleartypetest")
            {
                // verify that there are only 2 colors in the image, otherwise cleartype is on and the font
                // is anti-aliased; which will break everything
                var numColors = self.getNumColors(context);
                //console.log(numColors);
                if (numColors != 2)
                {
                    self.failedDueToClearTypeEnabled = true;
                    errorFunc();
                    return;
                }
            }
            else
            {
                elem.find(".quantize").each(function() {
                    // quantize
                    var pal = $.trim(($(this)).data("pal")).split(" ");
                    for (var p=0; p<pal.length; p++)
                    {
                        var color = parseInt(pal[p]);
                        pal[p] = [
                            (color>>16) & 0xff,
                            (color>>8) & 0xff,
                            (color) & 0xff
                        ];
                    }
                    var pos = $(this).position();
                    var rect = { x:pos.left, y:pos.top, width:$(this).width(), height:$(this).height() };
                    self.quantize(context, rect, pal);
                });

                var dir = elem.closest(".dir").data("dir");
                var filename = elem.attr("id") + ".png";
                // if (dir.indexOf("image:") == 0) 
                // {
                //     filename = dir.substr("image:".length);
                //     dir = "";
                //     //console.log(filename);
                // }
                console.log(dir + "/" + filename);
                self.fixAlpha(context);
                self.addImageToZip(dir, filename, canvas);
            }
            
            window.setTimeout(start.bind(self), 0);
        }
        img.src = imageUri;
    }

    this.fixAlpha = function(context)
    {
        var imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        var pix = imgd.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i+0];
            var g = pix[i+1];
            var b = pix[i+2];
            if (r == 255 && g == 0 && b == 255)
            {
                // fully transparent
                pix[i+3] = 0;
            }
            else if (r == 127 && g == 0 && b == 127)
            {
                // 50% black shadow
                pix[i+0] = 0;
                pix[i+1] = 0;
                pix[i+2] = 0;
                pix[i+3] = 127;
            }
        }
        context.putImageData(imgd, 0, 0);
    }

    this.getNumColors = function(context)
    {
        var imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        var pix = imgd.data;
        var colors = {};
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i+0];
            var g = pix[i+1];
            var b = pix[i+2];
            var a = pix[i+3];
            var p = (r<<24) | (g<<16) | (b<<8) | a;
            colors[p] = true;
        }
        var count = 0;
        for (var k in colors) {
            if (colors.hasOwnProperty(k)) ++count;
        }
        return count;
    }

    this.quantize = function(context, rect, pal)
    {
        var imgd = context.getImageData(rect.x, rect.y, rect.width, rect.height);
        var pix = imgd.data;

        var palLab = [];
        for (var i=0; i<pal.length; i++)
        {
            palLab.push(RGBtoLAB(pal[i]));
        }

        for (var i = 0, n = pix.length; i < n; i += 4) 
        {
            var r = pix[i+0];
            var g = pix[i+1];
            var b = pix[i+2];
            var rgbLab = RGBtoLAB([r, g, b]);

            var minDist = 0xffffff;
            var minP = 0;
            for (var p=0; p<pal.length; p++)
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
            pix[i+0] = pal[minP][0];
            pix[i+1] = pal[minP][1];
            pix[i+2] = pal[minP][2];
        }
        context.putImageData(imgd, rect.x, rect.y);
    }

    this.addImageToZip = function(dir, filename, canvas)
    {
        var dataUri = canvas.toDataURL("image/png");
        dataUri = dataUri.substr(dataUri.indexOf(',')+1);
        //this.dir.file(filename, dataUri, {base64: true});        
        this.zip.folder(dir).file(filename, dataUri, {base64: true});
    }

    this.addFileToZip = function(dir, filename, string)
    {
        this.zip.folder(dir).file(filename, string);
    }

    this.downloadZip = function(filename)
    {
        // location.href="data:application/zip;base64,"+content;
        var content = this.zip.generate();//{compression:"DEFLATE"});
        var pom = document.createElement('a');
        pom.setAttribute('href', "data:application/zip;base64,"+content);
        pom.setAttribute('download', filename);
        pom.click();
    }
}

// http://stackoverflow.com/questions/15408522/rgb-to-xyz-and-lab-colours-conversion
/*
// user colour converted to XYZ space
XYZ = RGBtoXYZ(Red,Green,Blue)
var colX = XYZ[0];
var colY = XYZ[1];
var colZ = XYZ[2];

// alert(XYZ)

LAB = XYZtoLAB(colX, colY, colZ)

alert(LAB)
*/
function RGBtoLAB(rgb)
{
    var xyz = RGBtoXYZ(rgb[0], rgb[1], rgb[2]);
    return XYZtoLAB(xyz[0], xyz[1], xyz[2]);
}

function RGBtoXYZ(R, G, B)
{
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

function XYZtoLAB(x, y, z)
{
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
