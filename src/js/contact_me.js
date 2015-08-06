var contactMe = (function () {

    //инициализируем наш модуль
    var init = function () {
        _setUpListeners();
    };

    //прослушивает события
    var _setUpListeners = function () {
        $('#contact-me').on('submit',_submitForm);
    };

    var _submitForm = function(ev){
        console.log('отправка формы');
        ev.preventDefault();

        var form = $(this),
            url = 'contactme.php',
            defObj = _ajaxForm(form, url);

            // что-то будем делать с ответом с сервера defObj
    };


    var _ajaxForm = function (form, url) {
        console.log('аджакс запрос с предварительной проверкой');
        if (!validation.validateForm(form)) return false;
        // если фолс, то код сниже не сработает - чтоы не рсабатывал лишний раз запрос на сервер
    };
    //возвращаем объект (публичные методы)

    return {
        init: init,
    };

})();

contactMe.init();