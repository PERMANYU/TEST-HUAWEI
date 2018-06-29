<template>
    <div class="container" id="container" style="padding-top: 45px;"> 

        <div class="add-class">
        <form>
            <ul>
            <li><label>类型</label><input id="type" type="text" name="type" class="type" placeholder="卫浴安装" value=""></li>
            <li><label>金额</label><input id="amount" type="number" name="amount" class="amount" placeholder="请输入所需金额" value=""></li>
            <li><label>优惠券</label><input id="coupons" type="text" name="coupons" class="coupons" placeholder="请选择优惠券" value=""></li>
            <li><label>备注</label><input id="remarks" type="text" name="remarks" class="remarks" placeholder="其他备注信息" value=""></li>
            </ul>
            <button type="submit" class="confirm-payment">确认支付</button>
        </form>  
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
