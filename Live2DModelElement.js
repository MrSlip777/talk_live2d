/**
 * 
 * @param {*} json 
 */

var LAppDefine = {
    
    // デバッグ。trueのときにログを表示する。
    DEBUG_LOG : true,
    DEBUG_MOUSE_LOG : false, // マウス関連の冗長なログ
    
    // 画面
    VIEW_MAX_SCALE : 2,
    VIEW_MIN_SCALE : 0.8,

    VIEW_LOGICAL_LEFT : -1,
    VIEW_LOGICAL_RIGHT : 1,

    VIEW_LOGICAL_MAX_LEFT : -2,
    VIEW_LOGICAL_MAX_RIGHT : 2,
    VIEW_LOGICAL_MAX_BOTTOM : -2,
    VIEW_LOGICAL_MAX_TOP : 2,
    
    // モーションの優先度定数
    PRIORITY_NONE : 0,
    PRIORITY_IDLE : 1,
    PRIORITY_NORMAL : 2,
    PRIORITY_FORCE : 3,
    
    // 外部定義ファイル(json)と合わせる
    MOTION_GROUP_IDLE : "idle", // アイドリング
    MOTION_GROUP_EXPRESSION : "expression", // 表情変更(Slip追加)
    MOTION_GROUP_TAP_BODY : "tap_body", // 体をタップしたとき
    MOTION_GROUP_FLICK_HEAD : "flick_head", // 頭を撫でた時
    MOTION_GROUP_PINCH_IN : "pinch_in", // 拡大した時
    MOTION_GROUP_PINCH_OUT : "pinch_out", // 縮小した時
    MOTION_GROUP_SHAKE : "shake", // シェイク

    // 外部定義ファイル(json)と合わせる
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body"
    
};



function ModelSettingJson(json)
{
    this.NAME = "name";
    this.ID = "id";
    this.MODEL = "model";
    this.TEXTURES = "textures";
    this.HIT_AREAS = "hit_areas";
    this.PHYSICS = "physics";
    this.POSE = "pose";
    this.EXPRESSIONS = "expressions";
    this.MOTION_GROUPS = "motions";
    this.SOUND = "sound";
    this.FADE_IN = "fade_in";
    this.FADE_OUT = "fade_out";
    this.LAYOUT = "layout";
    this.INIT_PARAM = "init_param";
    this.INIT_PARTS_VISIBLE = "init_parts_visible";
    this.VALUE = "val";
    this.FILE = "file";

    this.json = json || {};
}


ModelSettingJson.prototype.loadModelSetting = function(path, callback)
{
    var thisRef = this;
    loadBytes(path, "arraybuffer", function(buf) {
        var str = String.fromCharCode.apply(null,new Uint8Array(buf));
        thisRef.json = JSON.parse(str);
        callback();
    });
};


ModelSettingJson.prototype.getTextureFile = function(n)
{
    if (this.json[this.TEXTURES] == null || this.json[this.TEXTURES][n] == null)
        return null;

    return this.json[this.TEXTURES][n];
}


ModelSettingJson.prototype.getModelFile = function()
{
    return this.json[this.MODEL];
};


ModelSettingJson.prototype.getTextureNum = function()
{
    if (this.json[this.TEXTURES] == null) return 0;

    return this.json[this.TEXTURES].length;
}


ModelSettingJson.prototype.getHitAreaNum = function()
{
    if (this.json[this.HIT_AREAS] == null)
        return 0;

    return this.json[this.HIT_AREAS].length;
}


ModelSettingJson.prototype.getHitAreaID = function(n)
{
    if (this.json[this.HIT_AREAS] == null ||
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.ID];
}


ModelSettingJson.prototype.getHitAreaName = function(n)
{
    if (this.json[this.HIT_AREAS] == null ||
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.NAME];
}


ModelSettingJson.prototype.getPhysicsFile = function()
{
    return this.json[this.PHYSICS];
}


ModelSettingJson.prototype.getPoseFile = function()
{
    return this.json[this.POSE];
}


ModelSettingJson.prototype.getExpressionNum = function()
{
    return (this.json[this.EXPRESSIONS] == null) ? 0 : this.json[this.EXPRESSIONS].length;
}


ModelSettingJson.prototype.getExpressionFile = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.FILE];
}


ModelSettingJson.prototype.getExpressionName = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.NAME];
}


ModelSettingJson.prototype.getLayout = function()
{
    return this.json[this.LAYOUT];
}


ModelSettingJson.prototype.getInitParamNum = function()
{
    return (this.json[this.INIT_PARAM] == null) ? 0 : this.json[this.INIT_PARAM].length;
}


ModelSettingJson.prototype.getMotionNum = function(name)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null)
        return 0;

    return this.json[this.MOTION_GROUPS][name].length;
}


ModelSettingJson.prototype.getMotionFile = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.FILE];
}


ModelSettingJson.prototype.getMotionSound = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.SOUND] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.SOUND];
}


ModelSettingJson.prototype.getMotionFadeIn = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.FADE_IN] == null)
        return 1000;

    return this.json[this.MOTION_GROUPS][name][n][this.FADE_IN];
}


ModelSettingJson.prototype.getMotionFadeOut = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT] == null)
        return 1000;

    return this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT];
}


