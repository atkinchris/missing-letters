(function() {
    'use strict';

    angular
        .module('puzzle')
        .service('PuzzleService', PuzzleService);

    PuzzleService.$inject = [];

    function PuzzleService() {
        var _word = '';
        var _puzzle = {
            letters: [],
            rack: []
        };

        this.getPuzzle = getPuzzle;
        this.tryLetter = isInWord;

        ////////////////

        function getPuzzle() {
            if (!_puzzle.letters.length) {
                _generate();
            }
            return _puzzle;
        }

        function isInWord(letter, word) {
            var _l = letter.toUpperCase();
            var _w = (word || _word);
            return _w.indexOf(_l) !== -1;
        }

        function _generate() {
            _word = 'Sainsburys'.toUpperCase();

            var unknownLetters = [];

            var i;
            for (i = 0; i < _word.length; i++) {
                if (!isInWord(_word[i], unknownLetters) && _randomBool()) {
                    unknownLetters.push(_word[i]);
                }
            }

            for (i = 0; i < _word.length; i++) {
                if (isInWord(_word[i], unknownLetters)) {
                    _puzzle.letters[i] = '?';
                } else {
                    _puzzle.letters[i] = _word[i];
                }
            }
        }

        function _randomBool() {
            return Math.random() >= 0.4;
        }
    }
})();
