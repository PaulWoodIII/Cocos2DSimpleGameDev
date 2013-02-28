// 1 This creates a new class called MainLayer that extends from Cocos2D’s LayerColor class. Note that in Cocos2D Javascript bindings, all Cocos2D classes have the cc prefix.
var MainLayer = cc.LayerColor.extend({
	
		_monsters:[],
		_projectiles:[],
		
    // 2 Creates a constructor for the class, that calls the superclass’s constructor.
    ctor:function() {
        this._super();
 
        // 3 In Cocos2D Javascript bindings, whenever you derive from a Cocos2D class you have to call this method to associate it with the appropriate native class.
        cc.associateWithNative( this, cc.LayerColor );
    },
 
    // 4 When a node is added for the first time to a scene, Cocos2D calls onEnter on it. So this is a good place to put initialization code for a layer.
    onEnter:function () {
        this._super();
 
        // 5 This line creates a sprite and puts it in a variable named player. Note for the name of the sprite you pass in the constant s_player that you created earlier.
        var player = cc.Sprite.create(s_player);
 
        // 6 Sets the position of the sprite to be the middle-left of the screen. winSize is a handy constant you will define later.
        player.setPosition(player.getContentSize().width / 2, winSize.height / 2);
 
        // 7 Finally, adds the player sprite to the layer.
        this.addChild(player);
				
				
				this.schedule(this.gameLogic, 3);
    },
		addMonster:function() {
 
		    var monster = cc.Sprite.create(s_monster);
 
		    // Determine where to spawn the monster along the Y axis
		    var minY = monster.getContentSize().height / 2;
		    var maxY = winSize.height - monster.getContentSize().height / 2;
		    var rangeY = maxY - minY;
		    var actualY = (Math.random() * rangeY) + minY; // 1
 
		    // Create the monster slightly off-screen along the right edge,
		    // and along a random position along the Y axis as calculated above
		    monster.setPosition(winSize.width + monster.getContentSize().width/2, actualY);
		    this.addChild(monster); // 2
 
		    // Determine speed of the monster
		    var minDuration = 2.0;
		    var maxDuration = 4.0;
		    var rangeDuration = maxDuration - minDuration;
		    var actualDuration = (Math.random() % rangeDuration) + minDuration;
 
		    // Create the actions
		    var actionMove = cc.MoveTo.create(actualDuration, cc.p(-monster.getContentSize().width/2, actualY)); // 3
		    var actionMoveDone = cc.CallFunc.create(function(node) { // 4
		        cc.ArrayRemoveObject(this._monsters, node); // 5
		        node.removeFromParent();
		    }, this); 
		    monster.runAction(cc.Sequence.create(actionMove, actionMoveDone));
 
		    // Add to array
		    monster.setTag(1);
		    this._monsters.push(monster); // 6
 
		},
		// let’s make sure your addMonster function is called periodically.
		gameLogic:function(dt) {
		    this.addMonster();
		}
 
 	 
 
});

// 1
MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};
 
// 2
MainLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MainLayer.create();
    scene.addChild(layer);
    return scene;
};
