/**
 * Copy files into locations for other tasks.
 */
'use strict';

var config = require('../config');

module.exports = {
  // bootstrap with our custom overrides, mostly cause we don't want glyphicons
  bootstrap_less_tmp_styles: {
    expand: true,
    flatten: true,
    cwd: config.paths.app(),
    dest: config.paths.tmp('bootstrap-less/'),
    src: [
      'styles/bootstrap/*.less',
      '../bower_components/bootstrap/less/*.less',
      '!../bower_components/bootstrap/less/bootstrap.less'
    ]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: config.paths.app(),
      dest: config.paths.dist(),
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        '*.html',
        'images/{,*/}*.{webp}',
        'fonts/*'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: config.paths.dist('images'),
      src: ['generated/*']
    }]
  },
  static_tmp: {
    expand: true,
    cwd: config.paths.app('mocks'),
    dest: config.paths.tmp('static'),
    src: 'inline-objects.json'
  },
  styles: {
    expand: true,
    cwd: config.paths.app(),
    dest: config.paths.tmp('styles/'),
    src: '{,*/}*.css'
  },
  jcropGif: {
    expand: true,
    cwd: 'bower_components/jcrop/css',
    dest: config.paths.dist('styles/'),
    src: 'Jcrop.gif'
  },
  font_awesome_fonts_tmp: {
    expand: true,
    cwd: 'bower_components/font-awesome/fonts',
    dest: config.paths.tmp('static/'),
    src: ['fontawesome-webfont.*']
  },
  font_awesome_fonts_dist: {
    expand: true,
    cwd: 'bower_components/font-awesome/fonts',
    dest: config.paths.dist('fonts/'),
    src: ['fontawesome-webfont.*']
  },
  // font awesome with our custom overrides
  font_awesome_less_tmp_styles: {
    expand: true,
    flatten: true,
    cwd: config.paths.app(),
    dest: config.paths.tmp('font-awesome-less/'),
    src: [
      'styles/font-awesome/variables.less',
      '../bower_components/font-awesome/less/*.less',
      '!../bower_components/font-awesome/less/variables.less'
    ]
  },
  zeroclipboard: {
    expand: true,
    cwd: 'bower_components/zeroclipboard/dist',
    dest: config.paths.dist('swf/'),
    src: ['ZeroClipboard.swf']
  }
};
