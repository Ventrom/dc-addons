/*!
 * dc-addons v0.13.5
 *
 * 2016-09-09 17:58:10
 *
 */
if (!dc.utils.getAllFilters) {
    dc.utils.getAllFilters = function () {
        var result = {};
        var list = dc.chartRegistry.list();

        for (var e in list) {
            var chart = list[e];
            result[chart.chartID()] = chart.filters();
        }

        return result;
    };
}
