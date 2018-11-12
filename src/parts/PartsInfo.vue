<template>
    <div>
        <h1>{{part.title}}</h1>
        <div>{{part.description}}</div>
    </div>
</template>

<script>
    import getPartsMixin from './get-parts';

    export default {
        name: "PartsInfo",
        props: {
            partType: {type: String},
            id: {
                type: [Number, String],
                validator(value) {
                    return Number.isInteger(Number(value))
                }
            }
        },
        computed: {
            part() {
                const {partType, id} = this;
                return this.parts[partType].find(part => part.id === +id);
            }

        },
        mixins: [getPartsMixin]
    }
</script>
