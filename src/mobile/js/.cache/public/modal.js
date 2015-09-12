/*TMODJS:{"version":1,"md5":"f3836bd39b488d0681e7233128192180"}*/
template('public/modal',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,title=$data.title,content=$data.content,$out='';$out+='<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">';
$out+=$string(title);
$out+='</div> <div class="modal-body">';
$out+=$string(content);
$out+='</div> </div> </div> </div> ';
return new String($out);
});