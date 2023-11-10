export default class UserInfo{
    constructor({nameSelector, jobSelector, avatarSelector}){
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        this._userInfo = {};

        this._userInfo['name'] = this._userName.textContent;
        this._userInfo['about'] = this._userJob.textContent;
        this._userInfo['avatar'] = this._avatar.src;

        return this._userInfo;
    }

    setUserInfo(inputValues){
        this._userName.textContent = inputValues.name;
        this._userJob.textContent = inputValues.about;
        this._avatar.src = inputValues.avatar;
    }

    renderAvatar(values){
        this._avatar.src = values.avatar;
    }
}