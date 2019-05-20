export default function (p) {
	p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
  }

  p.draw = function() {
    p.background(0)
  }
}