ModelSettingJson.prototype.getInitParamID = function(n)
{
    if (this.json[this.INIT_PARAM] == null ||
        this.json[this.INIT_PARAM][n] == null)
        return null;

    return this.json[this.INIT_PARAM][n][this.ID];
}


ModelSettingJson.prototype.getInitParamValue = function(n)
{
    if (this.json[this.INIT_PARAM] == null || this.json[this.INIT_PARAM][n] == null)
        return NaN;

    return this.json[this.INIT_PARAM][n][this.VALUE];
}


ModelSettingJson.prototype.getInitPartsVisibleNum = function()
{
    return (this.json[this.INIT_PARTS_VISIBLE] == null) ? 0 : this.json[this.INIT_PARTS_VISIBLE].length;
}


ModelSettingJson.prototype.getInitPartsVisibleID = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return null;
    return this.json[this.INIT_PARTS_VISIBLE][n][this.ID];
}


ModelSettingJson.prototype.getInitPartsVisibleValue = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return NaN;

    return this.json[this.INIT_PARTS_VISIBLE][n][this.VALUE];
}


//============================================================
//============================================================
//  class LAppModel     extends L2DBaseModel
//============================================================
//============================================================

function LAppModel(options)
{
    //L2DBaseModel.apply(this, arguments);
    L2DBaseModel.prototype.constructor.call(this);

    this.options = options;

    this.randomMotion = this.options.randomMotion;
    this.randomMotionGroup = null;
    this.randomMotionPriority = null;

    this.modelHomeDir = "";
    this.modelSetting = null;
    this.tmpMatrix = [];

    this.audioElement = null;
    this.audioContext = null;
    this.audioAnalyser = null;

    //Slip 2017/03/23
    this.expression = null;
    this.motion_no = null;

}

LAppModel.prototype = new L2DBaseModel();
/*
*モデルを初期化する
*/

LAppModel.prototype.load = function(gl, modelDefine, callback)
{
    this.setUpdating(true);
    this.setInitialized(false);

    //this.modelHomeDir = './';
    this.modelHomeDir = modelDefine.substring(0, modelDefine.lastIndexOf("/") + 1);
    this.modelSetting = new ModelSettingJson(modelDefine);

    var thisRef = this;

    this.modelSetting.loadModelSetting(modelDefine, function(){

        var path = thisRef.modelHomeDir + thisRef.modelSetting.getModelFile();

        //var path = this.modelSetting.json;
        thisRef.loadModelData(path, function(model){

            for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
            {
                var texPaths = thisRef.modelHomeDir +
                    thisRef.modelSetting.getTextureFile(i);

                thisRef.loadTexture(
                    gl,
                     i, texPaths, function() {

                    if( thisRef.isTexLoaded ) {

                        if (thisRef.modelSetting.getExpressionNum() > 0)
                        {

                            thisRef.expressions = {};

                            for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
                            {
                                var expName = thisRef.modelSetting.getExpressionName(j);
                                var expFilePath = thisRef.modelHomeDir +
                                    thisRef.modelSetting.getExpressionFile(j);

                                thisRef.loadExpression(expName, expFilePath);
                            }
                        }
                        else
                        {
                            thisRef.expressionManager = null;
                            thisRef.expressions = {};
                        }



                        if (!thisRef.eyeBlink)
                        {
                            thisRef.eyeBlink = new L2DEyeBlink();
                        }


                        if (thisRef.modelSetting.getPhysicsFile())
                        {
                            thisRef.loadPhysics(thisRef.modelHomeDir +
                                                thisRef.modelSetting.getPhysicsFile());
                        }
                        else
                        {
                            thisRef.physics = null;
                        }



                        if (thisRef.modelSetting.getPoseFile())
                        {
                            thisRef.loadPose(
                                thisRef.modelHomeDir +
                                thisRef.modelSetting.getPoseFile(),
                                function() {
                                    thisRef.pose.updateParam(thisRef.live2DModel);
                                }
                            );
                        }
                        else
                        {
                            thisRef.pose = null;
                        }



                        if (thisRef.modelSetting.getLayout())
                        {
                            var layout = thisRef.modelSetting.getLayout();
                            if (layout["width"] != null)
                                thisRef.modelMatrix.setWidth(layout["width"]);
                            if (layout["height"] != null)
                                thisRef.modelMatrix.setHeight(layout["height"]);

                            if (layout["x"] != null)
                                thisRef.modelMatrix.setX(layout["x"]);
                            if (layout["y"] != null)
                                thisRef.modelMatrix.setY(layout["y"]);
                            if (layout["center_x"] != null)
                                thisRef.modelMatrix.centerX(layout["center_x"]);
                            if (layout["center_y"] != null)
                                thisRef.modelMatrix.centerY(layout["center_y"]);
                            if (layout["top"] != null)
                                thisRef.modelMatrix.top(layout["top"]);
                            if (layout["bottom"] != null)
                                thisRef.modelMatrix.bottom(layout["bottom"]);
                            if (layout["left"] != null)
                                thisRef.modelMatrix.left(layout["left"]);
                            if (layout["right"] != null)
                                thisRef.modelMatrix.right(layout["right"]);
                        }

                        for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
                        {

                            thisRef.live2DModel.setParamFloat(
                                thisRef.modelSetting.getInitParamID(j),
                                thisRef.modelSetting.getInitParamValue(j)
                            );
                        }

                        for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
                        {

                            thisRef.live2DModel.setPartsOpacity(
                                thisRef.modelSetting.getInitPartsVisibleID(j),
                                thisRef.modelSetting.getInitPartsVisibleValue(j)
                            );
                        }



                        thisRef.live2DModel.saveParam();
                        // thisRef.live2DModel.setGL(gl);


                        thisRef.preloadMotionGroup(thisRef.options.defaultMotionGroup);
                        thisRef.mainMotionManager.stopAllMotions();

                        thisRef.setUpdating(false);
                        thisRef.setInitialized(true);

                        if (typeof callback == "function") callback();

                    }
                });
            }
        });
    });
};



