export async function generateID(bruteforceSafe: boolean) {
    try {
        // if bruteforcesafe is false default length is 5, if true default length is 90
        let length = bruteforceSafe ? 90 : 5;
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
        
    } catch (err) {
        return {
            message: "An error occurred while generating the ID, please try again",
        };
    }
}

export default generateID;