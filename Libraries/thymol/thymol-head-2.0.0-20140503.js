head.thThymolPath = "${thThymolPath}";
head.thThymolSource = "${thThymolSource}";
head.thJQuerySource = "${thJQuerySource}";

head.load(
		head.thThymolPath + head.thJQuerySource, 
		head.thThymolPath + head.thThymolSource + (function() {
			var result = "";
			var items = document.getElementsByTagName("script");
			for (var i = 0, iLimit = items.length; i < iLimit; i++) {
				var parameters = items[i].getAttribute("data-thymol-parameters");
				if (!!parameters) {
					if (result === "") {
						result = "?" + parameters;
					}
					else {
						result = result + "&" + parameters;
					}
				}
			}
			return result;
		})()
);

(function() {
	var items = document.getElementsByTagName("script");
	for (var i = 0, iLimit = items.length; i < iLimit; i++) {
		var parameters = items[i].getAttribute("data-thymol-load");
		if (!!parameters) {
			var args = [];
			var splits = parameters.split(",");
			for (var j = 0, jLimit = splits.length; j < jLimit; j++) {
				args.push(splits[j]);
			}
			head.load(args);
		}
	}
})();
