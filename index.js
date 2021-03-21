$(()=>{
    let $width = $('#width'),
        $height = $('#height'),
        $btnCal = $('#calc'),
        $perimeter = $('#perimeter'),
        $area = $('#area'),
        $widthValidate = $('#width-validate'),
        $heightValidate = $('#height-validate'),
        isPassValidate = false;
  
    $width.focusout(() => {
      console.log($width.val());
      let result = validate($width.val());
      console.log(result);
      isPassValidate = result.isOK;
      if(!result.isOK) {
        $widthValidate.html('宽度' + result.reason);
        $width.select();                        
      } else {
        $widthValidate.html('');                  
      }
    });
  
    $width.keypress((e) => {
      if(!isLegalKey(e.key, e.target.value, e.target.selectionStart)) {
        e.preventDefault();          
      }
    });
    
    $height.focusout(() => {
      let result = validate($height.val());
      isPassValidate = result.isOK;
      if(!result.isOK) {
        $heightValidate.html('高度' + result.reason);
        $height.select();
      } else {
        $heightValidate.html('');
      }
    });
  
    $height.keypress(function(e) {
      if(!isLegalKey(e.key, e.target.value, e.target.selectionStart)) {
        e.preventDefault();           
      }   
    });
  
    $btnCal.click(() => {
      if(!isPassValidate) return;
      let w = Number($width.val()),
          h = Number($height.val());
      function l1(x,n){
          return Math.round(x * Math.pow(10,n)) / Math.pow(10,n);         
      }
      console.log(w,h);
      $perimeter.val(l1(2 * (w + h), 2));
      $area.val(l1(w * h, 2));          
    });
  });

function validate(data) {
  var result = {
    isOK: false,
    reason: ''             
  };
  if(data === '') {
    result.reason = '不能为空！';
    return result;          
  }
  if(!/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test(data)) {
    result.reason = '必须是数值';
    return result;           
  }
  if(Number(data) < 0) {
    result.reason = '必须大于零';
    return result;         
  }
  result.isOK = true;
  return result;
}