LAppModel.prototype.release = function(gl)
{
    // this.live2DModel.deleteTextures();
    // var pm = Live2DFramework.getPlatformManager();
    //
    // gl.deleteTexture(pm.texture);
}



LAppModel.prototype.preloadMotionGroup = function(name)
{
    var thisRef = this;

    for (var i = 0; i < this.modelSetting.getMotionNum(name); i++)
    {
        var file = this.modelSetting.getMotionFile(name, i);
        this.loadMotion(file, this.modelHomeDir + file, function(motion) {
            motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
            motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));
        });

    }
}

LAppModel.prototype.update = function()
{
    // console.log("--> LAppModel.update()");

    if(!this.live2DModel)
    {
        if (this.options.debugLog) console.error("Failed to update.");

        return;
    }
    
    var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    var timeSec = timeMSec / 1000.0;
    var t = timeSec * 2 * Math.PI;

    // 待機モーション判定
    /*
    if (this.mainMotionManager.isFinished() && this.randomMotion){
        // モーションの再生がない場合、待機モーションの中からランダムで再生する        
        this.startRandomMotion(this.randomMotionGroup 
        || this.options.defaultMotionGroup, this.randomMotionPriority || this.options.priorityDefault);

    }
    */

    /* Slip 2017/04/01 mask
    this.setOpacity();
    this.setScale();
    this.setPosition();
    */

    //位置オフセット　Slip 2017/04/01
    this.modelMatrix.setY(1.1);

    //表情設定
    //this.setExpression(this.expression);

    /*
    if (this.mainMotionManager.isFinished() )
    {

        //待機時のモーション　Slip 2017/03/20
        this.startMotion(LAppDefine.MOTION_GROUP_EXPRESSION
            ,this.motion_no,LAppDefine.PRIORITY_IDLE);
    
    }
    */
      
    //待機時のモーション　Slip 2017/03/20
    /*
    this.startMotion(LAppDefine.MOTION_GROUP_EXPRESSION
        ,this.motion_no,LAppDefine.PRIORITY_FORCE);
    */
    //-----------------------------------------------------------------

    // 前回セーブされた状態をロード
    this.live2DModel.loadParam();

    /* インスタンスが作られていたら更新 */

    var update = this.mainMotionManager.updateParam(this.live2DModel);
    if (!update) {

        if(this.eyeBlink && this.options.eyeBlink) {
            this.eyeBlink.updateParam(this.live2DModel);
        }
    }


    this.live2DModel.saveParam();

    //-----------------------------------------------------------------


    if (this.expressionManager &&
        this.expressions &&
        !this.expressionManager.isFinished())
    {
        this.expressionManager.updateParam(this.live2DModel);
    }



    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", this.dragX * 30, 1);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", this.dragY * 30, 1);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", (this.dragX * this.dragY) * -30, 1);



    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", this.dragX*10, 1);



    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1);
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1);



    // this.live2DModel.addToParamFloat("PARAM_ANGLE_X",
    //                                  Number((15 * Math.sin(t / 6.5345))), 0.5);
    // this.live2DModel.addToParamFloat("PARAM_ANGLE_Y",
    //                                  Number((8 * Math.sin(t / 3.5345))), 0.5);
    // this.live2DModel.addToParamFloat("PARAM_ANGLE_Z",
    //                                  Number((10 * Math.sin(t / 5.5345))), 0.5);
    // this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X",
    //                                  Number((4 * Math.sin(t / 15.5345))), 0.5);
    // this.live2DModel.setParamFloat("PARAM_BREATH",
    //                                Number((0.5 + 0.5 * Math.sin(t / 3.2345))), 1);


    if (this.physics)
    {
        this.physics.updateParam(this.live2DModel);
    }

    if (this.lipSync)
    {
        this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y",
                                       this.lipSyncValue);
    }


    if( this.pose ) {
        this.pose.updateParam(this.live2DModel);
    }

    this.live2DModel.update();
};



LAppModel.prototype.setRandomExpression = function()
{
    var tmp = [];
    for (var name in this.expressions)
    {
        tmp.push(name);
    }

    var no = parseInt(Math.random() * tmp.length);

    this.setExpression(tmp[no]);
}



LAppModel.prototype.startRandomMotion = function(name, priority)
{
    name = LAppDefine.MOTION_GROUP_EXPRESSION;
    var max = this.modelSetting.getMotionNum(name);
    var no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
    this.randomMotion = true;
    this.randomMotionGroup = name;
    this.randomMotionPriority = priority;
}
LAppModel.prototype.startRandomMotionOnce = function(name, priority)
{
    var max = this.modelSetting.getMotionNum(name);
    var no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
}

