markLib = {}
	
markLib.detectBaselinePerc = function(fontfamily) 
{
    var $bigA, $container, $smallA;
    var el = 'body';
    $container = $('<div style="visibility:hidden;font-family:' + fontfamily + '"/>');
    $smallA = $('<span style="font-size:0;">A</span>');
    $bigA = $('<span style="font-size:999px;">A</span>');
    $container.append($smallA).append($bigA).appendTo(el);
    setTimeout((function() {
        return $container.remove();
    }), 10);
    return $smallA.position().top / $bigA.height();
}

markLib.baselines = {};

markLib.getBaseline = function(fontFamily)
{
    if (markLib.baselines[fontFamily] == null)
    {
        markLib.baselines[fontFamily] = markLib.detectBaselinePerc(fontFamily);
    }
    return markLib.baselines[fontFamily];
}

markLib.getDirectCssProp = function(forClass, prop)
{
    var $inspector = $("<div>").css('display', 'none').addClass(forClass);
    $("body").append($inspector); // add to DOM, in order to read the CSS property
    try {
        return $inspector.css(prop);
    } finally {
        $inspector.remove(); // and remove from DOM
    }
}

markLib.pxToInt = function(px)
{
    px = $.trim(px.replace("px", ""));
    return parseInt(px, 10);
}

markLib.getTextMarkPos = function(markElem)
{
    var fontFamily = markElem.css("font-family");
    var fontSize = pxToInt(markElem.css("font-size"));
    var lineHeight = markElem.css("line-height");
    if (lineHeight == "normal") lineHeight = getDirectCssProp("font-" + fontFamily, "line-height");
    lineHeight = pxToInt(lineHeight);
    var baseline = Math.round((lineHeight - fontSize) / 2 + (getBaseline(fontFamily) * fontSize));

    var captureElem = getCaptureElem(markElem);

    var textAlign = markElem.css("text-align");
    var x = markElem.offset().left - captureElem.offset().left;
    if (textAlign == "right")
        x += markElem.width() - 2;
    else if (textAlign == "center")
        x += Math.round(markElem.width()/2) - 1;

    var y = Math.round(markElem.offset().top + baseline - captureElem.offset().top) - 1;

    console.log(markElem.attr("id") + " " + x + ", " + y + " (" + fontSize + ", " + lineHeight + ", " + baseline + ", " + textAlign + ")");

    return { x:x, y:y };
}

markLib.beforeCapture = function()
{
	$(".marktxt").css({color:'#000', 'background-color':'transparent' });
    $(".markimg").css({width:'1px', height:'1px', 'background-color':'#000'});
    $(".markemb").css({display:'none'});

    $(".marktxt").each(function() 
    {
        //var pos = getTextMarkPos($(this));
        var width = $(this).width();
        $(this).html(".");
        //$(this).css('font-family','regular');
        $(this).width(width);
    });
}

markLib.afterCapture = function()
{
    $("body").css("background-color", "#fff");
}
