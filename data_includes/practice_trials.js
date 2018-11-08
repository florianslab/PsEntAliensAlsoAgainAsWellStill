// All the instructions tooltips have the same format (almost)
var instructions = (where, text, position) =>
    getTooltip('instructions')
        .settings.label("Press Space")               // The bottom-right label
        .settings.text(text)                         // Update the instructions tooltip's text
        .settings.position(position||"middle right") // (Re-)position it
        .print(where)                                // Attach it to the specified element, and
        .wait();                                     // Wait for validation


// FIRST PRACTICE TRIAL:     VISIBLE = GOOD
PennController( "practice good" ,
    newText("practice label", "Practice")            // Practice label, top of the screen
        .print()
    ,
    newTooltip("instructions", "")                   // Let's create the instructions tooltip (no text for now)
    ,
    // LAYOUT PREPARATION
    newText("context sentence", "At home, some aliens were blue, some were green and some were red.")
        .print()
    ,
    newText("test sentence", sentence("red") )
        .settings.hidden()
        .print()
    ,    
    canvasTargetFiller(                             // Create the target and filler images
    {    
        home:        {leftShip: ["red", "blue", "green"], middleShip: ["red", "red",  "red", "blue"],   rightShip: ["red", "blue", "green"]},
        transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                      ? // trigger = still or (middle = continuous & trigger != again) > colors
                      {leftShip: ["red", "blue", "green"], middleShip: ["red", "red",  "red", "blue"],   rightShip: ["red", "blue", "green"]}
                      : // trigger = again or (middle = discontinuous & trigger != still) > grey
                      {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
        destination: {leftShip: ["red", "red",  "green"], middleShip: ["red", "blue", "red", "blue"],   rightShip: ["red", "blue",  "blue"]}
        
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]}
    }    
    ).settings.add( 620, 5,                             // Add the planet to be revealed, but hide it for now (only in practice trials)
        canvas3Planets("reveal",
          {    
            home:        {leftShip: ["pink", "orange", "yellow"], middleShip: ["pink", "pink", "pink", "orange"],   rightShip: ["pink", "orange", "yellow"]},
            transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                          ? // trigger = still or (middle = continuous & trigger != again) > colors
                          {leftShip: ["pink", "orange", "yellow"], middleShip: ["pink", "pink", "pink", "orange"],   rightShip: ["pink", "orange", "yellow"]}
                          : // trigger = again or (middle = discontinuous & trigger != still) > grey
                          {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
            destination: {leftShip: ["pink", "pink",   "yellow"], middleShip: ["pink", "orange", "pink", "orange"], rightShip: ["pink", "orange", "orange"]}
          }    
        ) , -1
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    getCanvas('target-Transit').settings.hidden(),      // Hide the transit planet for now
    getCanvas('target-Destination').settings.hidden(),  // Hide the destination planet for now
    getCanvas('filler').settings.hidden(),              // Hide the picture on the right for now
    getCanvas('reveal').settings.hidden()               // Hide the picture on the right for now
    ,
    // INSTRUCTIONS
    instructions( getCanvas('target-Home')            , "These aliens are moving out from their home planet." ),
    instructions( getCanvas('target-Home')            , "They are traveling using three space ships." ),
    instructions( getCanvas('target-Home-leftShip')   , "For instance, these three aliens are traveling in one ship together." ),
    instructions( getCanvas('target-Home-middleShip') , "And these four aliens are traveling in another ship together." )
    ,
    getCanvas('target-Transit')          
        .settings.visible()                             // Reveal transit planet
    ,
    instructions( getCanvas('target-Transit')         , "They all stop by a transit planet"+
                  (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                   ?
                   ""
                   :
                   ", where they all are temporarily grey")+
                  "..." )
    ,
    getCanvas('target-Destination')
        .settings.visible()                             // Reveal destination planet
    ,
    instructions( getCanvas('target-Destination')     , "... before arriving at their destination. As you can see, some of them are now a different color." )
    ,
    getCanvas('filler')
        .settings.visible()                             // Reveal picture on the right (B&W)
    ,
    newTimer("filler revelation", 200)                  // Give participant some time to digest
        .start()
        .wait()
    ,
    instructions( getCanvas('filler')      , "Here, you can see 10 other aliens, also moving out from their planet."    , "bottom center" ),
    instructions( getCanvas('filler')      , "We applied a filter screen, so you cannot see their colors."              , "bottom center" ),
    instructions( getText('context sentence') , "A sentence at the top of the screen describes a group of aliens at home." , "top center" ),
    instructions( getText('planets')       , "For all we know so far, the sentence could be describing either picture." , "bottom center" ),
    instructions( getText('context sentence'), "You get more information about the described aliens after you press a key." , "top center")
    ,
    // KEY PRESS: change top sentence and fade out the irrelevant aliens
    newTooltip( "pressakey" , "Press a key" )
        .settings.frame( "none" )
        .settings.position( "center middle" )
        .settings.log()
        .print( getText("test sentence") )
        .wait()
    ,
    getText('test sentence')
        .settings.visible()
    ,
    getCanvas( "target-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"})
    ,
    instructions( getText('test sentence') , "You gain new information about the aliens in the middle ship."             , "top center"    ),
    instructions( getCanvas('planets')     , "Your task will be to guess which of the two pictures is being described."  , "bottom center" ),
    instructions( getText('test sentence') , "Importantly, the description always matches <em>only one</em> of the pictures.", "top center"),
    instructions( getCanvas('planets')     , "Now choose one of the two pictures by pressing a key."                     , "bottom center" ),
    instructions( getCanvas('target')      , "Press <strong>F</strong> if you think the picture on the left matches..."  , "bottom center" ),
    instructions( getCanvas('filler')      , "or <strong>J</strong> if you think the picture on the right is a better match." , "bottom center" )
    ,
    getCanvas('planets')
        .settings.add( "center at 290" , 260 , newText("key left"  , "F") )
        .settings.add( "center at 870" , 260 , newText("key right" , "J") )
    ,
    // SELECTION
    newTimer('before selection', 100)
        .start()
        .wait()
    ,
    newSelector('trips')                                                    // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') , getCanvas('reveal') )
        .settings.keys( "F" , "J" )                                         // Set the keys for selection
        .wait()                                                             // Wait for selection

        .test.selected( getCanvas('filler') )                               // If filler was selected...
        .success(
            // WRONG PICTURE SELECTED BLOCK
            getSelector('trips').settings.disable()                         // Temporarily disable selector
            ,
            getTooltip("instructions").settings.css( "background-color", "tomato" ) // Beautiful tomato background color for negative feedback
            ,
            instructions( getCanvas("filler") , "Wrong, you should have selected the visible picture"           , "bottom center" ),
            instructions( getCanvas("target") , "As you can see, the aliens' colors match the description here" , "bottom center" )
            ,
            getCanvas('reveal').settings.visible(),                         // Now reveal the colors
            getCanvas('filler').remove()                                    // And remove the b&w picture
            ,
            instructions( getCanvas("reveal") , "Once we remove the filter, you can see the aliens' colors in fact do not match here." , "bottom center" )
            ,
            getSelector('trips')
                .settings.enable()                                          // Re-enable selector
                .wait( getSelector('trips').test.selected(getCanvas('target')) ) // Wait for selection of the correct picture
            ,
            getTooltip("instructions").settings.css( "background-color", "floralwhite" ) // Back to normal background color
            // END WRONG PICTURE SELECTED BLOCK
        )
    ,
    getCanvas("reveal").settings.visible(),                 // Reveal colors (if not already revealed)
    getCanvas("filler").remove(),                           // Remove BW filler (if not done yet)
    getSelector('trips').settings.disable()                 // Temporarily disable selector
    ,
    instructions( getCanvas("target")  , "Right, this picture matches the description"       , "bottom center" ),
    instructions( getCanvas("reveal")  , "... while this one, as a matter of fact, does not" , "bottom center" ),
    instructions( getCanvas("planets") , "Things won't always be so simple though. Let's go through a second practice trial." , "middle center" )
    ,
    newTimer("end", 500)                                    // Wait 500ms before proceeding
        .start()
        .wait()
)
.log( "TriggerCode" , PennController.GetURLParameter("t") );







