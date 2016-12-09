// albums becomes a property on the collection controller scope object

(function () {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
        };
    
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();