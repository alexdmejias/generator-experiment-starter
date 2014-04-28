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
        skipInstall: this.options['skip-install']
      });
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Experiment Starter generator.'));

    var prompts = [{
      name: 'jquery',
      type: 'confirm',
      message: 'Would you like to jQuery?',
      default: false
    }, {
      name: 'appName',
      message: 'Name of your app',
      default: 'Experiment Kick Starter'
    }];

    this.prompt(prompts, function (props) {
      this.jquery = props.jquery;
      this.appName = props.appName;

      done();

    }.bind(this));
  },

  app: function () {
    this.mkdir('assets');
    this.mkdir('assets/css');

    this.mkdir('assets/scss');
    this.copy('normalize.scss', 'assets/scss/_normalize.scss');
    this.copy('bootstrap.scss', 'assets/scss/_bootstrap.scss');
    this.copy('base.scss', 'assets/scss/_base.scss');
    this.copy('styles.scss', 'assets/scss/styles.scss');

    this.mkdir('assets/js');
    this.copy('app.js', 'assets/js/app.js');

    var index_params = {
      appName: this.appName,
      jquery: this.jquery
    }
    this.template('_index.html', 'index.html', index_params);

    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('server_creds.json', 'server_creds.json');

    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json', index_params);
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
  }
});

module.exports = ExperimentStarterGenerator;