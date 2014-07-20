# AngularUI Router &nbsp;[![Build Status](https://travis-ci.org/angular-ui/ui-router.png?branch=master)](https://travis-ci.org/angular-ui/ui-router)

#### 중첩된 뷰에서 유연한 라우팅을 위한 사실상의 솔루션 
---
**[Download 0.2.10](http://angular-ui.github.io/ui-router/release/angular-ui-router.js)** (or **[Minified](http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js)**) **|**
**[Guide](https://github.com/angular-ui/ui-router/wiki) |**
**[API](http://angular-ui.github.io/ui-router/site) |**
**[Sample](http://angular-ui.github.com/ui-router/sample/) ([Src](https://github.com/Hyeong-jin/ui-router/tree/master/sample)) |**
**[FAQ](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions) |**
**[Resources](#resources) |**
**[Report an Issue](#report-an-issue) |**
**[Contribute](#contribute) |**
**[Help!](http://stackoverflow.com/questions/ask?tags=angularjs,angular-ui-router) |**
**[Discuss](https://groups.google.com/forum/#!categories/angular-ui/router)**
---

AngularUI 라우터는 [AngularJS](http://angularjs.org)를 위한 라우팅 프레임워크이다. 
이것은 당신이 당신의 인터페이스의 부분을 [*상태 기계*](https://en.wikipedia.org/wiki/Finite-state_machine)로 구성할 수 있게 한다. 
URL 라우트 중심으로 구성되어 있는 Angular ngRoute 모듈의 [`$route` service](http://docs.angularjs.org/api/ngRoute.$route)와 달리, 
UI-Router는 [*states*](https://github.com/angular-ui/ui-router/wiki)중심으로 구성되었다, 
UI-Router에는 라우트뿐 아니라, 선택적인 다른 기능도 첨부되어 있다.

스테이트는 *명명된*, *중첩된*, *병렬 뷰*에 묶여서, 애플리케이션의 인터페이스를 강력하게 관리할 수 있게 한다.

샘플 앱을 보라: <http://angular-ui.github.io/ui-router/sample/>

-
**참고:** *UI-Router는 한창 개발 중이다. 이 라이브러리는 잘 테스트하고 있는 중이라서, API가 바뀔 수 있다. 
양산 애플리케이션에서의 사용은 변경로그를 팔로잉하여 그에 따라 당신이 사용하는 것을 업데이트하는 것에 익숙한가 숙고하여 사용하라.*


## 시작하기

**(1)** 다음의 4가지 방법 중 하나로 UI-Router를 얻는다:
 - 이 저장소를 클론 하여 [빌드](#developing)한다.
 - [릴리즈](http://angular-ui.github.io/ui-router/release/angular-ui-router.js)(아니면 [최소화 버전](http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js))를 내려받는다.
 - **[Bower](http://bower.io/)**: 콘솔 창에서 `$ bower install angular-ui-router` 명령을 실행하여 얻는다.
 - 아니면 **[npm](https://www.npmjs.org/)**: 콘솔 창에서 `$ npm install angular-ui-router` 명령을 실행하여 얻는다.
 - 아니면 **[Component](https://github.com/component/component)**: 콘솔 창에서 `$ component install angular-ui/ui-router` 명령을 실행하여 얻는다.

**(2)** `angular-ui-router.js` (아니면 `angular-ui-router.min.js`)를 당신의 `index.html`에 포함하고, 
다음으로 Angular 자체를 포함한다 (컴포넌트 사용자는: 이단계를 건너뛴다).

**(3)** `'ui.router'`를 당신의 메인 모듈의 의존성 목록에 추가한다
(컴포넌트 사용자는: `'ui.router'`를 `require('angular-ui-router')`로 대체한다).

모든 과정을 마치면, 다음과 비슷할 것이다.

>
```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="js/angular-ui-router.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['ui.router']);
        // 컴포넌트 사용자는, 다음 코드를 사용한다:
        // var myApp = angular.module('myApp', [require('angular-ui-router')]);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```

### [중복된 스테이트와 뷰](http://plnkr.co/edit/u18KQc?p=preview)

UI-Router의 강점은 중첩된 스테이트와 뷰에 대한 능력이다.

**(1)** 먼저, 위에서 자세히 설명한 [setup](#get-started) 지침을 따른다.

**(2)** 다음으로, [`ui-view` 디렉티브](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-view)를 앱의 `<body />` 태그에 추가한다.

>
```html
<!-- index.html -->
<body>
    <div ui-view></div>
    <!-- 몇 개의 네비게이션을 추가한다: -->
    <a ui-sref="state1">State 1</a>
    <a ui-sref="state2">State 2</a>
</body>
```

**(3)** [`ui-sref` 디렉티브](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-sref)를 가진 몇 가지 링크를 추가한 것을 알 수 있을 것이다. 
스테이트 전환 관리에 대한 추가에서, 상응하는 스테이트가 URL을 가지고 있다면, 
이 디렉티브는 `<a />` 엘리먼트의 `href` 속성을 자동으로 생성한다.
다음으로 우리는 몇 개의 템플릿을 추가한다. 
이것은 `index.html`가 가진 `ui-view` 안으로 삽입 될 것이다. 
기억할 것은 그들이 그들만의 `ui-view`를 가지고 있다는 것이다! 
이것이 중첩하는 스테이트와 뷰의 핵심이다.

>
```html
	<!-- partials/state1.html -->
	<h1>State 1</h1>
	<hr/>
	<a ui-sref="state1.list">Show List</a>
	<div ui-view></div>
```
```html
	<!-- partials/state2.html -->
	<h1>State 2</h1>
	<hr/>
	<a ui-sref="state2.list">Show List</a>
	<div ui-view></div>
```

**(4)** 다음으로, 우리는 몇 가지 하위 템플릿을 추가할 것이다. 
이것은 그들의 부모 스테이트 템플릿의 `ui-view`안으로 삽입될 것이다.

>
```html
	<!-- partials/state1.list.html -->
	<h3>List of State 1 Items</h3>
	<ul>
	  <li ng-repeat="item in items">{{ item }}</li>
	</ul>
```
```html
	<!-- partials/state2.list.html -->
	<h3>List of State 2 Things</h3>
	<ul>
	  <li ng-repeat="thing in things">{{ thing }}</li>
	</ul>
```

**(5)** 마지막으로, 우리는 `$stateProvider`을 가지고 모두를 묶을 것이다. 다음과 같이, 모듈 구성에서 스테이트를 설정한다:

>
```javascript
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // 매칭되지 않는 모든 url은 `/state1` 로 경로를 바꾼다.
  $urlRouterProvider.otherwise("/state1");
  //
  // 이제 스테이트를 설정한다.
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
        templateUrl: "partials/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      })
    });
```

**(6)** 퀵 스타트 예제를 만져 보라.
>**[중복된 스테이트와 뷰를 위한 퀵 스타트 Plunker로 가기](http://plnkr.co/edit/u18KQc?p=preview)**

**(7)** 이것은 단지 수박 겉 핱기 일 뿐이다.
>**[깊이 들어가 보자!](https://github.com/angular-ui/ui-router/wiki)**


### [복수의 명명된 뷰](http://plnkr.co/edit/SDOcGS?p=preview)

또 다른 대단한 특징은 하나의 템플릿에서 복수의 `ui-view`를 볼 수 있는 능력이다. 

**Pro Tip:** **

*복수의 병렬 뷰는 강력한 특징이라서, 당신은 뷰를 중첩해서 인터페이스를 더욱 효과적으로 관리하고, 중첩된 스테이트와 짝지을 수 있다.*

**(1)** 위에서 설명한 [설정](#get-started) 지침을 따른다.

**(2)** 하나 이상의  `ui-view`를 당신의 앱에 추가하고 이름을 짓는다.

>
```html
<!-- index.html -->
<body>
    <div ui-view="viewA"></div>
    <div ui-view="viewB"></div>
    <!-- Also a way to navigate -->
    <a ui-sref="route1">Route 1</a>
    <a ui-sref="route2">Route 2</a>
</body>
```

**(3)** 모듈 구성에 당신의 스테이트를 설정한다:
>
```javascript
myApp.config(function($stateProvider) {
  $stateProvider
    .state('index', {
      url: "",
      views: {
        "viewA": { template: "index.viewA" },
        "viewB": { template: "index.viewB" }
      }
    })
    .state('route1', {
      url: "/route1",
      views: {
        "viewA": { template: "route1.viewA" },
        "viewB": { template: "route1.viewB" }
      }
    })
    .state('route2', {
      url: "/route2",
      views: {
        "viewA": { template: "route2.viewA" },
        "viewB": { template: "route2.viewB" }
      }
    })
});
```

**(4)** 퀵 스타트 예제를 만져보라.
>**[복수의 명명된 뷰를 위한 퀵 스타트 Plunker로 가기](http://plnkr.co/edit/SDOcGS?p=preview)**


## Resources

* [자세한 가이드](https://github.com/angular-ui/ui-router/wiki)
* [API 레퍼런스](http://angular-ui.github.io/ui-router/site)
* [샘플 앱](http://angular-ui.github.com/ui-router/sample/) ([소스](https://github.com/Hyeong-jin/ui-router/tree/master/sample))
* [FAQ](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions)
* [ngRoute와 ui-router의 비교 슬라이드](http://slid.es/timkindberg/ui-router#/)
* [UI-Router Extras / Addons](http://christopherthielen.github.io/ui-router-extras/#/home) (@christopherthielen)
 
### Videos

* [Introduction Video](https://egghead.io/lessons/angularjs-introduction-ui-router) (egghead.io)
* [Tim Kindberg on Angular UI-Router](https://www.youtube.com/watch?v=lBqiZSemrqg)
* [Activating States](https://egghead.io/lessons/angularjs-ui-router-activating-states) (egghead.io)

## Report an Issue

더 좋은 UI-Router를 만들도록 우리를 도와주세요! 버그나 이상한 것을 찾았다고 생각한다면, 그것이 이미 리포팅된 것이 아닌지 확인해 주세요. 
[기존의 이슈 찾기](https://github.com/angular-ui/ui-router/search?q=wat%3F&type=Issues)에서 리포팅된 비슷한 것을 찾을 수 있습니다.

없다면, 문제점을 재현할 수 있는 [plunkr 생성](http://plnkr.co/edit/u18KQc?p=preview)합니다(가능하면 적은 양의 코드를 작성하세요: 적으면 적을 수록 더욱 빨리 문제를 해결할 수 있습니다.)

다음으로, 문제를 간략하게 설명하는 [새로운 이슈를 생성](https://github.com/angular-ui/ui-router/issues/new)하고, 
문제를 발생시키는 상황 같은 백그라운드를 약간 제공합니다. 잊지 말고 생성한 plunkr의 링크를 포함합니다.

**Note**: 만약 확신이 없는 기능이 사용되거나, 뜻 밖의 확신하지 않은 행동은 버그이다. 
이러한 것에 대해 리포팅하기 전에 물어볼 수 있는 가장 좋은 곳은
[Google Group](https://groups.google.com/forum/#!categories/angular-ui/router)이나
[StackOverflow](http://stackoverflow.com/questions/ask?tags=angularjs,angular-ui-router)입니다.
이것은 능률적인 개발을 계속할 수 있게 하고, 훌륭한 소프트웨어 구축에 초점을 맞출 수 있도록 합니다.

이슈 트래커는 *이슈*를 위한것 이라는 것을 명심하세요.
도움이나 지원이 필요하다고 해서 이슈를 등록하지 말아주세요.
대신, 위에서 언급한 포럼이나 [IRC](irc://irc.freenode.net/#angularjs)을 이용하세요.

## Contribute

**(1)** 당신의 로컬 머신에서 UI-Router의 개발버전을 올리고 실행하기에 대해서는, 아래의 **[Developing](#developing)** 섹션을 보라.

**(2)** 프로젝트의 방향을 보고, 당신의 주요한 계획을 우리의 방향과 맞추는 것에 대해서는 [roadmap](https://github.com/angular-ui/ui-router/issues/milestones)를 확인하라.

**(3)** 만약 당신이 확실하지 않다면, 당신의 아이디어에 대한 피드백을 얻기 위해 [RFC](https://github.com/angular-ui/ui-router/issues/new?title=RFC:%20My%20idea)를 열어보라.

**(4)** 마지막으로, 코드를 커밋하고 요청하라. 다음의 규칙을 따라 코드와 커밋은 유지될 것이다:

- *항상* 새로운 특징을 위한 테스트 커버리지(나 버그 수정을 위한 역행 테스트)를 갖고, 기존의 테스트를 *절대* 망가뜨리지 않는다
- 커밋은 각각 하나의 논리적인 변경이어 한다; 만약 어떤 기능이 반복적으로 여러 곳을 수정해야 하는 것이라면, 커밋을 분리하여 하나씩 커밋한다.  
- [Angular 커밋 메시지 포맷](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)을 확실히 지키면 당신의 변경은 다음번 릴리즈의 변경로그에 남을 것이다.
- 변경은 항상 프로젝트의 코딩 스타일을 존중해야 한다

## Developing

UI-Router는 <code>grunt >= 0.4.x</code>을 사용한다. 당신의 환경을 확실하게 업그레이드 하려면 
[Migration Guide](http://gruntjs.com/upgrading-from-0.3-to-0.4)를 읽어 보라.

소스에서 빌드할때의 종속성과 테스트 실행:

* [grunt-cli](https://github.com/gruntjs/grunt-cli) - run: `$ npm install -g grunt-cli`
* 그런 다음, 프로젝트 디렉토리에서 `$ npm install`를 실행하여 개발환경을 인스톨한다.

gruntfile에는 다른 빌드를 생성하기 위한 여려가지 타겟이 있다.

* `grunt`: 일반적인 빌드를 수행하며, jshint와 krfma 테스트를 실행한다.
* `grunt build`: 일반적인 빌드를 수행한다.
* `grunt dist`: 클린 빌드를 수행하고 문서를 생성한다.
* `grunt dev`: (샘플 앱)개발 서버를 실행하고 변경을 감시하고, 변경에 따라 빌드와 karma 테스트를 실행한다. 
