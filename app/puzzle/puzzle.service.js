(function() {
    'use strict';

    angular
        .module('puzzle')
        .service('PuzzleService', PuzzleService);

    PuzzleService.$inject = [];

    function PuzzleService() {
        var _words = [
            'Sainburys',
            'Baked Beans',
            'Supermarket',
            'Checkout',
            'Digital World',
            'Bananas',
            'Carrots',
            'Coca Cola',
            'Laptop',
            'Retail'
        ];
        var _word = '';
        var _puzzle = {
            letters: '',
            rack: [],
            score: 0,
            solved: false
        };
        var _score = 0;
        var _rackSize = 18;

        this.puzzle = _puzzle;
        this.tryLetter = tryLetter;
        this.generate = generate;

        ////////////////

        function tryLetter(letter) {
            if (!_isInWord(letter, _word) || _isInWord(letter, _puzzle.letters)) {
                _puzzle.score = _puzzle.score - 10;
                return false;
            }
            for (var i = 0; i < _word.length; i++) {
                var character = _word.charAt(i);
                if (character === letter.toUpperCase()) {
                    _puzzle.letters = _replaceAt(_puzzle.letters, i, character);
                }
            }
            _puzzle.score = _puzzle.score + 10;
            _isSolved();
            return true;
        }

        function generate() {
            _word = _randomArray(_words).toUpperCase();
            _puzzle.score = 0;
            _puzzle.letters = _word;
            _puzzle.rack = [];

            for (var i = 0; i < _word.length; i++) {
                var letter = _word.charAt(i);
                if (!_isInWord(letter, _puzzle.rack) && _randomBool() && letter !== ' ') {
                    _puzzle.rack.push(letter);
                    _puzzle.letters = _replaceAll(_puzzle.letters, letter, '?');
                }
            }

            var rackSpace = _rackSize - _puzzle.rack.length;

            for (var j = 0; j < rackSpace; j++) {
                _puzzle.rack.push(_randomAlpha(_puzzle.rack));
            }

            _shuffle(_puzzle.rack);
        }

        function _isSolved() {
            _puzzle.solved = _word === _puzzle.letters;
        }

        function _isInWord(letter, word) {
            var _l = letter.toUpperCase();
            return word.indexOf(_l) !== -1;
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
            return _randomArray(possible);
        }

        function _randomArray(array) {
            return array[Math.floor(Math.random() * array.length)];
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

        function _replaceAt(string, index, character) {
            return string.substr(0, index) + character + string.substr(index + character.length);
        }
    }
})();
