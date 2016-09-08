(function () {
    'use strict';

    var topojson = require('topojson');
    L.TopoJSON = L.GeoJSON.extend({
        addData: function (jsonData) {
            if (jsonData.type === 'Topology') {
                for (var key in jsonData.objects) {
                    var geojson = topojson.feature(jsonData, jsonData.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            } else {
                L.GeoJSON.prototype.addData.call(this, jsonData);
            }
        }
    });
})();
