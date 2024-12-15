<template>
    <div class="toggle-switch">
      <input
        type="radio"
        :id="id"
        class="toggle-input"
        :name="name"
        :value="value"
        :checked="value === modelValue"
        @click="handleClick"
      />
      <label :for="id" class="toggle-label"></label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      value: {
        type: [String, Number],
        required: true,
      },
      modelValue: {
        type: [String, Number, null],
        default: null,
      },
    },
    emits: ["update:modelValue", "toggle"],
    methods: {
      handleClick() {
        this.$emit("update:modelValue", this.value); // Emit value for v-model binding
        //this.$emit("toggle", this.value); // Emit a toggle event for custom handling
      },
    },
  };
  </script>
  <style scoped>
  .toggle-switch {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  margin-left: 10px;
}

.toggle-input {
  display: none;
}

.toggle-label {
  display: block;
  width: 40px;
  height: 19px;
  background-color: var(--color-white);
  border-radius: 20px;
  border: 0.5px solid var(--color-gray);
  position: relative;
  cursor: pointer;
  box-shadow: inset 0 1px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s, border-color 0.3s;
}

/* Toggle Knob */
.toggle-label::after {
  content: '';
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 19px;
  height: 19px;
  background-color: #fff;
  border: 0.5px solid #e2e2e2;
  border-radius: 50%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.3s;
}

/* Toggle Hover Effect */
.toggle-label::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  background: var(--color-gray);
  top: 50%;
  left: 9px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease-in;
}

.toggle-input:checked + .toggle-label {
  background-color: var(--color-primary);
  border-color: #B0B0B0;
}

.toggle-input:checked + .toggle-label::after {
  left: calc(100% - 16px);
}

.toggle-input:checked + .toggle-label::before {
  left: calc(100% - 6px);
}

.toggle-label:hover::before {
  opacity: 1;
}
  </style>