(function() {
    'use strict';

    angular
        .module('puzzle')
        .controller('PuzzleSolvedController', PuzzleSolvedController);

    PuzzleSolvedController.$inject = ['$state', '$stateParams'];

    function PuzzleSolvedController($state, $stateParams) {
        var vm = this;
        vm.score = 0;
        vm.restart = restart;

        activate();

        ////////////////

        function activate() {
            vm.score = +$stateParams.score;
        }

        function restart() {
            $state.go('puzzle.start');
        }
    }
})();
