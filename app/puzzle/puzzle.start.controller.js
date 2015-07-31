(function() {
    'use strict';

    angular
        .module('puzzle')
        .controller('PuzzleStartController', PuzzleStartController);

    PuzzleStartController.$inject = ['$state', 'PuzzleService'];

    function PuzzleStartController($state, PuzzleService) {
        var vm = this;
        vm.puzzle = {};
        vm.tryLetter = tryLetter;

        activate();

        ////////////////

        function activate() {
            PuzzleService.generate();
            vm.puzzle = PuzzleService.puzzle;
        }

        function tryLetter(letter) {
            PuzzleService.tryLetter(letter);
            if (vm.puzzle.solved) {
                $state.go('puzzle.solved', {
                    score: vm.puzzle.score,
                    word: vm.puzzle.letters
                });
            }
        }
    }
})();
