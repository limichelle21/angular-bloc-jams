(function() {
    function SongPlayer() {
        var SongPlayer = {};     
/**
* @desc currentSong variable
* @type {object}
*/ 
        var currentSong = null;
/** 
* @desc Buzz object audio file
* @type {Object}
*/
        
        var currentBuzzObject = null;
/** 
* @private function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {object} song
*/
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }

                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });

                currentSong = song;
        };
/**
@private function playSong
@desc Plays the currentBuzzObject and sets song.playing boolean to true
@param {object} song
*/
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
/**
@public method .play()
@desc If currentSong is not the clicked song, set current song variables to clicked song and play new song; otherwise if currentSong IS clicked song, pause the song. Set boolean of song.playing to true
@param {object} song
*/
        SongPlayer.play = function(song) {
            
            if (currentSong != song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song)
                }
            }
        };

/**
@public method .pause()
@desc Pauses the current song and set boolean of song.playing to false
@param {object} song
*/
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();