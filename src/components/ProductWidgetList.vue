<template>
  <div class="list">
    <!-- Title Section -->
    <div class="title">
      <h2>Product Widgets</h2>
      <hr />
    </div>
    <!-- Content Section -->
    <div class="content">
      <!-- Loading State -->
      <div v-if="isLoading" class="state-message">
        <lottie-player
          src="/animations/plant.json"
          background="transparent"
          speed="0.5"
          loop
          autoplay
          class="lottie-animation"
        ></lottie-player>
        <p class="message">Loading widgets...</p>
      </div>
      <div v-else-if="allWidgets.length === 0" class="state-message">
        <lottie-player
          src="/animations/zoom.json"
          background="transparent"
          speed="0.5"
          loop
          autoplay
          class="lottie-animation"></lottie-player>
        <p class="message">No widgets found</p>
      </div>
      <!-- Widgets List -->
      <div v-else>
        <div class="widget-list">
          <ProductWidget
            v-for="widget in allWidgets"
            :key="widget.id"
            :widget="widget"
            :isActive="activeWidgetId === widget.id"
            :previouslySelected="previouslySelected"
            @update="handleWidgetUpdate"
            @setActive="setWidgetActive"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductWidget from './ProductWidget.vue';

export default {
  name: 'ProductWidgetList',
  components: { ProductWidget },
  computed: {
    ...mapGetters(['isLoading', 'allWidgets', 'activeWidgetId']),
    
  },
  data() {
    return {
      previouslySelected: null,
    };
  },
  methods: {
    ...mapActions(['fetchWidgets', 'updateWidget', 'setActiveWidget']),
    handleWidgetUpdate(updatedWidget) {
      this.updateWidget(updatedWidget);
    },
    setWidgetActive(widgetId) {
      this.previouslySelected = this.activeWidgetId;
      //this.activeWidgetId = widgetId;
      this.setActiveWidget(widgetId);
    },
  },
  async created() {
    await this.fetchWidgets();
  },
};
</script>

<style scoped>

.list {
  --list-padding: var(--spacing-lg);
  padding: var(--list-padding);
  width: clamp(0px, 100%, 850px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background-color: var(--color-accent);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  height: 420px;
  box-sizing: border-box;
}

.list hr {
  background-color: var(--color-border);
  height: 2px;
  margin: 0;
  border: none;
}

.title {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.widget-list {
  display: grid;
  grid-template-columns: 220px 220px 220px;
  justify-content: space-between;
}

.lottie-animation {
  margin: 0 auto;
  width: 140px;
  aspect-ratio: 1;
}

.message {
  text-align: center;
  font: 500 var(--font-size-message);
  color: var(--color-text-primary);
}
.state-message {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  justify-content: center;
  align-items: center;
}
@media screen and (min-width: 765px) and (max-width: 880px) {
  .widget-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    justify-items: center;
  }
}

@media screen and (max-width: 765px) {
  .list {
    --list-padding: var(--spacing-md);
    height: auto;
  }
  
  .widget-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 540px;
    justify-content: space-between;
  }
}

</style>
