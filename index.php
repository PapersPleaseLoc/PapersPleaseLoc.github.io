<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
    <meta charset="UTF-8">

<script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
<script src="ext/jstorage.min.js"></script>

<script src="ext/jszip.js" type="text/javascript"></script>
<script src="ext/jszip-deflate.js" type="text/javascript"></script>
<script src="ext/csvToArray.v2.1.min.js" type="text/javascript"></script>

<script src="ext/lib/base64.js" type="text/javascript"></script>
<script src="ext/lib/underscore-min.js" type="text/javascript"></script>
<script src="ext/github.js" type="text/javascript"></script>
<script src="ext/cloud.js" type="text/javascript"></script>

<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/fonts.css">
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/captures.css">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

<script src="ext/divcap.js" type="text/javascript"></script>
<script src="ext/marklib.js" type="text/javascript"></script>
<script src="ext/main.js" type="text/javascript"></script>

<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/bgigfngpiapeiicnamikpicikekkjcpi">

</head>
<body>

<?php
// echo "<script>\n";
// $Directory = new RecursiveDirectoryIterator('final/');
// $Iterator = new RecursiveIteratorIterator($Directory);
// $Regex = new RegexIterator($Iterator, '/^.+\.(?:png)|(?:csv)$/i', RecursiveRegexIterator::GET_MATCH);
// echo "var finalPngs = [\n";
// foreach ($Regex as $filename)
// {
//     echo "\t\"" . $filename[0] . "\",\n";
// }
// echo "];\n";
// echo "</script>\n";
?>

<div id="loading">
Loading...
</div>
<div id="content">
    <div class="help">
    <h1>Guidelines</h1>
    <ul>
        <li>
            The game is set in a fictional universe. Don't using words, events, or names specific 
            to real places. The game world is modeled after Eastern Europe but it is not Russia/USSR. 
            Don't use the word "comrade" or it's translated equivalent.
        </li>
        <li>
            Terminology is important. Use the <b>SHARED TERMS</b> feature to make sure terminology is 
            consistent.
        </li>
        <li>
            Use "foreign-style" grammar for speech. Use plain legible (native) grammar for documents. 
            Keep dialog short and concise.
        </li>
        <li>
            All text has strict space requirements. Abbreviate where necessary. If the text absolutely cannot
            fit when localized, leave it in English.
        </li>
        <li>
            Traveler/Immigrant/Character names aren't localized. Leave all person names in English. Eg: "Dari Ludum"
        </li>
    </ul>
</div>

