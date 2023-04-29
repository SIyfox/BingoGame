import {makeAutoObservable} from 'mobx'


export default class GlobalStore {

    constructor(){

        this._formActivities = []
        makeAutoObservable(this)
    }

}