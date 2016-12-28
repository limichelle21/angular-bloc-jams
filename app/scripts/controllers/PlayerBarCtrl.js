(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer, $scope) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        this.songPlayer.registerScope($scope);
    }
    
    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', '$scope', PlayerBarCtrl]);
})();