<div class="captures">
    <div class="dir" data-dir="papers">

        <!-- AccessPermitInner -->    
        <div class="capture context" id="AccessPermitInner" style="
            width: 147px;
            height: 196px;
            color: #896789;
            text-align: center;
        ">
            <img class="pageback" src="capture/AccessPermitInner.png"/>
            <style>
                #AccessPermitInner .solid { background-color: #d7e9d2; }
                #AccessPermitInner .marktxt { color: #696789; } 
            </style>
            <div class="t font-tiny solid" style="top:4px; padding:0 2px;">
                ARSTOTZKA
            </div>
            <div class="t font-title_tall" style="margin-top:5px;">
                Access Permit
            </div>
            <div style="text-align:left">
            <div class="t font-tiny" style="margin-top:2px; margin-left:14px; width:125px; display:inline-block; line-height:7px; text-align:left">
                This permit grants conditional access to the sovereign nation of Arstotzka
            </div>
            </div>
            <div id="$Name" class="abs marktxt" style="text-align:middle; width:100%; top:54px;">ALEXANDER STOLICHANOV</div>
            <div class="font-small abs" style="text-align:left; left:16px; top:56px; line-height:22px">
                <div class="t">NAME</div>
                <div class="t">NATIONALITY</div>
                <div class="t">PURPOSE</div>
                <div class="t">HEIGHT</div>
                <div class="t">PHYSICAL APPEARANCE</div>
            </div>
            <div class="noclick abs" style="text-align:left; left:16px; top:69px; line-height:22px">
                <div id="$Nationality" class="marktxt">KOLECHIA</div>
                <div id="$Purpose" class="marktxt">WORK</div>
                <div id="$Height" class="marktxt">180cm</div>
                <div id="$Appearance" class="marktxt">GLASSES</div>
            </div>
            <div class="font-small abs" style="text-align:left; left:79px; top:78px; line-height:22px">
                <div class="t">ID NUMBER</div>
                <div class="t">DURATION</div>
                <div class="t">WEIGHT</div>
                <div>&nbsp;</div>
                <div class="t">ENTER BY</div>
            </div>

            <div class="noclick abs" style="text-align:left; left:79px; top:69px; line-height:22px">
                <div id="$IdNumber" class="marktxt">12345-67890</div>
                <div id="$Duration" class="marktxt">2 WEEKS</div>
                <div id="$Weight" class="marktxt">80kg</div>
                <div>&nbsp;</div>
                <div id="$ExpirationDate" class="marktxt">1984.01.01</div>
            </div>

            <div class="font-tiny abs" style="text-align:left; left:14px; top:165px; border:1pt solid #896789; padding:2px 2px 1px 2px;">
                <div class="t" style="margin-top:-3px">Keep on person</div>
            </div>
            <div class="t font-tiny solid abs" style="bottom:7px; padding:0 2px; right:12px;">
                Ministry of Admission
            </div>
        </div>

        <!-- AsylumGrantInner -->    
        <div class="capture context" id="AsylumGrantInner" data-spec="fromtraveler:true" style="
            width: 160px;
            height: 187px;
            color: #a48ea0;
            text-align: center;
        ">
            <img class="pageback" src="capture/AsylumGrantInner.png"/>
            <style>
                #AsylumGrantInner .solid { background-color:#fddedf; }
                #AsylumGrantInner .marktxt { color:#7d6d79; font-size:8px;}
            </style>
            <div class="t font-tiny solid" style="top:4px; padding:0 2px;">
                Arstotzka
            </div>
            <div class="t font-title_tall" style="margin-top:5px;">
                GRANT of ASYLUM
            </div>
            <div class="t font-tiny" style="margin-top:0px; margin-left:2px; width:142px; display:inline-block; line-height:8px; text-align:left">
                This document grants conditional asylum status within Arstotzkan borders
            </div>
            <div id="$Face" class="abs markimg" style="left:10px; top:50px; width:60px; height:72px"></div>
            <div id="$Name" class="abs marktxt" style="left:73px; top:54px; text-align:left;">ESKALL,<br/>MARK</div>
            <div id="$Fingerprints" class="abs markimg" style="left:10px; top:125px; width:140px; height:32px"></div>

            <div class="font-small abs" style="text-align:left; left:72px; top:76px; line-height:9px">
                <div class="t">NAT</div>
                <div class="t">ID#</div>
                <div class="t">DOB</div>
                <div class="t">HT</div>
                <div class="t">WT</div>
            </div>
            <div class="abs font-regular" style="text-align:left; left:91px; top:77px; line-height:9px">
                <div id="$Nationality" class="marktxt">KOLECHIA</div>
                <div id="$IdNumber" class="marktxt">12345-67890</div>
                <div id="$BirthDate" class="marktxt">1920.01.01</div>
                <div id="$Height" class="marktxt">180cm</div>
                <div id="$Weight" class="marktxt">80kg</div>
            </div>

            <div class="abs markemb" style="left:10px; top:13px; width:141px; height:37px"></div>
            <div class="font-tiny abs" style="text-align:left; left:10px; top:162px;">
                <span class="t">Offer expires after</span> <span id="$ExpirationDate" class="marktxt font-regular" style="margin-left:8px;">1904-01-01</span>
            </div>
            <div class="t font-tiny solid abs" style="bottom:8px; padding:0 1px; right:9px;">
                Ministry of Admission
            </div>
        </div>

        <!-- BizCardInnerFront -->    
        <div class="capture context font-regular_short" id="BizCardInnerFront" style="
            width: 101px;
            height: 58px;
            color: #504e38;
            text-align: left;
        ">
            <img class="pageback" src="capture/BizCardInnerFront.png"/>
            <div class="t abs" style="left:8px; top:19px">
                ENGINEERING
            </div>
            <div class="abs" style="left:8px; top:30px; line-height:8px">
                Messof Anegovych<div class="t">Director</div><span style="padding-left:12px">8780-5520</span>
            </div>
        </div> 

        <!-- BizCardInnerBack -->    
        <div class="capture context font-regular_short" id="BizCardInnerBack" style="
            width: 101px;
            height: 58px;
            color: #504e38;
            text-align: center;
        ">
            <img class="pageback" src="capture/BizCardInnerBack.png"/>
            <div class="t solid" style="top:10px; border:1pt solid #504e38; padding: 1px 2px 0 2px;">
                WE NEED ENGINEERS
            </div>
            <div style="top:15px; line-height:9px">
                <div class="t">WILL BEAT .GOV PAY</div>
                <div class="t">CONTACT NOW</div>
                <div>8780-5520</div>
            </div>            
        </div>

        <!-- BrothelHelpInner -->    
        <div class="capture context font-cursive" id="BrothelHelpInner" style="
            width: 150px;
            height: 150px;
            color: #867b99;
            text-align: left;
        ">
            <img class="pageback" src="capture/BrothelHelpInner.png"/>
            <style>
                #BrothelHelpInner p { margin-bottom: 10px; }
                #BrothelHelpInner span { text-decoration: underline }
            </style>
            <div class="abs" style="left:25px; top:14px; width:120px; height:130px; line-height:10px">
                <p class="t">A man named <span>Dari Ludum</span> promised me and my sister good work in Arstotzka.</p>
                <p class="t">I do not trust him. I am afraid he will take my passport and force me to work at brothel. He is in line today.</p>
                <p class="t">Please do something.</p>
            </div>
        </div>

        <!-- BulletinInnerDiploTut -->    
        <div class="capture context bulletin" id="BulletinInnerDiploTut">
            <img class="pageback" src="capture/BulletinInnerDiploTut.png"/>
            <div class="t font-title_tall" style="padding-top:10px;">
                Diplomat
            </div>
            <div class="t" style="margin-top:6px;">
                Verification Procedure
            </div>            
            <div class="t abs" style="left:102px; top:52px; width:43px; text-align:left;">
                Verify issuing country
            </div>
            <div class="t abs" style="left:102px; top:95px; width:43px; text-align:left;">
                Verify identity
            </div>
            <div class="t abs" style="left:20px; top:160px; width:120px; text-align:left;">
                Verify diplomatic access to Arstotzka
            </div>            
        </div>

        <!-- BulletinInnerMissingTut -->    
        <div class="capture context bulletin" id="BulletinInnerMissingTut">
            <img class="pageback" src="capture/BulletinInnerMissingTut.png"/>
            <div class="t topblock">
                Missing documents can be correlated by highlighting counter and pertinent entry in rule book.
            </div>
        </div>

        <!-- BulletinInnerRuleTut -->    
        <div class="capture context bulletin" id="BulletinInnerRuleTut">
            <img class="pageback" src="capture/BulletinInnerRuleTut.png"/>
            <div class="t topblock">
                Correlate pertinent entry in rule book with violating information to enable further options.
            </div>
        </div>

        <!-- BulletinInnerContraTut -->    
        <div class="capture context bulletin" id="BulletinInnerContraTut">
            <img class="pageback" src="capture/BulletinInnerContraTut.png"/>
            <div class="t topblock">
                Correlate discovered weapons and contraband with rulebook entry.
            </div>
        </div>

        <!-- BulletinInnerCorrelateTut -->    
        <div class="capture context bulletin" id="BulletinInnerCorrelateTut">
            <img class="pageback" src="capture/BulletinInnerCorrelateTut.png"/>
            <div class="t botblock">
                Highlight two pieces of discrepant information from INSPECT mode to enable interrogation.
            </div>
        </div>

        <!-- BulletinInnerPassportTut -->    
        <div class="capture context bulletin" id="BulletinInnerPassportTut">
            <img class="pageback" src="capture/BulletinInnerPassportTut.png"/>
            <div class="t topblock">
                Pay attention to passport nationality.
            </div>
        </div>

        <!-- BulletinInnerBoothTut -->    
        <div class="capture context bulletin" id="BulletinInnerBoothTut" style="
            color: #ffe5fd
        ">
            <img class="pageback" src="capture/BulletinInnerBoothTut.png"/>
            <div class="t font-tiny" style="top:18px">
                Arstotzkan<br/>Ministry of Admission
            </div>
            <div class="t abs font-large" style="top:42px; width:100%">
                Inspector's Booth
            </div>
            <div class="abs" style="left:78px; top:0px">
                <div class="t abs nowrap" style="top:63px">Shutter</div>
                <div class="t abs nowrap" style="top:94px">Counter</div>
            </div>
            <div class="t abs" style="left:59px; top:122px; line-height:10px; text-align:left">
                Rule Book<br/>Audio Transcript<br/>Bulletin Storage<br/>Time &amp; Date
            </div>            
        </div>

        <!-- BulletinInnerGunTut -->    
        <div class="capture context bulletin" id="BulletinInnerGunTut">
            <img class="pageback" src="capture/BulletinInnerGunTut.png"/>
            <div class="t font-title_tall" style="padding-top:9px">
                Weapons Protocol
            </div>
            <div class="t red" style="display:inline-block; margin-top:5px; border:1pt solid #c8241c; padding:2px 2px 0 2px">
                WHEN ALARM SOUNDS
            </div>
            <div class="t abs" style="top:88px; width:80%; margin-left:10%">
                Drop key on tumbler to unlock weapon.
            </div>
            <div class="t abs" style="top:157px; width:80%; margin-left:10%">
                Select gun, aim and fire.
            </div>
            <div class="t footer">
                Time is short. Act fast.
            </div>
        </div>

        <!-- BulletinInnerFilerTut -->    
        <div class="capture context bulletin" id="BulletinInnerFilerTut">
            <img class="pageback" src="capture/BulletinInnerFilerTut.png"/>
            <div class="t font-title_tall" style="padding-top:6px">
                Passport Confiscation
            </div>
            <div class="t abs" style="top:60px; width:80%; margin-left:10%">
                Verify ALTAN resident on id.
            </div>
            <div class="t abs" style="top:148px; width:80%; margin-left:10%">
                Drop passport in confiscation drawer.
            </div>
            <div class="t footer">
                If arresting, confiscate before detaining.
            </div>
        </div>

        <!-- BulletinInnerCriminals -->    
        <div class="capture context bulletin" id="BulletinInnerCriminals">
            <img class="pageback" src="capture/BulletinInnerCriminals.png"/>
            <div class="t font-tiny solid" style="top:6px; padding:0 3px">
                Ministry of Justice
            </div>
            <div class="t abs font-title_tall" style="top:22px; width:100%">
                WANTED CRIMINALS
            </div>
        </div>

        <!-- BulletinInnerNews -->    
        <div class="capture context bulletin" id="BulletinInnerNews">
            <img class="pageback" src="capture/BulletinInnerNews.png"/>
            <div class="t font-title_serif solid" style="top:19px; padding:0 3px; background-color:transparent; color:#cbcabb">
                NEWS
            </div>
        </div>

        <!-- BulletinPagesNote -->    
        <div class="capture context" id="BulletinPagesNote" style="
            background-color: #ecd49a;
            color: #967c62;
            display:inline-block;
            padding: 1px 4px;
            border: 1px solid #a3a3a3;
            border-width: 0 1px 1px 0;
        ">
            <div class="font-regular_short" style="line-height:6px; padding-top:1px">
            <span class="t">CHECK ALL<br/>PAGES</span> <span style="position:relative; font-family:'arial'; font-size:10px; vertical-align:middle; top:1px">➞</span>
            </div>
        </div>

        <!-- CitationInner -->    
        <div class="capture context" id="CitationInner" style="
            color: #5a5559;
            width: 183px;
            height: 80px;
        ">
            <img class="pageback" src="capture/CitationInner.png"/>
            <div class="t abs" style="left:11px; top:4px">
                M.O.A. CITATION
            </div>
            <div class="abs marktxt" style="text-align:left; width:160px; left:11px; top:22px">
                Protocol violated.<br/>Passport: Invalid Name
            </div>
            <div class="abs marktxt" style="width:100%; top:65px; text-align:center">
                WARNING ISSUED - NO PENALTY
            </div>            
        </div>

        <!-- DiplomaticAuthInner -->    
        <div class="capture context" id="DiplomaticAuthInner" style="
            color: #9ab3a8;
            width: 150px;
            height: 200px;
        ">
            <img class="pageback" src="capture/DiplomaticAuthInner.png"/>
            <style>
                #DiplomaticAuthInner .marktxt { color:#7a808d; }
                #DiplomaticAuthInner .side { 
                    display:inline-block;
                    -webkit-transform: rotate(-90deg);
                    -moz-transform: rotate(-90deg);
                    word-spacing: 2px;
                }
            </style>

            <div id="$Nation" class="abs marktxt" style="left:34px; top:4px">KOLECHIA</div>

            <div class="t abs font-title_tall" style="left:16px; top:19px">
                Diplomatic<br/>Authorization
            </div>
            <div class="font-small" style="left:17px; top:61px; width:128px; overflow:hidden">
                <div class="t">
                    This document authorizes named agent as a diplomatic entity of a Council of Nations member state.
                </div>
                <div>&nbsp;</div>
                <div style="white-space:nowrap">
                    <div class="abs marktxt font-regular" style="width:80%; right:0px; top:-2px; text-align:center">ALEXANDER STOLICHANOV</div>
                    <span class="t">AGENT</span>...........................................................
                </div>
                <div style="white-space:nowrap; margin-top:4px">
                    <div class="abs marktxt font-regular" style="left:42px; top:-2px; text-align:left">12345-67890</div>
                    <span class="t">PASSPORT</span>...........................................................
                </div>
                <div>&nbsp;</div>
                <div class="t">
                    Unconditional access to all named Council of Nations member states must be granted upon presentation.
                </div>                
            </div>
            <div class="abs marktxt" style="left:21px; top:152px; width:117px">
                ARSTOTZKA, IMPOR, UNITEDFED, ANTEGRIA
            </div>            
            <div class="t abs font-small" style="left:17px; top:185px; width:128px">
                This document has no expiry. 
            </div>

            <div class="abs" style="left:0px; top:14px; width:9px; height:184px; ">
                <div class="abs" style="left:3px; top:92px; width:1px; height:1px;"/>
                    <div class="t font-tiny side" style="margin-left:-92px; width:184px; top:-7px">COUNCIL OF NATIONS - SEVEN MEMBER FORUM</div>
                </div>
            </div>            
        </div>

       <!-- EntryPermitInner -->    
       <div class="capture context" id="EntryPermitInner" style="
            width: 150px;
            height: 201px;
            color: #896a67;
            text-align: center;
        ">
            <img class="pageback" src="capture/EntryPermitInner.png"/>
            <style>
                #EntryPermitInner .solid { background-color: #e0e9c7; }
                #EntryPermitInner .marktxt { color: #776789; top:1px; font-family:regular;}
                #EntryPermitInner .line { border: 1pt solid #896a67; border-width:0 0 1pt 0; text-align:center; }
                #EntryPermitInner table .line { position:relative; width: 70%; top:-2pt; padding-top:6px; }
                #EntryPermitInner table .marktxt { position:relative; top: 4px;}
                #EntryPermitInner td { vertical-align: bottom;}
            </style>
            <div class="t font-title_tall solid" style="top:6px; padding:0 2px;">
                ARSTOTZKA
            </div>
            <div class="t font-title_tall" style="margin-top:8px; line-height:14px">
                Entry Permit
            </div>
            <div class="abs" style="text-align:left; width:119px; top:58px; left:15px;">
                <div class="t font-small_tight" style="height:24px">
                    Conditional entry to the sovereign nation of Arstotzka is hereby granted to
                </div>
                <div class="line" style="width:100%; height:1em; margin:1em 0;">
                    <div id="$Name" class="marktxt">ALEXANDER STOLICHANOV</div>
                </div>
                <div class="t font-small_tight">
                    bearing passport number
                </div>
                <div class="line" style="width:100%; height:1em; margin:1em 0;">
                    <div id="$IdNumber" class="marktxt">12345-67890</div>
                </div>

                <table class="fullwidth font-small_tight" style="position:relative; top:-7px" valign="bottom">
                    <tr><td class="t nowrap">Purpose</td><td class="line"><div id="$Purpose" class="marktxt">WORK</div></td></tr>
                    <tr><td class="t nowrap">Duration</td><td class="line"><div id="$Duration" class="marktxt">2 WEEKS</div></td></tr>
                    <tr><td class="t nowrap">Enter by</td><td class="line"><div id="$ExpirationDate" class="marktxt">1984.01.01</div></td></tr>
                </table>
            </div>
            <div class="t font-tiny solid abs" style="bottom:9px; padding:0 2px; right:12px;">
                Ministry of Admission
            </div>
        </div>

       <!-- EntryTicketInner -->    
       <div class="capture context" id="EntryTicketInner" style="
            width: 140px;
            height: 51px;
            color: #896a67;
            text-align: left;
        ">
            <img class="pageback" src="capture/EntryTicketInner.png"/>
            <style>
                #EntryTicketInner .marktxt { color: #776789; font-family:regular;}
            </style>
            <div class="t abs font-tiny" style="left:8px; top:7px; width:40px; text-align:center;">
                Arstotzka
            </div>
            <div class="t abs font-title_tall" style="left:51px; top:8px">
                ENTRY TICKET
            </div>
            <div class="abs" style="left:51px; top:30px">
                <span class="t font-tiny">VALID ON</span>
                <span class="marktxt" style="margin-left:-2px">1982.11.28</span>
            </div>
        </div>    


       <!-- EzicNoteInnerOpen -->    
       <div class="capture context" id="EzicNoteInnerOpen" style="
            width: 171px;
            height: 181px;
            color: #ffffff;
            text-align: center;
        ">
            <img class="pageback" src="capture/EzicNoteInnerOpen.png"/>
            <div class="font-small_harsh" style="padding:4px 10%; top:7px; line-height:8px">
                <div class="t">READ QUICKLY</div>
                <div class="t">RETURN TO MESSENGER</div>
            </div>
            <div class="abs marktxt font-small_harsh" style="text-align:left; padding:0px 12px 0px 15px; top:39px;">
                <p>KHALED IS RETURNING - HE NOW CARRIES INFORMATION ON ALL EZIC AGENTS</p>
                <p>CANNOT TAKE CHANCES - YOU MUST KILL HIM TODAY BEFORE HE ENTERS BOOTH - WE WILL PROVIDE OPPORTUNITY</p>
                <p>YOU WILL BE CAUGHT IF SUCCESSFUL - MUST SACRIFICE SELF FOR ARSTOTZKA - FAMILY WILL BE SAFE</p>
            </div>
        </div>  

        <!-- FamilyPhotoInner -->    
        <div class="capture context" id="FamilyPhotoInner" style="
            width: 176px;
            height: 121px;
            color: #8a8684;
            text-align: center;
        ">
            <img class="pageback" src="capture/FamilyPhotoInner.png"/>
            <div class="t abs font-ui_regular" style="bottom:6px; width:100%">
                HANG ON WALL
            </div>
        </div> 

        <!-- FingerprintsInner -->    
        <div class="capture context" id="FingerprintsInner" style="
            width: 170px;
            height: 60px;
            color: #615352;
            text-align: center;
        ">
            <img class="pageback" src="capture/FingerprintsInner.png"/>
            <div class="t" style="width:100%; top:4px">
                GIVE THIS PAPER TO APPLICANT
            </div>
            <div class="abs markimg" style="left:6px; top:13px; width:160px; height:32px"></div>
        </div>

        <!-- ForgeryFlyerInnerFront -->    
        <div class="capture context font-regular_short" id="ForgeryFlyerInnerFront" style="
            width: 135px;
            height: 126px;
            color: #8ca0ab;
            text-align: center;
        ">
            <img class="pageback" src="capture/ForgeryFlyerInnerFront.png"/>
            <div class="t font-title_news" style="left:5px; top:2px; width:121px; border:1pt solid #8ca0ab; padding:3px 1px;">
                NEED FORGED<br/>OBRISTAN DOCS?
            </div>
            <div class="abs" style="top:45px; width:100%; line-height:10px">
                <div class="t">"It looks so real!"</div>
                <div class="t">"Approved for entry!"</div>
            </div>
            <div class="abs" style="top:73px; margin-left:29px; width:85%; line-height:10px; text-align:left">
                <div class="t">Fair rates!</div>
                <div class="t">No questions asked!</div>
                <div class="t">Fast turnaround!</div>
            </div>
            <div class="t abs" style="bottom:5px; width:100%">
                CONDITIONS ON BACK
            </div>
        </div>

        <!-- ForgeryFlyerInnerBack -->    
        <div class="capture context font-regular_short" id="ForgeryFlyerInnerBack" style="
            width: 135px;
            height: 126px;
            color: #8ca0ab;
            text-align: center;
             line-height:9px;
        ">
            <style>
                #ForgeryFlyerInnerBack table { width:124px; border:1pt solid #8ca0ab;  margin:0px 6px 5px 5px; }
                #ForgeryFlyerInnerBack td { padding: 1px 4px; }
            </style>
            <img class="pageback" src="capture/ForgeryFlyerInnerBack.png"/>
            <table style="top:5px;">
                <tr><td colspan="2" class="t">PRICING (EACH)</td></tr>
                <tr>
                    <td class="t" style="text-align:left; width:100%">Passport *</td>
                    <td style="text-align:right;">20</td>
                </tr>
                <tr>
                    <td class="t" style="text-align:left; width:100%">Entry Ticket</td>
                    <td style="text-align:right;">5</td>
                </tr>
            </table>
            <div style="width:131px; margin-top:8px; padding:0 2px">
            <span class="t">*<br></span>
            <span class="t">Client must provide existing Obristan passport to be modified with new info</span>
            </div>
            <table style="margin-top:5px">
                <tr><td class="t">Service at border Arstotzka/Obristan</td></tr>
            </table>
            <div class="t">
                Ask for Timofei Wee
            </div>
        </div>

        <!-- GymFlyerInner -->    
        <div class="capture context font-cursive" id="GymFlyerInner" style="
            width: 152px;
            height: 105px;
            color: #82cfd6;
            text-align: center;
        ">
            <img class="pageback" src="capture/GymFlyerInner.png"/>
            <div class="t" style="color:#476952; top:3px">
                Underweight?Weak?Tired?
            </div>
            <div class="abs" style="width:100%; top:20px; padding:0 3px; line-height:10px">
                <div class="t abs" style="text-align:left; width:25px">JOIN BEST GYM!</div>
                <div class="t abs" style="text-align:right; right:8px; width:27px; overflow:hidden">JOIN BEST GYM!</div>
            </div>
            <div class="t abs font-title_news" style="width:100%; top:70px">
                GET BIG TOWN
            </div>
            <div class="t abs" style="width:100%; bottom:4px">
                East Grestin
            </div>
        </div>

        <!-- HintMissingInner -->    
        <div class="capture context" id="HintMissingInner" style="
            width: 183px;
            height: 100px;
            color: #5a5559;
            text-align: center;
            line-height: 10px;
        ">
            <img class="pageback" src="capture/HintMissingInner.png"/>
            <div class="t" style="top:14px">
                THIS ENTRANT HAS NO DOCUMENTS
            </div>
            <div class="abs" style="top:37px; width:80%; margin:0 10%; text-align:left">
                <p class="t">To proceed, use INSPECT mode to interrogate.</p>
                <p class="t">Review page 2 of today's bulletin for full instructions.</p>
            </div>
        </div>

        <!-- IdCardInner -->    
        <div class="capture context font-tiny" id="IdCardInner" style="
            width: 126px;
            height: 71px;
            color: #5a5559;
            text-align: left;
        ">
            <style>
                #IdCardInner .marktxt { color: #3d394d; }
                #IdCardInner table .marktxt { padding-left: 2px; }
                #IdCardInner .label { color: #d9bdf7; background-color:#b29ccc; line-height:10px;}
                #IdCardInner .value { }
            </style>
            <img class="pageback" src="capture/IdCardInner.png"/>
            <div class="t" style="top:2px; word-spacing:2px; color:#b29ccc; text-align:center">
                ARSTOTZKA IDENTITY CARD
            </div>
            <div id="$District" class="abs marktxt" style="left:6px; top:9px; text-align:left; line-height:9px; color:#d9bdf7">
                ALTAN DISTRICT
            </div>
            <div id="$Name" class="abs marktxt" style="left:50px; top:18px">
                STOLICHANOV,<br/>ALEXANDER
            </div>
            <div id="$Face" class="abs markimg" style="left:8px; top:23px; width:32px; height:38px"></div>
            <table class="abs" style="left:48px; top:37px">
                <tr><td class="t label">DOB</td><td id="$BirthDate" class="marktxt">1924.01.01</td></tr>
                <tr><td class="t label">HT.</td><td id="$Height" class="marktxt">180cm</td></tr>
                <tr><td class="t label">WT.</td><td id="$Weight" class="marktxt">80kg</td></tr>
            </table>
        </div>

        <!-- IdentityRecordInner -->    
        <div class="capture context" id="IdentityRecordInner" style="
            color: #5a5559;
            width: 183px;
            height: 98px;
            text-align:left; 
        ">
            <style>
                #IdentityRecordInner table { line-height: 10px;}
            </style>
            <img class="pageback" src="capture/IdentityRecordInner.png"/>
            <div class="t abs" style="left:11px; top:4px">
                M.O.A. IDENTITY RECORD
            </div>
            <div class="abs" style="left:12px; top:15px">
                <table style="line-height: 10px;">
                    <tr><td class="t" style="padding-right:4px">NAME:</td><td id="$Name" class="marktxt">Alexander Stolichanov</td></tr>
                    <tr><td class="t" style="padding-right:4px">ALIAS:</td><td id="$Alias" class="marktxt">No known alias</td></tr>
                </table>
            </div>
            <div id="$Fingerprints" class="abs markimg" style="left:12px; top:38px; width:160px; height:32px"></div>
            <div class="abs" style="width:157px; left:11px; bottom:4px; height:15px; background-color:#5a5559; color:#d2e5f5; text-align:center; padding:2px; overflow:hidden">
                <div class="t" style="display:inline-block; text-align:left;">
                    Applicant's fingerprints and claimed name/alias must match this record.
                </div>
            </div>            
        </div>

        <!-- IdSupplementInner -->    
        <div class="capture context" id="IdSupplementInner" style="
            color: #837485;
            width: 90px;
            height: 150px;
            text-align:left;
        ">
            <style>
                #IdSupplementInner td { vertical-align:baseline; }
                #IdSupplementInner .name { color:#e8dac7; line-height: 11px; font-family:'tiny'; text-align: left;}
                #IdSupplementInner .val { text-align:right; }
                #IdSupplementInner .marktxt { color:#4e454f; line-height: 11px; }
            </style>
            <img class="pageback" src="capture/IdSupplementInner.png"/>
            <div class="t abs font-large" style="top:6px; text-align:center; width:100%">
                IDENTITY<br/>SUPPLEMENT
            </div>

            <div class="abs" style="left:0px; top:28px; width:90px">
                <div class="abs nowrap" style="left:7px; height:23px; background-color:#837485; text-align:left; padding:1px 2px">
                    <div class="t name">HT</div>
                    <div class="t name">WT</div>
                </div>
                <div class="abs noclick" style="right:12px; top:2px; height:25px; text-align:right; width:60px">
                    <div id="$Height" class="val marktxt">180cm</div>
                    <div id="$Weight" class="val marktxt">80kg</div>
                </div>
            </div>
            <div class="abs" style="left:7px; top:53px; width:75px; height:9px; padding-left:2px">
                <div class="t name">DESCRIPTION</div>
            </div>
            <div class="abs marktxt" style="left:10px; top:66px; height:23px; width:70px; text-align:left; line-height:8px">
                SHORT<br/>DARK<br/>HAIR
            </div>
            <div class="abs" style="left:7px; top:90px; height:9px; padding-left:2px; padding-right:2px; background-color:#837485">
                <div class="t name" style="margin-top:-1px">THUMB</div>
            </div>
            <div class="abs t font-tiny" style="width:100%; text-align:center; top:127px">
                Keep on person
            </div>
            <div class="abs" style="left:0px; top:137px; width:100%">
                <div class="abs t font-tiny" style="top:1px; left:9px">EXP.</div>
                <div class="abs marktxt" style="right:8px; top:0px; text-align:right; color:#b51206;">1984.01.01</div>
            </div>
        </div>

        <!-- LocketInnerOpen -->    
        <div class="capture context" id="LocketInnerOpen" style="
            color: #bf8f68;
            width: 128px;
            height: 48px;
            text-align:center;
        ">
            <img class="pageback" src="capture/LocketInnerOpen.png"/>
            <div class="t abs font-tiny" style="left:19px; top:10px; width:36px;">
                To Sergiu from your Elisa
            </div>
            <div class="t abs font-small" style="left:74px; top:15px; width:36px;">
                I Love You Always
            </div>            
        </div>

        <!-- LoveSongInner1 -->    
        <div class="capture context lovesong" id="LoveSongInner1">
            <div class="quantize" style="width:175px; height:74px" data-pal="0x76bdea 0x394c72"></div>
            <div class="quantize" style="left:14px; top:74px; width:146px; height:16px" data-pal="0x76bdea 0x394c72"></div>
            <img class="pageback" src="capture/LoveSongInner1.png"/>
            <div class="t drawing" style="left:-4px; top:25px; width:100%; font-size:18px">
                YOU
            </div>            
            <div class="t text">
                YOU ARE HOT LIKE FIRE
            </div>
        </div>

        <!-- LoveSongInner2 -->    
        <div class="capture context lovesong" id="LoveSongInner2">
            <div class="quantize" style="width:175px; height:74px" data-pal="0x76bdea 0x394c72"></div>
            <div class="quantize" style="left:14px; top:74px; width:146px; height:16px" data-pal="0x76bdea 0x394c72"></div>
            <img class="pageback" src="capture/LoveSongInner2.png"/>
            <div class="t drawing" style="top:19px; width:100%; letter-spacing:1px">
                you
            </div>            
            <div class="t text">
                OBJECT OF DESIRE
            </div>
        </div>

        <!-- LoveSongInner3 -->    
        <div class="capture context lovesong" id="LoveSongInner3">
            <div class="quantize" style="width:175px; height:74px" data-pal="0x76bdea 0x394c72"></div>
            <div class="quantize" style="left:14px; top:74px; width:146px; height:16px" data-pal="0x76bdea 0x394c72"></div>
            <img class="pageback" src="capture/LoveSongInner3.png"/>
            <div class="t label" style="top:5px; left:134px; width:40px;">
                YOU<br>(AGAIN)
            </div>
            <div class="t text">
                WRAP MY HEART IN WIRE
            </div>
        </div>

        <!-- LoveSongInner4 -->    
        <div class="capture context lovesong" id="LoveSongInner4">
            <div class="quantize" style="width:175px; height:74px" data-pal="0x76bdea 0x394c72"></div>
            <div class="quantize" style="left:14px; top:74px; width:146px; height:16px" data-pal="0x76bdea 0x394c72"></div>
            <img class="pageback" src="capture/LoveSongInner4.png"/>
            <div class="t drawing" style="top:13px; width:100%; font-size:18px">
                ApPROVED
            </div>
            <div class="t text">
                APPROVE MY VISA
            </div>
        </div>

        <div class="styletweak context" id="tweak-passport-field-padding-left" data-selector=".passport .k" data-style="padding-left">
            <div class="title">Style Tweak</div>
            <div class="name">Left-padding on passport fields</div>
            <div class="t value">2px</div>
        </div>

        <!-- PassportInnerAntegria -->    
        <div class="capture context passport" id="PassportInnerAntegria">
            <style>
                #PassportInnerAntegria .name { left:8px; top:139px;}
                #PassportInnerAntegria table { left:6px; top:101px; padding-left:2px}
                #PassportInnerAntegria table td { padding-left:0;}
                #PassportInnerAntegria table .k { background-color: transparent; color:#a29490; line-height:8px; }
                #PassportInnerAntegria .nation { font-family:'Helvetica'; left:8px; top:89px; font-size:12px; position:absolute; color:#a29490; }
                #PassportInnerAntegria .face { left: 83px; top: 88px; }
                #PassportInnerAntegria .id { right: 6px; bottom: 5px; text-align:right;}
            </style>
            <img class="pageback" src="capture/PassportInnerAntegria.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div id="$Nation" class="t nation">ANTEGRIA</div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PassportInnerArstotzka -->
        
        <div class="styletweak context" id="tweak-passport-arstotzka-nation" data-selector="#PassportInnerArstotzka .nation" data-style="font-size">
            <div class="title">Style Tweak</div>
            <div class="name">ARSTOTZKA passport font size</div>
            <div class="t value">16px</div>
        </div>

        <div class="capture context passport" id="PassportInnerArstotzka">
            <style>
                #PassportInnerArstotzka .name { left:8px; top:88px;}
                #PassportInnerArstotzka table { left:49px; top:98px;}
                #PassportInnerArstotzka .nation { font-family:'passport_arstotzka'; right:6px; bottom:20px; font-size:16px;  position:absolute; color:#a29490; letter-spacing:-1px;}
                #PassportInnerArstotzka .face { left: 8px; top: 98px; }
                #PassportInnerArstotzka .id { left: 8px; bottom: 6px; }
            </style>
            <img class="pageback" src="capture/PassportInnerArstotzka.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div id="$Nation" class="t nation">ARSTOTZKA</div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PassportInnerImpor -->    
        <div class="capture context passport" id="PassportInnerImpor">
            <style>
                #PassportInnerImpor .name { left:8px; top:86px;}
                #PassportInnerImpor table { left:51px; top:97px;}
                #PassportInnerImpor .nation { font-family:'cursive'; left:10px; bottom:8px; font-size:8px; position:absolute; color:#a29490; }
                #PassportInnerImpor .face { left: 9px; top: 96px; }
                #PassportInnerImpor .id { right: 8px; bottom: 8px; text-align:right;}
            </style>
            <img class="pageback" src="capture/PassportInnerImpor.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div id="$Nation" class="t nation">IMPOR</div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PassportInnerKolechia -->    
        <div class="capture context passport" id="PassportInnerKolechia">
            <style>
                #PassportInnerKolechia .name { left:8px; top:98px;}
                #PassportInnerKolechia table { left:50px; top:107px;}
                #PassportInnerKolechia .nation { font-family:'passport_kolechia'; right:6px; top:88px; font-size:12.5px; letter-spacing:1px; position:absolute; color:#a29490; background-color:#ede0d8; padding-left:2px;}
                #PassportInnerKolechia .face { left: 8px; top: 107px; }
                #PassportInnerKolechia .id { right: 6px; bottom: 6px; text-align:right;}
            </style>
            <img class="pageback" src="capture/PassportInnerKolechia.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div id="$Nation" class="t nation">KOLECHIA</div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>
       
        <!-- PassportInnerObristan -->    
        <div class="capture context passport" id="PassportInnerObristan">
            <style>
                #PassportInnerObristan .name { left:8px; top:98px;}
                #PassportInnerObristan table { left:8px; top:111px;}
                #PassportInnerObristan .nation { font-family:'title_serif'; font-weight:bold; top:77px; font-size:11px; color:#ede0d8; vertical-align:top;}
                #PassportInnerObristan .face { left: 84px; top: 107px; }
                #PassportInnerObristan .id { left: 10px; top: 148px; }
                #PassportInnerObristan table .marktxt, #PassportInnerObristan .id { color:#ede0d8; }
            </style>
            <img class="pageback" src="capture/PassportInnerObristan.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div style="width:100%; text-align:center"><div id="$Nation" class="t nation">OBRISTAN</div></div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PassportInnerRepublia -->    
        <div class="capture context passport" id="PassportInnerRepublia">
            <style>
                #PassportInnerRepublia .name { left:8px; top:87px;}
                #PassportInnerRepublia table { left:8px; top:98px;}
                #PassportInnerRepublia .nation { font-family:'passport_republia'; left:8px; top:136px; font-size:11px; position:absolute; color:#a29490; }
                #PassportInnerRepublia .face { left: 85px; top: 96px; }
                #PassportInnerRepublia .id { right: 5px; bottom: 6px; text-align:right;}
            </style>
            <img class="pageback" src="capture/PassportInnerRepublia.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div id="$Nation" class="t nation">REPUBLIA</div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PassportInnerUnitedFed -->    
        <div class="capture context passport" id="PassportInnerUnitedFed">
            <style>
                #PassportInnerUnitedFed .name { left:8px; top:98px;}
                #PassportInnerUnitedFed table { left:50px; top:106px;}
                #PassportInnerUnitedFed .nation { font-family:'passport_unitedfed'; top:77px; font-size:8px; position:relative; color:#a29490; background-color:#ede0d8; padding: 0 2px; display:inline-block;}
                #PassportInnerUnitedFed .face { left: 8px; top: 106px; }
                #PassportInnerUnitedFed .id { right: 5px; bottom: 6px; text-align:right;}
            </style>
            <img class="pageback" src="capture/PassportInnerUnitedFed.png"/>
            <div class="t visa font-title_serif">ENTRY VISA</div>
            <div id="$Name" class="marktxt name">Stolichanov, Alexander</div>
            <table>
                <tr><td class="t k">DOB.</td><td id="$BirthDate" class="marktxt v">1928.01.02</td></tr>
                <tr><td class="t k">SEX</td><td id="$Gender" class="marktxt v">M</td></tr>
                <tr><td class="t k">ISS.</td><td id="$IssuingCity" class="marktxt v">Glorian</td></tr>
                <tr><td class="t k">EXP.</td><td id="$ExpirationDate" class="marktxt v">1984.01.01</td></tr>
            </table>
            <div style="width:100%; text-align:center"><div id="$Nation" class="t nation">UNITED FEDERATION</div></div>
            <div id="$Face" class="face markimg"></div>
            <div id="$IdNumber" class="id marktxt">12345-67890</div>
        </div>

        <!-- PlaqueOneInner -->    
        <div class="capture context plaque" id="PlaqueOneInner">
            <img class="pageback" src="capture/PlaqueOneInner.png"/>
            <div class="t title">Ministry of Admission</div>
            <div class="recogouter"><div class="t recoginner">RECOGNITION</div></div>
            <div class="t for">FOR</div>
            <div class="name marktxt">Sufficience</div>
            <div class="hangouter"><div class="t hanginner">HANG ON WALL</div></div>
        </div>

        <!-- PlaqueTwoInner -->    
        <div class="capture context plaque" id="PlaqueTwoInner">
            <style>
                #PlaqueTwoInner { height:186px; color: #8a7b6e; }
                #PlaqueTwoInner .recoginner { background-color:#eae9e0; }
                #PlaqueTwoInner .for { top:124px; }
                #PlaqueTwoInner .hangouter { top:172px; }
                #PlaqueTwoInner .name { top:148px; }
                #PlaqueTwoInner .hanginner { background-color:#b3a78f; }
            </style>
            <img class="pageback" src="capture/PlaqueTwoInner.png"/>
            <div class="t title">Ministry of Admission</div>
            <div class="recogouter"><div class="t recoginner">RECOGNITION</div></div>
            <div class="t for">FOR</div>
            <div class="name marktxt">Sufficience</div>
            <div class="hangouter"><div class="t hanginner">HANG ON WALL</div></div>
        </div>

        <!-- PoisonInnerBack -->    
        <div class="capture context font-cursive" id="PoisonInnerBack" style="
            color: #42413c;
            width: 90px;
            height: 70px;
            text-align: center;
        ">
            <img class="pageback" src="capture/PoisonInnerBack.png"/>
            <div class="t abs" style="width:100%; top:13px">OPEN</div>
        </div>

        <!-- PoisonInnerOpen1 -->    
        <div class="capture context font-cursive" id="PoisonInnerOpen1" style="
            color: #42413c;
            width: 90px;
            height: 120px;
            text-align: center;
        ">
            <img class="pageback" src="capture/PoisonInnerOpen1.png"/>
            <div class="t abs" style="padding-left:22px; color:#edeed0; top:4px; width:60px">DO NOT TOUCH POWDER</div>
            <div class="t abs" style="width:100%; top:101px">CLOSE</div>
        </div>

        <!-- PoisonInnerOpen2 -->    
        <div class="capture context font-cursive" id="PoisonInnerOpen2" style="
            color: #42413c;
            width: 175px;
            height: 120px;
            text-align: center;
        ">
            <img class="pageback" src="capture/PoisonInnerOpen2.png"/>
            <div class="t abs" style="width:89px; color:#edeed0; top:7px;">ALIGN POWDER OVER PASSPORT</div>
            <div class="t abs" style="left:97px; color:#edeed0; top:7px; width:60px">PUSH HARD TO AFFIX</div>
            <div class="t abs" style="width:89px; top:101px">CLOSE</div>
        </div>

        <!-- PoliceBadgeInner -->    
        <div class="capture context font-tiny" id="PoliceBadgeInner" style="
            color: #59726c;
            width: 130px;
            height: 160px;
            text-align: left;
        ">
            <img class="pageback" src="capture/PoliceBadgeInner.png"/>
            <div class="abs" style="top:80px; width:100%; text-align:center; color:#ffe8cb">
                <div class="t">MINISTRY OF INFORMATION</div>
                <div class="t">Office of Investigation</div>
            </div>
            <div class="abs" style="top:101px; left:16px">
                <div class="t">East Grestin Division</div>
                <div class="t">Special Investigator</div>
            </div>
            <div class="abs font-regular" style="top:124px; left:16px">
                <div>M. Vonel</div>
                <div>00AJ-7100M-QP00-BR</div>
            </div>
            <div class="abs font-title_serif" style="left:90px; top:105px; width:24px; overflow:hidden; font-size:11px; line-height:8px; color:#acad9b">
                <div class="t">MOI</div>
                <div class="t">MOI</div>
                <div class="t">MOI</div>
            </div>
        </div>

        <!-- PressPassInner -->    
        <div class="capture context font-tiny" id="PressPassInner" style="
            color: #bad196;
            width: 91px;
            height: 128px;
            text-align: center;
        ">
            <div class="quantize" style="top:26px; width:90px; height:23px" data-pal="0xbad196 0x3e5139"></div>
            <img class="pageback" src="capture/PressPassInner.png"/>
            <div class="t" style="padding-top:18px;">INTERNATIONAL</div>
            <div class="t font-press" style="margin-top:-1px">PRESS</div>
            <div class="t" style="margin-top:-3px;">IDENTIFICATION</div>
            <div class="abs font-regular marktxt" style="width:100%; bottom:6px;">Dartan Caplane</div>
            <div class="abs markimg" style="left:26px; top:58px; width:40px; height:48px"></div>
        </div>

        <!-- RuleDiploAccess -->    
        <div class="capture context font-small_tight rulebutton" id="RuleDiploAccess" style="
            width: 81px;
            height: 30px;
        ">
            <div class="outer"><div class="t inner">
                AUTHORIZATION MUST GRANT ACCESS<br/> TO ARSTOTZKA
            </div></div>
        </div>

        <!-- RuleIssuingCity -->    
        <div class="capture context font-small_tight rulebutton" id="RuleIssuingCity" style="
            width: 81px;
            height: 20px;
        ">
            <div class="outer"><div class="t inner iss">
                PASSPORT <span>ISS.</span> FIELD MUST BE VALID
            </div></div>
        </div>

        <!-- RuleSealRequired -->    
        <div class="capture context font-small_tight rulebutton" id="RuleSealRequired" style="
            width: 81px;
            height: 22px;
        ">
            <div class="outer"><div class="t inner">
                DOCUMENT MUST<br/>HAVE A SEAL
            </div></div>
        </div>

        <!-- RulesInnerHome -->    
        <div class="capture context rules" id="RulesInnerHome">
            <style>
                #RulesInnerHome .rr { display:inline-block; padding:2px 1px 0px 2px; margin-bottom:-2px; }
                #RulesInnerHome .moa span { display:block; font-family:'small_tight'; font-size:8px; line-height:8px; margin-top:1px; margin-bottom:-1px;}
            </style>
            <img class="pageback" src="capture/RulesInnerHome.png"/>
            <div class="left" style="left:11px">
                <div class="abs" style="top:12px; width:100%">
                    <div class="t" style="display:inline-block; background-color:#e4e6bd; padding:0 2px">Arstotzkan</div>
                </div>
                <div class="t abs light moa font-title_thick" style="top:29px; width:100%">
                    Ministry<span>of</span>Admission
                </div>
                <div class="abs light font-title_thick" style="top:74px; width:100%">
                    <div class="t rr">RULES</div><br/>
                    <div class="t rr">&amp;</div><br/>
                    <div class="t rr">REGULATIONS</div><br/>
                </div>
                <div class="t abs light" style="top:126px; width:100%">
                    for Inspectors
                </div>                
            </div>
            <div class="right">
                <div class="t abs font-title_thick" style="top:10px; width:100%">
                    CONTENTS
                </div>
                <div class="abs font-propaganda property" style="top:123px">
                    <div class="t">PROPERTY OF</div>
                    <div class="t" style="font-size:15px; line-height:13px">M.O.A</div>
                </div>
            </div>
        </div>

        <!-- RulesInnerBasic -->    
        <div class="capture context rules" id="RulesInnerBasic">
            <img class="pageback" src="capture/RulesInnerBasic.png"/>
            <div class="left">
                <div class="t" style="top:4px">RULES</div>
            </div>
            <div class="right">
                <div class="t" style="top:4px">RULES</div>
            </div>
        </div>

        <!-- RulesInnerRegion -->    
        <div class="capture context rules" id="RulesInnerRegion">
            <img class="pageback" src="capture/RulesInnerRegion.png"/>
            <div class="left">
                <div class="t" style="top:30px">DIPLOMATIC SEALS</div>
            </div>
            <div class="right">
                <div class="t" style="top:8px">PASSPORT</div>
                <div class="t" style="top:68px">ISSUING CITIES</div>
            </div>
        </div>

        <!-- RulesInnerRegionArstotzka -->    
        <div class="capture context rules" id="RulesInnerRegionArstotzka">
            <img class="pageback" src="capture/RulesInnerRegionArstotzka.png"/>
            <div class="left">
                <div class="t" style="top:30px">DISTRICTS</div>
            </div>
            <div class="right">
                <div class="t" style="top:8px">PASSPORT</div>
                <div class="t" style="top:68px">ISSUING CITIES</div>
            </div>
        </div>


        <!-- RulesInnerBooth -->    
        <div class="capture context rules" id="RulesInnerBooth">
            <img class="pageback" src="capture/RulesInnerBooth.png"/>
            <div class="left">
                <div class="t dark font-title_thick" style="top:10px">INSPECTOR'S BOOTH</div>
                <div class="abs" style="left:-10px; top:-20px; width:200%">
                    <div class="abs" style="left:70px; top:0px">
                        <div class="t abs nowrap" style="top:63px">Shutter</div>
                        <div class="t abs nowrap" style="top:94px">Counter</div>
                    </div>
                    <div class="t abs" style="left:59px; top:122px; line-height:10px; text-align:left">
                        Rule Book<br/>Audio Trans.<br/>Bulletin<br/>Time &amp; Date
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="t dark font-title_thick" style="margin-top:10px">UPGRADES</div>
                <div class="t" style="margin-top:15px">NO UPGRADES<br/>INSTALLED</div>
            </div>
        </div>

        <!-- RulesInnerDocs -->    
        <div class="capture context rules" id="RulesInnerDocs">
            <img class="pageback" src="capture/RulesInnerDocs.png"/>
            <div class="left">
                <div class="t" style="margin-top:62px;">
                    OFFICIALLY RECOGNIZED
                </div>
                <div class="t font-title_thick" style="padding-top:2px">
                    DOCUMENTS
                </div>
            </div>
            <div class="right">
                <div class="t abs font-title_thick" style="top:10px; width:100%">
                    CONTENTS
                </div>
            </div>
        </div>

        <!-- RulesInnerEntryPermit -->    
        <div class="capture context rules" id="RulesInnerEntryPermit">
            <img class="pageback" src="capture/RulesInnerEntryPermit.png"/>
            <div class="left">
                <div class="t doctitle">
                    ENTRY PERMIT
                </div>
            </div>
            <div class="right">
                <div class="t validseals">
                    VALID SEALS
                </div>
            </div>
        </div>

        <!-- RulesInnerIdCard -->    
        <div class="capture context rules" id="RulesInnerIdCard">
            <img class="pageback" src="capture/RulesInnerIdCard.png"/>
            <div class="left">
                <div class="t doctitle">
                    ARSTOTZKAN<br/>ID CARD
                </div>
                <div class="t abs" style="width:80%; margin-left:10%; bottom:23px">ISSUED TO ALL ARSTOTZKAN CITIZENS</div>
            </div>
            <div class="right">
                <div class="t validseals">
                    DISTRICTS
                </div>
            </div>
        </div>

        <!-- RulesInnerIdSupplement -->    
        <div class="capture context rules" id="RulesInnerIdSupplement">
            <img class="pageback" src="capture/RulesInnerIdSupplement.png"/>
            <div class="left">
                <div class="t doctitle">
                    IDENTITY<br/>SUPPLEMENT
                </div>
                <div class="t abs" style="width:80%; margin-left:10%; bottom:15px">
                    ISSUED TO ALL QUALIFIED FOREIGNERS
                </div>
            </div>
            <div class="right">
                <div style="width:82%; margin-left:12%; margin-top:25px; text-align:left">
                    <div class="t">
                        FOR VERIFICATION OF FOREIGNER'S PHYSICAL APPEARANCE
                    </div>
                    <div class="t abs" style="top:38px">
                        VERIFY THUMBPRINT ONLY WHEN FINGERPRINT RECORD IS AVAILABLE
                    </div>
                    <div class="t abs" style="top:85px">
                        THIS IS A SHORT-ISSUE DOCUMENT - VERIFY EXPIRATION CAREFULLY
                    </div>
                </div>                
            </div>
        </div>

        <!-- RulesInnerAccessPermit -->    
        <div class="capture context rules" id="RulesInnerAccessPermit">
            <img class="pageback" src="capture/RulesInnerAccessPermit.png"/>
            <div class="left">
                <div class="t doctitle">
                    ACCESS PERMIT
                </div>
            </div>
            <div class="right">
                <div class="t validseals">
                    VALID SEALS
                </div>
                <div class="t abs" style="top:79px; margin-left:5%; width:95%;">
                    THIS DOCUMENT REPLACES ENTRY PERMIT AND IDENTITY SUPPLEMENT
                </div>                
            </div>
        </div>

        <!-- RulesInnerWorkPermit -->    
        <div class="capture context rules" id="RulesInnerWorkPermit">
            <img class="pageback" src="capture/RulesInnerWorkPermit.png"/>
            <div class="left">
                <div class="t doctitle">
                    WORK PASS
                </div>
                <div class="t abs" style="width:80%; margin-left:10%; top:122px">
                    ISSUED TO ALL QUALIFIED FOREIGN LABOR
                </div>
            </div>
            <div class="right">
                <div class="t validseals">
                    VALID SEALS
                </div>
            </div>
        </div>

        <!-- RulesInnerDiplomaticAuth -->    
        <div class="capture context rules" id="RulesInnerDiplomaticAuth">
            <img class="pageback" src="capture/RulesInnerDiplomaticAuth.png"/>
            <div class="left">
                <div class="doctitle">
                    <div class="t">DIPLOMATIC</div>
                    <div class="t font-regular" style="margin-top:2px">
                        AUTHORIZATION
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="t validseals">
                    VALIDATE SEAL WITH COUNTRY PAGE
                </div>
            </div>
        </div>

        <!-- RulesInnerAsylumGrant -->    
        <div class="capture context rules" id="RulesInnerAsylumGrant">
            <img class="pageback" src="capture/RulesInnerAsylumGrant.png"/>
            <div class="left">
                <div class="t doctitle">
                    GRANT OF<br>ASYLUM
                </div>
            </div>
            <div class="right">
                <div class="t validseals">
                    VALID SEALS
                </div>
                <div class="t abs" style="top:79px; margin-left:5%; width:95%;">
                    ALWAYS VERIFY FINGERPRINTS
                </div>                
            </div>
        </div>

        <!-- RulesInnerVaccineCert -->    
        <div class="capture context rules" id="RulesInnerVaccineCert">
            <style>
                #RulesInnerVaccineCert .of { font-family:'regular'; font-size:8px; line-height:8px; margin-top:0px; margin-bottom:-2px;}
            </style>
            <img class="pageback" src="capture/RulesInnerVaccineCert.png"/>
            <div class="left">
                <div class="t doctitle">
                    VACCINE CERTIFICATE
                </div>
            </div>
            <div class="right" style="margin-left:1px">
                <div class="font-title_thick" style="margin-top:38px">
                    <div class="t">MINISTRY</div>
                    <div class="t of">OF</div>
                    <div class="t">HEALTH</div>
                </div>
                <div class="t" style="margin-top:1px">REGULATION DOCUMENT</div>
                <div class="abs rulebutton" style="left:11px; top:91px; width:81px; height:46px">
                    <div class="outer"><div class="inner">
                        <p class="t">POLIO VACCINATION REQUIRED FOR ALL ENTRANTS</p>
                        <div class="t">NO EXCEPTIONS</div>
                    </div></div>
                </div>              
            </div>
        </div>

        <!-- RulesInnerConfiscation -->    
        <div class="capture context rules" id="RulesInnerConfiscation">
            <img class="pageback" src="capture/RulesInnerConfiscation.png"/>
            <div class="left">
                <div class="t doctitle">
                    PASSPORT CONFISCATION
                </div>
                <div class="t abs" style="width:80%; margin-left:10%; top:125px">
                    DROP PASSPORT IN CONFISCATION DRAWER
                </div>
            </div>
            <div class="right" style="margin-left:2px">
                <div class="t doctitle">
                    POLICY
                </div>
                <div class="t abs" style="width:80%; margin-left:10%; top:121px">
                    PASSPORT MUST BE CONFISCATED BEFORE DETAINING
                </div>
            </div>
            <div class="t abs font-title_serif" style="font-size:11px; color:#a3a3a3; left:141px; top:104px">
                MOI
            </div>
        </div>

        <!-- RulesInnerLast -->    
        <div class="capture context rules" id="RulesInnerLast">
            <div class="quantize" style="left:7px; top:43px; width:108px; height:37px" data-pal="0xe4e6bd 0x94967b"></div>
            <img class="pageback" src="capture/RulesInnerLast.png"/>
            <div class="left">
                <div class="abs font-propaganda" style="top:43px; width:100%">
                    <div class="t" style="font-size:11px">PROPERTY OF</div>
                    <div class="t" style="font-size:18px; line-height:15px">M.O.A.</div>
                </div>
                <div class="t abs" style="bottom:26px; width:100%">
                    GLORY TO ARSTOTZKA
                </div>
            </div>
            <div class="right">
                <div style="margin-top:24px">
                    <div class="t">Arstotzkan</div>
                    <div class="t">Ministry of Admission</div>
                    <div class="t">Rules &amp; Regulations</div>
                    <div class="t">for Inspectors</div>
                </div>
                <div style="margin-top:32px">
                    <div class="t">1982-1983 Edition</div>
                    <div class="notrans">978-0-452-28423-4</div>
                </div>
                <div class="t" style="margin-top:15px; margin-left:10%; width:80%">
                    DO NOT DISTRIBUTE UNDER SEVERE<br/>PENALTY
                </div>
            </div>
        </div>

        <!-- RulesTabConfL -->    
        <div class="capture context rulestableft" id="RulesTabConfL">
            <img class="pageback" src="capture/RulesTabL.png"/>
            <div class="t">CONF.</div>
        </div>

        <!-- RulesTabConfR -->    
        <div class="capture context rulestabright" id="RulesTabConfR">
            <img class="pageback" src="capture/RulesTabR.png"/>
            <div class="t">CONF.</div>
        </div>

        <!-- RulesTabDocsL -->    
        <div class="capture context rulestableft" id="RulesTabDocsL">
            <img class="pageback" src="capture/RulesTabL.png"/>
            <div class="t">DOCS</div>
        </div>

        <!-- RulesTabDocsR -->    
        <div class="capture context rulestabright" id="RulesTabDocsR">
            <img class="pageback" src="capture/RulesTabR.png"/>
            <div class="t">DOCS</div>
        </div>

        <!-- RulesTabMapL -->    
        <div class="capture context rulestableft" id="RulesTabMapL">
            <img class="pageback" src="capture/RulesTabL.png"/>
            <div class="t">MAP</div>
        </div>

        <!-- RulesTabMapR -->    
        <div class="capture context rulestabright" id="RulesTabMapR">
            <img class="pageback" src="capture/RulesTabR.png"/>
            <div class="t">MAP</div>
        </div>

        <!-- RulesTabRulesL -->    
        <div class="capture context rulestableft" id="RulesTabRulesL">
            <img class="pageback" src="capture/RulesTabL.png"/>
            <div class="t">RULES</div>
        </div>

        <!-- RulesTabRulesR -->    
        <div class="capture context rulestabright" id="RulesTabRulesR">
            <img class="pageback" src="capture/RulesTabR.png"/>
            <div class="t">RULES</div>
        </div>

        <!-- RulesUpgrade0 -->    
        <div class="capture context upgrade" id="RulesUpgrade0">
            <img class="pageback" src="capture/RulesUpgrade0.png"/>
            <div class="t title">
                TOGGLE INSPECT
            </div>
            <div class="t abs" style="left:6px; top:12px; width:50px; height:10px; color:#e4e6bd; text-align:center">
                SPACE
            </div>
        </div>

        <!-- RulesUpgrade1 -->    
        <div class="capture context upgrade" id="RulesUpgrade1">
            <img class="pageback" src="capture/RulesUpgrade1.png"/>
            <div class="t title">
                TOGGLE STAMP BAR
            </div>
            <div class="t abs" style="left:6px; top:12px; width:27px; height:10px; color:#e4e6bd; text-align:center">
                TAB
            </div>
        </div>

        <!-- RulesUpgrade2 -->    
        <div class="capture context upgrade" id="RulesUpgrade2">
            <img class="pageback" src="capture/RulesUpgrade2.png"/>
            <div class="t title">
                RULEBOOK SHORTCUTS
            </div>
        </div>

        <!-- RulesUpgrade3 -->    
        <div class="capture context upgrade" id="RulesUpgrade3">
            <img class="pageback" src="capture/RulesUpgrade3.png"/>
            <div class="t title">
                QUICK INSPECT
            </div>
            <div class="t abs" style="left:28px; top:12px; height:10px;">
                DOUBLE-CLICK
            </div>
        </div>

        <!-- SeizureSlipInner -->    
        <div class="capture context font-small_tight" id="SeizureSlipInner" style="
            width: 130px;
            height: 110px;
            text-align: center;
            color: #a79889;
        "/>
            <img class="pageback" src="capture/SeizureSlipInner.png"/>
            <div class="t font-tiny" style="padding-top:2px;">Arstotzka Ministry of Admission</div>
            <div class="t" style="margin-top:4px;">PASSPORT SEIZURE SLIP</div>
            <div class="t abs visa font-title_serif" style="top:69px">ENTRY VISA</div>
            <div class="abs" style="top:82px; width:100%; height:27px">
                <div class="outer"><div class="inner">
                    <div class="t">Your passport has been seized.</div>
                    <div class="t">Contact 1509-6103 for redress.</div>
                </div></div>
            </div>
        </div>

        <!-- SpyDocsInnerBack -->    
        <div class="capture context font-small_tight" id="SpyDocsInnerBack" style="
            width: 131px;
            height: 181px;
            color: #837a66;
            text-align: center;
        "/>
            <img class="pageback" src="capture/SpyDocsInnerBack.png"/>
            <div style="width:80%; margin:0 10%; height:100%">
                <div class="t abs" style="bottom:148px; width:100%">
                    Mating Habits of Lesser Kolechian Waterfowl
                </div>
                <div class="t abs" style="top:93px; width:100%">
                    A FULL REPORT
                </div>
                <div class="t abs" style="top:146px; width:100%">
                    Ministry of Information
                </div>                
            </div>
        </div>

        <!-- TranscriptInner -->    
        <div class="capture context font-regular_short" id="TranscriptInner" style="
            width: 150px;
            height: 200px;
            color: #574848;
            text-align: center;
        "/>
            <img class="pageback" src="capture/TranscriptInner.png"/>
            <div class="t" style="padding-top:4px">
                AUDIO TRANSCRIPT             
            </div>
        </div>

        <!-- VaccineCertInner -->    
        <div class="capture context font-small_tight" id="VaccineCertInner" style="
            width: 135px;
            height: 156px;
            color: #785042;
            text-align: center;
        "/>
            <style>
                #VaccineCertInner .marktxt { color:#655872; font-family:'regular'; }
                #VaccineCertInner .cov span { font-family:'regular'; font-size:8px; margin-top:2px; margin-bottom: -3px; display:block; }
                #VaccineCertInner .cov { margin-top:-6px; line-height: 10px;};
            </style>
            <img class="pageback" src="capture/VaccineCertInner.png"/>
            <div class="t font-title_tall cov" style="padding-top:17px; left:1px">
                Certificate<span>of</span>Vaccination
            </div>
            <!--<div class="t font-title_tall" style="margin-top:-6px; left:1px">Vaccination</div>-->

       
            <div class="abs" style="left:16px; top:63px; text-align:left">
                <span class="t font-small">ID#</span>
                <span id="$IdNumber" class="marktxt" style="margin-left:5px; text-align:left">12345-67890</span>
            </div>

            
            <div class="t abs" style="width:41px; height:8px; left:17px; top:83px">DATE</div>
            <div class="t abs" style="width:59px; height:8px; left:59px; top:83px">VACCINE</div>
            <div class="t abs" style="width:100%; top:135px; color:#b19761">Vax valid for 3 years</div>

            <div id="$Name" class="abs marktxt" style="width:100%; top:51px">ALEXANDER STOLICHANOV</div>
            
            <div id="$VaccineDates" class="abs marktxt" style="left:20px; top:93px; line-height:12px; text-align:left">
                82.01.03<br/>78.10.22<br/>60.11.05<br/>
            </div>
            <div id="$VaccineDrugs" class="abs marktxt" style="left:64px; top:93px; line-height:12px; text-align:left">
                HEP-A<br/>POLIO<br/>TYPHUS<br/>
            </div>
        </div>

        <!-- VisaSlipInner -->    
        <div class="capture context font-tiny" id="VisaSlipInner" style="
            width: 120px;
            height: 100px;
            text-align: center;
            color: #a79889;
        "/>
            <img class="pageback" src="capture/VisaSlipInner.png"/>
            <div class="t font-tiny" style="padding-top:4px;">
                TEMPORARY VISA SLIP
            </div>
            <div class="t abs visa font-title_serif" style="top:59px">ENTRY VISA</div>
            <div class="abs" style="top:72px; margin:0 15%; width:70%; height:25px">
                <div class="outer"><div class="t inner">
                    TO BE USED FOR DENIALS ONLY
                </div></div>
            </div>
        </div>

        <!-- WorkPermitInner -->    
        <div class="capture context" id="WorkPermitInner" style="
            width: 147px;
            height: 135px;
            color: #776789;
            text-align: center;
        ">
            <img class="pageback" src="capture/WorkPermitInner.png"/>
            <style>
                #WorkPermitInner .solid { background-color: #e9c7d3; }
                #WorkPermitInner .marktxt { color: #896a67; top:1px; font-family:'regular'; white-space: nowrap }
                #WorkPermitInner .line { border: 1pt solid #776789; border-width:0 0 1pt 0; text-align:center; }
                #WorkPermitInner table .line { position:relative; width: 100%; top:-2pt; padding-top:6px; }
                #WorkPermitInner table .marktxt { position:relative; top: 4px; }
                #WorkPermitInner td { vertical-align: bottom; line-height:8px;}
                #WorkPermitInner .k { padding-right: 3px; width:25px; overflow:hidden;}
            </style>
            <div class="t font-tiny solid" style="padding:0 4px;">
                Ministry of Labor
            </div>
            <div class="t font-title_tall" style="margin-top:2px;">
                Work Pass
            </div>
            <div style="text-align:left; width:124px; margin-top:8px; margin-left:9px;">
                <div class="t font-small_tight">
                    This pass grants its holder the right to work in a specific field for a limited time.
                </div>
                <table class="font-small_tight" style="position:relative; width:120px; top:2px" valign="bottom">
                    <tr><td class="nowrap"><div class="t k">HOLDER</div></td><td class="line"><div id="$Name" class="marktxt">ALEXANDER STOLICHANOV</div></td></tr>
                    <tr><td class="nowrap"><div class="t k">FIELD</div></td><td class="line"><div id="$Job" class="marktxt">ENGINEERING</div></td></tr>
                    <tr><td class="nowrap"><div class="t k">UNTIL</div></td><td class="line"><div id="$ExpirationDate" class="marktxt">1984.01.01</div></td></tr>
                </table>
            </div>
            <div class="font-tiny abs" style="left:7px; top:109px; width:131px; height:16px;">
                <div class="outer"><div class="t inner">
                    Keep this pass with you at all times.
                </div></div>
            </div>
        </div>

    </div> <!-- dir = "papers" -->

    <div class="dir" data-dir="intro">
    
        <!-- EndNews -->    
        <div class="capture context font-small_tight" id="EndNews" style="
            width: 240px;
            height: 160px;
            color: #000;
            text-align: center;
        ">
            <img class="pageback" src="capture/EndNews.png"/>
            <div class="t abs" style="left:80px; top:49px; width:83px; background-color:#efeddc; border-bottom:2px solid #cbcabb; margin-bottom:2px; padding:2px 0px">
                Kolechian Consensus Reached Over Grestin
            </div>
        </div>
    </div>

    <div class="dir" data-dir=".">
        <!-- ApartmentClass -->
        <div class="capture context" id="ApartmentClass" style="
            width: 160px;
            height: 30px;
            color: #556855;
            text-align: center;
        ">
            <style>
                #ApartmentClass td { width:40px; overflow:hidden; text-align:center; margin:0; padding-left:1px;}
            </style>
            <img class="pageback" src="capture/ApartmentClass.png"/>
            <table style="position:absolute; bottom:-1px"><tr>
                <td class="t">CLASS</td>
                <td class="t">CLASS</td>
                <td class="t">CLASS</td>
                <td class="t">CLASS</td>
            </tr></table>
        </div> 

        <!-- DetainButton -->
        <div class="capture context actionbutton" id="DetainButton" style="
            width: 71px;
        ">
            <img class="pageback" src="capture/DetainButton.png"/>
            <div class="t">DETAIN</div>
            <div class="t">DETAIN</div>
            <div class="t">DETAIN</div>
        </div> 

        <!-- FingerprintButton -->
        <div class="capture context actionbutton" id="FingerprintButton" style="
            width: 95px;
        ">
            <img class="pageback" src="capture/FingerprintButton.png"/>
            <div class="t">FINGERPRINT</div>
            <div class="t">FINGERPRINT</div>
            <div class="t">FINGERPRINT</div>
        </div>  

        <!-- SearchButton -->
        <div class="capture context actionbutton" id="SearchButton" style="
            width: 71px;
        ">
            <img class="pageback" src="capture/SearchButton.png"/>
            <div class="t">SEARCH</div>
            <div class="t">SEARCH</div>
            <div class="t">SEARCH</div>
        </div> 

        <!-- EmblemsMOA.png -->
        <div class="inlinehelp">
            The first 2 seals are valid, the rest are invalid. Match the translated abbreviated terms for "M.O.A" (Ministry of Admission) and "M.O.L" (Ministry of Labor).
        </div>
        <div class="capture context font-tiny" id="EmblemsMOA" style="
            width: 140px;
            height: 140px;
            color: #fff;
            text-align: center;
            vertical-align: baseline;
        ">
            <style>
                #EmblemsMOA .t { width:22px; margin-left:-10px; overflow:hidden;}
            </style>
            <img class="pageback" src="capture/EmblemsMOA.png"/>
            <div class="t abs transparent" style="left:18px; top:23px">M.O.A</div>
            <div class="t abs transparent" style="left:88px; top:23px">M.O.L</div>

            <div class="t abs transparent" style="left:18px; top:58px">M.O.A</div>
            <div class="t abs transparent" style="left:53px; top:58px">M.O.A</div>
            <div class="t abs transparent" style="left:88px; top:58px">M.O.A</div>
            <div class="t abs transparent" style="left:123px; top:58px">M.O.A</div>

            <div class="t abs transparent" style="left:18px; top:92px">M.O.A</div>
        </div>

        <!-- EmblemsMOL.png -->
        <div class="inlinehelp">
            The first 4 seals are valid, the rest are invalid. Match the translated abbreviated term for "M.O.L" (Ministry of Labor).
        </div>
        <div class="capture context font-tiny" id="EmblemsMOL" style="
            width: 140px;
            height: 140px;
            color: #fff;
            text-align: center;
            vertical-align: baseline;
        ">
            <style>
                #EmblemsMOL .t { width:22px; margin-left:-10px; overflow:hidden; }
            </style>
            <img class="pageback" src="capture/EmblemsMOL.png"/>
            <div class="t abs transparent" style="left:18px; top:23px">M.O.L</div>
            <div class="t abs" style="left:88px; top:21px; color:#5800f0">M.O.L</div>
            <div class="t abs transparent" style="left:123px; top:22px">M.O.L</div>

            <div class="t abs transparent" style="left:18px; top:58px">M.O.L</div>
            <div class="t abs" style="left:123px; top:56px; color:#5800f0">M.O.L</div>

            <div class="t abs transparent" style="left:18px; top:94px">M.O.L</div>
        </div>

        <!-- Filer -->
        <div class="capture context" id="Filer" style="
            width: 190px;
            height: 210px;
            color: #352d29;
        ">
            <style>
                #Filer .pom { 
                    position:absolute; color:#352d29; text-align:center; 
                    left:50%; 
                    top:66px; 
                    margin-left:-32px; 
                    margin-top:-14px;
                    width: 64px;
                    height: 28px;
                    -webkit-transform: rotate(-7deg);
                    -moz-transform: rotate(-7deg);
                    font-smooth: never;
                    -webkit-font-smoothing: none;
                }
                #Filer .property { font-size:7px;  }
                #Filer .moa { font-size:15px;  }
            </style>
            <div class="quantize" style="left:59px; top:45px; width:70px; height:40px" data-pal="0x7c796f 0x352d29 0xff00ff"></div>
            <img class="pageback" src="capture/Filer.png"/>
            <div class="t font-regular_short" style="position:absolute; left:5px; top:10px">
                CONFISCATED DOCUMENTS
            </div>
            <div class="font-propaganda pom">
                <div class="t property">PROPERTY OF</div>
                <div class="t moa">M.O.A.</div>
            </div>
        </div> 

        <!-- GiveIcon -->
        <div class="capture context" id="GiveIcon" style="
            width: 57px;
            height: 13px;
            color: #e0e9c7;
            text-align: center;
        ">
            <img class="pageback" src="capture/GiveIcon.png"/>
            <div class="t font-ui_regular" style="padding-top:2px">
                GIVE
            </div>
        </div> 

        <!-- InkDenied
        <div class="capture context ink" id="InkDenied" style="
            color: #701b1b;
        ">
            <img class="pageback" src="capture/InkDenied.png"/>
            <div class="t">
                ENTRY<br/>DENIED
            </div>
        </div> 

        <div class="capture context ink" id="InkApproved" style="
            color: #53701b;
        ">
            <img class="pageback" src="capture/InkApproved.png"/>
            <div class="t">
                ENTRY<br/>GRANTED
            </div>
        </div> 
        -->

        <!-- LoadButtonNew -->
        <div class="capture context font-title_tall" id="LoadButtonNew" style="
            width: 59px;
            height: 58px;
            text-align: center;
        ">
            <img class="pageback" src="capture/LoadButtonNew.png"/>
            <div class="t" style="position:absolute; width:100%; top:6px; color:#fff">
                NEW
            </div>
            <div class="t" style="position:absolute; width:100%; top:35px; color:#000">
                NEW
            </div>
        </div>

        <!-- LoadDay -->    
        <div class="capture context font-regular_short" id="LoadDay" style="
            background-color: #000;
            color: #546754;
            height: 8px;
            width: 40px;
            text-align: center;
        ">
            <div class="t" style="line-height:8px">DAY</div>
        </div>

        <!-- LoadDrag -->    
        <div class="capture context" id="LoadDrag" style="
            background-color: #000;
            color: #546754;
            height: 8px;
            width: 100px;
            text-align: left;
        ">
            <img class="pageback" src="capture/LoadDrag.png"/>
            <div class="t" style="padding-left:8px; line-height:8px; padding-top:1px">DRAG TO SCROLL</div>
        </div>

        <!-- News -->
        <div class="capture context" id="News" style="
            width: 365px;
            height: 220px;
            text-align: center;
            color: #605f58
        ">
            <div class="quantize" style="width:360px; height:53px" data-pal="0xefeddc 0x605f58"></div>
            <img class="pageback" style="z-index:-200" src="capture/News.png"/>
            <div class="font-news" style="position:absolute; width:362px; top:13px; height:34px; vertical-align:bottom">
                <div style="display:inline;">
                    <span class="t" style="padding:0 10px">The Truth of Arstotzka</span>
                    <div class="abs" style="background-color:#efeddc; width:100%; height:30px; top:-5px; z-index:-100">&nbsp;</div>
                </div>
            </div>
            <div class="t font-tiny" style="position:absolute; top:42px; right:17px; text-align:right">
                No Charge
            </div>
        </div> 

        <!-- ReasonButton -->
        <div class="capture context actionbutton reasonbutton" id="ReasonButton" style="
            width: 72px;
        ">
            <img class="pageback" src="capture/ReasonButton.png"/>
            <div class="t">REASON</div>
            <div class="t">REASON</div>
            <div class="t">REASON</div>
        </div> 

        <!-- RifleKill -->
        <div class="capture context font-cursive rifle" id="RifleKill">
            <img class="pageback" src="capture/RifleKill.png"/>
            <div class="t top">
                KILL
            </div>
            <div class="t bot">
                KILL
            </div>
        </div> 

        <!-- RifleTranq -->
        <div class="capture context font-cursive rifle" id="RifleTranq">
            <img class="pageback" src="capture/RifleTranq.png"/>
            <div class="t top">
                TRANQ
            </div>
            <div class="t bot">
                TRANQ
            </div>
        </div> 

        <!-- StampBarMid -->
        <div class="capture context font-ui_regular" id="StampBarMid" style="
            width: 280px;
            height: 16px;
            color: #564e43;
            text-align: center;
        ">
            <img class="pageback" src="capture/StampBarMid.png"/>
            <div class="t" style="position:absolute; width:100%; top:7px">
                ALIGN VISA BENEATH STAMP
            </div>
        </div> 

        <!-- Upgrades -->
        <div class="capture context font-regular_short" id="Upgrades" style="
            width: 45px;
            height: 75px;
            color: #000;
            text-align: left;
        ">
            <img class="pageback" src="capture/Upgrades.png"/>
            <div class="t" style="position:absolute; left:4px; top:19px">
                SPACE
            </div>
            <div class="t" style="position:absolute; left:4px; top:34px">
                TAB
            </div>
        </div> 
    
    </div> <!-- dir = "." -->

