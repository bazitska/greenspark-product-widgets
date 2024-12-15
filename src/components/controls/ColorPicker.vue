<template>
    <div class="color-selector">
        <div v-for="color in validatedColors" :key="color"
            :class="['color-option', color, { selected: selectedColor === color }]" :aria-label="`Select ${color}`"
            role="button" tabindex="0" @click="$emit('select', color)" @keyup.enter="$emit('select', color)"></div>
    </div>
</template>
  
<script>
export default {
    name: 'ColorPicker',
    props: {
        colors: {
            type: Array,
            required: true,
        },
        selectedColor: {
            type: String,
            default: '',
        },
    },
    computed: {
        validatedColors() {
            const validColors = this.colors.filter(color => typeof color === 'string' && color.trim() !== '');
            return validColors.length ? validColors : ['blue', 'green', 'beige', 'white', 'black'];
        },
    },
};
</script>

<style scoped>

    .color-selector {
    display: flex;
    gap: 4px;
    align-items: center;
    }

    .color-option {
    width: 16px;
    height: 16px;
    cursor: pointer;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.01);
    transition: opacity 0.3s linear, border-color 0.3s linear;
    }

    .color-option:hover {
    opacity: 0.8;
    }

    .color-option.selected {
    border-color: #B0B0B0;
    }

    /* Color Options */
    .color-option.blue { background-color: var(--color-blue); }
    .color-option.green { background-color: var(--color-primary); }
    .color-option.beige { background-color: var(--color-beige); }
    .color-option.white { background-color: #fff; }
    .color-option.black { background-color: var(--color-black); }

</style>