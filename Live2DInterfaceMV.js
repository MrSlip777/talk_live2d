//-----------------------------------------------------------------------------
// Game_Live2d
//ゲームに使用するLive2Dの制御フラグ、設定ファイルなど
// Slip 2016/12/25
//-----------------------------------------------------------------------------

//コアスクリプトの修正
var $gameLive2d       = null;

DataManager.createGameObjects = function() {
    $gameTemp          = new Game_Temp();
    $gameSystem        = new Game_System();
    $gameScreen        = new Game_Screen();
    $gameTimer         = new Game_Timer();
    $gameMessage       = new Game_Message();
    $gameSwitches      = new Game_Switches();
    $gameVariables     = new Game_Variables();
    $gameSelfSwitches  = new Game_SelfSwitches();
    $gameActors        = new Game_Actors();
    $gameParty         = new Game_Party();
    $gameTroop         = new Game_Troop();
    $gameMap           = new Game_Map();
    $gamePlayer        = new Game_Player();
    $gameLive2d        = new Game_Live2d();   //Slip 2017/03/25
};

Scene_Map.prototype.update = function() {
    this.updateDestination();
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    } else if (SceneManager.isNextScene(Scene_Battle)) {
        this.updateEncounterEffect();
    }
    this.updateWaitCount();
    this.updatelive2d();//Slip 2017/03/22
    Scene_Base.prototype.update.call(this);
};

Scene_Map.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    if (!SceneManager.isNextScene(Scene_Battle)) {
        this._spriteset.update();
        this._mapNameWindow.hide();
        SceneManager.snapForBackground();
    }
    $gameScreen.clearZoom();
    this.removeChild(this._fadeSprite);
    this.removeChild(this._mapNameWindow);
    this.removeChild(this._windowLayer);
    this.removeChild(this._spriteset);
    this.removelive2d(); //Slip 2017/03/25
};

Scene_Map.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createMapNameWindow();
    this.createlive2d(); //Slip 2017/03/25    
    this.createWindowLayer();
    this.createAllWindows();
};

//Game_Live2dの追加
function Game_Live2d() {
    this.initialize.apply(this, arguments);
}

Game_Live2d.prototype.initialize = function() {
    //モデルの数
    this.MAXNUMBER = 16;

    this._visible = {};
    this._modelfile = {};
    this._x = {};
    this._y = {};
    this._scale_x = {};
    this._scale_y = {};
    this._expression = {};
    this._motion_no = {};
    this._alpha = {};
    this._targetX = {};
    this._targetY = {};
    this._targetScaleX = {};
    this._targetScaleY = {};
    this._targetAlpha = {};    
    this._duration = {};    


    for(var i = 0; i < this.MAXNUMBER; i++){
        this._visible[i] = false;
        this._modelfile[i] = $Stand_Character_FileName_obj[$SPM_Live2d_CharaName[i]];
        this._x[i] = 0;
        this._y[i] = 0;
        this._scale_x[i] = 1.0;
        this._scale_y[i] = 1.0;
        this._expression[i] = "expression1";
        this._motion_no[i] = 0;
        this._alpha[i] = 1.0;
        this._targetX[i] = 0;
        this._targetY[i] = 0;
        this._targetScaleX[i] = 0;
        this._targetScaleY[i] = 0;
        this._targetAlpha[i] = 0;    
        this._duration[i] = 0;
    }
};

//表示設定
Game_Live2d.prototype.showModel = function(model_no) {
    this._visible[model_no] = true;
};

//非表示設定
//非表示自体はLive2DSprite.prototype._renderWebGLにて透過度が$SPM_live2d_minOpacityのとき
//に非表示にしているため、以下の関数は使用していない　Slip 2017/04/02
Game_Live2d.prototype.hidePicture = function(model_no) {
    this._visible[model_no] = false;
};

//表情制御
Game_Live2d.prototype.setExpression = function(model_no,expression,motion_no) {
    this._expression[model_no] = expression;
    this._motion_no[model_no] = motion_no;
};

