<template>
    <ProductWidgetList />
</template>

<script>
import ProductWidgetList from './components/ProductWidgetList.vue';

export default {
  name: 'App',
  components: {
    ProductWidgetList
  }
};
</script>

<style>

  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  @media (max-width: 765px) {
    #app {
      padding: 16px;
      height: auto;
      display: block;
    }
  }
</style>