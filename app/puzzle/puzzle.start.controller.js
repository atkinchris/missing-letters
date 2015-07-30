(function() {
    'use strict';

    angular
        .module('puzzle')
        .controller('PuzzleStartController', PuzzleStartController);

    PuzzleStartController.$inject = ['PuzzleService'];

    function PuzzleStartController(PuzzleService) {
        var vm = this;
        vm.letters = [];
        vm.rack = [];

        var puzzle;

        activate();

        ////////////////

        function activate() {
            puzzle = PuzzleService.getPuzzle();
            vm.letters = puzzle.letters;
            vm.rack = puzzle.rack;
        }
    }
})();