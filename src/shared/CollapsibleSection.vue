<template>
    <div>
        <div class="header">
            <span v-if="open" @click="open = !open">Collapse</span>
            <span v-if="!open" @click="open = !open">Expand</span>
        </div>
        <slot v-if="open"></slot>
    </div>
</template>

<script>
    export default {
        name: 'CollapsibleSection',
        data() {
            return {open: true};
        }
    }
</script>

<style scoped>
    .header {
        background-color: grey;
        padding: 5px;
        cursor: pointer;
    }
</style>