(function() {
    function seekBar($document) {
 
/**
@private function
@desc return the horizontal percent along the seek bar where the event occurred
*/
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };        
        
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },

/**
@desc link function sets up seek bars
*/
            
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

/**
@desc stores the element that matches the directive as a jQuery object
@type {object}
*/
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                
                
/**
@private function
@desc calculates and returns percent for fill 
*/
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%"
                };

/**
@public function 
@desc returns CSS style for seek bar based on percentage
*/
                scope.fillStyle = function () {
                    return {width: percentString()};
                };
                
/**
@public function
@desc set scope.value to percentage based on position of the click
*/
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
 /**
 @public function
 @desc constantly apply the change in value of scope.value as the thumb is dragged
 */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
/**
@private function
@desc to notify onChange expression that the value has changed
*/
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
                
                scope.thumbStyle = function() {
                    // update position of seek bar thumb
                    return {left: percentString()};
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();