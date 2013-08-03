ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.race1',
	'plugins.touch-button',
	'game.entities.obstacle'
)
.defines(function(){

// The main game with all it's delicious logic
myGame = ig.Game.extend({
	
	// Set up resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),
	levelTimer: new ig.Timer(),
	
	// Set up game variables
	gravity: 300,
	timeLeft: 100,
	metersLeft: 100,

	// Overwriting default loadLeve to include timer
	loadLevel: function(data) {
		this.parent(data);
		this.levelTimer.reset();
	},
	
	init: function() {

		// Set up buttons for mobile
		if(ig.ua.mobile) {
			var y = ig.system.height - 16;
			this.buttons = [
				new ig.TouchButton( 'run', 4, y-2, 32, 16, this.buttonImage, 0 ),
				new ig.TouchButton( 'jump', ig.system.width - 36, y-2, 32, 16, this.buttonImage, 1 )
			];
		}
		
		// Set up backup keys
		else {
			ig.input.bind(ig.KEY.X,'run');
			ig.input.bind(ig.KEY.SPACE, 'jump');
		}

		this.loadLevel( LevelRace1);
	},
	
	update: function() {

		// Spawn obstacle
		//ig.game.spawnEntity(EntityObstacle, ig.system.width. ig.system.height/2);

		var player = this.getEntitiesByType(EntityPlayer)[0];
		if(player) {
			// Set up screen position to be around the player
			ig.game.screen.x = player.pos.x - ig.system.width/2.5;
			ig.game.screen.y = player.pos.y - ig.system.height/3;

			// Remove text when player moves
			if (player.vel.y > 0 && this.instructText) {
				this.instructText = null;
			}
		}

		// Win
		if(this.levelTimer.delta()>this.timeLeft) {
			ig.system.setGame(winScreen);
		}

		this.parent();

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Draw buttons for mobile devices
		if (ig.ua.mobile) {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		else if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height-10;

			if (x < 88) {
				this.instructText.draw('and X to run', x, y, ig.Font.ALIGN.CENTER);
				this.instructText.draw('Press SPACE to jump', x, y-7, ig.Font.ALIGN.CENTER);
			}

			else
				this.instructText.draw('Press SPACE to jump and X to run', x, y, ig.Font.ALIGN.CENTER);
		}
		
	},

	gameOver: function() {
		ig.system.setGame(loseScreen);
	}
});

startScreen = ig.Game.extend({
	// Set up resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	title: new ig.Image('media/text_atalanta.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),

	init: function() {

		// Set up buttons for mobile
		if(ig.ua.mobile) {
			var y = ig.system.height - 20,
				x = ig.system.width/2 - 16;
			this.buttons = [
				new ig.TouchButton('start', x, y, 32, 16, this.buttonImage, 2),
			];
		}

		else {
			ig.input.bind(ig.KEY.SPACE, 'start');
		}
	},

	update: function() {
		if (ig.input.pressed ('start'))
			ig.system.setGame(myGame);
		this.parent();
	},

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		// Set up screen for mobile devices 
		if (ig.ua.mobile) {
			this.title.draw(x/2-32, y/3);
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		else {
			if (y < 65)
				this.title.draw(x/2-32, 5);
			else
				this.title.draw(x/2-32, y/3);
			this.instructText.draw('Press SPACE to start', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
		}
	}
});

loseScreen = ig.Game.extend({
	// Set up resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),

	init: function() {

		// Set up buttons for mobile
		if(ig.ua.mobile) {
			var y = ig.system.height - 24,
				x = ig.system.width/2 - 16;
			this.buttons = [
				new ig.TouchButton('start', x, y, 32, 16, this.buttonImage, 3),
			];
		}

		else {
			ig.input.bind(ig.KEY.SPACE, 'start');
		}
	},

	update: function() {
		if (ig.input.pressed ('start'))
			ig.system.setGame(myGame);
		this.parent();
	},

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		this.instructText.draw('YOU LOSE', x/2, 8, ig.Font.ALIGN.CENTER);

		if (x<150) {
			this.instructText.draw('Gotta get hitched', x/2, 16, ig.Font.ALIGN.CENTER);
			this.instructText.draw('now, crap.', x/2, 24, ig.Font.ALIGN.CENTER);
		}

		else {
			this.instructText.draw('Gotta get hitched now, crap', x/2, y/3-7, ig.Font.ALIGN.CENTER);
		}

		// Set up screen for mobile devices 
		if (ig.ua.mobile) {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		else {
			this.instructText.draw('SPACE to retry', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
		}
	}
});

winScreen = ig.Game.extend({
	// Set up resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),

	init: function() {

		// Set up buttons for mobile
		if(ig.ua.mobile) {
			var y = ig.system.height - 24,
				x = ig.system.width/2 - 16;
			this.buttons = [
				new ig.TouchButton('start', x, y, 32, 16, this.buttonImage, 4),
			];
		}

		else {
			ig.input.bind(ig.KEY.SPACE, 'start');
		}
	},

	update: function() {
		if (ig.input.pressed ('start'))
			ig.system.setGame(myGame);
		this.parent();
	},

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		this.instructText.draw('YOU WIN', x/2, 8, ig.Font.ALIGN.CENTER);

		if (x<150) {
			this.instructText.draw('Escaped yet', x/2, 16, ig.Font.ALIGN.CENTER);
			this.instructText.draw('another marriage.', x/2, 24, ig.Font.ALIGN.CENTER);
		}

		else {
			this.instructText.draw('Escaped yet another marriage', x/2, y/3-7, ig.Font.ALIGN.CENTER);
		}

		// Set up screen for mobile devices 
		if (ig.ua.mobile) {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		else {
			this.instructText.draw('SPACE to play again', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
		}
	}
});

// Start the Game with 60fps, a resolution of 320x240, scaled up by a factor of 3 or 4 depending on if you're on a mobile device
if (ig.ua.mobile) {
	ig.main( '#canvas', startScreen, 60, ig.ua.viewport.width/3, ig.ua.viewport.height/3, 3 );
}

else {
	ig.main( '#canvas', startScreen, 60, ig.ua.viewport.width/4, ig.ua.viewport.height/4, 4 );
}


});
