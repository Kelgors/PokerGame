import {ComboType} from './CardComboList';

let languages = [];
let currentLang = null;

export default {
    setup(langs) {
        languages = langs;
        currentLang = languages[0];
    },
    setLang(lang) {
        currentLang = languages.find((d) => d.Lang === lang);
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