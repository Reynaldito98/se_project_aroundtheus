export default class UserInfo{
    constructor({nameSelector, jobSelector}){
        this._username = document.querySelector(nameSelector);
        this._userjob = document.querySelector(jobSelector);
    }

    getUserInfo(){
        this._userInfo = {};

        this._userInfo['name'] = this._username.textContent;
        this._userInfo['about'] = this._userjob.textContent;

        return this._userInfo;
    }

    setUserInfo(inputValues){
        this._username.textContent = inputValues.name;
        this._userjob.textContent = inputValues.about;
    }
}