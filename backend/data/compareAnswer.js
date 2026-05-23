const normalizeString = (value) =>{
    return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
}

const compareArray = (arr1 , arr2) =>{
    if (arr1.length !== arr2.length) {
        return false
    }

    for (let index = 0; index < arr1.length; index++) {
        if (String(arr1[index]) !== String(arr2[index])) {
          return false  
        }   
    }
    return true
}

const compareAns = (extectedOutput , userOutput , answerType) =>{
    try {
        switch(answerType){
            case "string": 
            return(
                normalizeString(extectedOutput) ===
                 normalizeString(userOutput)
            )

            case "number" :
                return Number(extectedOutput) === Number(userOutput)
       
                case "boolean" : 
                return (
                    String(extectedOutput).toLowerCase() ===
                    String(userOutput).toLowerCase()
                )

                // array 
                case "array" : 
                const extectedArray = 
                typeof extectedOutput ===  "string"
                ? JSON.parse(extectedOutput)
                :extectedOutput;

                const userArray = 
                typeof userOutput === "string"
                ? JSON.parse(userOutput)
                :userOutput;

                return compareArray(extectedArray , userArray)

                default :
                return false;
        
            }
    } catch (error) {
        return false
    }
}

export default compareAns;


