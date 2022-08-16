# *Papers, Please* Localization Package Builder



This packer is used to generate game-ready localization packs authored in the [loc tool for *Papers, Please*](http://paperspleaseloc.github.io/). It replaces the in-browser Chrome extension previously required to snapshot localized images and text and uses Node and Playwright to render page elements directly to images.



## Installation

Install Node and copy this repo's *packer* folder somewhere on your computer. From inside the *packer* folder, run 'npm install' to install all the dependencies:

```bash
npm install
```



## Usage

Edit the localization using the loc tool, then EXPORT the csv to somewhere on your hard drive. Run 'node .' from the installed *packer* directory to generate a localization pack zip from this csv:

```bash
node . --csv <path.to.csv> --url <url.of.loctool> --out <path.to.output.dir>
```

For example, with *en.csv* on your Desktop:

```bash
node . --csv C:\Users\me\Downloads\en.csv --url http://paperspleaseloc.github.io --out C:\Users\me\Desktop\out
```

The packer will load the csv, connect to the loc tool, and generate all necessary images and data files in a *\_\_temp\_\_<lang>/* subdirectory, then zip everything into *<lang>.zip* in the *C:\Users\me\Desktop\out* directory.



## Game

Put the <lang>.zip file into the game's "Loc" subdirectory. Restart the game, and it should appear as a language option from the settings menu.



## Implementation

The [*Papers, Please* localization tool](http://paperspleaseloc.github.io/) uses HTML and CSS to lay out WYSIWYG images used by the game ([excruciating details here](http://dukope.tumblr.com/post/83177288060/localizing-papers-please-papers-please-was)). As a pixel-art game, all text uses non-smoothed sharp bitmap fonts. *Font-smoothing* options work in most browsers but getting the resultant image is not easy. Chrome has a tab snapshotting API that I was using previously, but maintaining the extension and getting it to work reliably on Windows and MacOS was too much trouble. 

This new implementation instead uses Headless Webkit and Playwright to render the document divs directly to pngs.


## Support

This (and the loc tool) are completely unsupported. It was developed and tested briefly under MacOS and Windows.

