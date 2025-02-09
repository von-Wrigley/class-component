export const useLocalStorage = (name:string) => {
       const getItem = ()=> {
        try {
            const item = window.localStorage.getItem(name)
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.log(error)
            
        }
       }
 return {getItem}

}