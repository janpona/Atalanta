ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.race1',
	'plugins.touch-button'
)
.defines(function(){

// Initialize game
game = ig.Game.extend({
	
	// Load resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),
	
	// Set up game variables
	gravity: 300,
	
	init: function() {

		// Set up buttons for mobile
		if(ig.ua.mobile) {
			var ypos = ig.system.height - 16;
			this.buttons = [
				new ig.TouchButton( 'run', 4, ypos-2, 32, 16, this.buttonImage, 0 ),
				new ig.TouchButton( 'jump', ig.system.width - 36, ypos-2, 32, 16, this.buttonImage, 1 )
			];
		}
		
		// Set up keys for desktop
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

		this.parent();

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Instruction text for non-mobile devices
		if (!ig.ua.mobile && this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height-10;

			if (x < 88) {
				this.instructText.draw('and X to run', x, y, ig.Font.ALIGN.CENTER);
				this.instructText.draw('Press SPACE to jump', x, y-7, ig.Font.ALIGN.CENTER);
			}

			else
				this.instructText.draw('Press SPACE to jump and X to run', x, y, ig.Font.ALIGN.CENTER);
		}

		// Draw buttons for mobile devices
		else {
			for (var i = 0; i < this.buttons.length; i++) {
				this.buttons[i].draw();
			}
		}
	}
});

startScreen = ig.Game.extend({
	// Load resources
	instructText: new ig.Font( 'media/04b03.font.png'),
	title: new ig.Image('media/text_atalanta.png'),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),

	init: function() {
		ig.input.bind(ig.KEY.SPACE, 'start');
	},

	update: function() {
		if (ig.input.pressed ('start'))
			ig.system.setGame(game);
		this.parent();
	},

	draw: function() {
		this.parent();

		var x = ig.system.width,
			y = ig.system.height;

		if (!ig.ua.mobile) {

			if (y < 65)
				this.title.draw(x/2-32, 5);
			else
				this.title.draw(x/2-32, y/3);
			this.instructText.draw('Press SPACE to start', x/2, 4*y/5, ig.Font.ALIGN.CENTER);
		}

		else {
			var ypos = y - 16;
			this.buttons = [
				new ig.TouchButton( 'start', 4, ypos-2, 32, 16, this.buttonImage, 0 ),
			];
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled up by a factor of 4
ig.main( '#canvas', startScreen, 60, ig.ua.viewport.width/4, ig.ua.viewport.height/4, 4 );

});
