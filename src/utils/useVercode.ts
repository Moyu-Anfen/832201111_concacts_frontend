//发送验证码
import { sendRequest } from '../utils/useAxios';

export function useVercode(account:any){
	const url = 'http://softwareback.moyu-home.cn/verify'
	const method = 'POST'
	const data = {
		account:account
	}
	sendRequest(url,method,data);
}