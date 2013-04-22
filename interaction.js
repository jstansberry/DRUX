var uncommittedTags = [];
var committedTags = [];
var annotationCats = {1:"LOCATION", 3:"PEOPLE", 2:"ORGANIZATION"};
var activeCategory = 0;
var documentText;

$(function() {
    $(document).load(function(){
        //TODO: fire request for annotation categories instead of local var
        //TODO: fire request for list of available documents /document browser
    });

    $('#doc').bind("mouseup", function() {
        if (getSelection().type === "Range" ) {
            var range = getSelection().getRangeAt(0);
            addAnnotation(range);
        }else{
            //Object could be active and user wishes to deactivate?
            //TODO: de-select item??
        }
    });

    $("li").click(function(){
        var thisCategoryID = $(this)[0].id.substr(9,1)
        $("li").each(function(){
            $(this).css("background-color","powderblue");
        });
        if(activeCategory == thisCategoryID){
            activeCategory = 0;
        }else{
            activeCategory = thisCategoryID;
            $(this).css("background-color","darkorange");
        }

        //User might wants to create an ad-hoc annotation
        //TODO: check for selected text then annotate it after category click
    });

    //TODO: modify this function to look for annotations and hover
    $("span[class='categorized']").hover(function(){

    });

    $("#selDocuments").change(function() {
        $("#docLabel").html($("#selDocuments option:selected").text())
        loadDocument($('#selDocuments').val());
        $('html, body').animate({
            scrollTop: $("#wrapper").offset().top-20}, 1500);
    });
});

function loadDocument(docName){
    //TODO: replace AJAX file access with DAL invocation
    uncommittedTags = [];
    committedTags = [];
    var $dataTXT = $.get("data/txt/" + docName + ".txt",function(txt){
        documentText = txt.replace(/[\r]/g, '');
    })
        .done(function() {
            var $dataXML = $.get("data/xml/" + docName + ".txt.xml", function(xml){
                parseXml(xml);
            })
                .done(function() {
                    //callback to process the committed tags
                    documentLoaded();
                })
                .fail(function(resp) {
                    $("#doc").html(documentText);
                    console.log("Warning: could not retrieve annotations");
                });
        })
        .fail(function(resp) {
            alert("Could not retrieve document!");
        });
}

function parseXml(xml) {
    $(xml).find("span").each(function() {
        var itmStart = $(this).find("charseq").attr("START");
        var itmEnd = $(this).find("charseq").attr("END");
        var itmCategory= $(this).attr("category");
        var itmAnnotation= $(this).find("charseq").text();
        committedTags[itmStart] = {"category":itmCategory,"start":itmStart,"end":itmEnd,"annotation":itmAnnotation};
    });
    //Build the content in reverse so the offset chars don't interfere with the count
    committedTags.reverse();
}

function  documentLoaded(){
    //TXT document loaded but not rendered - pre-insert formatting now
    //highlight all the selected items
    for (x in committedTags){
        var start = parseInt(committedTags[x]["start"]) ;
        var end = parseInt(committedTags[x]["end"]);
        var leftString = documentText.substr(0, start);
        var annotString = documentText.substring(start, end+1);
        var rightString = documentText.slice(end+1);
        var openTag = "<span class='categorized' id='annotation_"+x+"'>";
        var closeTag = "</span>";
        documentText = leftString + openTag + annotString + closeTag + rightString;
    }
    $("#doc").html(documentText);
    //TODO: clear the search/find tool? when new doc loaded
}

function addAnnotation(theRange){
    //TODO: determine if this node is already in memory!!!
    var tag = document.createElement("span");
    //TODO: Insert extensive whitespace and special character cleanup script here.
    // For now, just remove trailing whitespace
    if (theRange.toString().substr(theRange.toString().length-1,1) == " "){theRange.setEnd(theRange.endContainer,theRange.endOffset-1)}
    tag.id = "annotation_"+ theRange.startOffset;
    if(activeCategory != 0){
        tag.className = "categorized";
        committedTags[theRange.startOffset] = {"category":annotationCats[activeCategory],"start":theRange.startOffset,"end":theRange.endOffset,"annotation":theRange.toString()};
        console.log("category "+annotationCats[activeCategory],"start " + theRange.startOffset.toString(), "end " + theRange.endOffset,"annotation " + theRange.toString());
        theRange.surroundContents(tag);
        if($('#chkCopyToAll').attr('checked')){
            duplicateAnnotation(theRange.toString());
        }
    }else{
        alert("Please select an Annotation Category.  [//TODO:REPLACE with annotation]");
    }
}

function duplicateAnnotation(txt){
    //TODO: for each item on the page that isn't already annotated
    //annotate with the active category
    console.log("Duplicate each instance of this annotation");
}

function getUniqueID(){
    return  Math.floor((1 + Math.random()) * 1000000); //TODO: this better
}

function simulateSave(){
    console.log(committedTags );
}
