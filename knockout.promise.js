(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout"], factory);
	} else {
		// Browser globals
		factory(jQuery, ko);
	}
}(this, function (ko) {
	ko.extenders.promise = function (target) {
		target.isLoading = ko.observable(false);
		target.isError = ko.observable(false);
		target.isLoaded = ko.observable(false);

		target.load = function (promise) {
			target.isLoading(true);
			target.isLoaded(false);
			target.isError(false);

			promise.fail(function () {
				target.isError(true);
			}).always(function () {
				target.isLoading(false);
			}).done(function (data) {
				target.isLoaded(true);
				target(data);
			});

			return promise;
		};

		return target;
	};
}));
