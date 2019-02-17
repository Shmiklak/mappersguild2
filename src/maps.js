import Vue from 'vue';
import BeatmapPage from './pages/BeatmapPage.vue';

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var src = "../images/small.png"
    $("#load").attr("src", src);
});

new Vue({
    el: '#app',
    components: {
        BeatmapPage,
    },
});
