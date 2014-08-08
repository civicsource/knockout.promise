#Knockout Promise Extender

> Knockout extender to convert a promise object into useful observables.



##Install with [Bower](http://bower.io/)

```
bower install knockout-promise
```

Then add `knockout.promise.js` to your project.

##How to Use

Include the script on your page (either via a normal script tag or via an AMD loader). Create an observable and extend it with `promise`.

```js
var myAwesomeData = ko.observable().extend({ promise: true });
```

This will add a few observables that hang off of the observable you extended, `isLoading`, `isError`, and `isLoaded`. It also adds a `load` function. Later on, when you need to load data into this observable, you can simply do:

```js
myAwesomeData.load(service.makeRequestThatReturnsPromise());
```

This will set the `isLoading` observable to `true` while data is loaded from the server. If the promise is rejected (e.g. the AJAX request failed), the `isError` is set to true while the `isLoading` is set to false. Once the data is successfuly returned from the server, the `isLoading` and `isError` observables will be set to false while the `isLoaded` observable will be set to true.

```html
<div data-bind="if: myAwesomeData.isLoading">Loading…</div>
<div data-bind="if: myAwesomeData.isError">There was an error!</div>
<div data-bind="if: myAwesomeData.isLoaded">
	<!-- show that awesome data -->
</div>
```

Since you are working with promises here, you can do all kinds of fancy things such as manipulating the data after it comes back from the server but before the extender gets to it:

```js
myAwesomeData.load(service.makeRequestThatReturnsPromise().then(function(data) {
	//manipulate the data
	return data;
}));
```
