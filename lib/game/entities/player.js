// Handles player logic

ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({

		// Set up player
		animSheet: new ig.AnimationSheet('media/char_atalanta.png', 16,16),
		size: {x:8, y:14},
		offset: {x:4, y:2},
		health: 50,
		maxhealth: 50,
		jump: 200,

		// Collision detection for obstacle
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,

		// Initialize player
		init: function(x,y,settings) {
			this.addAnim('idle', 1, [0]);
			this.parent(x,y,settings);
		},

		update: function() {

			// Kill if no health
			if (this.health <= 0) {
				this.kill();
			}

			// Increase health gradually
			if (this.health<=this.maxhealth)
				this.health= this.health + .08;

			// Listen for run state
			if (ig.input.pressed('run')) {
				this.health--;

				// Increase speed until it reaches max
				if (ig.game.gameSpeed<=ig.game.maxGameSpeed)
					ig.game.gameSpeed=ig.game.gameSpeed-10;
			}

			// Listen for the jump state
			if (this.standing && ig.input.state('jump') && this.vel.y == 0) {
				this.vel.y = -this.jump;
				this.falling = false;
				this.health--;
			}
			
			// Mario jump
			if (!this.standing && !ig.input.state('jump') && !this.falling) {
				this.vel.y = Math.floor(this.vel.y/3);
				this.falling = true;
				this.health--;
			}

			this.parent();
		},

		draw: function() {

			this.parent();

			var scale = ig.system.scale,
				context = ig.system.context;

			// Draw health bar. Made with canvas elements so it can be resizeable
			if (this.health>=0) {

				// health bar
				context.beginPath();
				context.rect(.55*ig.system.width*scale, 3*scale, (this.health/this.maxhealth)*.4*ig.system.width*scale, 5*scale);
				context.fillStyle = "rgb(255,255,255)";
				context.fill();
				context.closePath();

				// health bar border
				context.beginPath();
				context.rect (.55*ig.system.width*scale, 3*scale, .4*ig.system.width*scale, 5*scale);
				context.lineWidth = scale;
				context.strokeStyle = "white";
				context.stroke();
				context.closePath();
			}
		},

		// Gameover if you run out of health
		kill: function() {
			this.parent;
			ig.game.gameOver();
		},

		// Handle damage
		receiveDamage: function(value) {
			this.parent(value);
		}
	});
});