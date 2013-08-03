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
		health: 100,
		jump: 200,

		// Set up invincibility
		invincible: true,
		invincibleDelay: 2,
		invincibleTimer: null,

		// Collision detection
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE, // Player won't move as a result of collision

		// Initialize player
		init: function(x,y,settings) {
			this.addAnim('idle', 1, [0]);
			this.parent(x,y,settings);

			this.invincibleTimer = new ig.Timer();
			this.makeInvincible;

			// Set proper animation for sprite. Format is name, speed, and sprite number.
			// this.addAnim('run', .07, [0,1,2,3,4,5]);
			// this.addAnim('jump', 1, [9]);

		},

		update: function() {

			// Invincibility

			if (this.invincibleTimer.delta() > this.invincibleDelay) {
				this.invincible.false;
				this.currentAnim.alpha = 1;
			}

			// Listen for run state
			if (ig.input.pressed('run')) {
				console.log("run!");
			}

			// Listen for the jump state
			if (this.standing && ig.input.state('jump')) {
				if (this.vel.y == 0) {
				this.vel.y = -this.jump;
				this.falling = false;
				}
			}
			
			// Mario jump
			if (!this.standing && !ig.input.state('jump') && !this.falling) {
				this.vel.y = Math.floor(this.vel.y/3);
				this.falling = true;
			}

			this.parent();
		},

		draw: function() {
			if(this.invincible)
				this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1;
			this.parent();
		},

		receiveDamage: function(amount, from) {
			if(this.invincible)
				return;
			this.parent(amount, from);
		},

		makeInvincible: function() {
			this.invincible = true;
			this.invincibleTimer.reset();
		}
	});
});