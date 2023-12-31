export default class Section{
    constructor({items, renderer}, classSelector){
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(classSelector);
    }

    renderItems(){
        this._initialArray.forEach(item => {
            this._renderer(item);
        })
    }

    appendItem(newItem){
        this._container.append(newItem);
    }

    prependItem(newItem){
        this._container.prepend(newItem);
    }

    setItemsAndRenderer(data, newRenderer){
        this._initialArray = data;
        this._renderer = newRenderer;
    }
}