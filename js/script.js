$(document).ready(function () {
    $('.phpmc_buy').submit(function () {
        if(!$(this).data('ready')) {
            check($(this));
            return false;
        }
    });
    $('.select-group').change(function () {
        check($(this).parents('form'));
    });
    var nick_time = false;
    $('.input-nick').keyup(function () {
        if(nick_time) clearTimeout(nick_time);
        $(this).parents('form').find('.btn-info-buy').text('Загрузка..').prop('disabled',true);
        nick_time = setTimeout(()=>{
            check($(this).parents('form'));
        },500);
    });
});
function check(form) {
    if(form.find('.input-nick').val().length == 0) return form.find('.btn-info-buy').text('Введите ник').prop('disabled',true);
    if(form.find('select option:selected').is(':disabled')) return form.find('.btn-info-buy').text('Выберите донат').prop('disabled',true);
    $(form).data('ready',false);
    form.find('.btn-info-buy').text('Загрузка..').prop('disabled',true);
    var price = $(form).find('select option:selected').data('price');
    $.post('/handler.php',{
        type: 'extra',
        nick: form.find('.input-nick').val(),
        srv: form.find('.input-srv_id').val(),
        group: form.find('.select-group option:selected').val()
    },function (data) {
        console.log(price,data);
        if(data.error) form.find('.btn-info-buy').text('Ошибка: '+data.error).prop('disabled',false);
        if(data.data >= price) form.find('.btn-info-buy').text('У вас уже есть данная привилегия').prop('disabled',true);
        else{
            var percent = $(form).find('#promo_percent').val();
            if(percent > 0)
                    price = price - (price * (percent / 100));
            
            $(form).find('.btn-info-buy').text(
                (data.data == 0)?
                    'Купить за '+price+' рублей':
                    'Доплатить '+(price-data.data)+' рублей'
            ).prop('disabled',false);
            
        }
        $(form).data('ready',true);
    },'json').fail(function() {
        form.find('.btn-info-buy').text('Ошибка.').prop('disabled',true);
        setTimeout(()=>check(form),5000);
    });
}