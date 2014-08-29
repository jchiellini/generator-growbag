# generator-growbag 

> [Yeoman](http://yeoman.io) generator to scaffold a new canvas growbag project, gromits, or both at once!


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-growbag from npm, run:

```bash
$ npm install -g generator-growbag
```

### How to use the generator:

First, navigate to the 'projects' folder with your local copy of the ['Canvas/Growbag'](http://githuben.intranet.mckinsey.com/canvas/growbag) repository in your terminal window. Then choose one of the commands below.


### New project:

Sets up a new Growbag project, generating all the directories and basic files you need to get started. The generator will prompt you to supply information such as project name, environment id, and whether you would like to add a gromit.

Example:

```bash
$ yo growbag
```

There are also optional parameters that you can supply to speed up the process. Project name, environment id, new gromit's name, and the gromit's dataset can be added to the command.

Example:

```bash
$ yo growbag project_name environment_id gromit_name gromit_dataset
```

### Gromit:

If you are simply looking to add a new gromit to an existing project, you can use the gromit subgenerator. Navigate to your existing project folder and choose one of the commands below.

```bash
$ yo growbag:gromit
```

As with the project generator, there are optional parameters that can be specified as well. The gromit's name and dataset can be added to your terminal command.

Example:

```bash
$ yo growbag:gromit gromit_name gromit_dataset
```

### Chart Builder:

What is Chart Builder and when do I use it? When you are making a gromit with a chart built by Highcharts, Chart Builder will make your life a lot easier. Chart Builder is a series of services and a directive to help you easily configure it. While generating a gromit, you will be prompted to add a controller. If you choose to include one, then you will be further prompted to include the Chart Builder files.

There are several files included: chartBuilder-svc.js, dataBuilder-svc.js, chartConfig-svc.js, and chart-dir.js.

Usage:

```bash
  <chart id="chart_id" options="chart_id_options" data="chart_id_data" legend-btn="chart_id_legend"></chart>
```

The "id" will be the identification for the chart's div. The options are the configuration object that will be used to display the chart. The data attribute specifies the data package that will be rendered. The last attribute is optional. If included, specifying the "id" of the button, this attribute will add a button to toggle the legend.

If the standard data model does not suffice, adding a new custom method to the dataBuilder-svc.js will allow you to mold the data any way you need it. If the data is being return asynchronously, make sure that a promise is used to render the directive correctly. The generated example demonstrates this case.

The general configuration is done by specifying a chart type and several other parameters leveraging the chartConfig service.

Example:

```bash
    $scope.options = chartConfig('column','Title', 'Subtitle', [70,30], [{colors:['red','white','blue']}]);
```

The first parameter specifies the chart type that corresponds to a pre-made set of configurations. If one does not exist, add it within the service. The second and third parameters are the chart's titles. The optional fourth parameter specifies the Y plotlines that will appear on the chart by entering an array of values. The last parameter is for option overrides for cases when the general configuration for your chart type does not quite get you there. Specify an array of property objects that you would like to include.

Lastly, the chartBuilder service renders the chart by combining all the information supplied in the directives attributes.


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
