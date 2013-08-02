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

		// Physics
		accelAir: 200,
		jump: 200,

		// Initialize player
		init: function(x,y,settings) {
			this.addAnim('idle', 1, [0]);
			this.parent(x,y,settings);

			// Set proper animation for sprite. Format is name, speed, and sprite number.
			// this.addAnim('run', .07, [0,1,2,3,4,5]);
			// this.addAnim('jump', 1, [9]);

		},

		update: function() {

			// Listen for run state
			if (ig.input.pressed('run')) {
				console.log("run!");
			}

			// Listen for the jump state
			if (this.standing && ig.input.state('jump')) {
				if (this.vel.y == 0) {
				this.vel.y = -this.jump*.5;
				this.falling = false;
				}
			}

			// Mario higher jump if you press longer
			if(!this.standing && !ig.input.state('jump') && !this.falling) {
				this.vel.y = Math.floor(this.vel.y);
				this.falling = true;
			}

			this.parent();

			// set the screen position to around the 
			ig.game.screen.x = this.pos.x - ig.system.width/2.5;
			ig.game.screen.y = this.pos.y - ig.system.height/2.5;
		}
	});
});