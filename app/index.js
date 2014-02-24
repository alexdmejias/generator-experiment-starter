'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ExperimentStarterGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

   this.on('end', function () {
      this.installDependencies({
        skipInstall: options['skip-install']
      });
    });

  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic ExperimentStarter generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('assets');
    this.mkdir('assets/css');
    this.mkdir('assets/scss');
    this.mkdir('assets/js');

    this.copy('index.html', 'index.html');
    this.copy('app.js', 'assets/js/app.js');

    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('server_creds.json', 'server_creds.json');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
  }
});

module.exports = ExperimentStarterGenerator;