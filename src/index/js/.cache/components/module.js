/*TMODJS:{"version":1,"md5":"57ebf522a78016709cc90b0829b2f15f"}*/
template('components/module',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$each(list,function($value,$index){
$out+=' <li class="drag-item" data-id="';
$out+=$string($value.id);
$out+='" draggable="true"> <div class="drag-icon ';
$out+=$string($value.icon);
$out+='"></div> <div class="drag-text">';
$out+=$string($value.name);
$out+='</div> </li> ';
});
$out+=' ';
return new String($out);
});