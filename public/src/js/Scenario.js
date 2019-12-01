import { Container, Bitmap } from 'createjs'
export default class Scenario extends Container {

	constructor(cloudsImage, floorImage) {
		super()
		this.setup(cloudsImage, floorImage)
	}

	setup(cloudsImage, floorImage) {
		this.floor = new Bitmap(floorImage); 	
		this.floor.x = 0;
		this.floor.y = 192;
		this.clouds = new Bitmap(cloudsImage); 	
		this.clouds.x = 0;
		this.clouds.y = 0;
		this.floor2 = new Bitmap(floorImage); 	
		this.floor2.x = 674;
		this.floor2.y = 192;
		this.clouds2 = new Bitmap(cloudsImage); 	
		this.clouds2.x = 640;
		this.clouds2.y = 0;
		this.addChild(this.clouds,this.clouds2,this.floor,this.floor2);
	}

	tick(event, state) {
		if (state==0){
			this.clouds.x = this.clouds.x-1;
			this.floor.x = this.floor.x-2;
			this.clouds2.x = this.clouds2.x-1;
			this.floor2.x = this.floor2.x-2;
			if (this.floor.x == -674){
				this.floor.x = 674;
			}
			if (this.floor2.x == -674){
				this.floor2.x = 674;
			}
			if (this.clouds.x == -640){
				this.clouds.x = 640;
			}
			if (this.clouds2.x == -640){
				this.clouds2.x = 640;
			}
		}
	}

	sum = (a, b) => (a + b)
}
exports.Scenario = Scenario
