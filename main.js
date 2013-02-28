var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
        cc.Loader.getInstance().preload(g_ressources);
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        // 1
        director = cc.Director.getInstance();
        winSize = director.getWinSize();
        centerPos = cc.p( winSize.width/2, winSize.height/2 );
        director.runWithScene(new this.startScene());
        return true;
    }
});
 
// 2
var director;
var winSize;
var centerPos;
var myApp = new cocos2dApp(MainLayer.scene);