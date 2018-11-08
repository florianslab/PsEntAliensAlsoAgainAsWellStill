//PennController.Debug();

PennController.ResetPrefix(null);
PennController.AddHost("http://files.lab.florianschwarz.net/ibexfiles/Pictures/"); // Where the pictures are hosted

// Sequence of trials
PennController.Sequence( "checksona" , "consent" , "prepractice" , startsWith("practice") , randomize(startsWith("experiment")) , "feedback" , "send" , "debriefing" );


// DEFAULT SETTINGS FOR TOOLTIPS AND SELECTORS
PennController.Header(
    defaultSelector
        .settings.frame( "solid 2px purple" )       // Visible frame that stands out
        .settings.disableClicks()                   // No selection through click
        .settings.log()                             // Keep a log of selection
    ,
    defaultTooltip
        .settings.position("middle right")          // Vertically centered and horizontally on the right by default
        .settings.size(170,90)                      // All tooltips are 170x90
        .settings.frame()                           // Add a frame around the element attached to
        .settings.key(32, "no click")               // Tooltips can be validated by pressing space (key code = 32)
);



// ####     PRE- & POST-TASK SCREENS     ####
// #

// CHECK THAT PARTICIPANT ARRIVED FROM SONA
PennController( "checksona" ,
    newVar( "SonaID" , PennController.GetURLParameter("id") )
        .testNot.is()
        .success(
            end()
        )
        .failure(
            newText("error", "<p>Oops! It looks like you did not arrive here through the SONA systems.</p><p>Please make sure to click the link to this experiment from SONA.</p>")
                .settings.bold()
                .settings.color("red")
                .print()
            ,
            newTimer("forever", 1)
                .wait()
        )  
)
.log( "SonaID" , PennController.GetURLParameter("id") )
.setOption( "hideProgressBar" , true );             // Hide the progress bar for now;

                
// CONSENT FORM
PennController( "consent" ,
    newHtml( "consent form" , "IbexConsentSona2018.html" )
        .settings.css( "margin-top" , "-5em" )
        .print()
    ,
    newButton( "consent button" , "I consent to these terms" )
        .settings.center()
        .print()
        .wait()
)
.log( "SonaID" , PennController.GetURLParameter("id") )
.setOption( "hideProgressBar" , true );             // Hide the progress bar for now


// PRE-PRACTICE SCREEN
PennController( "prepractice" ,                
    newText( "presskey" , "We will now guide you through the task. Press any key to start." )
        .print()
    ,
    newKey("any", "")
        .wait()
)
.log( "SonaID" , PennController.GetURLParameter("id") )
.setOption( "hideProgressBar" , true );             // Hide the progress bar for now



// FEEDBACK
PennController( "feedback" ,
    newText("last", "<p>That was the last trial! Your responses have yet to be sent to ours server before you receive your credit.</p>")
        .print()
    ,
    newText("warning", "Do NOT close this window yet, or we won't be able to grant you credits! ")
        .settings.bold()
        .settings.color("red")
        .settings.after( newText("next", " Wait for the confirmation link on the next screen.") )
        .print()
    ,
    newText("write", "<p>Before we collect your responses, feel free to leave us any comments in the box below.</p>")
        .print()
    ,               
    newTextInput("feedback", "Write your comments here...")
        .settings.center()
        .settings.css("text-align", "left")
        .settings.lines(10)
        .settings.log()
        .print()
    ,
    newButton("continue", "Send my responses")
        .settings.center()
        .print()
        .wait()
)
.log( "SonaID" , PennController.GetURLParameter("id") )
.setOption( "countsForProgressBar" , false );


// SEND RESULTS
PennController.SendResults("send");


// DEBRIEFING
(function(){      // Encapsulation for minimal security concerns (no direct access to 'link')
var link = decodeOnce("YWJodHRwczovL3VwZW5uLnNvbmEtc3lzdGVtcy5jb20vd2Vic3R1ZHlfY3JlZGl0LmFzcHg/"+
                      "ZXhwZXJpbWVudF9pZD0yOTUmY3JlZGl0X3Rva2VuPTFmMmRiZjYzZGU1ODQ2ODM5YWM4ZmFkODZjODFiYTUxJnN1cnZleV9jb2RlPWFi") +
               PennController.GetURLParameter("id");

PennController( "debriefing" ,
    newText("confirmation", "<p>Thank you, your results have been sent!</p>")
        .settings.center()
        .print()
    ,
    newText("link", "<a href='"+link+"' target='_blank'>Click here to confirm your participation on SONA and <strong>receive your credits</strong>.</a>")
        .settings.css({
            'font-size': 'larger',
            'color': 'blue'
        })
        .settings.center()
        .print()
    ,
    newHtml("debriefing", "debriefing.html")
        .print()
    ,
    newTimer("forever", 1)
        .wait()
)
.setOption( "countsForProgressBar" , false );
})();


// ####     FUNCTION DEFINITIONS     ####
// #

// Returns the right test sentence for the right trigger
var sentence = color => {
    switch (PennController.GetURLParameter("t")) {
        case "ag":
          return "Exactly two of these four aliens were "+color+" again at destination.";
        case "st":
          return "Exactly two of these four aliens still were "+color+" at destination.";
        case "al":
          return "Exactly two of these four aliens also were "+color+" at destination.";
        case "aw":
        default:
          return "Exactly two of these four aliens were "+color+" at destination as well.";
    }
};