LAppModel.prototype.stopRandomMotion = function()
{
    this.randomMotion = false;
    this.randomMotionGroup = null;
    this.randomMotionPriority = null;
}



LAppModel.prototype.startMotion = function(name, no, priority)
{
    // console.log("startMotion : " + name + " " + no + " " + priority);

    var motionName = this.modelSetting.getMotionFile(name, no);

    if (motionName == null || motionName == "")
    {
        if (this.options.debugLog)
            console.warn("Failed to motion.");
        return;
    }

    if (priority == this.options.priorityForce)
    {
        this.mainMotionManager.setReservePriority(priority);
    }
    else if (!this.mainMotionManager.reserveMotion(priority))
    {
        if (this.options.debugLog)
            console.log("Motion is running.")
        return;
    }

    var thisRef = this;
    var motion;

    if (this.motions[name] == null)
    {
        this.loadMotion(null, this.modelHomeDir + motionName, function(mtn) {
            motion = mtn;


            thisRef.setFadeInFadeOut(name, no, priority, motion);

        });
    }
    else
    {
        motion = this.motions[name];


        thisRef.setFadeInFadeOut(name, no, priority, motion);
    }
}


LAppModel.prototype.setFadeInFadeOut = function(name, no, priority, motion)
{
    var motionName = this.modelSetting.getMotionFile(name, no);

    motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
    motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));


    if (this.options.debugLog)
            console.log("Start motion : " + motionName);

    if (this.modelSetting.getMotionSound(name, no) == null)
    {
        this.mainMotionManager.startMotionPrio(motion, priority);
    }
    else
    {
        var soundName = this.modelSetting.getMotionSound(name, no);
        // var player = new Sound(this.modelHomeDir + soundName);

        if (this.options.debugLog)
            console.log("Start sound : " + soundName);

        this.playSound(soundName, this.modelHomeDir);

        this.mainMotionManager.startMotionPrio(motion, priority);
    }
}

/*
LAppModel.prototype.playSound = function(filename, host)
{
    if (this.options.audioPlayer) {
        this.options.audioPlayer(filename, host);
    } else {
        const audio = this.audioElement || document.createElement("audio");
        !this.audioElement && (this.audioElement = audio);
        audio.src = host + filename;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext && this.options.lipSyncWithSound) {
            const context = this.audioContext || new AudioContext();
            if (!this.audioContext) {
                this.audioContext = context;
                this.audioElementSource = context.createMediaElementSource(audio);
            }
            const source = this.audioElementSource;
            const analyser = this.audioAnalyser || context.createAnalyser();
            !this.audioAnalyser && (this.audioAnalyser = analyser);

            analyser.fftSize = 32;
            var bufferLength = analyser.frequencyBinCount;
            let cache = [];
            let lastTime = Date.now();
            const intervalId = setInterval(() => {
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
                const value = (dataArray[9] + dataArray[10] + dataArray[11]) / 3;
                if (Date.now() - lastTime  < 33) {
                    cache.push(value);
                } else {
                    const lipValue = cache.length ?
                    (cache.reduce((previous, current) => current += previous) / cache.length / 100)
                    : this.lipSyncValue;
                    this.lipSync = true;
                    this.lipSyncValue = lipValue;
                    lastTime = Date.now();
                    cache = [];
                }
            }, 0);
            audio.addEventListener('ended', () => {
                clearInterval(intervalId);
                this.lipSyncValue = 0;
            });
            source.connect(analyser);
            analyser.connect(context.destination);
        }
        audio.play();
    }
}
*/

LAppModel.prototype.setExpression = function(name)
{
    var motion = this.expressions[name];

    if (this.options.debugLog)
        console.log("Expression : " + name);

    this.expressionManager.startMotion(motion, false);
}



LAppModel.prototype.draw = function(gl)
{
    //console.log("--> LAppModel.draw()");

    // if(this.live2DModel == null) return;
    if(this.live2DModel != null){

        MatrixStack.push();

        MatrixStack.multMatrix(this.modelMatrix.getArray());

        this.tmpMatrix = MatrixStack.getMatrix();
        this.live2DModel.setMatrix(this.tmpMatrix);
        this.live2DModel.draw();

        MatrixStack.pop();
    }
};



LAppModel.prototype.hitTest = function(id, testX, testY)
{
    var len = this.modelSetting.getHitAreaNum();
    var hit = false;
    //let hit = false; //Slip 2017/03/24
    for (var i = 0; i < len; i++)
    {
        // NOTE: id == null means to test all ids.
        if (id == null) {
            var drawID = this.modelSetting.getHitAreaID(i);
            hit = this.hitTestSimple(drawID, testX, testY);
            if (hit) {
                return hit;
            }
        } else if (id == this.modelSetting.getHitAreaName(i)) {
            var drawID = this.modelSetting.getHitAreaID(i);

            return this.hitTestSimple(drawID, testX, testY);
        }
    }

    return false;
}

/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 *  (c) Modified by Icemic <bingfeng.web@gmail.com>
 */

//const mat4 = require('./glMatrix-mat4');

const MatrixStack = {};

MatrixStack;

MatrixStack.matrixStack = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];


