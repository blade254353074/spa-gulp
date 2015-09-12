/*TMODJS:{"version":3,"md5":"5dc7e290f8d986e8761462508fa821dc"}*/
template('components/article-list/theme1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$string=$utils.$string,id=$data.id,$out='';$out+='<div class="article-list t1"> <ul> ';
if(list){
$out+=' ';
$each(list,function($value,$index){
$out+=' <li> <a href="/article/';
$out+=$string(id);
$out+='"></a> <img src="';
$out+=$string($value.cover);
$out+='" class="cover"> <div class="content"> <h4 class="title">';
$out+=$string($value.title);
$out+='</h4> <div class="summary">';
$out+=$string($value.summary);
$out+='</div> </div> </li> ';
});
$out+=' ';
}else{
$out+=' <li class="ph"> 文章列表为空，请添加文章 </li> ';
}
$out+=' </ul> </div> ';
return new String($out);
});