(function() {
    'use strict';

    angular
        .module('pfb')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/admin/login/',
                controller: 'LoginController',
                controllerAs: 'login',
                templateUrl: 'app/login/login.html'
            })
            .state('help', {
                url: '/admin/help/',
                controller: 'HelpController',
                controllerAs: 'help',
                templateUrl: 'app/help/help.html'
            })
            .state('request-password-reset', {
                url: '/admin/password-reset-request/',
                controller: 'PasswordResetRequestController',
                controllerAs: 'pw',
                templateUrl: 'app/password-reset/request/password-reset-request.html'
            })
            .state('password-reset', {
                url: '/admin/password-reset/?token',
                controller: 'PasswordResetController',
                controllerAs: 'pw',
                templateUrl: 'app/password-reset/reset/password-reset.html'
            })
            .state('organizations', {
                abstract: true,
                url: '/admin/organizations/',
                template: '<ui-view/>'
            })
            .state('organizations.list', {
                url: '',
                controller: 'OrganizationListController',
                controllerAs: 'orgList',
                templateUrl: 'app/organizations/list/organizations-list.html'
            })
            .state('organizations.create', {
                url: 'create/',
                controller: 'OrganizationDetailController',
                controllerAs: 'org',
                templateUrl: 'app/organizations/detail/organizations-detail.html'
            })
            .state('organizations.edit', {
                url: 'edit/:uuid',
                controller: 'OrganizationDetailController',
                controllerAs: 'org',
                templateUrl: 'app/organizations/detail/organizations-detail.html'
            })
            .state('users', {
                abstract: true,
                url: '/admin/users/',
                template: '<ui-view/>'
            })
            .state('users.list', {
                url: '',
                controller: 'UserListController',
                controllerAs: 'userList',
                templateUrl: 'app/users/list/users-list.html'
            })
            .state('users.create', {
                url: 'create/',
                controller: 'UserDetailController',
                controllerAs: 'user',
                templateUrl: 'app/users/detail/users-detail.html'
            })
            .state('users.edit', {
                url: 'edit/:uuid',
                controller: 'UserDetailController',
                controllerAs: 'user',
                templateUrl: 'app/users/detail/users-detail.html'
            })
            .state('analysis-jobs', {
                abstract: true,
                url: '/admin/analysis-jobs/?limit&offset',
                template: '<ui-view/>'
            })
            .state('analysis-jobs.list', {
                url: '',
                controller: 'AnalysisJobListController',
                controllerAs: 'analysisJobList',
                templateUrl: 'app/analysis-jobs/list/analysis-jobs-list.html'
            })
            .state('analysis-jobs.create', {
                url: 'create/',
                controller: 'AnalysisJobCreateController',
                controllerAs: 'analysisJobCreate',
                templateUrl: 'app/analysis-jobs/create/analysis-jobs-create.html'
            })
            .state('analysis-jobs.detail', {
                url: ':uuid/',
                controller: 'AnalysisJobDetailController',
                controllerAs: 'analysisJobDetail',
                templateUrl: 'app/analysis-jobs/detail/analysis-jobs-detail.html'
            })
            .state('neighborhoods', {
                abstract: true,
                url: '/admin/neighborhoods/?limit&offset',
                template: '<ui-view/>'
            })
            .state('neighborhoods.create', {
                url: 'create/',
                controller: 'NeighborhoodCreateController',
                controllerAs: 'neighborhoodCreate',
                templateUrl: 'app/neighborhoods/create/neighborhoods-create.html'
            })
            .state('neighborhoods.list', {
                url: '',
                controller: 'NeighborhoodListController',
                controllerAs: 'neighborhoodList',
                templateUrl: 'app/neighborhoods/list/neighborhoods-list.html'
            });
        $urlRouterProvider.otherwise('/admin/login/');
    }

})();
