
/*-------药店常备------*/
// 购物车增减
function IncreaseD(_this){
    var count = $(_this).parent().find("input")[0];
    //用来判断当前代理对象是否包含add
    if($(_this).hasClass("add")){
        count.value++;
    }else{
        count.value=(count.value==1?1:count.value-1);
    }
    // $.ajax({
    //     url:'data.json',
    //     type:'post',
    //     data:count.value,
    //     success:function(){
    //         //alert(12);
    //     }
    // })
}
