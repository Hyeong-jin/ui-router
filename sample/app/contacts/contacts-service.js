angular.module('uiRouterSample.contacts.service', [

])

// 'contacts.json'에서 contacts를 조회하기 위한 RESTful 팩토리
.factory('contacts', ['$http', function ($http, utils) {
  var path = 'assets/contacts.json';
  var contacts = $http.get(path).then(function (resp) {
    return resp.data.contacts;
  });

  var factory = {};
  factory.all = function () {
    return contacts;
  };
  factory.get = function (id) {
    return contacts.then(function(){
      return utils.findById(contacts, id);
    })
  };
  return factory;
}]);
