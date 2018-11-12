<template>
    <div v-if="availableParts" class="content">
        <div class="preview">
            <CollapsibleSection>
                <div class="preview-content">
                    <div class="top-row">
                        <img :src="selectRobot.head.src"/>
                    </div>
                    <div class="middle-row">
                        <img :src="selectRobot.leftArm.src" class="rotate-left"/>
                        <img :src="selectRobot.torso.src"/>
                        <img :src="selectRobot.rightArm.src" class="rotate-right"/>
                    </div>
                    <div class="bottom-row">
                        <img :src="selectRobot.base.src"/>
                    </div>
                </div>
            </CollapsibleSection>
            <button class="add-to-card" @click="addToCard()">Add to Card</button>
        </div>
        <div class="top-row">
            <!--<div class="top part" :style="[selectRobot.head.onSale ? {'border': '3px solid red'} : {'border': '3px solid green'}]">-->
            <!--<div class="top part" :style="headBorderStyle">-->
            <div>
                <!--<div class="robot-name">{{selectRobot.head.title}}-->
                    <!--<span v-if="selectRobot.head.onSale" class="sale">Sale!</span>-->
                <!--</div>-->
                <PartSelector :class="saleBorderClass" :parts="availableParts.heads" position="top" @partSelected="part => selectRobot.head=part"/>
            </div>
        </div>
        <div class="middle-row">
            <PartSelector
                    :parts="availableParts.arms" position="left" @partSelected="part => selectRobot.leftArm = part"/>
            <PartSelector
                    :parts="availableParts.torsos" position="center" @partSelected="part => selectRobot.torso = part"/>
            <PartSelector
                    :parts="availableParts.arms" position="right" @partSelected="part => selectRobot.rightArm = part"/>
        </div>
        <div class="bottom-row">
            <PartSelector :parts="availableParts.bases" position="bottom" @partSelected="part => selectRobot.base = part"/>
        </div>
        <div>
            <h1>Card</h1>
            <table>
                <thead>
                    <tr>
                        <th>Robot</th>
                        <th class="cost">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(robot, index) in card" :key="index">
                        <td>{{robot.head.title}}</td>
                        <td class="cost">{{robot.cost}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import createdHookMixin from './created-hook-mixin';
    import PartSelector from './PartSelector.vue';
    import CollapsibleSection from '../shared/CollapsibleSection.vue';

    export default {
        name: "RobotBuilder",
        created() {
          this.$store.dispatch('getParts');
        },
        beforeRouteLeave(to, from, next) {
            if (this.addedToCard) {
                next(true)
            } else {
                const response = confirm('You are not added you robot to card');
                next(response);
            }
        },
        components: {PartSelector, CollapsibleSection},
        data() {
            return {
                addedToCard: false,
                card: [],
                selectRobot: {
                    head: {},
                    leftArm: {},
                    torso: {},
                    rightArm: {},
                    base: {}
                }
            };
        },
        mixins: [createdHookMixin],
        computed: {
            headBorderStyle() {
                return {
                    border: this.selectRobot.head.onSale ? '3px solid red' : '3px solid green'
                }
            },
            saleBorderClass() {
                return this.selectRobot.head.onSale ? 'sale-border' : ''
            },
            availableParts() {
                return this.$store.state.parts;
            }
        },
        methods: {
            addToCard() {
                const robot = this.selectRobot;
                const cost = robot.head.cost + robot.leftArm.cost + robot.torso.cost + robot.rightArm.cost + robot.base.cost;
                this.$store.dispatch('addToCard', Object.assign({}, robot, {cost}));
                this.addedToCard = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .preview {
        position: absolute;
        top: -20px;
        right: 0;
        width: 210px;
        height: 210px;
        padding: 5px;
    }
    .preview-content {
        border: 1px solid #999;
    }
    .preview img {
        width: 50px;
        height: 50px;
    }
    .rotate-right {
        transform: rotate(90deg);
    }
    .rotate-left {
        transform: rotate(-90deg);
    }
    .robot-name {
        position: absolute;
        top: -25px;
        text-align: center;
        width: 100%;
    }

    td, th {
        text-align: left;
        padding: 5px;
        padding-right: 20px;

    }

    .cost {
        text-align: right;
    }

    .sale {
        color: red;
    }

    .content {
        position: relative;
    }

    .add-to-card {
        position: absolute;
        width: 210px;
        padding: 3px;
        font-size: 16px;
    }

    .part {
        position: relative;
        width:165px;
        height:165px;
        border: 3px solid #aaa;
    }
    .part {
        img {
            width: 165px;
        }
    }
    .top-row {
        display:flex;
        justify-content: space-around;
    }
    .middle-row {
        display:flex;
        justify-content: center;
    }
    .bottom-row {
        display:flex;
        justify-content: space-around;
        border-top: none;
    }
    .head {
        border-bottom: none;
    }
    .left {
        border-right: none;
    }
    .right {
        border-left: none;
    }
    .left img {
        transform: rotate(-90deg);
    }
    .right img {
        transform: rotate(90deg);
    }
    .bottom {
        border-top: none;
    }
    .prev-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        left: -28px;
        width: 25px;
        height: 171px;
    }
    .next-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        right: -28px;
        width: 25px;
        height: 171px;
    }
    .center .prev-selector, .center .next-selector {
        opacity:0.8;
    }
    .left .prev-selector {
        top: -28px;
        left: -3px;
        width: 144px;
        height: 25px;
    }
    .left .next-selector {
        top: auto;
        bottom: -28px;
        left: -3px;
        width: 144px;
        height: 25px;
    }
    .right .prev-selector {
        top: -28px;
        left: 24px;
        width: 144px;
        height: 25px;
    }
    .right .next-selector {
        top: auto;
        bottom: -28px;
        left: 24px;
        width: 144px;
        height: 25px;
    }
    .right .next-selector {
        right: -3px;
    }
    .sale-border {
        border: 3px solid red;
    }
</style>