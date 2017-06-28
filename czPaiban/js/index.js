/**
 * Created by xyloveqx on 2017/5/25.
 */
'use strict';
var _App = angular.module('App',[]);

_App.controller('mobilePreview', ['$scope', function ($scope) {
    $scope.previewToggle = $scope.previewToggle?false:true;
}]);

//
_App.directive('appMobilePreview', [function () {
    return {
        link: function ($scope) {
            $scope.preview = function () {
                var previewContent = UE.getEditor('editor').getContent();
                document.querySelectorAll('.mobile-content')[0].innerHTML = previewContent;

                document.querySelectorAll('.preview-wrap')[0].style.display = 'block';
                // disable_scroll();
            }

            var mobile_preview = document.querySelectorAll('.mobile-preview')[0];
            var mp_after = window.getComputedStyle(mobile_preview, '::after');

            document.querySelectorAll(['.mobile-preview','.preview-wrap'])[0].onclick = function () {
                document.querySelectorAll('.preview-wrap')[0].style.display = 'none';
                // enable_scroll();
            };


            setTimeout(function () {
                UE.getEditor('editor').execCommand('drafts');
            }, 500);
        }
    }
}])



//**********************  从禁用/启用滚动功能 开始  **********************
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

//**********************  以禁用/启用滚动功能 结束  **********************