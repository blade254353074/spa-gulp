/*TMODJS:{"version":1,"md5":"86d46becec0e73b076c969a3a82515d9"}*/
template('articleList',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$string=$utils.$string,total=$data.total,page=$data.page,cate=$data.cate,$out='';$out+='<ul> ';
$each(list,function($value,$index){
$out+=' <li class="article-img"> <a class="wrap-img" href="/#/article/detail/';
$out+=$string($value.id);
$out+='"> ';
if($value.cover){
$out+=' <div class="bg" style="background-image:url(';
$out+=$string($value.cover);
$out+=')"></div> ';
}else{
$out+=' <div class="bg" style="background-image:url(/assets/imgs/ph_square.png)"></div> ';
}
$out+=' </a> <div class="wrap-text"> <p class="list-top"> <a href="" class="author-name">';
$out+=$string($value.author);
$out+='</a> <em>·</em> <span class="time" title="';
$out+=$string($value.time);
$out+='">';
$out+=$string($helpers. dateDiff($value.time ));
$out+='</span> </p> <h4 class="title"><a href="/#/article/detail/';
$out+=$string($value.id);
$out+='">';
$out+=$string($value.title);
$out+='</a></h4> <div class="list-footer"> <a href="/#/article/detail/';
$out+=$string($value.id);
$out+='">阅读 ';
$out+=$string($value.read);
$out+='</a> <em>·</em> <a href="/#/article/detail/';
$out+=$string($value.id);
$out+='">喜欢 ';
$out+=$string($value.like);
$out+='</a> </div> </div> </li> ';
});
$out+=' </ul> <nav class="text-center"> <div class="pagination" style="margin-top:30px;">';
$out+=$string($helpers. paging(total ,  page, cate));
$out+='</div> </nav> ';
return new String($out);
});