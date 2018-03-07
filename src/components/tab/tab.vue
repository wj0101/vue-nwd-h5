<template>
  <div class="tab">
    <ul class="tab-ul">
      <router-link to="/progress" tag="li" class="tab-item">
        <div class="icon-menu icon-progress"></div>
        <span class="tab-link">进度查询</span>
      </router-link>
      <router-link to="/repayment" tag="li" class="tab-item">
        <div class="icon-menu icon-repayment"></div>
        <span class="tab-link">还款详情</span>
      </router-link>
      <router-link to="/personal" tag="li" class="tab-item">
        <div class="icon-menu icon-personal"></div>
        <span class="tab-link">个人中心</span>
      </router-link>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6"></script>
<style lang="stylus">
  @import "~common/stylus/variable"
  .tab
    height :8rem
  .tab-ul
    width :100%
    height :8rem
    display :flex
    background-color :#fff
    .tab-item
      float :left
      flex :1
      text-align center
      line-height :10rem
      font-size :$font-size-medium
      color :$color-text-ll
      position:relative
      box-sizing :border-box
      .icon-menu
        width: 4rem;
        height: 4rem;
        -webkit-transform: scale(0.5);
        -ms-transform: scale(0.5);
        transform: scale(0.5);
        position: absolute;
        left: 50%;
        margin-left :-2rem
      .icon-progress
        background :url(../../common/image/main.png) no-repeat -86px 0
      .icon-repayment
        background :url("../../common/image/main.png") no-repeat 0 0
      .icon-personal
        background :url("../../common/image/main.png") no-repeat -42px 0
</style>
