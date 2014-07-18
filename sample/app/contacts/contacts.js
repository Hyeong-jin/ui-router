angular.module('uiRouterSample.contacts', [
  'ui.router'
])
  
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        // Contacts //
        //////////////
        .state('contacts', {

          // abstract를 true로 설정하는 것은, 스테이트가 명시적으로 활성화될 수 없음을 의미합니다. 
          // 이것은 이것의 하위의 것이 활성화됨에 의해서만 암시적으로 활성화될 수 있습니다.
          abstract: true,

          // 이 추상 스테이트는 모든 자손의 url 앞에 '/contacts'가 붙여질 것입니다.
          url: '/contacts',

          // 파일에서 템플릿을 로딩하는 예제. 이것은 또한 최상위 스테이트이라서
          // 이 템플릿 파일은 로드되고 나면 index.html 의 ui-view안으로 
          // 삽입되어질 것입니다.
          templateUrl: 'app/contacts/contacts.html',

          // `resolve` 는 모든 비동기 컨트롤러 의존성을 컨트롤러가 초기화되기 
          // *전에* 해결하기 위해 사용한다. 이 경우에, contact가 promise를 반환하기 때문에, 
          // 컨트롤러는 객체화 전에 contacts.all() 이 해결될 때 까지 기다릴 것이다. 
          // non-promise의 반환 값는 즉시 해결된 것으로 간주한다.
          resolve: {
            contacts: ['contacts',
              function( contacts){
                return contacts.all();
              }]
          },

          // 당신은 컨트롤러를 템플릿과 짝지을 수 있다. *반드시* 짝지을 템플릿이 있어야 한다.
          controller: ['$scope', '$state', 'contacts', 'utils',
            function (  $scope,   $state,   contacts,   utils) {

              // 'contacts' 필드를 이 추상적인 부모의 스코프에 추가한다, 그래야 
              // 모든 서브 스테이트 뷰가 그들의 스코프에서 이것을 접근할 수 있다.
              // 스코프의 상속은 스테이트를 중첩하는 것이라기 보다는 
              // 중첩할 스코프의 템플릿을 선택하는 것이라는 것을 꼭 기억하자.
              // 정상 스코프를 상속한다. 
              $scope.contacts = contacts;

              $scope.goToRandom = function () {
                var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                // $state.go()는 스테이트를 프로그램적으로 활성화하기 위해서 
                // 상위의 편리한 메소드처럼 사용된다.
                $state.go('contacts.detail', { contactId: randId });
              };
            }]
        })

        /////////////////////
        // Contacts > List //
        /////////////////////

        // 부모를 가진 자식의 스테이트 이름을 정의에서 '.'를 사용한다.
        // 그래서 당신은 'contacts' 상태를 부모로하는 새로운 'list' 스테이트를 가진다.
        .state('contacts.list', {

          // 비어있는 url의 사용은 부모의 url이 네비게이션될 때 자식 스테이트가 활성화 될 것을 의미한다.
          // 자식 스테이트의 url은 자동적으로 그들의 부모의 url에 이어 붙여질 것이다. 
          // 그래서 이 스테이트의 url은 '/contacts'(왜냐하면 '/contacts' + '')이다.
          url: '',

          // 중요: 이제 우리는 최상위 스테이트가 아닌 스테이트를 가졌다. 
          // 이 템플릿은 이 스테이트의 부모의 템플릿의 ui-view에 삽입될 것이다;
          // 따라서 contacts.html의 ui-view이다.
          templateUrl: 'app/contacts/contacts.list.html'
        })

        ///////////////////////
        // Contacts > Detail //
        ///////////////////////

        // You can have unlimited children within a state. Here is a second child
        // state within the 'contacts' parent state.
        .state('contacts.detail', {

          // Urls can have parameters. They can be specified like :param or {param}.
          // If {} is used, then you can also specify a regex pattern that the param
          // must match. The regex is written after a colon (:). Note: Don't use capture
          // groups in your regex patterns, because the whole regex is wrapped again
          // behind the scenes. Our pattern below will only match numbers with a length
          // between 1 and 4.

          // Since this state is also a child of 'contacts' its url is appended as well.
          // So its url will end up being '/contacts/{contactId:[0-9]{1,8}}'. When the
          // url becomes something like '/contacts/42' then this state becomes active
          // and the $stateParams object becomes { contactId: 42 }.
          url: '/{contactId:[0-9]{1,4}}',

          // If there is more than a single ui-view in the parent template, or you would
          // like to target a ui-view from even higher up the state tree, you can use the
          // views object to configure multiple views. Each view can get its own template,
          // controller, and resolve data.

          // View names can be relative or absolute. Relative view names do not use an '@'
          // symbol. They always refer to views within this state's parent template.
          // Absolute view names use a '@' symbol to distinguish the view and the state.
          // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
          views: {

            // So this one is targeting the unnamed view within the parent state's template.
            '': {
              templateUrl: 'app/contacts/contacts.detail.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            },

            // This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
            // This shows off how you could populate *any* view within *any* ancestor state.
            'hint@': {
              template: 'This is contacts.detail populating the "hint" ui-view'
            },

            // This one is targeting the ui-view="menu" within the parent state's template.
            'menuTip': {
              // templateProvider is the final method for supplying a template.
              // There is: template, templateUrl, and templateProvider.
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  // This is just to demonstrate that $stateParams injection works for templateProvider.
                  // $stateParams are the parameters for the new state we're transitioning to, even
                  // though the global '$stateParams' has not been updated yet.
                  return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                }]
            }
          }
        })

        //////////////////////////////
        // Contacts > Detail > Item //
        //////////////////////////////

        .state('contacts.detail.item', {

          // So following what we've learned, this state's full url will end up being
          // '/contacts/{contactId}/item/:itemId'. We are using both types of parameters
          // in the same url, but they behave identically.
          url: '/item/:itemId',
          views: {

            // This is targeting the unnamed ui-view within the parent state 'contact.detail'
            // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
            // We could instead just set templateUrl and controller outside of the view obj.
            '': {
              templateUrl: 'app/contacts/contacts.detail.item.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                  $scope.edit = function () {
                    // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                    // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                    // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
                    $state.go('.edit', $stateParams);
                  };
                }]
            },

            // Here we see we are overriding the template that was set by 'contact.detail'
            'hint@': {
              template: ' This is contacts.detail.item overriding the "hint" ui-view'
            }
          }
        })

        /////////////////////////////////////
        // Contacts > Detail > Item > Edit //
        /////////////////////////////////////

        // Notice that this state has no 'url'. States do not require a url. You can use them
        // simply to organize your application into "places" where each "place" can configure
        // only what it needs. The only way to get to this state is via $state.go (or transitionTo)
        .state('contacts.detail.item.edit', {
          views: {

            // This is targeting the unnamed view within the 'contact.detail' state
            // essentially swapping out the template that 'contact.detail.item' had
            // had inserted with this state's template.
            '@contacts.detail': {
              templateUrl: 'app/contacts/contacts.detail.item.edit.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                  $scope.done = function () {
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('^', $stateParams);
                  };
                }]
            }
          }
        });
    }
  ]
);
