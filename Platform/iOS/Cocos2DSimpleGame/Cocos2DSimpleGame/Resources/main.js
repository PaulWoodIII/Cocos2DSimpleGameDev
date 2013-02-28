require("jsb.js");
require("Src/resource.js");
require("Src/MainLayer.js");
require("Src/GameOver.js");

director = cc.Director.getInstance();
winSize = director.getWinSize();
centerPos = cc.p( winSize.width/2, winSize.height/2 );


//------------------------------------------------------------------
//
// Main entry point
//
//------------------------------------------------------------------
function run()
{
    director.runWithScene( MainLayer.scene() );
}

run();

