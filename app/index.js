'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var GrowbagGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.options.env.options = {force:true};
  },
  askFor: function (appName,env_id,gromitName,dataset) {
    var done = this.async();

    var prompts = [
      {
        type: 'confirm',
        name: 'useLess',
        message: 'Would you like to use Less?',
        default: true
      }
    ];

    if(appName == undefined){
      prompts.push({
        name: 'appName',
        message: 'Enter your project name',
        default: 'canvas-project'
      });
    }

    if(env_id == undefined){
      prompts.push({
        name: 'env_id',
        message: 'Enter your project\'s environment id?',
        default: '00'
      });
    }

    console.log(gromitName);

    if(gromitName == undefined){
      prompts.push({
        type: 'confirm',
        name: 'addGromit',
        message: 'Would you like to add a gromit?',
        default: true
      });
    }

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Growbag generator!'));

    if(prompts.length == 0){ console.log('Scaffolding \''+appName+'\'...')};


    this.prompt(prompts, function (props) {
      this.appName = appName != undefined ? appName : props.appName;
      if(this.appName != undefined){
        this.appName = this.appName.replace(/"/g, "");
      }
      this.env_id = env_id != undefined ? env_id : props.env_id;
      this.addGromit = gromitName != undefined ? gromitName : props.addGromit;
      this.useLess = props.useLess;
      done();
    }.bind(this));
  },
  app: function(appName,env_id,gromitName,dataset){
    this.mkdir(this.appName);
    this.mkdir(this.appName+'/fixtures');
    this.mkdir(this.appName+'/scripts');
    this.mkdir(this.appName+'/scripts/directives');
    this.mkdir(this.appName+'/scripts/lib');
    this.mkdir(this.appName+'/scripts/controllers');
    this.mkdir(this.appName+'/scripts/services');
    this.mkdir(this.appName+'/styles');
    this.mkdir(this.appName+'/templates');
    this.mkdir(this.appName+'/views');

    var context = {
      env_id: this.env_id,
      appName: this.appName
    };

    if(this.useLess){
      this.mkdir(this.appName+'/styles/less');
      this.copy("_main.css",this.appName+'/styles/less/main.less');
      this.copy("_GruntFile.js",this.appName+'/Gruntfile.js');
      this.copy("_package.json",this.appName+'/package.json',context);
    }
    else{
      this.copy("_main.css",this.appName+'/styles/main.css');
    }

    this.template("_project.yml", this.appName+'/project.yml', context);
    this.template("_default.html", this.appName+'/templates/default.html', context);
  },
  addGromit:function(appName,env_id,gromitName,dataset){
    if(this.addGromit){
      var done = this.async();
      this.invoke("growbag:gromit", {args: [gromitName,dataset,this.appName], force:true }, function(){
        done();
      });
    }
  }
});

module.exports = GrowbagGenerator;
