import Vue from 'vue';
import Vuex from 'vuex';
import RobotModules from './modules/robots';
import UsersModules from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        robots: RobotModules,
		users: UsersModules
    }
});