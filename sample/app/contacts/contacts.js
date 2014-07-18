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

          // abstract를 true로 설정하는 것은, 스테이트가 명시적으로 활성화될 수 없음을 의미한다. 
          // 이것은 이것의 하위의 것이 활성화됨에 의해서만 암시적으로 활성화될 수 있다.
          abstract: true,

          // 이 추상 스테이트는 모든 하위의 url 앞에 '/contacts'가 붙여질 것이다. 
          url: '/contacts',

          // 파일에서 템플릿을 로딩하는 예제. 이것은 또한 최상위 스테이트이기 때문에
          // 이 템플릿 파일은 로드되고 나면 index.html 의 ui-view안으로 삽입되어질 것이다.
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

        // 상위를 가진 하위 스테이트의 이름을 정의할 때 '.'를 사용한다.
        // 그래서 당신은 'contacts' 상태를 상위로하는 새로운 'list' 스테이트를 가진다.
        .state('contacts.list', {

          // 비어있는 url의 사용은 상위의 url이 네비게이션될 때 하위 스테이트가 활성화 될 것을 의미한다.
          // 하위 스테이트의 url은 자동적으로 그들의 상위의 url에 이어 붙여질 것이다. 
          // 그래서 이 스테이트의 url은 '/contacts'(왜냐하면 '/contacts' + '')이다.
          url: '',

          // 중요: 이제 우리는 최상위 스테이트가 아닌 스테이트를 가졌다. 
          // 이 템플릿은 이 스테이트의 상위 템플릿의 ui-view에 삽입될 것이다;
          // 따라서 contacts.html의 ui-view이다.
          templateUrl: 'app/contacts/contacts.list.html'
        })

        ///////////////////////
        // Contacts > Detail //
        ///////////////////////

        // 당신은 하나의 스테이트에 제한없이 많은 하위 스테이트를 가질 수 있다. 
        // 여기에 'contacts' 상위 스테이트의 두 번째 하위 스테이트가 있다.
        .state('contacts.detail', {

          // url은 인자를 가질 수 있다. :param이나 {param}으로 명세될 수 있다.
          // 만약 {}이 사용되면, 당신은 또한 인수가 반듯이 매칭되어야 하는 regex(정규식) 패턴을 명세할 수 있다.
          // 정규식은 콜론(:)뒤에 쓰인다. 주의: 정규식 패턴에는 캡쳐 그룹을 사용하지 않는다.
          // 왜냐하면 전체 정규식은 내부적으로 다시 한번 감싸진다. 아래의 우리의 패턴은 1에서 4자리의 숫자만 매칭한다.

          // 이 스테이트는 'contacts'의 하위 스테이트이기 때문에 url은 잘 덧붙여진다.
          // 그래서 이것의 url은 (상위 스테이트의 url)뒤로 붙어서 '/contacts/{contactId:[0-9]{1,8}'될 것이다.
          // '/contacts/42'와 같은 url이 되면 이 상태는 활성화되고 $stateParam 객체는 {contactId: 42}가 된다.
          url: '/{contactId:[0-9]{1,4}}',

          // 만약 상위 템플릿 안에 하나 이상의 ui-view가 있거나, 아니면 
          // 스테이트 트리상의 높은 것에서 어떤 한 ui-view를 목표로 하고 싶을 때, 
          // 당신은 복수의 뷰를 구성하는 views 객체를 사용할 수 있다. 
          // 각 뷰는 자신의 템플릿, 컨트롤러를 가질 수 있고, 데이터를 분석할 수 있다.

          // 뷰의 이름은 상대적이거나 절대적일 수 있다. 상대적인 뷰 이름은 '@'심볼을 사용하지 않는다.
          // 항상 이 스테이트의 상위 템플릿에서 뷰를 참조한다.
          // 스테이트와 뷰를 구분하기위해 절대적인 뷰 이름은 '@' 심볼을 사용한다.
          // 그래서 'foo@bar'는 'bar'라는 스테이트 템플릿 안의 'foo'라는 ui-view를 의미한다.
          views: {

            // 그래서 이것은 상위 스테이트 템플릿의 이름 없는 뷰를 타깃으로 한다.
            '': {
              templateUrl: 'app/contacts/contacts.detail.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            },

            // 이것은 index.html으로 알고 있는 이름없는 루트안의 ui-view="hint"를 타깃으로 한다.
            // 이것은 *모든* 상위 스테이트의 *모든* 뷰를 채울 수 있는 방법을 보여준다.
            'hint@': {
              template: 'This is contacts.detail populating the "hint" ui-view'
            },

            // 이것은 상위 스테이트의 템플릿의 ui-view="menu"를 타깃으로 한다.
            'menuTip': {
              // templateProvider는 템플릿을 제공하기 위한 마지막 메소드이다.
              // template, templateUrl, 그리고 templateProvider가 있다.
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  // 이것은 단지 templateProvider를 위한 $stateParams 주입이 동작하는 것을 보여주기위한 것이다.
                  // 전역 '$statePrams'가 아직 업데이터되지 않았더라도, $statePrams는 변경되는 중의 새로운 스테이트를 위한 인자이다. 
                  return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                }]
            }
          }
        })

        //////////////////////////////
        // Contacts > Detail > Item //
        //////////////////////////////

        .state('contacts.detail.item', {

          // 우리가 배웠던 것에 의해서, 이 스테이트의 전체 url은 뒤에 붙여서 
          // '/contacts/{contectId}/item/:itemId'이 될 것이다. 
          // 우리는 인자의 두 개의 유형 모두를 같은 url에서 사용한다. 
          // 그러나 그들은 동일하게 동작한다.
          url: '/item/:itemId',
          views: {

            // 이것은 상위 스테이트 'contact.detail' 안의 이름없는 ui-view를 타겟으로 한다.
            // 우리는 아래의 'hint' 뷰를 설정하기 원치 않는다면 우리는 이것을 이 방식으로 해서는 않된다.
            // 우리는 대신에 단지 templateUrl와 뷰 객체 밖의 컨트롤러 를 설정한다.
            '': {
              templateUrl: 'app/contacts/contacts.detail.item.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                  $scope.edit = function () {
                    // 여기서 우리는 관련된 스테이트로 네비게이트할 수 있는 go의 능력을 보여준다.
                    // 위쪽으로 가기 위해 '^'를 아래쪽으로 가기 위해 '.'를 사용하여, 
                    // 당신은 어떤 관련된 스테이트(상위나 하위)라도 네비게이트할 수 있다.
                    // 여기서 우리는 하위 스테이트 'edit'( 전체 이름이 'contact.detail.item.edit'인)로 내려갈 것이다. 
                    $state.go('.edit', $stateParams);
                  };
                }]
            },

            // 여기서 우리는 'contact.detail'로 설정했던 템플릿을 오버라이드하는 것을 보게 된다.
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
        // 주목할 것은 이 스테이트는 'url'도 가지고 있지 않다는 것이다.
        // 스테이트는 url을 필요로 하지 않는다. 
        // 당신은 간단하게 당신의 애플리케이션을 "places"안으로 구성하기 위해 그것을 사용할 수 있다. 
        // 각각의 "place"는 필요한 것만 구성할 수 있다 
        // 이 스테이트를 얻는 유일한 방법은 $state.go(아니면 transitionTo)를 통해서 이다.
        .state('contacts.detail.item.edit', {
          views: {

            // This is targeting the unnamed view within the 'contact.detail' state
            // essentially swapping out the template that 'contact.detail.item' had
            // had inserted with this state's template.
            // 이것은 'contact.detail' 스테이트 안의 이름없는 뷰를 타깃으로 한다.
            // 근본적으로 삽입되었었던 'contact.detail.item' 템플릿을 버리고 
            // 이 상태의 템플릿으로 바꾼다.
            '@contacts.detail': {
              templateUrl: 'app/contacts/contacts.detail.item.edit.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                  $scope.done = function () {
                    // 위로 돌아 올라가기. '^'은 위로를 뜻한다. '^.^' 은 두 번째 위, 즉 조부모가 된다.
                    $state.go('^', $stateParams);
                  };
                }]
            }
          }
        });
    }
  ]
);
