angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function ($scope, $state) {
  $scope.openSkill = function (event) {
    var id = event.srcElement.parentElement.getAttribute('id');
    $state.go('app.skill', {id: id});
  };

  $scope.canAddPoints = function (id) {
    return true;
  };
})

.controller('SkillCtrl', function ($scope, $state, $stateParams) {
  var id = $stateParams.id;
  $scope.$on('$ionicView.enter', function() {
    $scope.skill = _.filter(window.SKILL_TREE, {"id": parseInt(id)})[0];
    localforage.getItem('skill', function (err, value) {
      if(value){
        $scope.skillInfo = value;
      } else {
        $scope.skillInfo = [];
      }
    });

    localforage.getItem('skill.' + $scope.skill.id, function (err, value) {
      if(value){
        $scope.skillStorageInfo = value;
      } else {
        $scope.skillStorageInfo = {};
      }
    });
  });

  $scope.addItemToDone = function () {
    localforage.setItem('skill.' + $scope.skill.id, $scope.skillStorageInfo);
    if(Object.keys($scope.skillStorageInfo).length === $scope.skill.rankDescriptions.length) {
      $scope.skillInfo[id] = true;
      localforage.setItem('skill', $scope.skillInfo);
    } else {
      $scope.skillInfo[id] = false;
      localforage.setItem('skill', $scope.skillInfo);
    }
  };

  $scope.isIOS = function () {
    return ionic.Platform.isIOS();
  };

  $scope.openLink = function (link) {
    if(link.url){
      window.open(link, '_system', 'location=yes');
      return false;
    }
  }
});
