import AsyncStorage from '@react-native-async-storage/async-storage';
export const localStotage = () => {
    const save = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(`Error in local storage: ${error}`)
        }
    }

    const getItem = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (error) {
            console.log(`Error in local storage: ${error}`)
        }
    }

    const deleteItem = async (key: string) => {
        try {
            return await AsyncStorage.removeItem(key)
        } catch (error) {
            console.log(`Error in local storage: ${error}`)
        }
    }

    return {
        save,
        getItem,
        deleteItem
    }
}