</div>

<div class="images section">

    <div class="dir" data-dir="papers">
        <!-- ArskickersInner -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/ArskickersInner.png</div>
            <a class="psd" href="psd/ArskickersInner.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="ArskickersInner" style="
            width: 164px;
            height: 233px;
            color: #7dad92;
            text-align: center;
        ">
            <img class="pageback" src="capture/ArskickersInner.png" id="imgtarget_ArskickersInner"/>
            <div class="t font-ui_regular" style="top:2px; margin-left:17px">
                HANG ON WALL
            </div>
        </div> 

        <!-- BrothelFlyerInner -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/BrothelFlyerInner.png</div>
            <a class="psd" href="psd/BrothelFlyerInner.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context font-cursive" id="BrothelFlyerInner" style="
            width: 150px;
            height: 100px;
            color: #ff6a6a;
            text-align: center;
        ">
            <img class="pageback" src="capture/BrothelFlyerInner.png" id="imgtarget_BrothelFlyerInner"/>
            <div style="top:61px;">
                <div>1-603-4</div>
                <div class="t">East Grestin</div>
            </div>
            <div class="t abs" style="width:100%; bottom:3px">
                FOR ALL YOUR FANTASIES
            </div>            
        </div>

        <!-- PezpertInner -->    
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/PezpertInner.png</div>
            <a class="psd" href="psd/PezpertInner.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context passport" id="PezpertInner">
            <style>
                #PezpertInner .visa { top: 58px; font-size:14px; word-spacing: 4px}
            </style>
            <div class="quantize" style="left:7px; top:54px; width:117px; height:21px" data-pal="0xede0d8 0xb19600"></div>
            <img class="pageback" src="capture/PezpertInner.png"/>
            <div class="t visa font-scribble">STAMP HERE</div>
        </div>

        <!-- SonDrawingInner -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/SonDrawingInner.png</div>
            <a class="psd" href="psd/SonDrawingInner.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context font-kid_writing" id="SonDrawingInner" style="
            width: 201px;
            height: 141px;
            color: #f0e1c3;
        "/>
            <div class="quantize" style="bottom:0px; width:201px; height:25px" data-pal="0xfdf7eb 0xf0e1c3 0xde942a 0x3768b9 0xff00ff"></div>
            <img class="pageback" src="capture/SonDrawingInner.png"/>
            <div class="t abs" style="
                top:120px; 
                left:2px;
                -webkit-transform: rotate(3deg);
                -moz-transform: rotate(3deg);"
            >
                hanG on wAll
            </div>
        </div>

        <!-- SonDrawingOuter -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/SonDrawingOuter.png</div>
            <a class="psd" href="psd/SonDrawingOuter.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="SonDrawingOuter" style="width:64px; height:45px;"/>
            <img class="pageback" src="capture/SonDrawingOuter.png"/>
        </div>

        <!-- SonDrawingMount -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/SonDrawingMount.png</div>
            <a class="psd" href="psd/SonDrawingMount.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="SonDrawingMount" style="width:50px; height:37px;"/>
            <img class="pageback" src="capture/SonDrawingMount.png"/>
        </div>

        <!-- VictimPhotoInnerBack -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">capture/VictimPhotoInnerBack.png</div>
        </div>
        <div class="capture context font-kid_writing" id="VictimPhotoInnerBack" style="
            width: 81px;
            height: 91px;
            text-align: center;
            color: #d7cbc0;
        "/>
            <img class="pageback" src="capture/VictimPhotoInnerBack.png"/>
            <!--
            <div class="quantize" style="left:3px; top:3px; width:74px; height:74px" data-pal="0x403c38 0x655f5a 0xd7cbc0 0xfffcf9 0xff00ff"></div>
            <div class="abs" style="display:table; left:3px; top:3px: width:74px; height:84px;">
                <div style="display:table-cell; vertical-align:middle;">
                    <div class="t" style="                
                        -webkit-transform: rotate(-3deg);
                        color:#d7cbc0;
                        line-height:24px;
                        font-size: 20px;
                        width:74px; 
                        white-space:pre-wrap;
                    ">I Love
