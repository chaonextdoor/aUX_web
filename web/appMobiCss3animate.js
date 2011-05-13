/**
 * AppMobi.toolkit.css3Animator 
 * @copyright 2011 - AppMobi
 * @author IDM
 */
if(!window.AppMobi)
	AppMobi={};
if (!AppMobi.toolkit)
	AppMobi.toolkit = {};

AppMobi.toolkit.css3Animate = (function() {

	var translateOpen = 'm11' in new WebKitCSSMatrix() ? "3d(" : "(";
	var translateClose = 'm11' in new WebKitCSSMatrix() ? ",0)" : ")";
	var webkitTransitionCallbacks = {};

	var css3Animate = function(elID, options) {
		if (typeof elID == "string" || elID instanceof String) {
			this.el = document.getElementById(elID);
		} else {
			this.el = elID;
		}
		if (!this instanceof css3Animate) {
			return new css3Animate(elID, opts);
		}
		this.el.addEventListener("webkitTransitionEnd", finishAnimation, false);
		if (options["opacity"]) {
			this.el.style.opacity = options["opacity"];

		}
		if (options["previous"]) {
			options.y += new WebKitCSSMatrix(
					window.getComputedStyle(this.el).webkitTransform).f;
			options.x += new WebKitCSSMatrix(
					window.getComputedStyle(this.el).webkitTransform).e;
		}
		if(!options["timingFunction"])
			options["timingFunction"]="linear";
		this.el.style.webkitTransform = "translate" + translateOpen + options.x
				+ "px," + options.y + "px" + translateClose + " scale(1)";
		// this.el.style.webkitTransitionDuration = options["time"];
		this.el.style.webkitBackfaceVisiblity = "hidden";
		this.el.style.webkitTransition = "all " + options["time"];
		this.el.style.webkitTransitionTimingFunction = options["timingFunction"];
		if (options["width"]) {
			this.el.style.width = options["width"];
		}
		if (options["height"]) {
			this.el.style.height = options["height"];
		}
		if (options["callback"]) {

			if (!webkitTransitionCallbacks[this.el.id])
				webkitTransitionCallbacks[this.el.id] = [];
			webkitTransitionCallbacks[this.el.id].push(options["callback"]);
			this.el.moving = true;
		}
	};

	function finishAnimation(event) {
		event.preventDefault();
		var that = event.target;
		if (!event.target.moving)
			return;
		event.target.moving = false;
		if (webkitTransitionCallbacks[event.target.id]
				&& webkitTransitionCallbacks[event.target.id].length > 0) {
			var cb = webkitTransitionCallbacks[event.target.id].shift();
			cb();
		}
	}
	return css3Animate;
})();
