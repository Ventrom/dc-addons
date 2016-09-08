(function () {
    'use strict';

    if (dc.paginationMixin) {
        return false;
    }

    // optional page size parameter
    dc.paginationMixin = function (_chart, size) {

        if (_chart) {
            // chart does not have a y axis if it is a row chart, so don't make it elastic
            if (_chart.y) {
                // chart is a bar chart so we need it to be elastic for it to work
                _chart.elasticX(true);
            }

            _chart.pagination = {};
            // data information
            _chart.pagination.allData = _chart.group().all();
            // page information
            _chart.pagination.currentPage = 1;
            _chart.pagination.pageSize = size || 5;
            _chart.pagination.pageCount = Math.ceil(_chart.pagination.allData.length / _chart.pagination.pageSize);
            // page controls
            _chart.pagination.setPage = function (page) {
                if (page < 1) {
                    page = 1;
                }

                if (page > _chart.pagination.pageCount) {
                    page = _chart.pagination.pageCount;
                }

                if (page !== _chart.pagination.currentPage) {
                    _chart.pagination.currentPage = page;
                    _chart.redraw();

                    if (_chart.tip) {
                        _chart.tip.reinit();
                    }
                }
            };
            _chart.pagination.setPageSize = function (pageSize) {
                if (pageSize < 1) {
                    pageSize = 1;
                }
                if (pageSize > _chart.pagination.allData.length) {
                    pageSize = _chart.pagination.allData.length;
                }
                if (pageSize !== _chart.pagination.pageSize) {
                    _chart.pagination.pageSize = pageSize;
                    _chart.pagination.currentPage = 1;
                    _chart.pagination.setPageCount();
                    _chart.redraw();
                    if (_chart.tip) {
                        _chart.tip.reinit();
                    }
                }
            };
            _chart.pagination.setPageCount = function () {
                _chart.pagination.pageCount = Math.ceil(_chart.pagination.allData.length / _chart.pagination.pageSize);
            };
            _chart.pagination.previous = function () {
                _chart.pagination.setPage(_chart.pagination.currentPage - 1);
            };
            _chart.pagination.next = function () {
                _chart.pagination.setPage(_chart.pagination.currentPage + 1);
            };
            _chart.pagination.first = function () {
                _chart.pagination.setPage(1);
            };
            _chart.pagination.last = function () {
                _chart.pagination.setPage(_chart.pagination.pageCount);
            };

            _chart.group().all = function () {
                var pageStart = (_chart.pagination.currentPage - 1) * _chart.pagination.pageSize;
                var pageEnd = _chart.pagination.currentPage * _chart.pagination.pageSize;
                return _chart._computeOrderedGroups(_chart.pagination.allData).slice(pageStart, pageEnd);
            };

            _chart.redraw();
        }

        return _chart;
    };
})();
