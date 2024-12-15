<template>
  <div class="checkbox-container">
    <input
      type="checkbox"
      :id="id"
      class="custom-checkbox"
      :checked="checked"
      @change="emitChange"
    />
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
  props: {
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["change"],
  methods: {
    emitChange(event) {
      this.$emit("change", event.target.checked);
    },
  },
};
</script>
<style scoped>
input[type="checkbox"] {
  margin: 0;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-black);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  appearance: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input[type="checkbox"]:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

input[type="checkbox"]::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-white);
  mask: url('@/assets/img/check.svg') center/contain no-repeat;
  opacity: 0;
  transition: opacity 0.3s ease;
}

input[type="checkbox"]:checked::after {
  opacity: 1;
}

input[type="checkbox"]::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  background: var(--color-gray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

input[type="checkbox"]:hover::before {
  opacity: 0.5;
}
</style>