angular.module('uiRouterSample.utils.service', [

])

.factory('utils', function () {
  return {
    // 'id' 속성으로 배열에서 객체를 찾기 위한 유틸
    findById: function findById(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[i].id == id) return a[i];
      }
      return null;
    },

    // 콜렉션에서 현재키가 아닌 랜덤키를 반환하는 유틸
    newRandomKey: function newRandomKey(coll, key, currentKey){
      var randKey;
      do {
        randKey = coll[Math.floor(coll.length * Math.random())][key];
      } while (randKey == currentKey);
      return randKey;
    }
  };
});
