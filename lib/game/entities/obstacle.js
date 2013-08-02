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
		speed: 15;
		friction: {x:150, y: 0},

		// Collision detection
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,


		init: function( x, y, settings) {
			this.parent( x, y, settings);

			// Handle tall column
			if (false) {
				this.size = {x: 10, y: 16};
				this.offset = {x:3, y:0};
			}

			else {
				this.addAnim('short', .07,);
				this.size = {x:10, y:10};
				this.offset = {x:3, y: 6};
				this.vel.x = this.speed;
			}
		}

		check: function( player ) {
			player.receiveDamage(10, this);
		}

	});
});