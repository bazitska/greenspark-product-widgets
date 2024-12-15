<template>
  <div class="widget" :class="[colorClass]">
    <!-- Header -->
    
    <div class="header">
      <HeaderSvg name="badge-icon" class="header-icon" />
      <div class="text">
        <h5>This product {{ widget.action }}</h5>
        <h4>{{ formattedAmount }} {{ formattedType }}</h4>
      </div>
    </div>
    <div class="controls">
      <!-- Color Picker -->
      <div class="control">
        <label>Badge Color</label>
        <ColorPicker
          :colors="availableColors"
          :selectedColor="localWidget.selectedColor"
          @select="selectColor"
        />
      </div>

      <!-- Public Profile Link -->
      <div class="checkbox-container control">
      <!-- Wrapper for label and info icon -->
      <div class="wrapper">
        <label class="checkbox-label">
          Link to Public Profile
        </label>
        <InfoTooltip>
          <p class="regular-text">
            This widget links directly to your public profile so that you can easily
            share your impact with your customers. Turn it off here if you do not want the badge to link to it.
          </p>
          <a href="#" class="link">View Public Profile</a>
        </InfoTooltip>
      </div>

      <!-- Checkbox -->
      <CustomCheckbox
        :id="'checkbox-' + widget.id"
        :checked="localWidget.linked"
        @change="toggleLinked"
      />

      </div>
      <!-- Activate Widget -->
      <div class="control">
        <label>Activate badge</label>
        <ToggleSwitch
        :id="'toggle-' + widget.id"
        :name="'activeWidget'"
        :value="widget.id"
        :modelValue="selected"
        @update:modelValue="updateSelected"
        />
      </div>

    </div>
  </div>
</template>

<script>

import ColorPicker from './controls/ColorPicker.vue';
import HeaderSvg from './HeaderSvg.vue';
import ToggleSwitch from './controls/ToggleSwitch.vue';
import InfoTooltip from './InfoTooltip.vue';
import CustomCheckbox from './controls/CustomCheckbox.vue';

export default {
  components: {
    ColorPicker,
    HeaderSvg,
    ToggleSwitch,
    InfoTooltip,
    CustomCheckbox
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localWidget: { ...this.widget },
      tooltipVisible: false,
      tooltipTimeout: null,
      selected: this.isActive ? { ...this.widget }.id : null,
      previouslySelected: this.isActive ? this.widget.id : null
    };
  },
  computed: {
    colorClass() {
      return `widget--${this.localWidget.selectedColor.toLowerCase()}`;
    },
    formattedAmount() {
      if (this.localWidget.type === "carbon") {
        return `${this.localWidget.amount} ${
          this.localWidget.amount === 1 ? "kg" : "kgs"
        }`;
      }
      return this.localWidget.amount;
    },
    formattedType() {
      if (this.localWidget.type === "plastic") {
        return "plastic bottles";
      }
      if (this.localWidget.type === "carbon") {
        return "of carbon";
      }
      return this.localWidget.type;
    },
    availableColors() {
      return ['blue', 'green', 'beige', 'white', 'black'];
    },
  },
  methods: {
    updateSelected(value) {
    this.selected = value;
    this.w(value);
  },
  w(val) {
    if (val === this.previouslySelected) {
      this.selected = null;
      this.previouslySelected = val;
      this.localWidget.active = false;
      this.$emit("setActive", null);
    } else {
      this.selected = val;
      this.previouslySelected = val;
      this.localWidget.active = true;
      this.$emit("setActive", val);
    }
    this.emitChanges();
  },
    emitChanges() {
      this.$emit("update", { ...this.localWidget });
    },
    selectColor(color) {
      this.localWidget.selectedColor = color;
      this.emitChanges();
    },
    toggleLinked() {
      this.localWidget.linked = !this.localWidget.linked;
      this.emitChanges();
    },
    showTooltip() {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = setTimeout(() => {
        this.tooltipVisible = true;
      }, 300);
    },
    hideTooltip() {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = setTimeout(() => {
        this.tooltipVisible = false;
      }, 300);
    },
  },
  watch: {
    isActive: {
      handler(newValue) {
        this.selected = newValue ? this.widget.id : null;
        this.previouslySelected = newValue ? this.widget.id : null;
      },
      immediate: true
    },
    widget: {
    handler(newValue) {
      this.localWidget = { ...newValue };
      this.selected = newValue.active ? newValue.id : null;
      this.previouslySelected = newValue.active ? newValue.id : null;
    },
    deep: true,
    immediate: true
  }
  },
};
</script>

<style>

/* Base Widget Styles */
.widget {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 221px;
  width: 100%;
  height: 152px;
}

/* Header Styles */
.widget .header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  height: 66px;
  padding: 16px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.01);
  transition: background-color 0.3s linear, color 0.3s linear;
}

.widget .text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.widget .text > * {
  margin: 0;
}

/* Theme Colors */
.widget--white .header {
  background-color: #fff;
  color: var(--color-primary);
}

.widget--black .header {
  background-color: var(--color-black);
  color: var(--color-white);
}

.widget--blue .header {
  background-color: var(--color-blue);
  color: var(--color-white);
}

.widget--green .header {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.widget--beige .header {
  background-color: var(--color-beige);
  color: var(--color-primary);
}

/* SVG Styles */
.widget .header svg {
  height: 40px;
  width: 40px;
  transition: fill 0.3s linear;
}

.widget--beige .header svg,
.widget--white .header svg {
  fill: var(--color-primary);
}

.widget--black .header svg,
.widget--blue .header svg,
.widget--green .header svg {
  fill: var(--color-white);
}

/* Controls Section */
.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.controls .control {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.controls .control label {
  color: var(--color-primary);
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
}

.controls .wrapper {
  display: flex;
  gap: 1px;
}

</style>
