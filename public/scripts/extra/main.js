  function check(){
    var email = document.getElementById("fields-email").value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('fields-email').style = "none";

      var modal_email = document.getElementById('sproutform-email-modal');
      modal_email.style.display = "none";

      var modal_form = document.getElementById('sproutform-modal');
      modal_form.style.display = "block";
      
      return true;                   
    } 
    else {                                                      
      document.getElementById('fields-email').focus();
      with(document.getElementById('fields-email').style) {
        backgroundColor = 'lightyellow';
        color = 'red';
      }
      var modal_email = document.getElementById('sproutform-email-modal');
      modal_email.style = "display:block";
      return false;
    }
  }


  function initCsrf() {
    window.csrfTokenName = "{{ craft.config.csrfTokenName|e('js') }}";
    window.csrfTokenValue = "{{ craft.request.csrfToken|e('js') }}";
  };