# AngularUI Router &nbsp;[![Build Status](https://travis-ci.org/angular-ui/ui-router.png?branch=master)](https://travis-ci.org/angular-ui/ui-router)

#### 중첩된 뷰에서의 유연한 라우팅에 대한 사실상의 솔루션 
---
**[Download 0.2.10](http://angular-ui.github.io/ui-router/release/angular-ui-router.js)** (or **[Minified](http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js)**) **|**
**[Guide](https://github.com/angular-ui/ui-router/wiki) |**
**[API](http://angular-ui.github.io/ui-router/site) |**
**[Sample](http://angular-ui.github.com/ui-router/sample/) ([Src](https://github.com/angular-ui/ui-router/tree/gh-pages/sample)) |**
**[FAQ](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions) |**
**[Resources](#resources) |**
**[Report an Issue](#report-an-issue) |**
**[Contribute](#contribute) |**
**[Help!](http://stackoverflow.com/questions/ask?tags=angularjs,angular-ui-router) |**
**[Discuss](https://groups.google.com/forum/#!categories/angular-ui/router)**

---

AngularUI 라우터는 [AngularJS](http://angularjs.org)를 위한 라우팅 프레임워크이다. 이것은 당신이 당신의 인터페이스의 부분을
[*상태 기계*](https://en.wikipedia.org/wiki/Finite-state_machine)로 구성할 수 있게 한다. 
URL 라우트 중심으로 구성되어 있는 Angular ngRoute 모듈의 [`$route` service](http://docs.angularjs.org/api/ngRoute.$route)와 달리, 
UI-Router는 [*states*](https://github.com/angular-ui/ui-router/wiki)중심으로 구성되었다, 
이것은 라우트뿐 아니라, 선택적인 다른 동작도 첨부되어 있다.

상태는 *named*, *nested*, *parallel views*에 묶여서, 애플리케이션의 인터페이스를 강력하게 관리할 수 있게 한다.

샘플 앱을 보라: <http://angular-ui.github.io/ui-router/sample/>

-
**참고:** *UI-Router는 한창 개발 중이다. 이 라이브러리는 잘 테스트하고 있는 중이라서, API가 바뀔 수 있다. 양산 애플리케이션에서의 사용은 변경로그를 팔로윙하여 그에 따라 당신이 사용하는 것을 업데이트하는 것에 익숙한가 숙고하여 사용하라.*


## 시작하기

**(1)** 다음의 4가지 방법 중 하나로 UI-Router를 얻는다:
 - 이 저장소를 클론 하여 [빌드](#developing)한다.
 - [릴리즈](http://angular-ui.github.io/ui-router/release/angular-ui-router.js)(아니면 [최소화 버전](http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js))를 내려받는다.
 - **[Bower](http://bower.io/)**: 콘솔 창에서 `$ bower install angular-ui-router` 명령을 실행하여 얻는다.
 - 아니면 **[npm](https://www.npmjs.org/)**: 콘솔 창에서 `$ npm install angular-ui-router` 명령을 실행하여 얻는다.
 - 아니면 **[Component](https://github.com/component/component)**: 콘솔 창에서 `$ component install angular-ui/ui-router` 명령을 실행하여 얻는다.

**(2)** `angular-ui-router.js` (아니면 `angular-ui-router.min.js`)를 당신의 `index.html`에 포함하고, 다음으로 Angular 자체를 포함한다 (컴포넌트 사용자는: 이단계를 건너뛴다).

**(3)** `'ui.router'`를 당신의 메인 모듈의 의존성 목록에 추가한다 (컴포넌트 사용자는: `'ui.router'`를 `require('angular-ui-router')`로 대체한다)

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

### [중복된 상태와 뷰](http://plnkr.co/edit/u18KQc?p=preview)

UI-Router의 강점은 중첩된 상태와 뷰에 대한 능력이다.

**(1)** 먼저, 위에서 자세히 설명한 [setup](#get-started) 지침을 따른다.

**(2)** 다음으로, [`ui-view` 디렉티브](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-view)를 앱의 '<body />' 태그에 추가한다.

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

**(3)** You'll notice we also added some links with [`ui-sref` directives](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-sref). In addition to managing state transitions, this directive auto-generates the `href` attribute of the `<a />` element it's attached to, if the corresponding state has a URL. Next we'll add some templates. These will plug into the `ui-view` within `index.html`. Notice that they have their own `ui-view` as well! That is the key to nesting states and views.

**(3)** 당신은 우리가 [`ui-sref` 디렉티브](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-sref)를 가진 몇 개의 링크를 추가한 것에 주목할 것이다. 상태 전환 관리에 대한 추가에서, 상응하는 상태가 URL을 가지고 있다면, 이 디렉티브는 `<a />` 엘리먼트의 `href` 속성을 자동으로 생성한다. 다음으로 우리는 몇 개의 템플릿을 추가한다. 이것은 `index.html`가 가진 `ui-view` 안으로 삽입될 것이다. 기억할 것은 그들이 그들만의 `ui-view`를 가지고 있다는 것이다! 이것이 중첩하는 상태와 뷰의 키이다.

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

**(4)** 다음으로, 우리는 몇 가지 하위 템플릿을 추가할 것이다. 이것은 그들의 부모 상태 템플릿의 `ui-view`안으로 삽입될 것이다.

>
```html
<!-- partials/state1.list.html -->
<h3>List of State 1 Items</h3>
<ul>
  <li ng-repeat="item in items">{{ item }}</li>
</ul>
```

>
```html
<!-- partials/state2.list.html -->
<h3>List of State 2 Things</h3>
<ul>
  <li ng-repeat="thing in things">{{ thing }}</li>
</ul>
```

**(5)** 마지막으로, 우리는 `$stateProvider`을 가지고 모두를 묶을 것이다. 다음과 같이, 모듈 구성에서 상태를 설정한다:

>
```javascript
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // 매칭되지 않는 모든 url은 `/state1` 로 경로를 바꾼다.
  $urlRouterProvider.otherwise("/state1");
  //
  // 이제 상태를 설정한다.
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
>**[중복된 상태와 뷰를 위한 퀵 스타트 Plunker로 가기](http://plnkr.co/edit/u18KQc?p=preview)**

**(7)** 이것은 단지 수박 겉 핱기이다.
>**[깊이 들어가 알아 보자!](https://github.com/angular-ui/ui-router/wiki)**


### [복수의 명명된 뷰](http://plnkr.co/edit/SDOcGS?p=preview)

또 다른 대단한 특징은 템플릿 당 복수의 `ui-view`를 볼 수 있는 능력이다. 

**Pro Tip:** **

*복수의 병렬 뷰는 강력한 특징이라서, 당신은 당신의 뷰를 중첩해서 당신의 인터페이스를 더욱 효과적으로 관리하고, 중첩된 스테이트와 짝지을 수 있습니다.*

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

**(3)** 모듈 구성에 당신의 상태를 설정한다:
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

* [In-Depth Guide](https://github.com/angular-ui/ui-router/wiki)
* [API Reference](http://angular-ui.github.io/ui-router/site)
* [Sample App](http://angular-ui.github.com/ui-router/sample/) ([Source](https://github.com/angular-ui/ui-router/tree/gh-pages/sample))
* [FAQ](https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions)
* [Slides comparing ngRoute to ui-router](http://slid.es/timkindberg/ui-router#/)
* [UI-Router Extras / Addons](http://christopherthielen.github.io/ui-router-extras/#/home) (@christopherthielen)
 
### Videos

* [Introduction Video](https://egghead.io/lessons/angularjs-introduction-ui-router) (egghead.io)
* [Tim Kindberg on Angular UI-Router](https://www.youtube.com/watch?v=lBqiZSemrqg)
* [Activating States](https://egghead.io/lessons/angularjs-ui-router-activating-states) (egghead.io)

## Report an Issue

Help us make UI-Router better! If you think you might have found a bug, or some other weirdness, start by making sure
it hasn't already been reported. You can [search through existing issues](https://github.com/angular-ui/ui-router/search?q=wat%3F&type=Issues)
to see if someone's reported one similar to yours.

If not, then [create a plunkr](http://plnkr.co/edit/u18KQc?p=preview) that demonstrates the problem (try to use as little code
as possible: the more minimalist, the faster we can debug it).

Next, [create a new issue](https://github.com/angular-ui/ui-router/issues/new) that briefly explains the problem,
and provides a bit of background as to the circumstances that triggered it. Don't forget to include the link to
that plunkr you created!

**Note**: If you're unsure how a feature is used, or are encountering some unexpected behavior that you aren't sure
is a bug, it's best to talk it out in the
[Google Group](https://groups.google.com/forum/#!categories/angular-ui/router) or on
[StackOverflow](http://stackoverflow.com/questions/ask?tags=angularjs,angular-ui-router) before reporting it. This
keeps development streamlined, and helps us focus on building great software.

Please keep in mind that the issue tracker is for *issues*. Please do *not* post an issue if you need help or support. Instead, see one of the above-mentioned forums or [IRC](irc://irc.freenode.net/#angularjs).


## Contribute

**(1)** See the **[Developing](#developing)** section below, to get the development version of UI-Router up and running on your local machine.

**(2)** Check out the [roadmap](https://github.com/angular-ui/ui-router/issues/milestones) to see where the project is headed, and if your feature idea fits with where we're headed.

**(3)** If you're not sure, [open an RFC](https://github.com/angular-ui/ui-router/issues/new?title=RFC:%20My%20idea) to get some feedback on your idea.

**(4)** Finally, commit some code and open a pull request. Code & commits should abide by the following rules:

- *Always* have test coverage for new features (or regression tests for bug fixes), and *never* break existing tests
- Commits should represent one logical change each; if a feature goes through multiple iterations, squash your commits down to one
- Make sure to follow the [Angular commit message format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) so your change will appear in the changelog of the next release.
- Changes should always respect the coding style of the project



## Developing

UI-Router uses <code>grunt >= 0.4.x</code>. Make sure to upgrade your environment and read the
[Migration Guide](http://gruntjs.com/upgrading-from-0.3-to-0.4).

Dependencies for building from source and running tests:

* [grunt-cli](https://github.com/gruntjs/grunt-cli) - run: `$ npm install -g grunt-cli`
* Then, install the development dependencies by running `$ npm install` from the project directory

There are a number of targets in the gruntfile that are used to generating different builds:

* `grunt`: Perform a normal build, runs jshint and karma tests
* `grunt build`: Perform a normal build
* `grunt dist`: Perform a clean build and generate documentation
* `grunt dev`: Run dev server (sample app) and watch for changes, builds and runs karma tests on changes.
