// 工具函数用来选择操作通讯录的方式
import axios from "axios";

export async function useAddress(method:string,data:any){
	const config = {
		method: 'POST',
		url: `http://softwareback.moyu-home.cn/${method}`,
		headers: {
			'Content-Type': 'application/json' // 请求头设置为JSON
		},
		data:data
	};
	
	async function useAxios(){
		try{
			const response = await axios(config)
			const res = response.data
			return res
		}catch(e){
			console.log(e)
		}
	}
	
	return useAxios();
}