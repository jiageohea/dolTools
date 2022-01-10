exports.main = async (event, context) => {
    return {code:0,msg:'未知数据错误...'}
}
/**
 * 获取随机数区间
 * @param {int} min 
 * @param {int} max 
 */
exports.getRandNumber = function(min,max){
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return number
}
/**
 * 随机获取电话号码
 */
exports.getRandPhone = function(){
    let firstList = "184,135,136,137,138,139,150,151,152,157,158,159,130,131,132,155,156,133,153,199".split(",")
    let index = this.getRandNumber(0,firstList.length - 1)
    let first = firstList[index]
    let second = (this.getRandNumber(1,888) + 10000).toString().substring(1)
    let third = (this.getRandNumber(1,9100) + 10000).toString().substring(1)
    return first + second + third
}
exports.getRandUserName = function(){
    let firstNameList = "赵钱孙李周吴郑王陈张韩杨"
    let girlNameList = "秀娟英华慧巧美娜静淑惠珠翠雅芝玉萍红娥玲芬芳燕彩春菊兰凤洁梅琳素云莲真环雪荣爱妹霞香月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓纨仪荷丹蓉眉君琴蕊薇菁梦岚苑婕馨瑗琰韵融园艺咏卿聪澜纯毓悦昭冰爽琬茗羽希宁欣飘育滢馥筠柔竹霭凝晓欢霄枫芸菲寒伊亚宜可姬舒影荔枝思丽"
    let boyNameList = "伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘"
    let index = this.getRandNumber(0,firstNameList.length - 1)
    let firstName = firstNameList.substring(index,index + 1)
    let sexs = this.getRandNumber(0,1)
    let sex = sexs == 0 ? '女' : '男'
    let mainList = sexs == 0 ? girlNameList : boyNameList
    let indexs = this.getRandNumber(0, mainList.length - 1)
    let secondName = mainList.substring(indexs, indexs + 1)
    let third = this.getRandNumber(0,1)
    let thirdName = ""
    if(third == 1){
        indexs = this.getRandNumber(0, mainList.length - 1)
        thirdName =  mainList.substring(indexs, indexs + 1)
    }
    return {
        name: firstName + secondName + thirdName,
        sex: sex,
        gender: sexs
    }
}
exports.getRandCaAddress = function(num,temp){
    const cityData = require('./city.json')
    const template = [
        "X幢Y室",
        "X单元Y室"
    ]
    const number = num >= 0 ? num : 1
    const tempNum = temp || this.getRandNumber(0,template.length - 1)
    let retArr = []
    //分别内部定义省市区县的内部函数
    
    

    const getProvinceName = function(proLen){
        return Object.keys(cityData)[proLen]
    }
    const getCityName = function(proLen,cityLen){
        return Object.keys(cityData[getProvinceName(proLen)])[cityLen]
    }
    const getDistrictName = function(proLen,cityLen,distLen){
        return Object.keys(cityData[getProvinceName(proLen)][getCityName(proLen,cityLen)])[distLen]
    }
    const getAreaName = function(proLen,cityLen,distLen,areaLen){
        return cityData[getProvinceName(proLen)][getCityName(proLen,cityLen)][getDistrictName(proLen,cityLen,distLen)][areaLen]
    }

    let proLen = this.getRandNumber(0,Object.keys(cityData).length - 1)
    let cityLen = this.getRandNumber(0,Object.keys(cityData[getProvinceName(proLen)]).length - 1)
    let distLen = this.getRandNumber(0,Object.keys(cityData[getProvinceName(proLen)][getCityName(proLen,cityLen)]).length -1)
    let areaLen = this.getRandNumber(0,Object.keys(cityData[getProvinceName(proLen)][getCityName(proLen,cityLen)][getDistrictName(proLen,cityLen,distLen)]).length - 1)

    for(let i = 0; i < number; i++){
        let province = getProvinceName(proLen)
        let city = getCityName(proLen,cityLen)
        let dist = getDistrictName(proLen,cityLen,distLen)
        let area = getAreaName(proLen,cityLen,distLen,areaLen)
        let item = {
            province,
            city,
            dist,
            area
        }
        let first = province + city + dist + area
        first = first.replace(/undefined/g,'')
        let second = template[tempNum]
        second = second.replace(/X/g,this.getRandNumber(1,20))
        second = second.replace(/Y/g,this.getRandNumber(1,300))
        item.detail = second
        item.addr = first + second
        retArr.push(item)
    }
    return retArr
}
exports.setStartReplace = function(str,start,len,char){
    str = str || ''
    start = start || 0
    len = len || 2
    char = char || '*'
    let total = start + len
    const strArr = str.split('')
    const slen = strArr.length
    for(i = 0; i < slen; i++){
        if(start < i && i <= total){
            strArr[i] = char
        }
    }
    return strArr.join('')
}
exports.formatTimeStamp = (timestamp,format)=>{
    format = format || 'Y-m-d H:i:s'
    const date = timestamp == '' ? new Date() : new Date(timestamp)
    let retDate = ''
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minu = date.getMinutes()
    const seconds = date.getSeconds()
    if(format == 'Y-m-d H:i:s'){
        retDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minu + ':' + seconds
        return retDate
    }
    if(format == 'm-d'){
        retDate =  month + '-' + day 
        return retDate
    }
}