// SECOND PRACTICE TRIAL:     VISIBLE = BAD
PennController( "practice bad" ,
    newText("practice label", "Practice")            // Practice label, top of the screen
        .print()
    ,
    newTooltip("instructions", "")                  // Let's create the instructions tooltip (no text for now)
    ,
    newTimer("start", 500)                      // Wait 500ms before starting
        .start()
        .wait()
    ,
    // LAYOUT PREPARATION
    newText("context sentence", "At home, some aliens were red, some were green and some were blue.")
        .print()
    ,
    newText("test sentence",   sentence("blue") ) 
        .settings.hidden()
        .print()
    ,
    canvasTargetFiller(                         // Create the target and filler images
    {    
        home:        {leftShip: ["red", "blue", "green"], middleShip: ["red", "blue", "blue", "blue"],  rightShip: ["red", "blue", "green"]},
        transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                      ? // trigger = still or (middle = continuous & trigger != again) > colors
                      {leftShip: ["red", "blue", "green"], middleShip: ["red", "blue", "blue", "blue"],  rightShip: ["red", "blue", "green"]}
                      : // trigger = again or (middle = discontinuous & trigger != still) > grey
                      {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
        destination: {leftShip: ["red", "red",  "green"], middleShip: ["red", "red",  "red",  "blue"],  rightShip: ["red", "blue",  "blue"]}
        
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]}
    }    
    ).settings.add( 620, 5,                             // Add the planet to be revealed, but hide it for now (only in practice trials)
        canvas3Planets("reveal",
          {    
              home:        {leftShip: ["red", "blue", "green"], middleShip: ["red", "blue", "blue", "blue"],  rightShip: ["red", "blue", "green"]},
              transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                            ? // trigger = still or (middle = continuous & trigger != again) > colors
                            {leftShip: ["red", "blue", "green"], middleShip: ["red", "blue", "blue", "blue"],  rightShip: ["red", "blue", "green"]}
                            : // trigger = again or (middle = discontinuous & trigger != still) > grey
                            {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
              transit:     {leftShip: ["grey", "grey", "grey"], middleShip: ["grey", "grey", "grey", "grey"], rightShip: ["grey", "grey", "grey"]},
              destination: {leftShip: ["red", "red",  "green"], middleShip: ["red", "blue", "red",  "blue"],  rightShip: ["red", "blue",  "blue"]}
          }    
        ) , -1
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    getCanvas('reveal').settings.hidden()               // Hide the picture on the right for now
    ,
    // INSTRUCTIONS
    instructions( getCanvas('planets')     , "As you can see, the layout is the same in each trial."                              , "bottom center" ),
    instructions( getCanvas('target')      , "You can see the colors of these 10 aliens on each planet..."                        , "bottom center" ),
    instructions( getCanvas('filler')      , "... but you cannot see the colors of these 10 aliens."                              , "bottom center" ),
    instructions( getText('context sentence') , "Now press a key to learn more about the described aliens"                        , "top center"    )
    ,
    // KEY PRESS: change top sentence and fade out the irrelevant aliens
    newTooltip( "pressakey" , "Press a key" )
        .settings.frame( "none" )
        .settings.position( "center middle" )
        .settings.log()
        .print( getText("test sentence") )
        .wait()
    ,
    getText('test sentence')
        .settings.visible()
    ,
    getCanvas( "target-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"})
    ,
    instructions( getText('test sentence') , "Guess which picture this sentence describes."                                                  , "bottom center" ),
    instructions( getCanvas('target')      , "Press <strong>F</strong> if you think the sentence describes what happened to these aliens..." , "bottom center" ),
    instructions( getCanvas('filler')      , "... or <strong>J</strong> if you think the sentence describes what happened to these aliens"   , "bottom center" )
    ,
    getCanvas('planets')
        .settings.add( "center at 290" , 260 , newText("key left"  , "F") )
        .settings.add( "center at 870" , 260 , newText("key right" , "J") )
    ,
    // SELECTION
    newTimer('before selection', 100)
        .start()
        .wait()
    ,
    newSelector('trips')                                                    // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') , getCanvas('reveal') )
        .settings.keys( "F" , "J" )                                         // Set the keys for selection
        .wait()                                                             // Wait for selection

        .test.selected( getCanvas('target') )                               // If target was selected...
        .success(
            // WRONG PICTURE SELECTED BLOCK
            getSelector('trips').settings.disable()                         // Temporarily disable selector
            ,
            getTooltip("instructions").settings.css( "background-color", "tomato" ) // Beautiful tomato background color for negative feedback
            ,
            instructions( getCanvas("target") , "Wrong, this picture visibly does not match the description"  , "bottom center" ),
            instructions( getCanvas("filler") , "therefore, it must accurately describe this picture instead" , "bottom center" )
            ,
            getSelector('trips')
                .settings.enable()                                          // Re-enable selector
                .wait( getSelector('trips').test.selected(getCanvas('filler')) ) // Wait for selection of the correct picture
            ,
            getTooltip("instructions").settings.css( "background-color", "floralwhite" ) // Back to normal background color
           // END WRONG PICTURE SELECTED BLOCK
        )
    ,
    getSelector('trips').settings.disable()                 // Temporarily disable selector
    ,
    instructions( getCanvas("filler") , "Right, this picture has to match the desription, since the other one does not"   , "bottom center" )
    ,
    getCanvas("reveal").settings.visible(),                 // Reveal colors (if not already revealed)
    getCanvas("filler").remove()                            // Remove BW filler (if not done yet)
    ,
    instructions( getCanvas("reveal")  , "... and as a matter of fact, once we remove the filter, we can see that the colors match" , "bottom center" ),
    instructions( getCanvas("planets") , "Now that your task is clear, we will no longer remove the filter"                         , "middle center" ),
    instructions( getCanvas("planets") , "Let's go through one last practice trial before starting the experiment"                  , "middle center" )
    ,
    newTimer("end", 500)                                    // Wait 500ms before proceeding
        .start()
        .wait()
)
.log( "TriggerCode" , PennController.GetURLParameter("t") );





