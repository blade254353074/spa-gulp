/*TMODJS:{"version":1,"md5":"43abed6c954ee93369e3bfff824ceef3"}*/
template('productDetail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,cover=$data.cover,title=$data.title,summary=$data.summary,content=$data.content,$out='';$out+='<div class="product-article reader-text"> <div class="paper"> <div class="content"> <div class="close-wrapper"> <a id="close" class="close"></a> </div> <div class="paper-header" style="background-image: url(';
$out+=$string(cover);
$out+=')"> <div class="bg"></div> <div class="text"> <h3 class="title">';
$out+=$string(title);
$out+='</h3> <p class="summary">';
$out+=$string(summary);
$out+='</p> </div> </div> <div class="paper-body"> <article> ';
$out+=$string(content);
$out+=' </article> </div> </div> </div> </div> ';
return new String($out);
});