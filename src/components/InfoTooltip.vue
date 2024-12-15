<template>
    <div class="tooltip-container">
      <!-- Info Icon -->
      <span
        class="info-icon"
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
        @focus="showTooltip"
        @blur="hideTooltip"
        @click="toggleTooltip"
      >
        <img :src="icon" alt="Info icon" />
      </span>
  
      <!-- Tooltip Contentv-if="visible" -->
      <div 
        v-if="visible"
        class="tooltip" 
        :class="{ visible: visible }"
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
      >
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      icon: {
        type: String,
        default: () => require("@/assets/img/tooltip.svg")
      },
      showInitially: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        visible: this.showInitially,
        timeout: null,
      };
    },
    methods: {
      showTooltip() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = true;
        }, 300);
      },
      hideTooltip() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, 300); 
      },
      toggleTooltip() {
        this.visible = !this.visible;
      },
    },
  };
  </script>
  <style scoped>
  .tooltip-container{
    display: flex;
  }
  .tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  width: 248px;
  height: 162px;
  padding: 24px 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
}

.tooltip.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}


/* Info Icon */
.info-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.info-icon img {
  width: 12px;
  height: 12px;
}
</style>