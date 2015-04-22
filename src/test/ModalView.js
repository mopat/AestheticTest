AestheticTest.ModalView = (function () {
    var that = {},
        $buttonColorModalClose = null,


        init = function () {

            $buttonColorModalClose = $('#button-color-modal-close');

            $buttonColorModalClose.on('click', function () {
                $(that).trigger("buttonColorModalCloseClicked", [$('#color-composition').val(), $('#color-hue').val(), $('#color-saturation').val(), $('#color-brightness').val(), $('#color-other').val()]);
            });

            return this;
        };


    that.init = init;

    return that;
}());




