PennController.Template(
  row => PennController( "experiment-" + row.Condition ,
    //newFunction("debug", ()=>console.log("Trial #",row.item,"Group #",row.group,"Condition",row.Condition))
    //    .call()
    //,
    newTimer("start", 500)                      // Wait 500ms before starting
        .start()
        .wait()
    ,
    // LAYOUT PREPARATION
    newText("context sentence", "At home, some aliens were "+row.ColorFill+", some were "+row.ColorTest+" and some were "+row.ColorCheck+"." )
        .print()
    ,
    newText("test sentence", sentence( row.ColorTest ) )
        .settings.hidden()
        .print()
    ,
    canvasTargetFiller(                         // Create the target and filler images
    {    
        home:        {leftShip: [row.L1H, row.L2H, row.L3H], middleShip: [row.M1H, row.M2H, row.M3H, row.M4H], rightShip: [row.R1H, row.R2H, row.R3H]},
        transit:     (PennController.GetURLParameter("t")=="st"||(PennController.GetURLParameter("t")!="ag"&&PennController.GetURLParameter("m")=="c")
                      ? // trigger = still or (middle = continuous & trigger != again) > colors
                      {leftShip: [row.L1H, row.L2H, row.L3H], middleShip: [row.M1H, row.M2H, row.M3H, row.M4H], rightShip: [row.R1H, row.R2H, row.R3H]}
                      : // trigger = again or (middle = discontinuous & trigger != still) > grey
                      {leftShip: ["grey", "grey", "grey"],     middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]}),
        destination: {leftShip: [row.L1D, row.L2D, row.L3D], middleShip: [row.M1D, row.M2D, row.M3D, row.M4D], rightShip: [row.R1D, row.R2D, row.R3D]},
        
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
    }
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    // SELECTOR CREATION
    newSelector('trips')                               // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') )
        .settings.once()
        .settings.log()
        .shuffle()
        .settings.keys( "F" , "J" )
        .settings.disable()
    ,
    // KEY PRESS: change top sentence and fade out the irrelevant aliens
    newTooltip( "pressakey" , "Press a key" )
        .settings.frame( "none" )
        .settings.position( "center middle" )
        .settings.log()
        .print( getText("test sentence") )
        .wait()
    ,
    newVar("delay", 0)
        .settings.global()
        .set( v=>Date.now() )
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
    getText("test sentence")
        .settings.visible()
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
    getSelector('trips')
        .settings.enable()
        .wait()                                                             // Wait for selection
    ,
    getVar("delay")
        .set( v=>Date.now()-v )
        //.settings.log()
    ,
    newTimer("end", 500)                               // Wait 500ms before proceeding
        .start()
        .wait()
  )
  .log( "TriggerCode" , PennController.GetURLParameter("t") )
  .log( "Delay"       , getVar("delay")                     )
  .log( "Item"        , row.item                            )
  .log( "Group"       , row.group                           )
  .log( "Condition"   , row.Condition                       )
);