//live2dモデル表示直後のパラメータ設定
Game_Live2d.prototype.initModelParameter = function(model_no, x, y, scale_x, scale_y,alpha){
    this._x[model_no] = x;
    this._y[model_no] = y;
    this._scale_x[model_no] = scale_x;
    this._scale_y[model_no] = scale_y;
    this._alpha[model_no] = alpha;   
};

//live2dモデル移動後のパラメータ設定
Game_Live2d.prototype.moveModelParameter = function(model_no, x, y, scale_x, scale_y,alpha, duration){
    this._targetX[model_no] = x;
    this._targetY[model_no] = y;
    this._targetScaleX[model_no] = scale_x;
    this._targetScaleY[model_no] = scale_y;
    this._targetAlpha[model_no] = alpha;
    this._duration[model_no] = duration;
};

//-----------------------------------------------------------------------------
//Scene_Map.prototype.createlive2d
//会話上にLive2Dモデルを表示する関数 
// Slip 2016/12/25
//-----------------------------------------------------------------------------

Scene_Map.prototype.createlive2d = function(){

     this.live2dSprite  = {};
    // slip 2017/03/18
    for (var i = 0; i < $gameLive2d.MAXNUMBER; i++){
        if($gameLive2d._modelfile[i] != ''){
            
            this.live2dSprite[i] = new PIXI.Live2DSprite(
            $gameLive2d._modelfile[i], {
                debugLog: false,
                randomMotion: false,
                eyeBlink: false,
            });


            //this.live2dSprite[i].dummy_init();

            this.live2dSprite[i].setModelReady(true);
            this.live2dSprite[i].setPosition($gameLive2d._x[i],$gameLive2d._y[i]);
            this.live2dSprite[i].setScale($gameLive2d._scale_x[i],$gameLive2d._scale_y[i]);
            this.live2dSprite[i].setEmotion($gameLive2d._expression[i],$gameLive2d._motion_no[i]);

            this.addChild(this.live2dSprite[i]);            
        }
    }

/*
    // マウス操作
    this.live2dSprite2.on('mousemove', function(evt){
        const point = evt.data.global;
        this.setViewPoint(point.x, point.y);
    });
*/
};

Scene_Map.prototype.updatelive2d = function(){
    for (var i = 0; i < $gameLive2d.MAXNUMBER; i++){
        
        if(this.live2dSprite[i] != null){
            this.live2dSprite[i].setModelReady($gameLive2d._visible[i]);
            this.live2dSprite[i].setPosition($gameLive2d._x[i],$gameLive2d._y[i]);
            this.live2dSprite[i].setScale($gameLive2d._scale_x[i],$gameLive2d._scale_y[i]);
            this.live2dSprite[i].setAlpha($gameLive2d._alpha[i]);
            this.live2dSprite[i].setEmotion($gameLive2d._expression[i],$gameLive2d._motion_no[i]);
            this.live2dSprite[i].setMovedPosition($gameLive2d._targetX[i],$gameLive2d._targetY[i]);
            this.live2dSprite[i].setMovedScale($gameLive2d._targetScaleX[i],$gameLive2d._targetScaleY[i]);
            this.live2dSprite[i].setDuration($gameLive2d._duration[i]);
            this.live2dSprite[i].setMoveAlpha($gameLive2d._targetAlpha[i]);
            this.live2dSprite[i].updateMove();
            this.live2dSprite[i].updateExpression();
            $gameLive2d._duration[i] = this.live2dSprite[i].getDuration();
            $gameLive2d._x[i] = this.live2dSprite[i].getPosX();
            $gameLive2d._y[i] = this.live2dSprite[i].getPosY();
            $gameLive2d._scale_x[i] = this.live2dSprite[i].getScaleX();
            $gameLive2d._scale_y[i] = this.live2dSprite[i].getScaleY();
            $gameLive2d._alpha[i] = this.live2dSprite[i].getAlpha();
        }
    }
}

Scene_Map.prototype.removelive2d = function(){

    for (var i = 0; i < $gameLive2d.MAXNUMBER; i++){
        if(this.live2dSprite[i] != null){
            this.live2dSprite[i].destroy();
            this.removeChild(this.live2dSprite[i]);
        }
    }
};
