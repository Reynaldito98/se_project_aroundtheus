export default class UserInfo{
    constructor({nameSelector, jobSelector}){
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
    }

    getUserInfo(){
        this._userInfo = {};

        this._userInfo['name'] = this._userName.textContent;
        this._userInfo['about'] = this._userJob.textContent;

        return this._userInfo;
    }

    setUserInfo(inputValues){
        this._userName.textContent = inputValues.name;
        this._userJob.textContent = inputValues.about;
    }
}