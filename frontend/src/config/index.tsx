const backUrl = process.env.NODE_ENV === 'production' ? 'https://unlcm2kcmhmxfgj4zlzc2ae3di0noqqy.lambda-url.ap-northeast-2.on.aws' : 'http://localhost:8080';

console.log(backUrl)

export default backUrl;