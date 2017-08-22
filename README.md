# Vanilla JS Calendar

Create a minified version
> UglifyJS is required

```bash
uglifyjs vanillacalendar.js -o dist/vanillacalendar.min.js
```

Usage

```html
<script src="vanillacalendar.js" type="text/javascript"></script>
<script>
	window.addEventListener('load', function () {
	  vanillacalendar.init();
	})
</script>
```