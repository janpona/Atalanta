// Handles logic of obstacles

ig.module(
	'game.entities.obstacle'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityObstacle = ig.Entity.extend({
		
		// Set up obstacle
		animSheet: new ig.AnimationSheet('media/obstacles.gif', 16, 16),
		gravityFactor: 0,
		size: {x:10, y:10},
		offset: {x:3, y: 6},

		// Collision detection
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x,y,settings) {
			this.addAnim('short', .07, [0]);
			this.parent(x,y,settings);
		},

		update: function() {
			// Match velocity with game speed
			this.vel.x = ig.game.gameSpeed;
			this.parent();

			// Delete obstacle once it's off screen
			if (this.pos.x<-85) {
				this.kill();
			}
		},

		// Collision detection with player
		check: function(other) {
			other.receiveDamage(10);
			this.kill();
		}

	});
});