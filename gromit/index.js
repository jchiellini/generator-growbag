'use strict';
var util = require('util');
var fs = require('fs');
var colors = require('colors');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var GromitGenerator = yeoman.generators.Base.extend({
  init: function (name, dataset, appName) {
    var project_path = appName != undefined ? appName+"/project.yml" : 'project.yml';
    if(!fs.existsSync(project_path)){
      console.log("\nError: 'project.yml' cannot be found".red,"\nHINT: Make sure that you are inside your existing project's directory to install a gromit.".yellow);
      throw "Missing project.yml"
    }
  },
  askFor: function (name, dataset) {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'addController',
      message: 'Would you like to add a controller to your gromit?',
      default: true
    },{
      when: function(props) { return props.addController; },
      type: 'confirm',
      name: 'useChartBuilder',
      message: 'Would you like to use the ChartBuilder?',
      default: true
    }];

    if(dataset == undefined){
      prompts.push({
        when: function(props) { return props.addController; },
        name: 'dataset',
        message: 'What is the name of your dataset?',
        default: ''
      });
    }

    if(name == undefined){
      prompts.unshift({
        name: 'name',
        message: 'What is the name of your gromit?',
        default: 'gromit'
      });
    }

    this.prompt(prompts, function (props) {
      this.addController = props.addController;
      this.useChartBuilder = props.useChartBuilder;
      this.dataset = dataset != undefined ? dataset : props.dataset;
      this.name = props.name;
      done();
    }.bind(this));
  },
  generateGromit:function(name, dataset, appName){
    if(this.name == undefined){
      this.name = name != undefined ? name : 'gromit';
    }
    if(this.dataset != undefined){
      this.dataset = this.dataset.replace(/"/g, "");
    }
    var context = {
      gromitName: this.name,
      dataset: this.dataset
    };

    var app_prefix = '';
    if(appName != undefined){app_prefix = appName+"/";}

    //JSON File
    this.template("_gromit.json", app_prefix+'fixtures/'+this.name+'.json');

    //Chart Builder
    if(this.useChartBuilder){
      this.copy("chart-dir.js", app_prefix+'scripts/directives/chart-dir.js');
      this.copy("chartBuilder-svc.js", app_prefix+'scripts/services/chartBuilder-svc.js');
      this.copy("dataBuilder-svc.js", app_prefix+'scripts/services/dataBuilder-svc.js');
      this.copy("chartConfig-svc.js", app_prefix+'scripts/services/chartConfig-svc.js');
      this.copy("grouped-categories.js", app_prefix+'scripts/lib/grouped-categories.js');
      this.template("_viewBuilder.html", app_prefix+'/views/'+this.name+'.html',context);
    }
    else {
      if(!this.addController){
        this.template("_view.html", app_prefix+'/views/'+this.name+'.html',context);
      }
      else{
        this.template("_viewCtrl.html", app_prefix+'/views/'+this.name+'.html',context);
      }
    }

    //Controller file
    if(this.addController){
      this.useChartBuilder ?
        this.template("_ctrlBuilder.js", app_prefix+'scripts/controllers/'+this.name+'-ctrl.js',context) :
        this.template("_ctrl.js", app_prefix+'scripts/controllers/'+this.name+'-ctrl.js',context);
    }

    //Update project.yml
    var path = app_prefix+"project.yml",
      file = this.readFileAsString(path),
      substitution =   '\n  gr.path.data.'+this.name+':\
                        \n    dev: \"{gr.path.fixtures}/'+this.name+'.json"\
                        \n    sandbox: \"{gr.path.wallace}\"\
                        \n    npn: \"{gr.path.wallace}\"\n';

    String.prototype.splice = function( idx, rem, s ) {
      return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
    };

    file = file.splice( file.length, 0, substitution);
    this.write(path, file);

    console.log("Successfully created gromit \'"+this.name+"\'");
  }
});

module.exports = GromitGenerator;
