//数据合法性校验
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
  
  function isLegalKey(key, content, pos) {
    //过滤非法字符
    if(/[abcdf-zABCDF-Z`~!@#$%^&*()=_+[\]{}|;:'",<>/?\\]/.test(key)) {
      return false;
    }
    //小数点
    if(key === '.') {
      if(pos === 0 || content.indexOf('.') !== -1) return false;
      if(pos > 0 && /[-eE]/.test(content.slice(0, pos))) return false;
    }
    //负号
    if(key === '-') {
      if(pos === 0) return false;
      if(pos > 0 && /[0-9.]/.test(content.slice(pos -1, pos))) return false;
      if(pos > 0 && content.indexOf('-') !== -1) return false;
    }
    //e和E
    if(key === 'e' || key === 'E') {
      if(pos === 0) return false;
      if(content.indexOf('e') !== -1 || content.indexOf('E') !== -1) return false;
      if(content.slice(pos, content.length).indexOf('.') !== -1) return false;
      if(pos > 0 && /[-.]/.test(content.slice(pos - 1, pos))) return false;
    }
    return true;
  }
  