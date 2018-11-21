  function check(){
    var addresstext = document.getElementById('address').value;
    var starttime = document.getElementById('expiredate').value;
    var promocode = document.getElementById('promocode').value;

    if ($('textarea#fields-message').val()) {
      var arr = ["viagra", "href=", "url=", "link=", "http:", ".com"];
      var message = $('textarea#fields-message').val();

      if ((message.indexOf(arr[0]) != -1) || (message.indexOf(arr[1]) != -1) || (message.indexOf(arr[2]) != -1) || (message.indexOf(arr[3]) != -1) || (message.indexOf(arr[4]) != -1)) {
        spam = 1;
      } else {
        spam = 0;
      }
    }

    var now = new Date();
    var utc_now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    var diff = utc_now - starttime;

    if (addresstext || promocode || (diff <= 10000) || spam) {
      document.getElementById('address').value = "use backspace to delete all text in this field";
      document.getElementById('address').focus();
      return false;
    } else {
      var modal = document.getElementById('sproutform-modal');
      modal.style.display = "block";
      return true;
    }
  }

  function loadform() {
    var now = new Date();
    var utc_now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    document.getElementById('expiredate').setAttribute('value', utc_now);
  };

  function initCsrf() {
    window.csrfTokenName = "{{ craft.config.csrfTokenName|e('js') }}";
    window.csrfTokenValue = "{{ craft.request.csrfToken|e('js') }}";
  };
