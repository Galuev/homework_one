var logIn = (function () {

    //ИНИЦИАЛИЗАЦИЯ МОДУЛЯ
    var init = function () {
        _setUpListeners();
    };

    //ПРОСЛУШКА СОБЫТИЙ
    var _setUpListeners = function () {
        $('#login-form').on('submit',_submitForm);
    };

    var _submitForm = function(ev){
        ev.preventDefault();
        var form = $(this);
        if (!validation.validateForm(form)) return false;
    };

    return {
        init: init,
    };

})();

logIn.init();