MatrixStack.depth = 0;


MatrixStack.currentMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];


MatrixStack.tmp = new Array(16);



MatrixStack.reset = function()
{
    this.depth = 0;
}



MatrixStack.loadIdentity = function()
{
    // for (var i = 0; i < 16; i++)
    // {
    //     this.currentMatrix[i] = (i % 5 == 0) ? 1 : 0;
    // }
    this.currentMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}



MatrixStack.push = function()
{
    // var offset = this.depth * 16;
    // var nextOffset = (this.depth + 1) * 16;

    // if (this.matrixStack.length < nextOffset + 16)
    // {
    //     this.matrixStack.length = nextOffset + 16;
    // }

    // for (var i = 0; i < 16; i++)
    // {
    //     this.matrixStack[nextOffset + i] = this.currentMatrix[i];
    // }
    this.matrixStack.push(this.currentMatrix);

    this.depth++;
}



MatrixStack.pop = function()
{
    this.depth--;
    if (this.depth < 0)
    {
        myError("Invalid matrix stack.");
        this.depth = 0;
    }

    // var offset = this.depth * 16;
    // for (var i = 0; i < 16; i++)
    // {
    //     this.currentMatrix[i] = this.matrixStack[offset + i];
    // }
    this.currentMatrix = this.matrixStack.pop();
}



MatrixStack.getMatrix = function()
{
    return this.currentMatrix;
}



MatrixStack.multMatrix = function(matNew)
{
    // var i, j, k;

    // for (i = 0; i < 16; i++)
    // {
    //     this.tmp[i] = 0;
    // }

    // for (i = 0; i < 4; i++)
    // {
    //     for (j = 0; j < 4; j++)
    //     {
    //         for (k = 0; k < 4; k++)
    //         {
    //             this.tmp[i + j * 4] += this.currentMatrix[i + k * 4] * matNew[k + j * 4];
    //         }
    //     }
    // }
    // for (i = 0; i < 16; i++)
    // {
    //     this.currentMatrix[i] = this.tmp[i];
    // }
    mat4.multiply(this.currentMatrix, this.currentMatrix, matNew);
}

function Live2DSprite(){
    this.initialize.apply(this, arguments);
}

Live2DSprite.prototype = Object.create(PIXI.Sprite.prototype);
Live2DSprite.prototype.constructor = Live2DSprite;

Live2DSprite.prototype.initialize = function(modelDefine, options) {
    //constructor(modelDefine, options)
    PIXI.Sprite.call(this);
        this.interactive = true;

        this.platform = window.navigator.platform.toLowerCase();

        const fullOptions = Object.assign({
        priorityForce: 3,
        priorityDefault: 1,
        debugLog: false,
        debugMouseLog: false,
        eyeBlink: true,
        lipSyncWithSound: true,
        randomMotion: true,
        defaultMotionGroup: "idle",
        audioPlayer: null
        }, options);

        Live2D.init();
        this.model = new LAppModel(fullOptions);

        this.gl = null;
        this.canvas = null;

        this.dragMgr = null; //new L2DTargetPoint();
        this.viewMatrix = null; //new L2DViewMatrix();
        this.projMatrix = null; //new L2DMatrix44()
        this.deviceToScreen = null; //new L2DMatrix44();

        //Slip 2017/11/24 textureがnullだとダメっぽいが原因不明・・・
        this.texture = null;
        /*
        if(this.texture == null){
            this.texture = PIXI.RenderTexture.create(width, height);
        }
*/
        this.modelReady = false;
        this.onModelReady = [];
        this.modelDefine = modelDefine;

};

Live2DSprite.prototype.dummy_init = function() {
    //var width = this.canvas.width;
    //var height = this.canvas.height;

    //Slip 暫定的にサイズを固定 2017/11/24
    var width = 816;
    var height = 640;

    this.texture = PIXI.RenderTexture.create(width, height);

    //this.canvasWidth = this.canvas.width;
    //this.canvasHeight = this.canvas.height;
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.dragMgr = new L2DTargetPoint();

    var ratio = height / width;
    var left = -1;
    var right = 1;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();
    this.viewMatrix.setMaxScreenRect(-2, 2, -2, 2);
    this.viewMatrix.setScreenRect(left, right, bottom, top);
    // this.viewMatrix.setMaxScale(2);
    // this.viewMatrix.setMinScale(0.5);
    // this.viewMatrix.adjustScale(0, 0, 0.7);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(ratio, 1);  // flip for rtt

    this.deviceToScreen = new L2DMatrix44();
    this.deviceToScreen.multTranslate( -width / 2.0, -height / 2.0);
    this.deviceToScreen.multScale(2 / width, -2 / height);

    Live2D.setGL(this.gl);

    this.x = width / 2;
    this.y = height / 2;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.y = -1;

    //Slip 2017/04/01
    this.scale.x = 1;
    this.alpha = 1.0;
    this.targetX = 0;
    this.targetY = 0;
    this.targetScaleX = 1;
    this.targetScaleY = 1;
    this.targetAlpha = 1.0;
    this.duration = 0;

    //this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    //this.model.load(this.gl, this.modelDefine);

}

