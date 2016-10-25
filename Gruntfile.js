module.exports = function (grunt) {
    require('jit-grunt')(grunt);
	
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
				},
                files: {
                    "public/css/sb-admin-2.css": "less/sb-admin-2.less" // destination file and source file
				}
			}
		},
        watch: {
            styles: {
                files: ['less/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
				}
			}
		}
	});
	
    grunt.registerTask('default', ['less', 'watch']);
};