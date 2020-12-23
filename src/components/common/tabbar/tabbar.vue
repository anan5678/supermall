<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  components: {},
};
</script>

<style scoped>
/* @import "./assets/css/base.css" ; */
#tab-bar{
    display: flex;
    background-color: #f2f2f2;

    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;

    box-shadow:0 -1px 1px rgb(200,200,200,0.2) ;
}

</style>
