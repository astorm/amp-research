/* Adobe Data Insertion API */
var code_version = "cnn.amp.video:20160922";

//parent URL
var rurl = document.referrer||"https://www.cnn.com/";
var canonical = (window.location.search.match(new RegExp("canonical_url=(.*?)($|\&)", "i")) || [])[1] || "";
if (canonical) { rurl = canonical; }
var urls = rurl.split("/");
var rdomain = urls[2].replace("www.","");
var rurl2 = rurl.replace(/^https?:\/\//,"").replace("index.html","");
var rpath = rurl2.replace(urls[2],""); //remove domain

var s_account = "cnn-adbp-googleamp-event";
//if (rdomain.indexOf("money") != -1) { s_account = "aolturnercnnmoney-adbp-mobileweb-prod"; }
//if (rdomain.indexOf("cnnespanol") != -1 || rdomain.indexOf("cnne-test") != -1) { s_account = "cnn-adbp-esp"; }

//business unit - prop30/eVar30
var business_unit = (rdomain.indexOf("edition") != -1 ? "cnn international" : "cnn domestic");
if (rdomain.indexOf("money") != -1) { business_unit = "cnnmoney"; }
if (rdomain.indexOf("cnnespanol") != -1 || rdomain.indexOf("cnne-test") != -1) { business_unit = "cnnespanol"; }

//pageName - pageName/eVar26
var pagename = "";
var templateTypeSmall = "v";
var j = (rdomain.indexOf("money") != -1 ? "mny:" : "cnn:");
var buc_p32 = j + templateTypeSmall;
var lastTwoDomain = thirdLevelDomain = pagename = "";
var domain_array = rdomain.split(".");
var currentPointer = domain_array.length - 3;
thirdLevelDomain = (currentPointer >= 0 ? domain_array[currentPointer] : "");
lastTwoDomain = /(\.\w+\.\w+)$/.exec(rdomain);
if (lastTwoDomain) { thirdLevelDomain = rdomain.replace(lastTwoDomain[0],""); }
if (thirdLevelDomain === "") {
	pagename = buc_p32 + ":" + rpath;
} else {
	pagename = buc_p32 + ":" + thirdLevelDomain + ":" + rpath;
}
pagename = pagename.replace(":us","");	//fix for us.cnn.com domain

//subsection - prop28/eVar28
var subsection = "";

//section - channel/eVar27
var section = "";
var patt1 = /\/.+\/\d{4}\/\d{2}\/\d{2}\/.+/;
if (canonical && patt1.test(canonical)) {
	canonical = canonical.match(/\d{4}\/\d{2}\/\d{2}\/.+\//);
	canonical = canonical[0].split("/");
	section = canonical[3];
	if(canonical[4] && canonical[4].indexOf(".") == -1){
		subsection = canonical[4];
	}
} else if (/^\/.+\/\d{4}\/\d{2}\/\d{2}\/.+/.test(rpath)) {
	var i = rpath.match(/\d{4}\/\d{2}\/\d{2}\/.+\//);
	i = i[0].split("/");
	section = i[3];
	if(i[4] && i[4].indexOf(".") == -1){
		subsection = i[4];
	}
}else if(canonical && (!patt1.test(canonical))){
		canonical = canonical.split("/");
		section = canonical[3];
		if(canonical[4] && canonical[4].indexOf(".") == -1){
			subsection = canonical[4];
		}
}



//transaction id - prop46/eVar46
try {
	var cnnad_transactionID = Math.round((new Date()).getTime() / 1000) + "" + Math.floor(Math.random()*9007199254740992);
} catch(e) {}

window.trackMetrics = function(event) {
	if (event.type.match(/video-start/)) {
		var vdata = event.data || {};
		try {
			var vid_source = vdata.source || ""; //prop3,eVar3
			if (vdata.videoCollection && vdata.videoCollection != "" && vdata.videoCollection == "false" ) {
				vdata.videoCollection = "no video collection";
			}
			var vid_collection = vdata.videoCollection || "no video collection"; //prop60,eVar60
			var vid_section = vdata.sectionName || ""; //prop3,eVar3
		} catch(err){}
		var d = new Date();
		var video_xml = "" +
		"<?xml version='1.0' encoding='UTF-8'?>" +
		"<request>" +
			"<sc_xml_ver>1.0</sc_xml_ver>" +
			"<currencyCode>USD</currencyCode>" +
			"<timestamp>" + d.toISOString() + "</timestamp>" +
			"<language>en-us</language>" +
			"<visitorID>" + (cnnad_transactionID || "1234567890") + "</visitorID>" +
			"<reportSuiteID>" + s_account + "</reportSuiteID>" +
			"<events>event32</events>" +
			"<linkName>amp-video-start: " + ( decodeURI(vdata.video_title) || "") + "</linkName>" +
			"<linkType>o</linkType>" +
			"<pageName>" + pagename + "</pageName>" +
			"<eVar26>" + pagename + "</eVar26>" +
			"<prop1>google amp</prop1>" +
			"<eVar1>google amp</eVar1>" +
			"<prop3>" + vid_section + "</prop3>" +
			"<eVar3>" + vid_section + "</eVar3>" +
			"<prop7>" + (vdata.trt || "") + "</prop7>" +
			"<eVar7>" + (vdata.trt || "") + "</eVar7>" +
			"<prop14>google amp</prop14>" +
			"<eVar14>google amp</eVar14>" +
			"<prop23>" + (decodeURI(vdata.headline) || "") + "</prop23>" +
			"<eVar23>" + (decodeURI(vdata.headline) || "") + "</eVar23>" +
			"<channel>" + section + "</channel>" +
			"<eVar27>" + section + "</eVar27>" +
			"<prop28>" + section + ":" + subsection + "</prop28>" +
			"<eVar28>" + section + ":" + subsection + "</eVar28>" +
			"<server>" + rdomain + "</server>" +
			"<eVar29>" + rdomain + "</eVar29>" +
			"<prop29>" + (decodeURI(vdata.video_title) || "") + "</prop29>" +
			"<eVar41>" + (decodeURI(vdata.video_title) || "") + "</eVar41>" +
			"<prop30>" + business_unit + "</prop30>" +
			"<eVar30>" + business_unit + "</eVar30>" +
			"<prop32>content:video</prop32>" +
			"<eVar32>content:video</eVar32>" +
			"<prop33>adbp:video start</prop33>" +
			"<eVar33>adbp:video start</eVar33>" +
			"<prop35>" + code_version + "</prop35>" +
			"<eVar35>" + code_version + "</eVar35>" +
			"<eVar42>" + (vdata.video_id || "") + "</eVar42>" +
			"<prop46>" + (cnnad_transactionID || "") + "</prop46>" +
			"<eVar46>" + (cnnad_transactionID || "") + "</eVar46>" +
			"<prop54>video:vod:non tve:clip:clip:content</prop54>" +
			"<eVar54>video:vod:non tve:clip:clip:content</eVar54>" +
			"<prop60>" + vid_collection + "</prop60>" +
			"<eVar60>" + vid_collection + "</eVar60>" +
			"<prop64>cnn news</prop64>" +
			"<eVar64>cnn news</eVar64>" +
			"<prop71>" + vid_source + "</prop71>" +
			"<eVar71>" + vid_source + "</eVar71>" +
		"</request>";
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","https://smetrics.cnn.com/b/ss//6",true);
		xmlhttp.send(video_xml);
	}
}