ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({

		// Set up player sprite
		animSheet: new ig.AnimationSheet('media/char_atalanta.png', 16,16),
		size: {x:8, y:14},
		offset: {x:4, y:2},
		flip: false,

		// Physics
		maxVel: {x:100, y:150},
		friction: {x:600, y:0},
		accelGround: 400,
		accelAir: 200,
		jump: 200,

		// Initialize player
		init: function(x,y,settings) {
			this.parent(x,y,settings);

			// Set proper animation for sprite. Format is name, speed, and sprite number.
			this.addAnim('idle', 1, [0]);
			// this.addAnim('run', .07, [0,1,2,3,4,5]);
			// this.addAnim('jump', 1, [9]);
		}
	});
});