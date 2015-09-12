/*TMODJS:{"version":2,"md5":"0bf2fb6e905b5e2fa4b8190201d7bb93"}*/
template('public/modal',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,title=$data.title,content=$data.content,$out='';$out+='<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">';
$out+=$string(title);
$out+='</div> <div class="modal-body">';
$out+=$string(content);
$out+='</div> </div> </div> </div> ';
return new String($out);
});