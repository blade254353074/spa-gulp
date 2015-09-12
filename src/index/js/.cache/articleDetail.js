/*TMODJS:{"version":1,"md5":"1b4ccbdc9869fe61f76be28f19a4cb6f"}*/
template('articleDetail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,id=$data.id,title=$data.title,avatar=$data.avatar,author=$data.author,time=$data.time,banner=$data.banner,content=$data.content,like=$data.like,$out='';$out+='<div class="article-detail" data-id="';
$out+=$string(id);
$out+='"> <div class="paper reader-text"> <div class="article-header"> <h3 class="title">';
$out+=$string(title);
$out+='</h3> <div class="meta"> <a href="javascript:;"><img src="';
$out+=$string(avatar);
$out+='" class="avatar"></a> <div class="meta-main"> <p>';
$out+=$string(author);
$out+='</p> <p>';
$out+=$string(time);
$out+='</p> </div> </div> <div class="thumbnail"> <img src="';
$out+=$string(banner);
$out+='"> </div> </div> <div class="article-body">';
$out+=$string(content);
$out+='</div> </div> <div class="artcle-tool"> ';
if(like){
$out+=' <a class="tool-like active"> ';
}else{
$out+=' <a class="tool-like"> ';
}
$out+=' <span class="icon icon-heart"></span> </a> <a class="tool-top"> <span class="icon icon-arrow-up"></span> </a> </div> </div> ';
return new String($out);
});