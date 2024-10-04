<!-- 这是修改联系人页面的主键 -->
<!-- 一开始没设计好懒得改复制了一遍输入联系人组件 -->
<!-- 应该合在一起的(￣▽￣)~* -->

<template>
	<div class="main">
		<div class="inputBox">
			<div class="text">修改联系人</div>
			<input type="number" placeholder="电话号码" maxlength="11" v-model="addressBookStore.phone" />
			<input type="text" placeholder="地址" maxlength="13" v-model="addressBookStore.address" />
			<div class="confirm">
				<button @click.stop="cancel">取消</button>
				<button @click.stop="changeAddress" style="background-color: rgba(255, 192, 0, 1);">确定</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name='inputBox'>
	//引入仓库
	import { useAddressBookStore } from '../store/addressBook';
	import { useLoginStore } from '../store/login';
	//引入自定函数
	import { useAddress } from '../utils/useAddress';

	//启用仓库
	const loginStore = useLoginStore()
	const addressBookStore = useAddressBookStore()

	//修改联系人的函数
	const changeAddress = async () => {
		const data = {
			account: loginStore.account,
			name: addressBookStore.name,
			phone: addressBookStore.phone,
			address: addressBookStore.address
		}
		const res = await useAddress('changeAddressBook', data)
		addressBookStore.isShowChang = false
		addressBookStore.isShow = true
		return res;

	}

	// 取消按钮的函数
	const cancel = () => {
		addressBookStore.isShowChang = false
		addressBookStore.isShow = true
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 100%;
	}

	.text {
		font-size: 20px;
		color: black;
		font-weight: 700;
		font-family: Micorsoft YaHei;
	}

	.confirm {
		display: flex;
		flex-direction: row;
		gap: 30px;
	}

	.inputBox {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 60vh;
		width: 30vw;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
	}

	button {
		color: #fff;
		font-size: 16px;
		margin-top: 50px;
		border: none;
		background-color: #00B0F0;
		box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.3);
		height: 6vh;
		width: 10vw;
	}

	input {
		height: 56px;
		width: 70%;
		margin-top: 24px;
		margin-left: auto;
		margin-right: auto;
		border: none;
		box-shadow: 0.5px 0.5px 2px 2px rgba(0, 0, 0, 0.1);
		text-indent: 48px;
		outline: none;
		font-weight: 300;
	}
</style>