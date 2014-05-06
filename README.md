# Front Starter

This is not a front end framework!

Front Start is a simple and lightweight kit to structure your web apps and run some essential tasks.

## Dependencies

- [node.js](http://nodejs.org/)
- [grunt](http://gruntjs.com/)

## How to use it?

Clone this repository:

```
git clone https://github.com/gneutzling/frontstarter
```

Make sure you are in root folder and install the dependecies:
```
sudo npm install
```

Now you just need to run Grunt:

```
grunt
```

## Configured tasks

- grunt [default]
	- Watch for changes in SASS and JS files.
	- Generates a CSS from SCSS files.
	- Concatenates JS files.
	- Debug functions are active.
- grunt dist
	- Minifies HTML files.
	- Generates a CSS file minified.
	- Concatenates and minifies JS files.
- grunt build
	- Run dist tasks.
	- Creates a zip with final files.

## Contributing

If you want to contribute, please feel free to do this. :beers:

## License

Released under the MIT license.