function Trippy (context, width, height) {
	this.context = context;
	this.width = width;
	this.height = height;

	this.colors = [];	
	this.loadingColors = [];
	this.loading = false;
	this.frequency = 0.1;
	this.colorCount = 100;
	
	this.then = Date.now();
	this.delta;
	this.fps = 16;
	this.i = 1;
	this.interval = 1000/this.fps;
	this.see = true;

	this.recalcColors();
}

Trippy.prototype.recalcColors = function () {
	var redFreq = 0.1 + this.frequency, 
		greenFreq = 0.2 + this.frequency,
		blueFreq = 0.3 + this.frequency;

	for (var i =0; i < this.colorCount; i++) {
		red   = Math.sin(redFreq*i + 0) * 127 + 128;
   		green = Math.sin(greenFreq*i + 1) * 127 + 128;
   		blue  = Math.sin(blueFreq*i + 2) * 127 + 128;

   		this.colors[i] = utils.RGB2Color(red, green, blue);
	}
}

Trippy.prototype.drawBg = function() {
	var self = this;

	var layerCount = 5,
		borderWidth = 15;

	if (self.i == self.colors.length - (layerCount - 1) || self.i == 0) {
		self.see = !self.see;
		self.see ? self.i++ : self.i--;
	} else {
		self.see ? self.i++ : self.i--;
	}

	for (var i = 0; i < layerCount; i++) {
		self.context.fillStyle = self.colors[self.i + i];
		self.context.fillRect(borderWidth*i, borderWidth*i, (self.width - (borderWidth*(i*2))), (self.height - (borderWidth*(i*2))));
	}

}


Trippy.prototype.update = function() {
	var self = this;

	now = Date.now();
    self.delta = now - self.then;
     
    if (self.delta > self.interval) {

		self.drawBg();

		self.then = now - (self.delta % self.interval);
	}
}