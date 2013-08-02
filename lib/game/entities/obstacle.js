ig.module(
	'game.entities.obstacle'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityObstacle = ig.Entity.extend({
		
		animSheet: new ig.AnimationSheet('media/obstacles.gif', 16, 16),
		speed: 15;

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

	});
});