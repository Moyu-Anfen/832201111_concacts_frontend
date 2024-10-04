<!-- 通讯录主界面 -->
<template>
	<!-- 输入框 -->
	<div class="showInput" v-show="!addressBookStore.isShow && !addressBookStore.isShowChang">
		<inputBox />
	</div>
	<div class="showChange" v-show="!addressBookStore.isShow && addressBookStore.isShowChang">
		<changeBox />
	</div>
	<div class="main" v-show="addressBookStore.isShow && loginStore.isLogin">
		<div class="addressBook">
			<div class="search">
				<input type="text" placeholder="通过名字搜索" maxlength="6" v-model="addressBookStore.search">
				<button class="searchFor"><img src="../assets/img/search.svg" alt="" /></button>
			</div>
		</div>
		<div class="tip">左右滑动以查看更多</div>
		<swiper>
			<swiper-slide v-for="page in slidePages" :key='page'>
				<div class="content">
					<div class="idCard" v-for="(item,index) in filteredList.slice(5*(page-1),5*(page))" key='index'>
						<div class="action">
							<div class="change" @click.stop="changeAddress(item.name)"><img
									src="../assets/img/change.svg" alt="" /></div>
							<div class="delete" @click.stop="deleteAddress(item.name)"><img
									src="../assets/img/delete.svg" alt="" /></div>
						</div>
						<div class="nameContent">
							<div class="circleContain"><img :src="item.avator" /></div>
							<div class="name">{{item.name}}</div>
						</div>
						<div class="detailContent">
							<div class="phone">电话：{{item.phoneNumber}}</div>
							<div class="address">地址：{{item.address}}</div>
						</div>
					</div>
					<div class="idCardAdd" @click.stop="addAddress"><img src="../assets/img/add.svg" alt="" /></div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script lang="ts" setup name="addressBook">
	//引入swiper滑动窗口
	import { SwiperSlide, Swiper } from 'swiper/vue';
	import 'swiper/css'
	
	//引入响应式和生命周期以及计算功能
	import { reactive,  computed, onBeforeMount } from 'vue'
	
	//引入仓库
	import { useLoginStore } from '../store/login';
	import { useAddressBookStore } from '../store/addressBook';
	
	//引入工具函数
	import { sendRequest } from '../utils/useAxios';
	import { useAddress } from '../utils/useAddress';
	
	//引入组件
	import inputBox from '../components/inputBox.vue';
	import changeBox from '../components/changeBox.vue';

	//使用仓库
	const loginStore = useLoginStore()
	const addressBookStore = useAddressBookStore()


	//计算需要多少页面来显示
	const slidePages = computed(() => {
		const slideSize = 5;
		const amountPage = Math.ceil(testChart.length / 5) + 1
		return amountPage;
	})

	//空数组承接数据库数据，懒得改名
	let testChart = reactive([])

	//添加联系人函数
	const addAddress = () => {
		addressBookStore.isShow = false
	}

	//查找联系人函数
	const filteredList = computed(() => {
		return testChart.filter((item) =>
			item.name.toLowerCase().includes(addressBookStore.search.toLowerCase())
		);
	});

	
	// 删除联系人
	const deleteAddress = async (name) => {
		const data = {
			account: loginStore.account,
			name: name,
		}
		console.log(data)
		const res = await useAddress('deleteAddressBook', data)
		window.location.reload();
		return res;
	}

	//修改联系人
	const changeAddress = async (name) => {
		addressBookStore.name = name;
		addressBookStore.isShow = false
		addressBookStore.isShowChang = true
	}
	
	//挂载前的操作
	onBeforeMount(() => {
		let url = 'http://softwareback.moyu-home.cn/getAddressBook'
		let method = 'post'
		let data = {
			account: loginStore.account
		}
		
		//循环获取数据，有点问题
		const interval = setInterval(async () => {
			const res = await sendRequest(url, method, data)
			Object.assign(testChart, res)
			console.log(testChart)
		}, 1000)

	})
</script>

<style lang="scss" scoped>
	.swiper {
		margin-top: 200px;
		height: 65vh;
		width: 90vw;
	}

	.swiper-slide {}

	.tip {
		position: absolute;
		top: 200px;
		color: #7F7F7F;
		left: 45.5%;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 30px;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 80px;
		height: 100%;
		width: 100%;
	}

	.idCard {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		text-align: center;
		width: 26vw;
		height: 26vh;
		background-color: #fff;
		color: black;
		border-radius: 10px;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
		list-style-type: none;
		user-select: none;
	}

	.nameContent {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-left: 50px;
		margin-top: 10px;
	}

	.name {
		font-size: 20px;
		font-family: Micorsoft YaHei;
		margin-left: 40px;
		padding-bottom: 5px;
		border-bottom: 4px solid #3685F2;
	}

	.circleContain {
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}

	.detailContent {
		width: 100%;
	}

	.phone {
		text-align: start;
		margin-left: 55px;
		margin-top: 30px;
		height: 5vh;
		width: 70%;
	}

	.address {
		text-align: start;
		margin-left: 55px;
		height: 5vh;
		width: 70%;
	}

	.idCardAdd {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 26vw;
		height: 26vh;
		list-style-type: none;
		user-select: none;

		img {
			height: 150px;
			max-width: 100vw;
		}
	}

	.search {
		position: fixed;
		top: 100px;
		left: 20%;
		right: auto;
		display: flex;
		flex-direction: row;
		height: 10vh;
		width: 60vw;
		background-color: #fff;
		border-radius: 15px;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
		text-indent: 50px;
	}

	.searchFor {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		top: 100px;
		height: 10vh;
		width: 7vw;
		border: none;
		background-color: #7F7F7F;
		border-radius: 15px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);

		img {
			height: 45px;
			max-width: 100vw;
		}
	}

	.action {
		display: flex;
		flex-direction: row;
		justify-content: end;
		width: 100%;
	}

	.delete {
		display: flex;
		justify-content: end;
		width: 5%;

		img {
			margin-top: 5px;
			margin-right: 10px;
			height: 20px;
		}
	}

	.change {
		display: flex;
		justify-content: end;
		width: 5%;

		img {
			margin-top: 5px;
			margin-right: 10px;
			height: 20px;
		}
	}


	input {
		top: 100px;
		height: 9.7vh;
		width: 53vw;
		border: none;
		border-radius: 15px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
		font-size: 30px;
		text-indent: 20px;
	}
</style>