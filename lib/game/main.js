ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.race1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Bind keys
		ig.input.bindTouch('#runButton', 'run');
		ig.input.bindTouch('#jumpButton', 'jump');

		this.loadLevel( LevelRace1)
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		// Screen follows player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x.round() - ig.system.width/2;
			this.screen.y = player.pos.y.round() - ig.system.height/2;
		}

		// Update screen positon. If not used, movement will be choppy.
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].setScreenPos( this.screen.x, this.screen.y);
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
	}


});

// Get window height
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

// Start the Game with 60fps, a resolution of 320x240, scaled up by a factor of 2
ig.main( '#canvas', MyGame, 60, x/4, y/4, 4 );

});
