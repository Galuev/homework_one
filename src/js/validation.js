var validation = (function () {

    //ИНИЦИАЛИЗАЦИЯ МОДУЛЯ
    var init = function () {
        _setUpListeners();
    };

    //ПРОСЛУШКА СОБЫТИЙ
    var _setUpListeners = function () {
        $('form').on('keydown', '.empty-input', _removeEmpty);
        $('form').on('reset', _clearForm);
    };

    var _removeEmpty = function () {
        $(this).removeClass('empty-input');
    };
    var _clearForm  = function (form) {
        var form = $(this);
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.empty-input').removeClass('empty-input');

    };


    // СОЗДАЕТ ТУЛТИПЫ
    var _createQtip = function (element, position) {

        //позиция тултипа
        if (position === 'right') {
              position = {
                my: 'left center',
                at: 'right center'
              }
            }else{
              position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                  method: 'shift none'
                }
              }
            }

        //инициализация тултипа
        element.qtip({
            content: {
                text: function() {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle',
                tip: {
                    height: 7,
                    width: 10
                }
            }
        }).trigger('show');

    };

    // УНИВЕРСАЛЬНАЯ ФУНКЦИЯ
    var validateForm = function (form) {

        console.log('Если эта надпись есть, то валидация формы сработала');

        var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
            valid = true;
        // $.each - метод, перебирающий все элементы формы
        $.each(elements, function (index, val){
            var element =  $(val),
            val = element.val(),
            pos = element.attr('qtip-position');
            if (val.length === 0) {
                _createQtip(element, pos);
                element.addClass('empty-input');
                valid = false;
            }
        });
        return valid;
    };

    //ВОЗВРАЩЕНИЕ ОБЪЕКТА (ПУБЛИЧНЫЕ МЕТОДЫ)
    return {
        init: init,
        validateForm: validateForm
    };

})();

validation.init();