yOu
dADdy
                    </div>
                </div>
            </div>
            -->
        </div>

    </div>
    <div class="dir" data-dir=".">
        <!-- Emotions -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/Emotions.png</div>
            <a class="psd" href="psd/Emotions.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="Emotions" style="width:30px; height:240px;"/>
            <img class="pageback" src="export/Emotions.png"/>
        </div>

        <!-- LoadButtonLatest -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/LoadButtonLatest.png</div>
        </div>
        <div class="capture context" id="LoadButtonLatest" style="width:59px; height:58px;"/>
            <img class="pageback" src="export/LoadButtonLatest.png"/>
        </div>

        <!-- InkApproved -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/InkApproved.png</div>
            <a class="psd" href="psd/Ink.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="InkApproved" style="width:70px; height:30px;"/>
            <img class="pageback" src="export/InkApproved.png"/>
        </div>

        <!-- InkDenied -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/InkDenied.png</div>
            <a class="psd" href="psd/Ink.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="InkDenied" style="width:70px; height:30px;"/>
            <img class="pageback" src="export/InkDenied.png"/>
        </div>

        <!-- StampBotApproved -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/StampBotApproved.png</div>
            <a class="psd" href="psd/StampBot.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="StampBotApproved" style="width:75px; height:65px;"/>
            <img class="pageback" src="export/StampBotApproved.png"/>
        </div>

        <!-- StampBotDenied -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/StampBotDenied.png</div>
            <a class="psd" href="psd/StampBot.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="StampBotDenied" style="width:75px; height:65px;"/>
            <img class="pageback" src="export/StampBotDenied.png"/>
        </div>

        <!-- ReasonStampTop -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/ReasonStampTop.png</div>
            <a class="psd" href="psd/StampBot.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="ReasonStampTop" style="width:58px; height:23px;"/>
            <img class="pageback" src="export/ReasonStampTop.png"/>
        </div>

        <!-- InkReason -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/InkReason.png</div>
            <a class="psd" href="psd/StampBot.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="InkReason" style="width:70px; height:33px;"/>
            <img class="pageback" src="export/InkReason.png"/>
        </div>        
    </div>

    <div class="dir" data-dir="intro">
        <!-- Arstotzka -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/Arstotzka.png</div>
            <a class="psd" href="psd/IntrosEnds.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="Arstotzka" style="width:240px; height:160px;"/>
            <img class="pageback" src="export/Arstotzka.png"/>
        </div>

        <!-- Intro1 -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/Intro1.png</div>
            <a class="psd" href="psd/IntrosEnds.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="Intro1" style="width:240px; height:160px;"/>
            <img class="pageback" src="export/Intro1.png"/>
        </div>           

        <!-- Obrinspector -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/Obrinspector.png</div>
            <a class="psd" href="psd/IntrosEnds.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="Obrinspector" style="width:240px; height:160px;"/>
            <img class="pageback" src="export/Obrinspector.png"/>
        </div>  

        <!-- Shutter -->
        <div class="customizableimagesource">
            <div class="t custom_img_src">export/Shutter.png</div>
            <a class="psd" href="psd/IntrosEnds.psd"><i class="fa fa-download"></i>PSD</a>
        </div>
        <div class="capture context" id="Shutter" style="width:240px; height:160px;"/>
            <img class="pageback" src="export/Shutter.png"/>
        </div>

    </div>

    <div id="cleartypetest" style="display:none">CLEARTYPE TEST</div>

