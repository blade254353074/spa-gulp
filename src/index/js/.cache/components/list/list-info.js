/*TMODJS:{"version":3,"md5":"e74db9fc34ca90357122dfe02bfb759d"}*/
template('components/list/list-info',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,time=$data.time,$out='';$out+='<div class="text-center dropModule"> list-info';
$out+=$string(time);
$out+=' </div> ';
return new String($out);
});