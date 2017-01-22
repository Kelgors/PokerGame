import {ComboType} from './cards/CardComboList';

let languages = [];
let currentLang = null;

export default {
    setup(langs) {
        languages = langs;
        currentLang = languages[0];
    },
    getDefaultLang() {
        return currentLang = languages.find((d) => d.Lang === 'EN');
    },
    setLang(lang) {
        currentLang = languages.find((d) => d.Lang === lang);
        if (!currentLang) {
            console.log('Language ' + String(lang) + ' isnt available. Set default language');
            currentLang = this.getDefaultLang();
        }
    },
    t(chainedName) {
        const names = chainedName.split('.');
        let currentObject = currentLang;
        for (let index = 0; index < names.length; index++) {
            const keyName = names[index];
            if (keyName in currentObject) {
                if (typeof currentObject[keyName] !== 'object') {
                    return currentObject[keyName];
                } else {
                    currentObject = currentObject[keyName];
                }
            }
        }
        return '';
    }
};