</div>

    <?php include("export/loc.htm") ?>

    <div class="help" id="help:captures">
        <h1>Captures</h1>
        These images are captured directly from the browser (Chrome). Use abbreviations where necessary. Match shared terms.
    </div>

    <div class="help" id="help:images">
        <h1>Customizable Images</h1>
        Images with non-standard fonts and tightly-fitted text. Localize using an image editor, host the localized image somewhere (eg: imgur.com), then enter the full image url as localized text.
        <p>Size, color, and non-text layout must match exactly</p>
        <p>These images appear blurry in Chrome at 2x scaling but will render correctly in-game at 1x.</p>
        <p>Source PSDs are provided for most images, with referenced fonts (that may or not have foreign characters).</p>
        <p>
            Not all of these images need to be localized. Any <b>editable</b> text should be translated, 
            but it's up to the localizer to decide if the images themselves need to be edited.
        </p>
    </div>

    <div class="help" id="help:news">
        <h1>News</h1>
        News article headings and sub-headings. Must fit within given width.
    </div>

    <div class="help" id="help:texts">
        <h1>Text</h1>
        General text used throughout. Words beginning with '$' are replacement variables defined externally by the game. Do not translate any word beginning with '$'. Maintain carriage returns.
    </div>

    <div class="help" id="help:bulletins">
        <h1>Bulletins</h1>
        Bulletin messages for each day. Header and footer are defined in text:bulletin_default or, if bulletin begins with '[NOTICE]', text:bulletin_notice.
        <p>Do not localize the '[NOTICE]' tag, just include it directly if it appears in English.</p>
    </div>

    <div class="help" id="help:nights">
        <h1>Nights</h1>
        Messages and budget items for the night screen. Must fit in available space.
    </div>
    
    <div class="help" id="help:notes">
        <h1>Ezic Notes</h1>
        Notes from EZIC. All uppercase with stilted speech. Use '-' or carriage returns to separate sentences. Stay brief.
    </div>

    <div class="help" id="help:facts">
        <h1>Facts</h1>
        General text used for facts and errors.
    </div>    

    <div class="help" id="help:papers">
        <h1>Papers</h1>
        Text used on papers.
    </div>    

    <div class="help" id="help:intros">
        <h1>Intro &amp; Endings</h1>
        Text for the intro and ending sequences. Max 2 lines per entry.
    </div>

    <div class="help" id="help:endlesses">
        <h1>Endless</h1>
        Endless mode short and long descriptions. Each long description must fit in a single bulletin page with text:bulletin_endless header/footer.
    </div>

    <div class="help" id="help:travelers">
        <h1>Travelers</h1>
        Scripted traveler dialog. Lines beginning with '@' are from the (male) player character. 
        Question-mark faces are randomized and can be either gender.
        <p>
        Use [m]masculine[/m] and [f]feminine[/f] tags within the string to switch on speaker gender. Eg: I am a [m]man[/m][f]woman[/f].
        </p>
        <p>
        Lines ending with '~' will have an extra delay before the next line is shown. Maintain the trailing '~' wherever it appears.
        </p>
        <p>
        All dialog should be written with foreign-sounding grammar. Don't reference specific real-world people, places, or events. Don't use the word "comrade" or its translated equivalent.
        </p>
        <p>
        Maintain any bracketed text at the end of a line. eg: "[Speech/Duration]". This is used for context to enable correlation with other facts.
        </p>
        <p>
        Don't end sentences with "...". Dialog flows automatically in the game; the player doesn't click to show the next line. It's not necessary to signify pauses with ellipses.
        </p>
    </div>

    <div class="help" id="help:speeches">
        <h1>Generic Dialog</h1>
        Generic response dialog. Except when addressing gender directly, dialog can be from either gender. Words beginning with '$' are replacement variables defined here. Do not translate any word beginning with '$'.
        <p>
        Use [m]masculine[/m] and [f]feminine[/f] tags within the string to switch on speaker gender. Eg: I am a [m]man[/m][f]woman[/f].
        </p>
        <p>
        All dialog should be written with foreign-sounding grammar. Don't reference specific real-world people, places, or events. Don't use the word "comrade" or its translated equivalent.
        </p>
        <p>
        Maintain any bracketed text at the end of a line. eg: "[Speech/Duration]". This is used for context to enable correlation with other facts.
        </p>
        <p>
        Avoid too much personality or uniqueness here since these lines may be repeated often by different travelers.
        </p>
    </div>

    <div class="help" id="help:faces">
        <h1>Faces</h1>
        Face partial descriptions. Translate directly to ensure categories match (head, eyes, nose+mouth).
    </div>

    <div class="font-override context" id="font-stylesheet-override">
        <div>
            <h1>Font Stylesheet Override</h1>
            <p>&nbsp;</p>
            <a href="css/fonts.css" target="_blank"><i class="fa fa-download"></i>ORIGINAL &amp; INSTRUCTIONS</a>
        </div>
        <div class="t">css/fonts.css</div>
    </div>

