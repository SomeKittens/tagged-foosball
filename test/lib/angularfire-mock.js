/**
 * AngularFire Mock
 * @copy Randall Koutnik
 */

(function(window) {
  'use strict';
  
  window.FireMock = function(location) {
    var fbRef = new MockFirebase(location);
    return {
      /**
       * $add needs to be a thenable object
       * that calls the .push of MockFirebase
       */
      $add: 
      /**
       * Figure out how .$child works
       * then make it here
       */
    }
  };
})(window);