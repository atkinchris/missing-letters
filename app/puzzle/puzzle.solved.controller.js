(function() {
    'use strict';

    angular
        .module('puzzle')
        .controller('PuzzleSolvedController', PuzzleSolvedController);

    PuzzleSolvedController.$inject = ['$state', '$stateParams'];

    function PuzzleSolvedController($state, $stateParams) {
        var vm = this;
        vm.score = 0;
        vm.word = '';
        vm.restart = restart;

        activate();

        ////////////////

        function activate() {
            vm.score = +$stateParams.score;
            vm.word = $stateParams.word;
        }

        function restart() {
            $state.go('puzzle.start');
        }
    }
})();
