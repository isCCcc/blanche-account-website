import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

if (document.documentElement.clientWidth > 500) {
    window.alert('请使用手机扫描右上方二维码打开本页面，以保证浏览效果');
    const img = document.createElement('img');
    img.src = './qrcode.png';
    img.style.width = '120px';
    img.style.position = 'fixed';
    img.style.right = '20px';
    img.style.top = '10px';
    img.style.zIndex = '100';
    img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
    document.body.appendChild(img);
}