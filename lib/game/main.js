// Handles game logic, stores game variables, and screens

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

// The main game logic
myGame = ig.Game.extend({
	
	// Set up game resources
	instructText: new ig.Font('media/04b03.font.png'),
	statText: new ig.Font('media/04b03.font.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),
	obstacleTimer: new ig.Timer(),
	
	// Set up game variables
	gravity: 200,
	timeLeft: 100,
	metersLeft: 100,
	gameSpeed: 0.0,
	maxGameSpeed: 50,
	
	// Runs only once when game starts
	init: function() {
		// Set up buttons for mobile devices
		if(ig.ua.mobile) {
			var y = ig.system.height - 16;
			this.buttons = [
				new ig.TouchButton( 'run', 4, y-2, 32, 16, this.buttonImage, 0 ),
				new ig.TouchButton( 'jump', ig.system.width - 36, y-2, 32, 16, this.buttonImage, 1 )
			];
		}

		// Set up keys for nonmobile devices
		else {
			ig.input.bind(ig.KEY.X,'run');
			ig.input.bind(ig.KEY.SPACE, 'jump');
		}

		// Load level and set timer to 0
		this.obstacleTimer.reset();
		this.loadLevel( LevelRace1);
	},
	
	// Runs every call
	update: function() {

		// Gradually decrease gameSpeed
		if (this.gameSpeed<0) {
			this.gameSpeed = this.gameSpeed + .5;
		}

		// Win
		if (this.metersLeft <= 0) {
			this.win();
		}

		// Spawn obstacle at correct pace
		randomNumber = Math.floor(Math.random()*120) + 50;
		speedMultiplier = 1/this.gameSpeed;
		if (speedMultiplier<= 0 && this.obstacleTimer.delta()>(randomNumber*Math.abs(speedMultiplier))) {
			ig.game.spawnEntity(EntityObstacle, 275, 118);
			this.obstacleTimer.reset();
		}

		// Decrease meters
		if (this.gameSpeed < 0) {
			this.metersLeft = this.metersLeft + .0005 * this.gameSpeed;
		}

		// Set up screen
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if(player) {

			// Set up screen position to be around the player
			ig.game.screen.x = player.pos.x - ig.system.width/2.5;
			ig.game.screen.y = player.pos.y - ig.system.height/3;

			// Remove instruction text when player moves
			if (player.vel.y > 0 && this.instructText) {
				this.instructText = null;
			}
		}

		// Win if there are no meters left
		if(this.metersLeft<=0) {
			this.win;
		}

		this.parent();

	},
	
	// Handles drawing objects onto the screen
	draw: function() {

		this.parent();
		
		// Write stats
		if (this.metersLeft>0) {
			this.statText.draw(Math.floor(this.metersLeft)+"m ",2,2);
		}

		// Draw buttons for mobile devices
		if (ig.ua.mobile) {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		// Write instruction text unless we've removed it
		else if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height-10;

			// Break text into two lines if screen is too narrow
			if (x < 88) {
				this.instructText.draw('and X to run', x, y, ig.Font.ALIGN.CENTER);
				this.instructText.draw('Press SPACE to jump', x, y-7, ig.Font.ALIGN.CENTER);
			}

			else
				this.instructText.draw('Press SPACE to jump and X to run', x, y, ig.Font.ALIGN.CENTER);
		}
		
	},

	// Lose logic
	gameOver: function() {
		ig.system.setGame(loseScreen);
	},

	// Win logic
	win: function() {
		ig.system.setGame(winScreen);
	}
});

// Template for all screens
screen = ig.Game.extend({

	// Set up resources
	instructText: new ig.Font( 'media/04b03.font.png'),
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

		// Buttons for nonmobile devices
		else {
			ig.input.bind(ig.KEY.SPACE, 'start');
		}
	},

	update: function() {

		// Go to main game if start is pressed
		if (ig.input.pressed ('start'))
			ig.system.setGame(myGame);

		this.parent();
	}
});

// Set up initial screen
startScreen = screen.extend({
	title: new ig.Image('media/text_atalanta.png'),

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

		// Set up screen for nonmobile devices
		else {
			if (y < 65)
				this.title.draw(x/2-32, 5);
			else
				this.title.draw(x/2-32, y/3);

			this.instructText.draw('Press SPACE to start', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
		}
	}
});

// Losing screen
loseScreen = screen.extend({

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		// Set up text
		this.instructText.draw('YOU LOSE', x/2, 8, ig.Font.ALIGN.CENTER);
		if (x<150) {
			this.instructText.draw('Gotta get hitched', x/2, 16, ig.Font.ALIGN.CENTER);
			this.instructText.draw('now, crap.', x/2, 24, ig.Font.ALIGN.CENTER);
		}

		else
			this.instructText.draw('Gotta get hitched now, crap', x/2, y/3-7, ig.Font.ALIGN.CENTER);

		// Set up screen for mobile devices 
		if (ig.ua.mobile) {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}

		// Set up screen for nonmobile devices
		else
			this.instructText.draw('SPACE to retry', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
	}
});

// Win screen
winScreen = screen.extend({

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		// Set up screen text
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
if (ig.ua.mobile)
	ig.main( '#canvas', startScreen, 60, ig.ua.viewport.width/3, ig.ua.viewport.height/3, 3 );

else
	ig.main( '#canvas', startScreen, 60, ig.ua.viewport.width/4, ig.ua.viewport.height/4, 4 );
});