Live2DSprite.prototype.init = function() {
    var width = this.canvas.width;
    var height = this.canvas.height;

    this.texture = PIXI.RenderTexture.create(width, height);

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.dragMgr = new L2DTargetPoint();

    var ratio = height / width;
    var left = -1;
    var right = 1;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();
    this.viewMatrix.setMaxScreenRect(-2, 2, -2, 2);
    this.viewMatrix.setScreenRect(left, right, bottom, top);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(ratio, 1);  // flip for rtt

    this.deviceToScreen = new L2DMatrix44();
    this.deviceToScreen.multTranslate( -width / 2.0, -height / 2.0);
    this.deviceToScreen.multScale(2 / width, -2 / height);

    Live2D.setGL(this.gl);

    this.x = width / 2;
    this.y = height / 2;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.y = -1;

    //Slip 2017/04/01
    this.scale.x = 1;
    this.alpha = 1.0;
    this.targetX = 0;
    this.targetY = 0;
    this.targetScaleX = 1;
    this.targetScaleY = 1;
    this.targetAlpha = 1.0;
    this.duration = 0;

    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    this.model.load(this.gl, this.modelDefine);

};

Live2DSprite.prototype.draw = function() {
    MatrixStack.reset();
    MatrixStack.loadIdentity();

    this.dragMgr.update();
    this.model.setDrag(this.dragMgr.getX(), this.dragMgr.getY());

    // this.viewMatrix.adjustTranslate(-this.x / this.canvasWidth, -this.y / this.canvasHeight);
    // this.viewMatrix.adjustScale(this.anchor.x, this.anchor.y, this.scale.x, this.scale.y);

    MatrixStack.multMatrix(this.projMatrix.getArray());
    MatrixStack.multMatrix(this.viewMatrix.getArray());
    // MatrixStack.multMatrix(this.deviceToScreen.getArray());
    MatrixStack.push();

    this.model.update();
    this.model.draw(this.gl);

    MatrixStack.pop();
};

