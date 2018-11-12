import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartsInfo from '../parts/PartsInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHead from '../parts/RobotHead.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBase from '../parts/RobotBase.vue';
import SidebarStandard from '../sidebars/SidebarStandart.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        components: {
            default: HomePage,
            aside: SidebarStandard
        }
    }, {
        path: '/build',
        name: 'Build',
        components: {
            default: RobotBuilder,
            aside: SidebarBuild
        }
    }, {
        path: '/parts/browse',
        name: 'BrowseParts',
        component: BrowseParts,
        children: [
            {
                name: 'BrowseHead',
                path: 'heads',
                component: RobotHead
            }, {
                name: 'BrowseArms',
                path: 'arms',
                component: RobotArms
            }, {
                name: 'BrowseTorsos',
                path: 'torsos',
                component: RobotTorsos
            }, {
                name: 'BrowseBase',
                path: 'bases',
                component: RobotBase
            }
        ]
    }, {
        path: '/parts/:partType/:id',
        name: 'Parts',
        component: PartsInfo,
        props: true,
        beforeEnter(to, from, next) {
            const isValid = Number.isInteger(Number(to.params.id));
            next(isValid);
        }
    }, {
        path: '/cart',
        name: 'Cart',
        component: ShoppingCart
    }]
})