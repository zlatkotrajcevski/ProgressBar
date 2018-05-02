var pic, loadingText;
var GameState = {
	preload: function(){
		this.load.image('background', 'grafiki/pozadina.png');
		this.load.image('progressbar', 'grafiki/progressbar.png');
        	
	},
	create: function(){
		this.background = this.game.add.sprite(0, 0, 'background');
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(click, this);
        
        
    pic = game.add.sprite(260, game.world.centerY, 'progressbar');

    pic.anchor.setTo(0, 0.45);

    cropRect = new Phaser.Rectangle(0, 0, 0, pic.height);

    console.log(cropRect);
        
    var tween = game.add.tween(cropRect).from( { width: pic.width}, 10000, Phaser.Easing.Linear.Out);
    
        
    pic.crop(cropRect);

    tween.start();
        
    loadingText = game.add.text(1024 / 2, 190, '0%', { fill: '	#8B4513' });

    var progressDisplay = 100;
        
    var timerEvt = game.time.events.loop(100, function (){

        if(progressDisplay > 0){

            if(progressDisplay < pic.width){

                loadingText.text = ' '+(--progressDisplay)+'%';

            }

        }else{

            loadingText.text = 'IZGUBI!';
             game.time.events.remove(timerEvt);

        }

    }, this);
        
	},
	update: function(){
        pic.updateCrop();
 
    },
    click: function (pic, pointer){
        
    loadingText.text = ' '+(progressDisplay++)+'%';
    
}
    
};
var game = new Phaser.Game(1024, 576, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
