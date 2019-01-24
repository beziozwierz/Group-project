// Simple VanillaJS to toggle class

var toggleProfile = document.getElementById('toggleProfile');
if (toggleProfile) {
  toggleProfile.addEventListener('click', function () {
    [].map.call(document.querySelectorAll('.profile'), function(el) {
      el.classList.toggle('profile--open');
    });
  });

}

$( document ).ready(function () {
  //alert();
  $('form[name="update_currency"]').submit(function() {
    var bool = $.isNumeric(document.getElementById('currency_exchange').value);
    //console.log(document.getElementById('currency_exchange'));
    if (!bool) {
      $('#error_report').html('<span style="color: red; font-size: 11px">Error: Please input correct data</span>');
      return false
    }
  })
});





