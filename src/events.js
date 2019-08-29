export default class Events {
    constructor(flv) {
        this.destroys = [];
        this.proxy = this.proxy.bind(this);

        flv.on('destroy', () => {
            this.destroy();
        });
    }

    proxy(target, name, callback, option = {}) {
        if (Array.isArray(name)) {
            return name.map(item => this.proxy(target, item, callback, option));
        }
        target.addEventListener(name, callback, option);
        const destroy = () => target.removeEventListener(name, callback, option);
        this.destroys.push(destroy);
        return destroy;
    }

    destroy() {
        this.destroys.forEach(event => event());
    }
}