Live2DSprite.prototype._renderWebGL = function(renderer) {

    if (!this.gl) {
      this.gl = renderer.gl;
      this.canvas = renderer.view;
      this.modelDefine && this.init(this.modelDefine);
    }

    //透過度が最小ならば自動的に非表示にする　Slip 2017/04/02
    if(this.alpha == $SPM_live2d_minOpacity){
        this.modelReady = false;
    }

    if (!this.modelReady) {
      const gl = renderer.gl;
      // it is unreasonable how the next line works... 
      gl.activeTexture(gl.TEXTURE0);
      return;
    }

    while (this.onModelReady.length) {
      const func = this.onModelReady.shift();
      func();
    }

    if (!this.visible) {
      return;
    }

    const useVAO = !!(renderer.createVao && renderer.bindVao);

    var _activeVao;
    //let _activeVao; Slip 2017/03/24
    if (useVAO) {
      _activeVao = renderer._activeVao;
    } else {
      renderer.flush();
    }
    
    //const gl = renderer.gl; Slip 2017/03/24
    var temp_gl = renderer.gl;

    const arrayBuffer = temp_gl.getParameter(temp_gl.ARRAY_BUFFER_BINDING);
    const elementArrayBuffer = temp_gl.getParameter(temp_gl.ELEMENT_ARRAY_BUFFER_BINDING);
    const currentProgram = temp_gl.getParameter(temp_gl.CURRENT_PROGRAM);

    var activeTexture;
    //let activeTexture; Slip 2017/03/24
    if (!useVAO) {
      activeTexture = temp_gl.getParameter(temp_gl.ACTIVE_TEXTURE);
    }

    temp_gl.activeTexture(temp_gl.TEXTURE0);
    const texture0 = temp_gl.getParameter(temp_gl.TEXTURE_BINDING_2D);
    temp_gl.activeTexture(temp_gl.TEXTURE1);
    const texture1 = temp_gl.getParameter(temp_gl.TEXTURE_BINDING_2D);

    const frontFace = temp_gl.getParameter(temp_gl.FRONT_FACE);
    const colorWhiteMask = temp_gl.getParameter(temp_gl.COLOR_WRITEMASK);

    //let vertexAttr0Enabled, vertexAttr1Enabled, vertexAttr2Enabled, vertexAttr3Enabled;
    //Slip 2017/03/24
    var vertexAttr0Enabled, vertexAttr1Enabled, vertexAttr2Enabled, vertexAttr3Enabled;
    
    if (!useVAO) {
      vertexAttr0Enabled = temp_gl.getVertexAttrib(0, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
      vertexAttr1Enabled = temp_gl.getVertexAttrib(1, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
      vertexAttr2Enabled = temp_gl.getVertexAttrib(2, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
      vertexAttr3Enabled = temp_gl.getVertexAttrib(3, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
    }
    const scissorTestEnabled = temp_gl.isEnabled(temp_gl.SCISSOR_TEST);
    const stencilTestEnabled = temp_gl.isEnabled(temp_gl.STENCIL_TEST);
    const depthTestEnabled = temp_gl.isEnabled(temp_gl.DEPTH_TEST);
    const cullFaceEnabled = temp_gl.isEnabled(temp_gl.CULL_FACE);
    const blendEnabled = temp_gl.isEnabled(temp_gl.BLEND);

    const _activeTextureLocation = renderer._activeTexture ? renderer._activeTextureLocation : 0;
    const _activeRenderTarget = renderer._activeRenderTarget;

    var vao;
    //let vao; Slip 2017/03/24
    if (useVAO) {
      vao = renderer.createVao();
      renderer.bindVao(vao);
    }
    renderer.bindRenderTexture(this.texture);
    temp_gl.clearColor(0.0, 0.0, 0.0, 0.0);
    temp_gl.clear(temp_gl.COLOR_BUFFER_BIT);
    temp_gl.frontFace(temp_gl.CW);
    this.draw();
    if (!useVAO) {
      renderer._activeTextureLocation = _activeTextureLocation;
      temp_gl.activeTexture(temp_gl.TEXTURE0 + _activeTextureLocation);
    }
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, null);
    temp_gl.useProgram(currentProgram);
    renderer.bindRenderTarget(_activeRenderTarget);

    temp_gl.bindBuffer(temp_gl.ARRAY_BUFFER, arrayBuffer);
    temp_gl.bindBuffer(temp_gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);

    temp_gl.activeTexture(temp_gl.TEXTURE0);
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, texture0);
    temp_gl.activeTexture(temp_gl.TEXTURE1);
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, texture1);

    if (!useVAO) {
      temp_gl.activeTexture(activeTexture);
    }
    temp_gl.frontFace(frontFace);
    //gl.colorMask(...colorWhiteMask); //Slip 2017/03/24
    temp_gl.colorMask(colorWhiteMask[0],colorWhiteMask[1],
        colorWhiteMask[2],colorWhiteMask[3]); //Slip 2017/03/24
    
   //
    if (!useVAO) {
      vertexAttr0Enabled ? temp_gl.enableVertexAttribArray(0) : temp_gl.disableVertexAttribArray(0);
      vertexAttr1Enabled ? temp_gl.enableVertexAttribArray(1) : temp_gl.disableVertexAttribArray(1);
      vertexAttr2Enabled ? temp_gl.enableVertexAttribArray(2) : temp_gl.disableVertexAttribArray(2);
      vertexAttr3Enabled ? temp_gl.enableVertexAttribArray(3) : temp_gl.disableVertexAttribArray(3);
    }
    scissorTestEnabled ? temp_gl.enable(temp_gl.SCISSOR_TEST) : temp_gl.disable(temp_gl.SCISSOR_TEST);
    stencilTestEnabled ? temp_gl.enable(temp_gl.STENCIL_TEST) : temp_gl.disable(temp_gl.STENCIL_TEST);
    depthTestEnabled   ? temp_gl.enable(temp_gl.DEPTH_TEST) : temp_gl.disable(temp_gl.DEPTH_TEST);
    cullFaceEnabled    ? temp_gl.enable(temp_gl.CULL_FACE) : temp_gl.disable(temp_gl.CULL_FACE);
    blendEnabled       ? temp_gl.enable(temp_gl.BLEND) : temp_gl.disable(temp_gl.BLEND);

    if (useVAO) {
      vao.unbind();
      vao.destroy();
      renderer.bindVao(_activeVao);
    }
    
    //PIXI.Sprite._renderWebGL.call(this,renderer);

    //copy of pixi-v4 internal code
    this.calculateVertices();

    if (this._isPicture) {
        // use heavy renderer, which reduces artifacts and applies corrent blendMode,
        // but does not use multitexture optimization
        this._speedUpCustomBlendModes(renderer);
        renderer.setObjectRenderer(renderer.plugins.picture);
        renderer.plugins.picture.render(this);
    } else {
        // use pixi super-speed renderer
        renderer.setObjectRenderer(renderer.plugins.sprite);
        renderer.plugins.sprite.render(this);
    }

};

//argsは配列なので考慮すること slip 2017/03/24
Live2DSprite.prototype.destroy = function(args) {
    this.model.release();
    //PIXI.Sprite.destroy(this,args);
};

//Live2D methods 
// Transforms 

/*
Live2DSprite.prototype.adjustScale = function(cx, cy, scale) {
    this.onModelReady.push(() => {
      this.viewMatrix.adjustScale(cx, cy, scale);
    });
};

Live2DSprite.prototype.adjustTranslate = function(shiftX, shiftY) {
    this.onModelReady.push(()=>{
        this.viewMatrix.adjustTranslate(shiftX, -shiftY);
    });
};
*/

//
// specify `PARAM_MOUTH_OPEN_Y` of Live2D model.
// @param value {Number} between 0~1, set to `null` will disable it.
//
Live2DSprite.prototype.setLipSync = function(value) {
    if (value == null) {
      this.model.setLipSync(false);
    } else {
      this.model.setLipSync(true);
      this.model.setLipSyncValue(value);
    }
};

/*アロー演算子の変換方法不明のためマスク　Slip　2017/03/24

Live2DSprite.prototype.setRandomExpression = function() {
    this.onModelReady.push(() => {
      this.model.setRandomExpression();
    });
};

Live2DSprite.prototype.startRandomMotion = function(name, priority) {
    this.onModelReady.push(() => {
      this.model.startRandomMotion(name, priority);
    });
};

Live2DSprite.prototype.startRandomMotionOnce = function(name, priority) {
    this.onModelReady.push(() => {
      this.model.startRandomMotionOnce(name, priority);
    });  
};

Live2DSprite.prototype.stopRandomMotion = function() {
    this.onModelReady.push(() => {
      this.model.stopRandomMotion();
    });
};

Live2DSprite.prototype.startMotion = function(name, no, priority) {
    this.onModelReady.push(() => {
      this.model.startMotion(name, no, priority);
    });
};

Live2DSprite.prototype.playSound = function(filename, host='/') {
    this.onModelReady.push(() => {
      this.model.playSound(filename, host);
    });
};
*/

  // Event methods
Live2DSprite.prototype.hitTest = function(id, x, y) {
    return this.model.hitTest(id,
      this.viewMatrix.invertTransformX(this.deviceToScreen.transformX(x)),
      this.viewMatrix.invertTransformY(this.deviceToScreen.transformY(y)));
};

Live2DSprite.prototype.setViewPoint = function(x, y) {
    this.dragMgr.setPoint(this.viewMatrix.invertTransformX(this.deviceToScreen.transformX(x)),
    this.viewMatrix.invertTransformY(this.deviceToScreen.transformY(y)));
};

  // Some raw methods of Live2D 
Live2DSprite.prototype.getParamFloat = function(key) {
    return this.model.getLive2DModel().getParamFloat(key);
};
/*
Live2DSprite.prototype.setParamFloat = function(key, value, weight=1) {
    this.model.getLive2DModel().setParamFloat(key, value, weight);
};

Live2DSprite.prototype.addToParamFloat = function(key, value, weight=1) {
    this.model.getLive2DModel().addToParamFloat(key, value, weight);
};

Live2DSprite.prototype.multParamFloat = function(key, value, weight=1) {
    this.model.getLive2DModel().multParamFloat(key, value, weight);
};
*/
//Slip 2017/03/24
//表示、非表示
Live2DSprite.prototype.setModelReady = function(modelReady){
    this.modelReady = modelReady;
};

//表情変更
Live2DSprite.prototype.setEmotion = function(expression,motion_no){

    if(this.model.modelSetting != null && this.model.expression != expression){
        this.model.expression = expression;
        this.model.motion_no = motion_no;
        this.model.startMotion(LAppDefine.MOTION_GROUP_EXPRESSION
        ,this.model.motion_no,LAppDefine.PRIORITY_FORCE);
    }
};

//位置変更
Live2DSprite.prototype.setPosition = function(pos_x,pos_y){
    this.x = pos_x;
    this.y = pos_y;
};

//サイズ変更
Live2DSprite.prototype.setScale = function(scale_x,scale_y){
    this.scale.x = scale_x;
    this.scale.y = scale_y;
};

//透過度
Live2DSprite.prototype.setAlpha = function(alpha){
    this.alpha = alpha;
};

//モデルが移動するまでの時間
Live2DSprite.prototype.setDuration = function(duration){
    this.duration = duration;
};

//移動後の位置
Live2DSprite.prototype.setMovedPosition = function(pos_x,pos_y){
    this.targetX = pos_x;
    this.targetY = pos_y;
};

//移動後のサイズ
Live2DSprite.prototype.setMovedScale = function(scale_x,scale_y){
    this.targetScaleX = scale_x;
    this.targetScaleY = scale_y;
};

//透過度
Live2DSprite.prototype.setMoveAlpha = function(alpha){
    this.targetAlpha = alpha;
};

Live2DSprite.prototype.updateMove = function() {
    if (this.duration > 0) {
        var d = this.duration;
        this.x = (this.x * (d - 1) + this.targetX) / d;
        this.y = (this.y * (d - 1) + this.targetY) / d;
        this.scale.x  = (this.scale.x  * (d - 1) + this.targetScaleX)  / d;
        this.scale.y  = (this.scale.y  * (d - 1) + this.targetScaleY)  / d;
        this.alpha = (this.alpha * (d - 1) + this.targetAlpha) / d;
        this.duration--;

        if(this.alpha <= 0){
            this.alpha = $SPM_live2d_minOpacity;
        }
    }
};

Live2DSprite.prototype.updateExpression = function() {
    if(this.model != null){
        this.model.setExpression(this.model.expression);
    }
};

//モデルが移動するまでの時間
Live2DSprite.prototype.getDuration = function(){
    return this.duration;
};

//位置変更
Live2DSprite.prototype.getPosX = function(){
    return this.x;
};

//位置変更
Live2DSprite.prototype.getPosY = function(){
    return this.y;
};

//サイズ変更
Live2DSprite.prototype.getScaleX = function(){
    return this.scale.x;
};

//サイズ変更
Live2DSprite.prototype.getScaleY = function(){
    return this.scale.y;
};

//サイズ変更
Live2DSprite.prototype.getAlpha = function(){
    return this.alpha;
};

if (PIXI) {
  PIXI.Live2DSprite = Live2DSprite;
} else {
  console.error('Error: Cannot find global variable `PIXI`, Live2D plguin will not be installed.');
}

function loadBytes(path, type, callback) {
  var request = new XMLHttpRequest();
  request.open('GET',path, true);
  request.responseType = type;
  request.onload = function() {
    switch (request.status) {
    case 0://ローカル環境でも対応
        callback(request.response);
        break;
    case 200:
        callback(request.response);
        break;
    default:
        console.error( 'Failed to load (' + request.status + ') : ' + path );
        break;
    }
  }
  request.send(null);
}