</div>

    <div class="ui uibase">
        <table style="height:100%; width:100%">
            <tr><td>
                <div class="zoom-button" id="zoom-in"><i class="fa fa-search-plus"></i></div>
                <div class="zoom-button" id="zoom-out" style="display:none"><i class="fa fa-search-minus"></i></div>
                
                <div><a href="http://papersplea.se" target="_blank">Papers, Please</a></div>
                <div>Localizer</div>
                <div class="splitbutton">
                    <div class="name">SHOW</div>
                    <div class="button first" id="show-localizable" href="#"><i class="fa fa-edit"></i>LOCALIZABLE</div><div class="button" id="show-unlocalized" href="#"><i class="fa fa-warning"></i>UNLOCALIZED</div>
                </div>
                <div class="splitbutton">
                    <div class="name">CSV</div>
                    <div class="button first" id="import-csv" href="#"><i class="fa fa-sign-in"></i>IMPORT</div><div class="button" id="export-csv" href="#"><i class="fa fa-sign-out"></i>EXPORT</div>
                </div>
                <div class="button" id="sync-cloud" href="#"><i class="fa fa-cloud"></i>CLOUD SYNC</div>
                <div class="button" id="download-pack" href="#"><i class="fa fa-download"></i>GENERATE &amp; DOWNLOAD PACK</div>
                
                <!--
                <div class="button" id="reset-all" href="#" style="display:none">RESET TO ENGLISH...</div>
                -->
                <input id="file-open-button" type="file" name="files[]"/>

                <div class="box">
                    <div class="title">ENGLISH</div>
                    <div id="original_en"></div>
                </div>

                <div class="language-code-button">en</div>
                
            </td></tr>
            <tr class="last"><td>
                <textarea id="textbox">
