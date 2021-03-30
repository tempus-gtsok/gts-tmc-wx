<template>
  <view class="no-data">
    <image class="noData" src="@/static/img/noData.png" mode="widthFix"></image>
  </view>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.no-data {
    display: flex;
    justify-content: center;
  .noData {
    width: 300upx;
    margin-top: 30%;
    margin-left: -100upx;
  }
}
</style>