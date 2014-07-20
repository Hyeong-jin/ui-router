// 의존성으로 `ui.router` 모듈을 포함하는 것을 확인한다.
angular.module('uiRouterSample', [
  'uiRouterSample.contacts',
  'uiRouterSample.contacts.service',
  'uiRouterSample.utils.service',
  'ui.router', 
  'ngAnimate'
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
	
    // $rootScope에 $state와 $stateParam의 참조를 추가하기에 매우 편리하다.
    // 그리하여 당신은 당신의 애플리케이션의 어떤 스코프에서든 그들에 접근할 수 있다. 
    // 예를 들어, <li ng-class="{ active: $state.includes('contacts.list') }"> 는
    // 'contacts.list'나 의존성 중 하나가 활성화 되었을 때 언제나 <li>를 활성화한다. 
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // $urlRouterProvider는 어떤 방향전환에 (when)을 그리고 유효하지 않는 url에 대해서는 (otherwise)를 사용한다.
      $urlRouterProvider

        // `when` 메소드는 url이 첫 번째 인자이면 언제나, 두 번째 인자로 주소를 바꾼다.
        // 여기에서 우리는 단지 몇 가지 편리한 url을 설정한다.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        // 만약 url이 유효하지 않으면 언제나, 예를 들어, '/asdf', home 스테이트인 '/' 으로 주소를 바꾼다. 
        .otherwise('/');


      //////////////////////////
      // 스테이트 구성        //
      //////////////////////////

      // 스테이트를 구성하기 위해 $stateProvider를 사용한다.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a states as the "index".
          // 스테이트를 "index"로 설정하기 위해 "/" url을 사용한다.
          url: "/",

          // 인라인 템플릿 예제. 기본적으로, 템플릿은 상위 스테이트 템플릿의 ui-view를 채운다.
          // 최상위 스테이트를 위해, 이것 같이, 상위 템플릿은 index.html 파일이다. 
          // 그래서 이 템플릿은 index.html의 ui-view안으로 삽입된다.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })

        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // templateProvider에서 프로미스를 반환할 수 있는 방법을 보여준다.
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">이 샘플의 소스</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github 메인 페이지</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">빠른 시작</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">상세한 가이드</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API 레퍼런스</a></li>' +
                       '</ul>';
              }, 100);
            }]
        })
    }
  ]
);
