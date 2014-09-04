module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["styles/less"],
          yuicompress: true
        },
        files: {
          "styles/main.css": "styles/less/main.less"
        }
      }
    },
    watch: {
      files: "styles/less/*",
      tasks: ["less"]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['less', 'watch']);
};
