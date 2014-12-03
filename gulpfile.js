var gulp = require('gulp');
var pkg  = require('./package.json');

var config = {
  jsFiles: ['*.js', 'test/*.js']
};

gulp.task( 'lint', function(){
  return gulp.src( config.jsFiles )
    .pipe( require('gulp-jshint')( pkg.jshint || {} ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'watch', function(){
  gulp.watch( config.jsFiles, ['lint'] );
});

gulp.task( 'default', ['lint', 'watch'] );