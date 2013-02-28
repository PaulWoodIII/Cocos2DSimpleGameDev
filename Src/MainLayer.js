// 1
var MainLayer = cc.LayerColor.extend({
 
    // 2
    ctor:function() {
        this._super();
 
        // 3
        cc.associateWithNative( this, cc.LayerColor );
    },
 
    // 4
    onEnter:function () {
        this._super();
 
        // 5
        var player = cc.Sprite.create(s_player);
 
        // 6
        player.setPosition(player.getContentSize().width / 2, winSize.height / 2);
 
        // 7
        this.addChild(player);
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
