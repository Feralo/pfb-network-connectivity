/**
 * @ngdoc controller
 * @name pfb.place.list.controller:PlaceListController
 *
 * @description
 * Controller for listing analysis jobs
 *
 */
(function() {
    'use strict';

    /** @ngInject */
    function PlaceListController($state, $stateParams, $scope, Pagination, AuthService,
                                 Neighborhood, AnalysisJob) {
        var ctl = this;

        var sortingOptions = [
            {value: 'neighborhood__label', label: 'Alphabetical'},
            {value: '-overall_score', label: 'Highest Rated'},
            {value: 'overall_score', label: 'Lowest Rated'},
            {value: '-modified_at', label: 'Last Updated'}
        ];

        var defaultParams = {
            limit: null,
            offset: null,
            latest: 'True'
        };
        var nextParams = {};
        var prevParams = {};

        initialize();

        function initialize() {
            ctl.isAdminUser = AuthService.isAdminUser();

            ctl.hasNext = false;
            ctl.getNext = getNext;

            ctl.hasPrev = false;
            ctl.getPrev = getPrev;
            ctl.places = [];

            ctl.filters = {};

            ctl.sortBy = sortingOptions[0]; // default to alphabetical order
            ctl.sortingOptions = sortingOptions;

            ctl.getPlaces = getPlaces;

            getPlaces();
        }

        function getPlaces(params) {
            params = params || _.merge({}, $stateParams, defaultParams);
            params.ordering = ctl.sortBy.value;
            AnalysisJob.query(params).$promise.then(function(data) {

                ctl.places = _.map(data.results, function(obj) {
                    var neighborhood = new Neighborhood(obj.neighborhood);
                    // get properties from the neighborhood's last run job
                    neighborhood.modifiedAt = obj.modifiedAt;
                    neighborhood.overall_score = obj.overall_score;
                    return neighborhood;
                });

                if (data.next) {
                    ctl.hasNext = true;
                    nextParams = Pagination.getLinkParams(data.next);
                } else {
                    ctl.hasNext = false;
                    nextParams = {};
                }

                if (data.previous) {
                    ctl.hasPrev = true;
                    prevParams = Pagination.getLinkParams(data.previous);
                } else {
                    ctl.hasPrev = false;
                    prevParams = {};
                }

            });
        }

        function getNext() {
            var params = _.merge({}, defaultParams, nextParams);
            $state.go('places.list', params, {notify: false});
            getPlaces(params);
        }

        function getPrev() {
            var params = _.merge({}, defaultParams, prevParams);
            $state.go('places.list', params, {notify: false});
            getPlaces(params);
        }

    }

    angular
        .module('pfb.places.list')
        .controller('PlaceListController', PlaceListController);
})();