!! This application is made for Chrome !!

INSTRUCTIONS

1. Click [en] above and set language code.
2. Click English text in items on left.
3. Type localized version in this box.

Use SHOW LOCALIZABLE button above to highlight which items can be localized.

Changes are autosaved locally. Use CSV for versioning/backups. Use CLOUD SYNC
for collaboration (GitHub repo required).

Items with shared terms can be isolated using buttons that appear below.

Use the zoom button above to see exactly how documents will appear in game (Chrome only).
                </textarea>
            </td></tr>

            <tr><td>
                <div class="box" id="terms" style="display:none">
                    <div class="title">SHARED TERMS</div>
                </div>
            </td></tr>
        </table>
    </div>

<div class="genderpopup uibase" style="display:none">
    <div class="title">Gendering Preview</div>
    <div class="closebutton"><i class="fa fa-minus-circle"></i></div>
    <div class="helpbutton"><i class="fa fa-question-circle"></i></div>
    <div class="explanation" style="display:none">
        This is a gendered string. Use the 
        <span class="tag">[m]</span><span class="tag">[/m]</span>
        and 
        <span class="tag">[f]</span><span class="tag">[/f]</span>
        tags to control which content is shown based on the subject's gender.
        <blockquote>
        I am a 
        <span class="tag">[m]</span><span class="content">dude</span><span class="tag">[/m]</span><span class="tag">[f]</span><span class="content">dame</span><span class="tag">[/f]</span>.
        </blockquote>
        Strings with variable subjects (<span class="subject">$0</span>, <span class="subject">$1</span>, <span class="subject">$2</span>, etc) have tags for each variable:
        <blockquote>
            <span class="subject">$0</span>: <span class="tag">[m0]</span><span class="content">dude 0</span><span class="tag">[/m0]</span><span class="tag">[f0]</span><span class="content">dame 0</span><span class="tag">[/f0]</span><br>
            <span class="subject">$1</span>: <span class="tag">[m1]</span><span class="content">dude 1</span><span class="tag">[/m1]</span><span class="tag">[f1]</span><span class="content">dame 1</span><span class="tag">[/f1]</span><br>
            ...<br>
        </blockquote>
        <blockquote>
            You party with your 
            <span class="tag">[m0]</span><span class="content">dudish</span><span class="tag">[/m0]</span><span class="tag">[f0]</span><span class="content">damish</span><span class="tag">[/f0]</span>
            <span class="subject">$0</span> and 
            <span class="tag">[m1]</span><span class="content">dudish</span><span class="tag">[/m1]</span><span class="tag">[f1]</span><span class="content">damish</span><span class="tag">[/f1]</span>
            <span class="subject">$2</span>.<br>
            You party with your dudish son and damish wife.<br>
            You party with your damish mother-in-law and dudish uncle.<br>
        </blockquote>
        ... and a combined-gender tag:
        <blockquote>
            <span class="tag">[m][/m]</span> (all subjects are male)<br>
            <span class="tag">[f][/f]</span> (all subjects are female)<br>
            <span class="tag">[x][/x]</span> (some male, some female)
        </blockquote>
        <blockquote>
            Your <span class="subject">$0</span> and <span class="subject">$1</span> are going 
            <span class="tag">[m]</span><span class="content">fishing</span><span class="tag">[/m]</span><span class="tag">[f]</span><span class="content">hang-gliding</span><span class="tag">[/f]</span><span class="tag">[x]</span><span class="content">to the park</span><span class="tag">[/x]</span>.<br>
            Your son and uncle are going fishing.<br>
            Your wife and niece are going hang-gliding.<br>
            Your uncle and niece and going to the park.<br>
        </blockquote>
        Family-related messages use the family_*_message fields for member names.
        
    </div>
    <div id="genderpreview">
    </div>
