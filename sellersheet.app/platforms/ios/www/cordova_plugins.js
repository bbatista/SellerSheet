cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.plugin.datepicker/www/datepicker.js",
        "id": "org.apache.cordova.plugin.datepicker.Datepicker",
        "clobbers": [
            "window.plugins.datePicker"
        ]
    },
    {
        "file": "plugins/uk.co.ilee.datetimepicker/www/datetimepicker.js",
        "id": "uk.co.ilee.datetimepicker.DateTimePicker",
        "clobbers": [
            "datetimepicker"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.plugin.datepicker": "1.0.0",
    "uk.co.ilee.datetimepicker": "0.4.1"
}
// BOTTOM OF METADATA
});