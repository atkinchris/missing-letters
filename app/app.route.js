(function() {
    'use strict';

    angular
        .module('app')
        .config(Config);

    Config.$inject = ['$urlRouterProvider'];

    function Config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
})();
