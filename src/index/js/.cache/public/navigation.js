/*TMODJS:{"version":3,"md5":"ab1acfee97632368eaeb8b4741725229"}*/
template('public/navigation',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,menu=$data.menu,$value=$data.$value,$index=$data.$index,$string=$utils.$string,item=$data.item,$out='';$out+='<ul id="navigation" class="nav"> ';
$each(menu,function($value,$index){
$out+=' <li class="nav-item"> <a> <span class="icon ';
$out+=$string($value.icon);
$out+='"></span> <span>';
$out+=$string($value.title);
$out+='</span> <span class="symbol"></span> </a> ';
if($value.list.length !== 0){
$out+=' <ul class="sub-nav"> ';
$each($value.list,function(item,$index){
$out+=' <li class=\'sub-list\'> <a class="sub-item" href="';
$out+=$string(item.hash);
$out+='" data-root="';
$out+=$string(item.root);
$out+='"> <span>';
$out+=$string(item.title);
$out+='</span> </a> </li> ';
});
$out+=' </ul> ';
}
$out+=' </li> ';
});
$out+=' </ul> ';
return new String($out);
});