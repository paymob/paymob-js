var paymob_calc_secure_hash = function(secret_key, data) {
  var filtered_keys = ['c_pan_U', 'c_holder_name_U', 'c_expiry_mm_U',
  'c_expiry_yy_U', 'c_cvv_U'];
  var keys = Object.getOwnPropertyNames(data).filter(function(element) {
    return data[element] !== null && filtered_keys.indexOf(element) === -1;
  });
  var accumulator = '';
  for(var i = 0; i < keys.length; i++) {
    accumulator += data[keys[i]];
  }
  return nacl.util.encodeBase64(sha256.hmac(secret_key, accumulator));
};