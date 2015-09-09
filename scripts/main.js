var gg = window.gg || {};

(function() {


    console.log( gg.class.Application );

    gg.app = gg.class.Application();


    $(document).ready(gg.app.init);
})();
