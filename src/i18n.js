import {ComboType} from './CardComboList';
const translations = {
    [ComboType.Pair]: 'Paire',
    [ComboType.ThreeOfAKind]: 'Brelan',
    [ComboType.FourOfAKind]: 'Carré',
    [ComboType.FiveOfAKind]: 'Quinte',
    [ComboType.Flush]: 'Flush',
    [ComboType.FullHouse]: 'Full',
    [ComboType.HigherCard]: 'Higher Card',
    [ComboType.TwoPair]: 'Deux paires'
};


export default {
    combo(name, defaultValue) {
        return translations[name] || defaultValue;
    }    
};