</div>

<div class="capturing uibase">
    <h1>CAPTURING</h1>
    <span id="capturing_status">Please wait...</span>
    <ol>
        <li>Wait for capture to finish (~20 seconds).</li>
        <li><span class="capturing_language_code">&nbsp;</span>.zip will automatically save.</li>
        <li>Move zip to PapersPlease/loc/ folder.<br>
        ie: PapersPlease/loc/<span class="capturing_language_code">&nbsp;</span>.zip
        </li>
        <li>Run game and select language from menu.</li>
    </ol>
    Reload page to reset view and continue working.
</div>

<div class="capturing_error_cleartype uibase">
    <h1>CAPTURE ERROR</h1>
    <p>Windows ClearType is enabled!</p>
    <p style="text-align: left">
    This will result in captures with smudged text.
    You must disable ClearType and restart Chrome before capturing.
    </p>
    <img src="img/ClearType.png"/>
</div>

<div class="uibase" id="notification"></div>

<div class="syncdiff uibase">
    <div class="panel">

        <i class="top fa fa-cloud"></i>
        <h1>Cloud Sync (<span></span>)</h1>

        <div class="login">
            <table>
            <tr><td class="label">GitHub User</td><td><input type="text" name="github-user" id="github-user"/></td></tr>
            <tr><td class="label">Password</td><td><input type="password" name="github-pass" id="github-pass"/></td></tr>
            <tr><td class="label">Repository</td><td><input type="text" name="github-repo" id="github-repo"/></td></tr>
            </table>
            <div class="buttons">
                <div class="button" id="sync-loginbutton">LOGIN</div>
                <div class="button" id="sync-cancelbutton3">CANCEL</div>
            </div>            
        </div>

        <div class="waiting">
            <img src="img/wait.gif"/>
        </div>

        <div class="doing">
            <div class="summary">
                <span class="changed"><span id="sync-changed"></span> changed</span>
                <span class="added"><span id="sync-added"></span> added</span>
                <span class="removed"><span id="sync-removed"></span> removed</span>
            </div>

            <table class="syncheader">
                <tr>
                    <th class="synccontext"><div>&nbsp;</div></th>
                    <th class="cloud"><div>CLOUD</div></th>
                    <th class="local"><div>LOCAL</div></th>
                </tr>
            </table>

            <div class="tableholder">
                <table id="synctable">
                </table>
            </div>

            <p>
                Select CLOUD or LOCAL value for each row.<br>
                (<a href="#" id="sync-selectallcloud">select all CLOUD</a> or <a href="#" id="sync-selectalllocal">select all LOCAL</a>)                
            </p>

            <div id="sync-url">
                <a target="_blank" id="sync-url-page">Open GitHub page for <span></span></a> -
                <a id="sync-relogin" href="#">Change repo (<span></span>)</a>
            </div>

            <div class="buttons">
                <div class="button" id="sync-syncbutton">SYNC</div>
                <div class="button" id="sync-cancelbutton">CANCEL</div>
            </div>
        </div>

        <div class="result">
            <div class="message"></div>
            <div class="buttons">
                <div class="button" id="sync-cancelbutton2">OK</div>
            </div>
        </div>

    </div>
</div>

</body>
</html>
