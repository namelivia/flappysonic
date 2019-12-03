import { Container, Bitmap } from 'createjs'
import Floor from './Floor'
import Clouds from './Clouds'
export default class Scenario extends Container {

	constructor(cloudsImage, floorImage) {
		super()
		this.setup(cloudsImage, floorImage)
	}

	setup(cloudsImage, floorImage) {
		this.floor1 = new Floor(floorImage, 0); 	
		this.floor2 = new Floor(floorImage, 647); 	
		this.clouds1 = new Floor(cloudsImage, 0); 	
		this.clouds2 = new Clouds(cloudsImage, 192); 	

		this.addChild(
			this.floor1,
			this.floor2,
			this.clouds1,
			this.clouds2
		);
	}

	tick(event, state) {
		if (state == 0){
			this.floor1.tick(event, state)
			this.floor2.tick(event, state)
			this.clouds1.tick(event, state)
			this.clouds2.tick(event, state)
		}
	}
}
