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
            _puzzle.letters = _word;

            for (var i = 0; i < _word.length; i++) {
                var letter = _word.charAt(i);
                if (!isInWord(letter, _puzzle.rack) && _randomBool()) {
                    _puzzle.rack.push(letter);
                    _puzzle.letters = _replaceAll(_puzzle.letters, letter, '?');
                }
            }

            var rackSpace = 12 - _puzzle.rack.length;

            for (var j = 0; j < rackSpace; j++) {
                _puzzle.rack.push(_randomAlpha(_puzzle.rack));
            }

            _shuffle(_puzzle.rack);
        }

        function _randomBool() {
            return Math.random() >= 0.5;
        }

        function _randomAlpha(excluding) {
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            excluding = excluding || [];
            for (var i = 0; i < excluding.length; i++) {
                possible = possible.replace(excluding[i], '');
            }
            return possible.charAt(Math.floor(Math.random() * possible.length));
        }

        function _shuffle(array) {
            array.sort(function() {
                return 0.5 - Math.random();
            });
        }

        function _replaceAll(string, find, replace) {
            function escapeRegExp(string) {
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
            }

            return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }
    }
})();
