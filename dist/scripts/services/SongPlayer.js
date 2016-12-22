(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};     

/**
@desc currentAlbum variable using getAlbum(); from Fixtures
@type {Object}
*/
        var currentAlbum = Fixtures.getAlbum();
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
                    SongPlayer.currentSong.playing = null;
                }

                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
            
                currentBuzzObject.bind('timeupdate', function() {
                    $rootScope.$apply(function() {
                        SongPlayer.currentTime = currentBuzzObject.getTime();
                    });
                });

                SongPlayer.currentSong = song;
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
@private function stopSong
@desc Stops currentBuzzObject and set song.playing boolean to false/null
@param {object} song
*/
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

/**
@private function getSongIndex
@desc returns index of a song from song array of currentAlbum
@type {object}
*/
   
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
        
/**
* @desc public variable returns currently playing song
* @type {object}
*/ 
        SongPlayer.currentSong = null;
        

/**
@desc public variable returns current playback time (in seconds) of currently playing song
@type {number}
*/

        SongPlayer.currentTime = null;
    
/**
@public method .play()
@desc If currentSong is not the clicked song, set current song variables to clicked song and play new song; otherwise if currentSong IS clicked song, pause the song. Set boolean of song.playing to true
@param {object} song
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong != song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

/**
@public method .previous()
@desc find current song index and decrement 1 to move to previous song unless at index < 0 (if so, stop currently playing song, set value to first song)
@param {object} song
*/    
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }; 
        

/**
@public method .next();
@desc Find current song index and increment 1 to move to next song unless at end - if so, stop current song, set value to first song
@param {object} song
*/
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        
/**
@public method .setCurrentTime()
@desc set current time (in seconds) of currently playing song
@param {number} time
*/
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();