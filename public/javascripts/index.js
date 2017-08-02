/**
 * Created by ryazanova.ea on 31.07.2017.
 */


let controllerFIO = false;
let controllerEmail = false;
let controllerPhone = false;
let str = {};
jQuery(function($) {
  $("#phone").mask("+7(999)999-99-99");
});

function onChangeFIO(value) {
  console.log('onChangeFIO', value)
  let array = value.split(' ')
  if (array.length !== 3) {
    $("#fio").addClass('error');
    $("#fio").tooltip({
      trigger: 'manual',
      placement: 'right',
      title: 'ФИО: Ровно три слова'
    }).tooltip('show');
  } else {
    $("#fio").tooltip('hide');
    $("#fio").addClass('success');
    controllerFIO = true
    str.fio = value
  }
  controlButton()
}

function onChangeEmail(value) {
  console.log('onChangeEmail', value)
  if (value.includes('@ya.ru') ||
    value.includes('@yandex.ru') ||
    value.includes('@yandex.by') ||
    value.includes('@yandex.ua') ||
    value.includes('@yandex.kz') ||
    value.includes('@yandex.com')) {
    $("#email").addClass('success');
    $("#email").tooltip('hide');
    controllerEmail = true
    str.email = value
  } else {
    $("#email").addClass('error');
    $("#email").tooltip({
      trigger: 'manual',
      placement: 'right',
      title: 'Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com'
    }).tooltip('show');
  }
  controlButton()
}

function onChangePhone(value) {
  console.log('onChangePhone', value);
  value = value.replace('+', '');
  value = value.replace('(', '');
  value = value.replace(')', '');
  value = value.replace(/[-]/g, '');
  console.log('newStr', value);
  let sum = findSumma(value);
  if (sum <= 30) {
    $("#phone").addClass('success')
    $("#phone").tooltip('hide')
    controllerPhone = true;
    str.phone = value
  } else {
    $("#phone").addClass('error');
    $("#phone").tooltip({
      trigger: 'manual',
      placement: 'right',
      title: 'Cумма всех цифр телефона не должна превышать 30'
    }).tooltip('show');
  }
  controlButton()
}

function findSumma(value) {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum = sum + parseInt(value[i], 10);
  }
  return sum
}

function controlButton() {
  if (controllerFIO && controllerEmail && controllerPhone) {
    console.log('123', controllerFIO && controllerEmail && controllerPhone)
    $("#submitButton").addClass('disabled');
    $("#resultContainer").html("")
    $.ajax({
      url: "http://localhost:3010/form",
      type: 'POST',
      data: str,
      dataType: "json",
      success: function(data) {
        if (data.status === 'success') {
          $("#resultContainer").html("<p>Success</p>")
          $("#resultContainer").addClass('success bg-success')
        } else if (data.status === 'error') {
          $("#resultContainer").html("<p>" + data.reason + "</p>")
          $("#resultContainer").addClass('error bg-danger')
        } else {
          set(str)
        }
      }
    })
      .always(function() {
        $("#submitButton").removeAttr('disabled');
      });
    ;
  }
}

function set(str) {
  $.ajax({
    url: "http://localhost:3010/form",
    type: 'POST',
    data: str,
    dataType: "json",
    success: function(data) {
      if (data.status === 'success') {
        $("#resultContainer").html("<p>Success</p>")
        $("#resultContainer").addClass('success bg-success')
      } else if (data.status === 'error') {
        $("#resultContainer").html("<p>" + data.reason + "</p>")
        $("#resultContainer").addClass('error bg-danger')
      }
    }
  })
}