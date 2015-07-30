(function() {
    'use strict';

    angular
        .module('puzzle')
        .directive('puzzlePiece', puzzlePiece);

    puzzlePiece.$inject = [];

    function puzzlePiece() {
        var directive = {
            restrict: 'AE',
            templateUrl: 'app/puzzle/puzzle.piece.html',
            scope: {
            	letter: '='
            }
        };
        return directive;
    }
})();
