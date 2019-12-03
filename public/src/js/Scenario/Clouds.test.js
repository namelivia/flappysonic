import { Bitmap } from 'createjs'
export default class Clouds extends Bitmap{

	constructor(cloudsImage, x) {
		super(cloudsImage)
		this.x = x;
		this.y = 0;

	tick(event, state) {
		this.x -= 1
		if (this.x == -640){
			this.x = 640;
		}
	}
}
