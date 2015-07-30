(function() {
    'use strict';

    angular
        .module('puzzle')
        .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider
            .state('puzzle', {
                url: '/',
                abstract: true,
                template: '<ui-view />'
            })
            .state('puzzle.start', {
                url: '',
                templateUrl: 'app/puzzle/puzzle.start.html',
                controller: 'PuzzleStartController',
                controllerAs: 'vm'
            });
    }
})();
