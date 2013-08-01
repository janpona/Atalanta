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

MyGame = ig.Game.extend({
	
	// Load resources
	font: new ig.Font( 'media/04b03.font.png' ),
	buttons: [],
	buttonImage: new ig.Image('media/text_buttons.gif'),
	
	// Set up game variables
	gravity: 300,
	
	init: function() {
		// Bind keys for desktop
		ig.input.bind(ig.KEY.X,'run');
		ig.input.bind(ig.KEY.SPACE, 'jump');

		// Bind keys for mobile
		if( ig.ua.mobile ) {
			var ypos = ig.system.height - 16;
			this.buttons = [
				new ig.TouchButton( 'run', 4, ypos-2, 32, 16, this.buttonImage, 0 ),
				new ig.TouchButton( 'jump', ig.system.width - 36, ypos-2, 32, 16, this.buttonImage, 1 )
            ];
        }

		this.loadLevel( LevelRace1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Draw all touch buttons
		for( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[i].draw();
		}
	}


});

// Start the Game with 60fps, a resolution of 320x240, scaled up by a factor of 2
ig.main( '#canvas', MyGame, 60, ig.ua.viewport.width/4, ig.ua.viewport.height/4, 4 );

});
