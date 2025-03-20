import axios from 'axios';
export async function RebootMiner(ip) {
    try {
        // 假设有一个 API 可以通过 IP 重启矿机
        const response = await axios.get('http://' + ip + '/cgi-bin/reboot.cgi', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Digest username=root, realm=antMiner Configuration, nonce=22217dd8940a927607b4233a247a52b6, uri=/cgi-bin/reboot.cgi, response=4f900550554ee411a6652e41933cf341, qop=auth, nc=00000038, cnonce=95f61bb5123f8297',
                'Connection': 'keep-alive',
                'Referer': 'http://10.21.2.39/',
                'Priority': 'u=0'
            },
            auth: {
                username: 'root',
                password: 'root^'
            }
        });
        if (response.status === 200) {
            return { success: true, message: `矿机 ${ip} 重启成功` };
        } else {
            return { success: false, message: `矿机 ${ip} 重启失败` };
        }
    } catch (error) {
        console.error("重启矿机时出错:", error);
        return { success: false, message: `重启矿机 ${ip} 时出错` };
    }

}