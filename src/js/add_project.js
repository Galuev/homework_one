var myModule = (function () {

    // Инициализация модуля
    var init = function () {
        _setUpListeners();
        // то, что должно произойти сразу, без прослушки событий
        };


    // прослушивает события
    var _setUpListeners = function () {
        //прослушка событий...
        $('#add-new-project').on('click', _showModal); // открыть модальное окно
        $('#add-new-project-form').on('submit', _addProject); // добавление проекта
        };




    // работает с модальным окном
    var _showModal = function (e) {
        console.log('Вызов модального окна');
        e.preventDefault();

        var divPopup = $('#element_to_pop_up'),
            form = divPopup.find('.form');

        divPopup.bPopup({
            onClose: function () {
                form.find('.server-mes').text('').hide();
                form.trigger("reset");
            }
        });
    };

    // добавляет проект
    var _addProject = function (e) {
        console.log('добавление проекта');
        e.preventDefault();

        //переменные
        var form = $(this),
            url = 'add_project.php';
            myServerGiveMeAnAnswer = _ajaxForm(form, url);

        console.log(data);

        //запрос на сервер

        myServerGiveMeAnAnswer.done(function(ans) {

            var successBox = form.find('.success-mes'),
                errorBox = form.find('.error-mes');
            if(ans.status === 'OK'){

                errorBox.hide();
                successBox.text(ans.text).show();
            } else {

                successBox.hide();
                errorBox.text(ans.text).show();

            }
        });

    };

    // Универсальная функция
    //
    // для ее работы используется form и  url
    // 1 собирает данные из формы
    // 2 проверяет форму
    // 3 делает запрос на сервер и возвращает ответ с сервера
    var _ajaxForm = function (form, url) {

                // 1. проверить форму
                // 2. собрать данные из формы
                // 3. вернуть ответ с сервера
                //
                // if(!valid) return false;
                //
                //
                if (!validation.validateForm(form)) return false;

                data = form.serialize();

                var result =  $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                    }).fail (function(ans) {
                        console.log('Проблемы в PHP');
                        form.find('.error-mes').text('На сервере произошла ошибка').show();

                    });

                return result;

    };

    // возвращаем публичные методы
    return {
        init: init
    };

})();

myModule.init();