// THIRD PRACTICE TRIAL:     VISIBLE = BAD    ;    NO REVEALING
PennController( "practice no reveal" ,
    newText("practice label", "Practice")            // Practice label, top of the screen
        .print()
    ,
    newTooltip("instructions", "")                  // Let's create the instructions tooltip (no text for now)
    ,
    newTimer("start", 500)                      // Wait 500ms before starting
        .start()
        .wait()
    ,
    // LAYOUT PREPARATION
    newText("context sentence", "At home, some aliens were yellow, some were blue and some were pink.")
        .print()
    ,
    newText("test sentence",    sentence("pink") )
        .settings.hidden()
        .print()
    ,
    canvasTargetFiller(                         // Create the target and filler images
    {    
        home:        {leftShip: ["blue", "blue", "yellow"], middleShip: ["yellow", "blue", "blue", "blue"],   rightShip: ["yellow", "blue", "yellow"]},
        transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                      ? // trigger = still or (middle = continuous & trigger != again) > colors
                      {leftShip: ["blue", "blue", "yellow"], middleShip: ["yellow", "blue", "blue", "blue"],   rightShip: ["yellow", "blue", "yellow"]}
                      : // trigger = again or (middle = discontinuous & trigger != still) > grey
                      {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
        destination: {leftShip: ["blue", "blue", "yellow"], middleShip: ["yellow", "yellow", "blue", "blue"], rightShip: ["yellow", "blue", "yellow"]},
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]}
    }
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    // KEY PRESS: change top sentence and fade out the irrelevant aliens
    newTooltip( "pressakey" , "Press a key" )
        .settings.frame( "none" )
        .settings.position( "center middle" )
        .settings.log()
        .print( getText("test sentence") )
        .wait()
    ,
    getText('test sentence')
        .settings.visible()
    ,
    getCanvas( "target-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "target-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-leftShip"         ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-rightShip"        ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Home-ships"            ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-leftShip"      ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-rightShip"     ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Transit-ships"         ).settings.css({opacity: 0.25, filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-leftShip"  ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-rightShip" ).settings.css({opacity: 0.5,  filter: "grayscale(50%)"}),
    getCanvas( "filler-Destination-ships"     ).settings.css({opacity: 0.25, filter: "grayscale(50%)"})
    ,
    getCanvas('planets')
        .settings.add( "center at 290" , 260 , newText("key left"  , "F") )
        .settings.add( "center at 870" , 260 , newText("key right" , "J") )
    ,
    // SELECTION
    newTimer('before selection' , 100)
        .start()
        .wait()
    ,
    newSelector('trips')                                                    // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') )
        .settings.keys( "F" , "J" )                                         // Set the keys for selection
        .wait()                                                             // Wait for selection
        .settings.disable()

        .test.selected( getCanvas('filler') )                               // If filler was selected...
        .success(
            instructions( getCanvas("filler") , "Right, this picture has to match the description, since the other one does not"            , "bottom center" )
        )
        .failure(
            // WRONG PICTURE SELECTED BLOCK
            getTooltip("instructions").settings.css( "background-color", "tomato" ) // Beautiful tomato background color for negative feedback
            ,
            instructions( getCanvas("target") , "Wrong, this picture does not match the description, so the other one is the right choice"  , "bottom center" )
            ,
            getTooltip("instructions").settings.css( "background-color", "floralwhite" ) // Back to normal background color
           // END WRONG PICTURE SELECTED BLOCK
        )
    ,
    instructions( getCanvas("planets") , "This was the last practice trial. Now let us start the experiment."     , "middle center" )
    ,
    newTimer("end", 500)                                    // Wait 500ms before proceeding
        .start()
        .wait()
)
.log( "TriggerCode" , PennController.GetURLParameter("t") );